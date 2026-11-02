"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { WHEEL_ARTWORKS } from "./wheelData";
import {
  MotionPosition,
  commitWheelSelection,
  getAutoTurnDuration,
  getAutoTurnTarget,
  getCardTapAction,
  mod,
  shortestDelta,
  type ActiveAnimation,
} from "./wheelPhysics";
import WebGLStage from "./WebGLStage";
import ContactOverlay from "./ContactOverlay";
import s from "./wheelStyles";

const CARD_COUNT = WHEEL_ARTWORKS.length;

function syncCardVideo(video: HTMLVideoElement, active: boolean) {
  video.muted = true;
  video.dataset.active = active ? "true" : "false";
  if (!video.dataset.playbackBound) {
    const retry = () => {
      if (video.dataset.active === "true") {
        void video.play().catch(() => {});
      }
    };
    video.addEventListener("canplay", retry);
    video.addEventListener("loadeddata", retry);
    video.dataset.playbackBound = "true";
  }
  if (active) {
    if (video.readyState === HTMLMediaElement.HAVE_NOTHING) {
      video.load();
    }
    void video.play().catch(() => {});
  } else if (!video.paused || video.currentTime > 0) {
    video.pause();
    video.currentTime = 0;
  }
}

export default function InteractiveWheel() {
  const [selected, setSelected] = useState(0);
  const [inspected, setInspected] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const motionPosRef = useRef<MotionPosition>(new MotionPosition(0));
  const selectedRef = useRef(0);
  const inspectedRef = useRef(false);
  const contactOpenRef = useRef(false);

  const sceneRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const frontStateRef = useRef<boolean[]>([]);
  const mobileRef = useRef(false);
  const entranceStartRef = useRef<number>(0);

  const dragRef = useRef({
    on: false,
    x: 0,
    y: 0,
    t: 0,
    moved: 0,
    vel: 0,
  });
  const animRef = useRef<ActiveAnimation | null>(null);
  const wheelSnapTimerRef = useRef<number | null>(null);
  const quietTimeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    inspectedRef.current = inspected;
  }, [inspected]);

  useEffect(() => {
    contactOpenRef.current = contactOpen;
  }, [contactOpen]);

  const stopAnimation = useCallback(() => {
    animRef.current?.stop();
    animRef.current = null;
    motionPosRef.current.stop();
  }, []);

  const getWheelPosition = useCallback(() => motionPosRef.current.get(), []);
  const getWheelVelocity = useCallback(() => motionPosRef.current.getVelocity(), []);

  const updateWheelDOM = useCallback((v: number, entranceProgress = 1) => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const mobile = mobileRef.current;
    const vw = window.innerWidth;
    const reachBase = vw * (mobile ? 0.5 : 0.42);
    const reach = Math.min(reachBase, mobile ? 175 : 610) * (0.28 + 0.72 * entranceProgress);
    const zRadius = (mobile ? 210 : 480) * (0.2 + 0.8 * entranceProgress);
    const entranceLift = (1 - entranceProgress) * 95;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const d = shortestDelta(i, v, CARD_COUNT);
      const angle = (d * Math.PI * 2) / CARD_COUNT;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const depth = (cos + 1) * 0.5; // 1 at front, 0 at back

      const x = sin * reach;
      const z = cos * zRadius;
      const y = -depth * (mobile ? 6 : 14) + Math.abs(sin) * (mobile ? 8 : 18) + entranceLift;

      const scaleBase = mobile ? 0.54 + depth * 0.46 : 0.48 + depth * 0.54;
      const scale = scaleBase * (0.76 + 0.24 * entranceProgress);
      const rotY = -sin * (mobile ? 16 : 26);
      const rotZ = -sin * (mobile ? 1.2 : 2.2) * (1 - depth);

      card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) scale(${scale.toFixed(4)}) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;

      const alpha = (0.14 + Math.pow(depth, 1.25) * 0.86) * entranceProgress;
      card.style.opacity = alpha.toFixed(3);
      card.style.zIndex = String(Math.round(depth * 40));

      const isFront = i === selectedRef.current;
      if (frontStateRef.current[i] !== isFront) {
        frontStateRef.current[i] = isFront;
        card.classList.toggle(s.frontCard, isFront);
        card.setAttribute("aria-hidden", String(!isFront));
        const btn = card.querySelector<HTMLElement>("[data-card-trigger]");
        if (btn) btn.tabIndex = isFront ? 0 : -1;
      }

      const video = card.querySelector<HTMLVideoElement>("video");
      if (video) {
        syncCardVideo(video, isFront);
      }
    }
  }, []);

  const settleToNearest = useCallback(() => {
    const pos = motionPosRef.current.get();
    const snapTarget = Math.round(pos);
    animRef.current = motionPosRef.current.animateSpring(snapTarget, {
      stiffness: 185,
      damping: 22,
      mass: 0.85,
      restDelta: 0.0004,
      onComplete: () => {
        animRef.current = null;
        const nextIdx = commitWheelSelection(
          selectedRef.current,
          motionPosRef.current.get(),
          true,
          CARD_COUNT
        );
        selectedRef.current = nextIdx;
        sceneRef.current?.classList.remove(s.dragging);
        setSelected(nextIdx);
      },
    });
  }, []);

  const goToIndex = useCallback(
    (targetIdx: number) => {
      stopAnimation();
      quietTimeRef.current = 0;
      const currentPos = motionPosRef.current.get();
      const delta = shortestDelta(targetIdx, currentPos, CARD_COUNT);
      const targetPos = currentPos + delta;

      const immediateIdx = mod(targetIdx, CARD_COUNT);
      selectedRef.current = immediateIdx;
      setSelected(immediateIdx);

      animRef.current = motionPosRef.current.animateSpring(targetPos, {
        stiffness: 260,
        damping: 28,
        mass: 0.82,
        restDelta: 0.0004,
        onComplete: () => {
          animRef.current = null;
          const committed = commitWheelSelection(
            selectedRef.current,
            motionPosRef.current.get(),
            true,
            CARD_COUNT
          );
          selectedRef.current = committed;
          setSelected(committed);
        },
      });
    },
    [stopAnimation]
  );

  useLayoutEffect(() => {
    updateWheelDOM(motionPosRef.current.get(), 1);
  }, [selected, inspected, updateWheelDOM]);

  useEffect(() => {
    const syncNodes = () => {
      mobileRef.current = window.innerWidth <= 768;
      cardsRef.current = Array.from(
        sceneRef.current?.querySelectorAll<HTMLElement>("[data-wheel-card]") ?? []
      );
      frontStateRef.current = new Array(cardsRef.current.length).fill(false);
    };
    syncNodes();

    const onResize = () => {
      mobileRef.current = window.innerWidth <= 768;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const onGlobalPointerUp = (e: Event) => {
      if (!dragRef.current.on) return;
      dragRef.current.on = false;
      sceneRef.current?.classList.remove(s.dragging);
      if (e instanceof PointerEvent && sceneRef.current?.hasPointerCapture(e.pointerId)) {
        try {
          sceneRef.current.releasePointerCapture(e.pointerId);
        } catch {}
      }
    };
    window.addEventListener("pointerup", onGlobalPointerUp);
    window.addEventListener("pointercancel", onGlobalPointerUp);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    entranceStartRef.current = performance.now();
    quietTimeRef.current = 0;
    lastFrameTimeRef.current = 0;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsedSinceStart = (now - entranceStartRef.current) / 1000;
      const rawEntrance = reducedMotion ? 1 : Math.min(1, elapsedSinceStart / 1.45);
      const entranceEase = 1 - Math.pow(1 - rawEntrance, 3.4);

      const currentPos = motionPosRef.current.get();
      updateWheelDOM(currentPos, entranceEase);

      // Update live front card highlight during long momentum spins
      const liveSnap = mod(Math.round(currentPos), CARD_COUNT);
      if (liveSnap !== selectedRef.current && !dragRef.current.on) {
        selectedRef.current = liveSnap;
        setSelected(liveSnap);
      }

      if (
        !reducedMotion &&
        !dragRef.current.on &&
        !inspectedRef.current &&
        !contactOpenRef.current &&
        animRef.current === null &&
        rawEntrance >= 1
      ) {
        const dt = lastFrameTimeRef.current ? now - lastFrameTimeRef.current : 16.7;
        quietTimeRef.current += dt;
        if (quietTimeRef.current > 3200) {
          const target = getAutoTurnTarget(motionPosRef.current.get());
          animRef.current = motionPosRef.current.animateTween(target, {
            duration: getAutoTurnDuration(),
            ease: "linear",
            onComplete: () => {
              animRef.current = null;
              const n = commitWheelSelection(
                selectedRef.current,
                motionPosRef.current.get(),
                true,
                CARD_COUNT
              );
              selectedRef.current = n;
              setSelected(n);
            },
          });
          quietTimeRef.current = 0;
        }
      } else {
        quietTimeRef.current = 0;
      }

      lastFrameTimeRef.current = now;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (wheelSnapTimerRef.current !== null) {
        window.clearTimeout(wheelSnapTimerRef.current);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("pointerup", onGlobalPointerUp);
      window.removeEventListener("pointercancel", onGlobalPointerUp);
    };
  }, [updateWheelDOM]);

  // Smooth Wheel / Trackpad Scroll Support
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (inspectedRef.current || contactOpenRef.current) return;
      e.preventDefault();

      stopAnimation();
      quietTimeRef.current = 0;

      const primaryDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const step = Math.max(-0.55, Math.min(0.55, primaryDelta * 0.0022));
      const next = motionPosRef.current.get() + step;
      motionPosRef.current.set(next, step * 45);

      const liveIdx = mod(Math.round(next), CARD_COUNT);
      if (liveIdx !== selectedRef.current) {
        selectedRef.current = liveIdx;
        setSelected(liveIdx);
      }

      if (wheelSnapTimerRef.current !== null) {
        window.clearTimeout(wheelSnapTimerRef.current);
      }
      wheelSnapTimerRef.current = window.setTimeout(() => {
        settleToNearest();
      }, 150);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [settleToNearest, stopAnimation]);

  // Keyboard Navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (contactOpenRef.current) {
        if (e.key === "Escape") {
          e.preventDefault();
          setContactOpen(false);
        }
        return;
      }

      if (e.key === "Escape" && inspectedRef.current) {
        e.preventDefault();
        setInspected(false);
        return;
      }

      if (inspectedRef.current) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToIndex(mod(Math.round(motionPosRef.current.get()) + 1, CARD_COUNT));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToIndex(mod(Math.round(motionPosRef.current.get()) - 1, CARD_COUNT));
      } else if (e.key === "Enter" || e.key === " ") {
        const activeEl = document.activeElement;
        if (activeEl && activeEl.closest(`.${s.contactButton}`)) return;
        if (activeEl && activeEl.closest(`.${s.brandMark}`)) return;
        e.preventDefault();
        stopAnimation();
        setInspected(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToIndex, stopAnimation]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (contactOpen || inspected) return;
    if ((e.target as HTMLElement).closest("[data-wheel-hud]")) return;

    stopAnimation();
    quietTimeRef.current = 0;
    dragRef.current = {
      on: true,
      x: e.clientX,
      y: e.clientY,
      t: performance.now(),
      moved: 0,
      vel: 0,
    };
    sceneRef.current?.classList.add(s.dragging);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--pointer-x", `${e.clientX - bounds.left}px`);
    e.currentTarget.style.setProperty("--pointer-y", `${e.clientY - bounds.top}px`);

    if (!dragRef.current.on) return;

    const now = performance.now();
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    const dt = Math.max(7, now - dragRef.current.t);

    const mobile = window.innerWidth <= 768;
    const divisor = mobile
      ? Math.max(125, window.innerWidth * 0.34)
      : Math.max(240, window.innerWidth * 0.26);
    const deltaUnits = -dx / divisor;

    const nextPos = motionPosRef.current.get() + deltaUnits;
    motionPosRef.current.set(nextPos, (deltaUnits / dt) * 1000);

    dragRef.current.moved += Math.hypot(dx, dy);
    dragRef.current.vel = dragRef.current.vel * 0.22 + (deltaUnits / dt) * 0.78;
    dragRef.current.x = e.clientX;
    dragRef.current.y = e.clientY;
    dragRef.current.t = now;
  };

  const releaseCapture = (e: ReactPointerEvent<HTMLDivElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
  };

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.on) return;
    const moved = dragRef.current.moved;
    dragRef.current.on = false;
    releaseCapture(e);
    sceneRef.current?.classList.remove(s.dragging);

    if (moved <= 10) {
      // Geometric element lookup immune to setPointerCapture retargeting
      const hitEl = document.elementFromPoint(e.clientX, e.clientY);
      const cardEl = hitEl?.closest<HTMLElement>("[data-wheel-card]");
      if (cardEl) {
        const idx = Number(cardEl.dataset.index ?? -1);
        if (idx >= 0) {
          const action = getCardTapAction({
            cardIndex: idx,
            selectedIndex: selectedRef.current,
            moved: 0,
          });
          if (action === "inspect") {
            stopAnimation();
            setInspected(true);
          } else if (action === "select") {
            goToIndex(idx);
          }
          return;
        }
      }
      settleToNearest();
      return;
    }

    const mobile = window.innerWidth <= 768;
    const vel = Math.max(
      -0.038,
      Math.min(0.038, dragRef.current.vel * (mobile ? 3.1 : 2.35))
    );
    const carryDistance = Math.abs(vel) * (mobile ? 6200 : 5400);
    const target = motionPosRef.current.get() + vel * carryDistance;
    const duration = Math.min(1.38, Math.max(0.52, Math.abs(vel) * (mobile ? 68 : 56)));

    animRef.current = motionPosRef.current.animateTween(target, {
      duration,
      ease: "cubicOut",
      onComplete: () => {
        animRef.current = null;
        settleToNearest();
      },
    });
  };

  const handlePointerCancel = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.on) return;
    dragRef.current.on = false;
    dragRef.current.moved = 0;
    releaseCapture(e);
    sceneRef.current?.classList.remove(s.dragging);
    settleToNearest();
  };

  const activeArtwork = WHEEL_ARTWORKS[selected] ?? WHEEL_ARTWORKS[0];

  return (
    <main
      className={s.root}
      style={
        {
          "--active-accent": activeArtwork.accent,
          "--secondary-accent": activeArtwork.secondaryAccent,
        } as CSSProperties
      }
    >
      {/* 1. PIXELWEBART — Discreet Upper-Left Brand Mark */}
      <button
        type="button"
        className={s.brandMark}
        onClick={() => {
          setInspected(false);
          setContactOpen(false);
          goToIndex(0);
        }}
        aria-label="ML&R ASSETS"
      >
        <span className={s.brandAperture} aria-hidden="true">
          <i className={s.brandApertureRing} />
          <b className={s.brandApertureCore} />
        </span>
        <span className={s.brandWordmark}>
          ML&amp;R <span className={s.brandWordmarkAccent}>ASSETS</span>
        </span>
      </button>

      {/* 3. CONTACT — Understated Upper-Right Button */}
      <button
        type="button"
        className={s.contactButton}
        onClick={() => {
          stopAnimation();
          setContactOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={contactOpen}
      >
        <span className={s.contactDot} aria-hidden="true" />
        <span>CONTACT</span>
      </button>

      {/* 2. THE INTERACTIVE WHEEL — Full-Screen WebGL + 3D Optical Monoliths */}
      <WebGLStage
        getWheelPosition={getWheelPosition}
        getWheelVelocity={getWheelVelocity}
        activeIndex={selected}
        inspected={inspected}
        contactOpen={contactOpen}
      />

      <section
        className={s.wheelStage}
        aria-label="Interactive Digital Portfolio Wheel"
      >
        <div
          ref={sceneRef}
          className={[
            s.scene,
            inspected ? s.sceneInspected : "",
            contactOpen ? s.sceneDimmed : "",
          ].join(" ")}
          role="region"
          aria-roledescription="carousel"
          aria-label="Interactive 3D wheel. Drag, scroll, or use left and right arrow keys to rotate."
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className={s.orbitalRing} aria-hidden="true" />

          {WHEEL_ARTWORKS.map((item, i) => {
            const isFront = i === selected;
            return (
              <article
                key={item.slug}
                data-wheel-card
                data-index={i}
                className={`${s.wheelCard} ${isFront ? s.frontCard : ""}`}
                style={
                  {
                    "--card-accent": item.accent,
                    "--card-secondary": item.secondaryAccent,
                    opacity: 0,
                  } as CSSProperties
                }
                aria-hidden={!isFront}
                onPointerMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const mx = ((e.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
                  const my = ((e.clientY - rect.top) / Math.max(rect.height, 1)) * 100;
                  e.currentTarget.style.setProperty("--card-mx", `${mx.toFixed(1)}%`);
                  e.currentTarget.style.setProperty("--card-my", `${my.toFixed(1)}%`);
                }}
              >
                <div
                  data-card-trigger
                  role="button"
                  tabIndex={isFront ? 0 : -1}
                  aria-label={
                    isFront ? `Inspect ${item.title}` : `Rotate to ${item.title}`
                  }
                  className={s.cardTrigger}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isFront) {
                        stopAnimation();
                        setInspected(true);
                      } else {
                        goToIndex(i);
                      }
                    }
                  }}
                >
                  <div className={s.glassMonolith}>
                    <div className={s.monolithTopBar}>
                      <span className={s.monolithIndex}>
                        {item.index} <i className={s.monolithSlash}>{"//"}</i> {item.azimuth}
                      </span>
                      <span className={s.monolithMedium}>{item.medium}</span>
                    </div>

                    <div className={s.monolithViewport}>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        priority={i < 2}
                        sizes="(max-width: 768px) 78vw, 400px"
                        className={s.monolithStill}
                        draggable={false}
                      />
                      <video
                        className={s.monolithVideo}
                        autoPlay={isFront}
                        muted
                        loop
                        playsInline
                        preload={isFront ? "auto" : "metadata"}
                        draggable={false}
                      >
                        <source src={item.videoMobile} media="(max-width: 768px)" />
                        <source src={item.video} />
                      </video>
                      <div className={s.opticalSheen} aria-hidden="true" />
                    </div>

                    <div className={s.monolithFooter}>
                      <span className={s.monolithDiscipline}>{item.discipline}</span>
                      <strong className={s.monolithTitle}>{item.title}</strong>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Integrated Orbital Dial Ticks (Part of the Wheel Mechanism) */}
          <div
            data-wheel-hud
            className={s.wheelDial}
            role="group"
            aria-label="Wheel station dial"
          >
            {WHEEL_ARTWORKS.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                className={`${s.dialTick} ${i === selected ? s.dialTickActive : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (i === selected) {
                    stopAnimation();
                    setInspected((prev) => !prev);
                  } else {
                    setInspected(false);
                    goToIndex(i);
                  }
                }}
                aria-label={`${item.index} ${item.title}`}
                aria-current={i === selected ? "true" : undefined}
              >
                <span className={s.dialTickBar} />
                <span className={s.dialTickCode}>{item.index}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Screen-Reader Live Announcement */}
        <p className={s.srOnly} aria-live="polite">
          {activeArtwork.index} {activeArtwork.title} — {activeArtwork.discipline}.
          {inspected ? " Inspection view active." : ""}
        </p>

        {/* In-Place Spatial Inspection View (Zero Page Navigation) */}
        {inspected && (
          <div
            className={s.inspectionBackdrop}
            onClick={(e) => {
              if (e.target === e.currentTarget) setInspected(false);
            }}
          >
            <aside
              className={s.inspectionFrame}
              role="dialog"
              aria-modal="true"
              aria-label={`${activeArtwork.title} visual study`}
            >
              <div className={s.inspectionHeader}>
                <div className={s.inspectionMeta}>
                  <span className={s.inspectionIndex}>
                    {activeArtwork.index} {"//"} {activeArtwork.azimuth}
                  </span>
                  <span className={s.inspectionMedium}>{activeArtwork.medium}</span>
                </div>
                <button
                  type="button"
                  className={s.overlayClose}
                  onClick={() => setInspected(false)}
                  aria-label="Return to wheel"
                >
                  ×
                </button>
              </div>

              <div className={s.inspectionStage}>
                <Image
                  src={activeArtwork.image}
                  alt={activeArtwork.title}
                  fill
                  sizes="(max-width: 768px) 92vw, 76vw"
                  className={s.inspectionStill}
                  draggable={false}
                />
                <video
                  key={activeArtwork.slug}
                  className={s.inspectionVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  draggable={false}
                >
                  <source src={activeArtwork.videoMobile} media="(max-width: 768px)" />
                  <source src={activeArtwork.video} />
                </video>
                <div className={s.inspectionVignette} aria-hidden="true" />
              </div>

              <div className={s.inspectionFooter}>
                <div>
                  <span className={s.inspectionDiscipline}>
                    {activeArtwork.discipline}
                  </span>
                  <h2 className={s.inspectionTitle}>{activeArtwork.title}</h2>
                </div>
                <div className={s.inspectionStepper}>
                  <button
                    type="button"
                    className={s.stepBtn}
                    onClick={() =>
                      goToIndex(mod(selected - 1, CARD_COUNT))
                    }
                    aria-label="Previous work"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className={s.stepBtn}
                    onClick={() =>
                      goToIndex(mod(selected + 1, CARD_COUNT))
                    }
                    aria-label="Next work"
                  >
                    →
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>

      <div className={s.cursorLight} aria-hidden="true" />

      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
