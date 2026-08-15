"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomepageRebuild.module.css";

const panels = [
  { label: "WEBSITE DESIGN", title: "CONTRACTOR", accent: "#f6b73c", layout: "build", image: "/reel/contractor.png" },
  { label: "WEBSITE DESIGN", title: "RESTAURANT", accent: "#ff503f", layout: "menu", image: "/reel/restaurant.png" },
  { label: "WEBSITE DESIGN", title: "LAW FIRM", accent: "#d4b06a", layout: "law", image: "/reel/law-firm.png" },
  { label: "WEBSITE DESIGN", title: "FITNESS", accent: "#aeff35", layout: "fitness", image: "/reel/fitness.png" },
  { label: "WEBSITE DESIGN", title: "REAL ESTATE", accent: "#66a7ff", layout: "estate", image: "/reel/real-estate.png" },
  { label: "BRAND IDENTITY", title: "LOGO DESIGN", accent: "#ff68b7", layout: "logo", image: "/reel/logo-design.png" },
  { label: "ARCHITECTURAL", title: "HOME RENDER", accent: "#f0d9b5", layout: "home", image: "/reel/home-render.png" },
  { label: "ARCHITECTURAL", title: "COMMERCIAL", accent: "#72e6ff", layout: "commercial", image: "/reel/commercial.png" },
  { label: "CAMPAIGN", title: "GRAPHIC DESIGN", accent: "#9d78ff", layout: "graphic", image: "/reel/graphic-design.png" },
  { label: "ONE-PERSON STUDIO", title: "DIRECT SUPPORT", accent: "#ffffff", layout: "support", image: "/reel/direct-support.png" },
] as const;

