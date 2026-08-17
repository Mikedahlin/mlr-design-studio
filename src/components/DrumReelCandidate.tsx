"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ServiceArtwork, services } from "./ServiceReel";
import styles from "./DrumReelCandidate.module.css";

export default function DrumReelCandidate({ embedded = false }: { embedded?: boolean }) {
  const rotorRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const velocity = useRef(0.0022);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    let previous = performance.now();
    let lastActive = -1;
    const idleSpeed = 0.0022;
    const tick = (now: number) => {
      const dt = Math.min(32, now - previous);
      previous = now;
      if (!dragging.current) {
        const speed = velocity.current;
        if (Math.abs(speed) > 0.012) velocity.current *= Math.pow(0.94, dt / 16.67);
        else velocity.current += (idleSpeed - speed) * Math.min(1, dt * 0.002);
        angle.current += velocity.current * dt;
      }
      if (rotorRef.current) {
        rotorRef.current.style.transform = `rotateY(${angle.current}deg)`;
        const nearest = ((Math.round(-angle.current / (360 / services.length)) % services.length) + services.length) % services.length;
        if (nearest !== lastActive) { lastActive = nearest; setActive(nearest); }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const rotateBy = (degrees: number) => {
    angle.current += degrees;
    velocity.current = Math.sign(degrees) * 0.012;
  };
  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true; lastX.current = event.clientX; lastTime.current = performance.now(); velocity.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.classList.add(styles.dragging);
  };
  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const now = performance.now(); const dx = event.clientX - lastX.current; const dt = Math.max(8, now - lastTime.current);
    angle.current += dx * 0.16; velocity.current = Math.max(-0.22, Math.min(0.22, (dx * 0.16) / dt));
    lastX.current = event.clientX; lastTime.current = now;
  };
  const pointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false; event.currentTarget.classList.remove(styles.dragging);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className={`${styles.page} ${embedded ? styles.embedded : ""}`} aria-labelledby="drum-title">
      <div className={styles.heading}><span>MLR / CREATIVE SERVICES</span><strong id="drum-title">Turn the work over.</strong></div>
      <div className={styles.stage} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") rotateBy(72); if (e.key === "ArrowRight") rotateBy(-72); }}
        role="group" tabIndex={0} aria-label="Interactive 3D services drum. Drag, flick, or use arrow keys.">
        <div className={styles.glow} aria-hidden="true" /><div className={styles.hoopTop} aria-hidden="true" /><div className={styles.hoopBottom} aria-hidden="true" />
        <div ref={rotorRef} className={styles.rotor}>
          {services.map((service, index) => <article className={`${styles.card} ${active === index ? styles.active : ""}`}
            style={{ "--card-angle": `${index * 72}deg` } as React.CSSProperties} key={service.kind} aria-hidden={active !== index}>
            <span>0{index + 1}</span><ServiceArtwork kind={service.kind} /><strong>{service.name}</strong>
          </article>)}
        </div>
      </div>
      <div className={styles.controls}><button type="button" onClick={() => rotateBy(72)} aria-label="Previous service">←</button><p>DRAG / FLICK / ARROW KEYS</p><button type="button" onClick={() => rotateBy(-72)} aria-label="Next service">→</button></div>
      <Link href="/services" className={styles.link}>Explore all services <span>↗</span></Link>
    </section>
  );
}