function panelTexture(
  THREE: typeof import("three"),
  panel: (typeof panels)[number],
  index: number,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 900;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const dark = index % 2 === 0;
  ctx.fillStyle = dark ? "#08090b" : "#f4f3ef";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = dark ? "rgba(255,255,255,.26)" : "rgba(5,7,10,.28)";
  ctx.fillStyle = dark ? "#fff" : "#08090b";
  ctx.lineWidth = 2;

  ctx.font = "700 18px Arial";
  ctx.letterSpacing = "4px";
  ctx.fillText("MLR / DESIGN IDEA", 42, 52);
  ctx.textAlign = "right";
  ctx.fillText(String(index + 1).padStart(2, "0"), 678, 52);
  ctx.textAlign = "left";
  ctx.beginPath();
  ctx.moveTo(42, 78);
  ctx.lineTo(678, 78);
  ctx.stroke();

  const accent = panel.accent;
  const ink = dark ? "#fff" : "#08090b";
  const faint = dark ? "rgba(255,255,255,.16)" : "rgba(8,9,11,.12)";
  ctx.fillStyle = faint;
  ctx.fillRect(42, 112, 636, 462);

  ctx.strokeStyle = accent;
  ctx.fillStyle = accent;
  ctx.lineWidth = 8;
  const cx = 360;
  const cy = 330;

  if (["build", "home", "estate"].includes(panel.layout)) {
    ctx.beginPath();
    ctx.moveTo(120, 430);
    ctx.lineTo(120, 290);
    ctx.lineTo(360, 160);
    ctx.lineTo(600, 290);
    ctx.lineTo(600, 430);
    ctx.lineTo(120, 430);
    ctx.stroke();
    ctx.strokeRect(310, 320, 100, 110);
    ctx.strokeRect(175, 310, 78, 66);
    ctx.strokeRect(468, 310, 78, 66);
  } else if (panel.layout === "menu") {
    ctx.beginPath();
    ctx.arc(cx, cy, 152, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 3;
    for (let i = 0; i < 7; i += 1) {
      ctx.beginPath();
      ctx.moveTo(235, 230 + i * 34);
      ctx.lineTo(485, 230 + i * 34);
      ctx.stroke();
    }
  } else if (panel.layout === "law") {
    ctx.beginPath();
    ctx.moveTo(125, 255);
    ctx.lineTo(360, 155);
    ctx.lineTo(595, 255);
    ctx.closePath();
    ctx.stroke();
    for (let x = 175; x <= 545; x += 92) ctx.strokeRect(x, 270, 46, 170);
    ctx.beginPath();
    ctx.moveTo(120, 455);
    ctx.lineTo(600, 455);
    ctx.stroke();
  } else if (panel.layout === "fitness") {
    ctx.strokeRect(145, 205, 430, 245);
    ctx.beginPath();
    ctx.moveTo(200, cy);
    ctx.lineTo(520, cy);
    ctx.stroke();
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(270, 270);
    ctx.lineTo(270, 390);
    ctx.moveTo(450, 270);
    ctx.lineTo(450, 390);
    ctx.stroke();
  } else if (panel.layout === "logo") {
    ctx.beginPath();
    ctx.arc(cx, cy, 154, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = "900 180px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("M", cx, cy + 12);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  } else if (panel.layout === "commercial") {
    ctx.strokeRect(130, 190, 455, 270);
    for (let x = 170; x < 570; x += 68) ctx.strokeRect(x, 240, 42, 82);
    ctx.beginPath();
    ctx.moveTo(110, 460);
    ctx.lineTo(610, 460);
    ctx.stroke();
  } else if (panel.layout === "graphic") {
    ctx.save();
    ctx.translate(cx, cy);
    for (let i = 0; i < 9; i += 1) {
      ctx.rotate(Math.PI / 4.5);
      ctx.strokeRect(-56, -185, 112, 370);
    }
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy - 28, 86, Math.PI, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(274, cy - 28);
    ctx.lineTo(274, cy + 60);
    ctx.moveTo(446, cy - 28);
    ctx.lineTo(446, cy + 60);
    ctx.stroke();
    ctx.strokeRect(244, cy + 20, 232, 88);
  }

  ctx.fillStyle = ink;
  ctx.font = "800 17px Arial";
  ctx.letterSpacing = "3px";
  ctx.fillText(panel.label, 42, 630);
  ctx.font = "950 76px Impact, Arial Black, Arial";
  ctx.letterSpacing = "-2px";
  const words = panel.title.split(" ");
  words.forEach((word, wordIndex) => ctx.fillText(word, 42, 720 + wordIndex * 74));
  ctx.strokeStyle = dark ? "rgba(255,255,255,.35)" : "rgba(8,9,11,.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(42, 858);
  ctx.lineTo(678, 858);
  ctx.stroke();
  ctx.font = "700 15px Arial";
  ctx.letterSpacing = "3px";
  ctx.fillText("BUILT TO BE YOURS", 42, 884);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  // Preserve the original card and reel geometry. Photography is cover-cropped
  // only inside the existing 636 x 462 artwork window.
  const artwork = new Image();
  artwork.onload = () => {
    const x = 42;
    const y = 112;
    const width = 636;
    const height = 462;
    const sourceRatio = artwork.width / artwork.height;
    const targetRatio = width / height;
    let sourceWidth = artwork.width;
    let sourceHeight = artwork.height;
    let sourceX = 0;
    let sourceY = 0;
    if (sourceRatio > targetRatio) {
      sourceWidth = artwork.height * targetRatio;
      sourceX = (artwork.width - sourceWidth) / 2;
    } else {
      sourceHeight = artwork.width / targetRatio;
      sourceY = (artwork.height - sourceHeight) / 2;
    }
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();
    ctx.drawImage(artwork, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
    const shade = ctx.createLinearGradient(x, y, x, y + height);
    shade.addColorStop(0, "rgba(0,0,0,.02)");
    shade.addColorStop(1, "rgba(0,0,0,.22)");
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
    texture.needsUpdate = true;
  };
  artwork.src = panel.image;
  return texture;
}

function CssDrumFallback() {
  const rotorRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ down: false, x: 0, time: 0 });
  const angle = useRef(0);
  const velocity = useRef(0.0024);
  useEffect(() => {
    let raf = 0; let previous = performance.now(); const idle = 0.0024;
    const draw = (now: number) => {
      const dt = Math.min(32, now - previous); previous = now;
      if (!dragRef.current.down) {
        if (Math.abs(velocity.current) > .009) velocity.current *= Math.pow(.955, dt / 16.67);
        else velocity.current += (idle - velocity.current) * Math.min(1, dt * .0025);
        angle.current += velocity.current * dt;
      }
      if (rotorRef.current) rotorRef.current.style.transform = "rotateY(" + angle.current + "deg)";
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw); return () => cancelAnimationFrame(raf);
  }, []);
  const down = (event: React.PointerEvent<HTMLDivElement>) => { dragRef.current = { down: true, x: event.clientX, time: performance.now() }; velocity.current = 0; event.currentTarget.setPointerCapture(event.pointerId); };
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.down) return; const now = performance.now(); const dx = event.clientX - dragRef.current.x; const dt = Math.max(8, now - dragRef.current.time);
    angle.current += dx * .16; velocity.current = Math.max(-.18, Math.min(.18, dx * .16 / dt)); dragRef.current.x = event.clientX; dragRef.current.time = now;
  };
  const up = (event: React.PointerEvent<HTMLDivElement>) => { dragRef.current.down = false; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); };
  return <div className={styles.cssFallback} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} role="group" aria-label="Interactive CSS creative services drum">
    <div className={styles.cssDrumShadow} aria-hidden="true" />
    <div className={styles.cssHoop + " " + styles.cssHoopTop} aria-hidden="true" />
    <div className={styles.cssHoop + " " + styles.cssHoopBottom} aria-hidden="true" />
    <div className={styles.cssCylinder} aria-hidden="true" />
    <div ref={rotorRef} className={styles.cssRotor}>
      {panels.map((panel,index)=><article className={styles.cssCard} key={panel.title} style={{"--panel-angle":String(index * 36)+"deg","--panel-accent":panel.accent} as React.CSSProperties}>
        <span className={styles.cssCardTop}><b>MLR / DESIGN IDEA</b><i>{String(index+1).padStart(2,"0")}</i></span>
        <img src={panel.image} alt="" draggable={false}/><small>{panel.label}</small><strong>{panel.title}</strong>
      </article>)}
    </div>
    <p className={styles.cssFallbackNote}>HARDWARE-SAFE DRUM</p>
  </div>;
}

export default function InteractiveReel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let stopped = false;
    let dispose = () => {};

    void import("three").then((THREE) => {
      if (stopped || !mount) return;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#f7f7f5");
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0.1, 9.4);

      const testCanvas = document.createElement("canvas");
      const context = testCanvas.getContext("webgl2", { antialias: true, powerPreference: "high-performance" }) || testCanvas.getContext("webgl", { antialias: true, powerPreference: "high-performance" });
      if (!context) return;
      let renderer: import("three").WebGLRenderer;
      try { renderer = new THREE.WebGLRenderer({ canvas: testCanvas, context, antialias: true, powerPreference: "high-performance" }); } catch { return; }
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, matchMedia("(pointer: coarse)").matches ? 1 : 1.5));
      mount.appendChild(renderer.domElement);
      setWebglReady(true);

      const reel = new THREE.Group();
      reel.rotation.x = -0.05;
      scene.add(reel);

      const radius = 3.42;
      const panelGeometry = new THREE.PlaneGeometry(2.25, 3.05, 1, 1);
      const textures: import("three").Texture[] = [];
      panels.forEach((panel, index) => {
        const texture = panelTexture(THREE, panel, index);
        if (!texture) return;
        textures.push(texture);
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.58,
          metalness: 0.08,
          side: THREE.FrontSide,
        });
        const mesh = new THREE.Mesh(panelGeometry, material);
        const angle = (index / panels.length) * Math.PI * 2;
        mesh.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
        mesh.rotation.y = angle;
        reel.add(mesh);
      });

      const drumMaterial = new THREE.MeshStandardMaterial({ color: 0x060709, metalness: 0.78, roughness: 0.25 });
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(3.05, 3.05, 3.55, 64, 1, false), drumMaterial);
      reel.add(drum);

      const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xd8d9db, metalness: 1, roughness: 0.13 });
      const ringGeometry = new THREE.TorusGeometry(3.38, 0.11, 16, 96);
      [-1.72, 1.72].forEach((y) => {
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = y;
        reel.add(ring);
      });

      scene.add(new THREE.HemisphereLight(0xffffff, 0x20232a, 2.4));
      const key = new THREE.DirectionalLight(0xffffff, 3.8);
      key.position.set(4, 6, 7);
      scene.add(key);
      const edge = new THREE.PointLight(0x5c8dff, 18, 20);
      edge.position.set(-5, -2, 5);
      scene.add(edge);

      let targetRotation = 0;
      let velocity = 0.014;
      let dragging = false;
      let lastX = 0;
      let raf = 0;
      const coarse = matchMedia("(pointer: coarse)").matches;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

      const resize = () => {
        const { clientWidth, clientHeight } = mount;
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / Math.max(clientHeight, 1);
        camera.position.z = clientWidth < 720 ? 11.6 : 9.4;
        camera.updateProjectionMatrix();
      };

      const onDown = (event: PointerEvent) => {
        dragging = true;
        lastX = event.clientX;
        mount.setPointerCapture?.(event.pointerId);
        mount.classList.add(styles.isDragging);
      };
      const onMove = (event: PointerEvent) => {
        if (!dragging) return;
        const delta = event.clientX - lastX;
        lastX = event.clientX;
        velocity = delta * 0.0048;
        targetRotation += velocity;
      };
      const onUp = (event: PointerEvent) => {
        dragging = false;
        mount.releasePointerCapture?.(event.pointerId);
        mount.classList.remove(styles.isDragging);
      };
      const onWheel = (event: WheelEvent) => {
        velocity += (event.deltaY + event.deltaX) * 0.00012;
      };

      const render = () => {
        if (!dragging && !reduced) {
          if (!coarse) velocity += 0.00016;
          velocity *= 0.965;
          targetRotation += velocity;
        }
        reel.rotation.y += (targetRotation - reel.rotation.y) * 0.13;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };

      resize();
      mount.addEventListener("pointerdown", onDown);
      mount.addEventListener("pointermove", onMove);
      mount.addEventListener("pointerup", onUp);
      mount.addEventListener("pointercancel", onUp);
      mount.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("resize", resize);
      render();

      dispose = () => {
        cancelAnimationFrame(raf);
        mount.removeEventListener("pointerdown", onDown);
        mount.removeEventListener("pointermove", onMove);
        mount.removeEventListener("pointerup", onUp);
        mount.removeEventListener("pointercancel", onUp);
        mount.removeEventListener("wheel", onWheel);
        window.removeEventListener("resize", resize);
        textures.forEach((texture) => texture.dispose());
        panelGeometry.dispose();
        ringGeometry.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      stopped = true;
      dispose();
    };
  }, []);

  return (
    <section className={styles.reelStage} aria-label="Interactive creative services reel">
      <div className={styles.reelTopline}>
        <b>MLR / CREATIVE STUDIOS</b>
        <span>WEBSITES · BRANDING · RENDERINGS</span>
      </div>
      <CssDrumFallback />
      <div ref={mountRef} className={styles.webglReel + (webglReady ? " " + styles.webglReady : "")} />
      <div className={styles.reelInstruction}>
        <span className={styles.desktopInstruction}>SCROLL OR DRAG TO SPIN</span>
        <span className={styles.mobileInstruction}>← DRAG TO SPIN →</span>
      </div>
    </section>
  );
}