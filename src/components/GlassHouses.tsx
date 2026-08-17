"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type HouseDef = {
  label: string;
  title: string;
  accent: string;
  kind: "build" | "menu" | "law" | "fitness" | "estate";
};

const HOUSES: HouseDef[] = [
  { label: "WEBSITE DESIGN", title: "CONTRACTOR", accent: "#f6b73c", kind: "build" },
  { label: "WEBSITE DESIGN", title: "RESTAURANT", accent: "#ff503f", kind: "menu" },
  { label: "WEBSITE DESIGN", title: "LAW FIRM", accent: "#d4b06a", kind: "law" },
  { label: "WEBSITE DESIGN", title: "FITNESS", accent: "#aeff35", kind: "fitness" },
  { label: "WEBSITE DESIGN", title: "REAL ESTATE", accent: "#66a7ff", kind: "estate" },
];

const TAU = Math.PI * 2;
const SPRING_K = 90;
const SPRING_C = 9;

const RADIUS_VAR = [-0.32, 0.42, -0.08, 0.36, -0.22];
const HEIGHT_VAR = [0, 0.2, -0.14, 0.12, -0.24];
const SCALE_VAR = [1.08, 1.0, 1.14, 0.98, 1.18];

function radialTexture(THREE: typeof import("three"), stops: [number, string][]) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    stops.forEach(([offset, color]) => g.addColorStop(offset, color));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  }
  return new THREE.CanvasTexture(c);
}

function makeStars(
  THREE: typeof import("three"),
  count: number,
  minR: number,
  maxR: number,
  size: number,
  color: number,
  opacity: number,
) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const r = minR + Math.random() * (maxR - minR);
    const theta = Math.random() * TAU;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = -5 + Math.random() * 11;
    positions[i * 3 + 2] = Math.sin(theta) * r;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  return { geo, mat, points: new THREE.Points(geo, mat) };
}

type GlassHousesProps = { onSelectSite?: (index: number) => void };

export default function GlassHouses({ onSelectSite }: GlassHousesProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const bringFrontRef = useRef<(index: number) => void>(() => {});
  const onSelectRef = useRef(onSelectSite);
  useEffect(() => {
    onSelectRef.current = onSelectSite;
  }, [onSelectSite]);
  const [front, setFront] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let stopped = false;
    let dispose = () => {};

    void import("three").then((THREE) => {
      if (stopped || !mount) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#03040a");
      scene.fog = new THREE.Fog(0x03040a, 6, 17);

      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
      camera.position.set(0, 0.55, 9);

      const renderer = (() => {
        try {
          return new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true });
        } catch (err) {
          console.error("GlassHouses: WebGL unavailable", err);
          setStatus("error");
          return null;
        }
      })();
      if (!renderer) return;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, matchMedia("(pointer: coarse)").matches ? 1 : 1.5));
      mount.appendChild(renderer.domElement);

      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const geometries: THREE.BufferGeometry[] = [];
      const materials: THREE.Material[] = [];
      const textures: THREE.Texture[] = [];

      const glass = new THREE.MeshPhysicalMaterial({
        color: 0xdfe8f7,
        metalness: 0.05,
        roughness: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        specularIntensity: 1.2,
        envMapIntensity: 2.8,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      materials.push(glass);

      const glow = new THREE.MeshBasicMaterial({
        color: 0xffb36b,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      materials.push(glow);

      const windowMat = new THREE.MeshBasicMaterial({
        color: 0xffc98a,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      materials.push(windowMat);

      const cluster = new THREE.Group();
      cluster.rotation.x = -0.04;
      scene.add(cluster);

      const houseBases: { angle: number; group: THREE.Group; baseY: number }[] = [];

      HOUSES.forEach((def, index) => {
        const group = new THREE.Group();
        const accent = new THREE.Color(def.accent);
        group.scale.setScalar(SCALE_VAR[index]);

        const neon = new THREE.MeshBasicMaterial({
          color: accent,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        materials.push(neon);

        const add = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(x, y, z);
          group.add(mesh);
          geometries.push(geo);
        };

        add(new THREE.BoxGeometry(1.5, 1.05, 1.1), glass, 0, 0.75, 0);
        add(new THREE.BoxGeometry(1.28, 0.8, 0.9), glow, 0, 0.78, 0);
        add(new THREE.BoxGeometry(1.2, 0.07, 0.03), windowMat, 0, 0.5, 0.56);

        if (def.kind === "build") {
          const roof = new THREE.ConeGeometry(1.04, 0.72, 4);
          const roofMesh = new THREE.Mesh(roof, glass);
          roofMesh.position.y = 1.63;
          roofMesh.rotation.y = Math.PI / 4;
          group.add(roofMesh);
          geometries.push(roof);
          add(new THREE.BoxGeometry(0.18, 0.42, 0.18), glass, -0.32, 1.5, 0.14);
        } else if (def.kind === "menu") {
          add(new THREE.BoxGeometry(1.5, 0.06, 1.1), glass, 0, 1.28, 0);
          add(new THREE.BoxGeometry(1.62, 0.06, 0.5), glass, 0, 1.0, 0.79);
          const sign = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 24), neon);
          sign.rotation.x = Math.PI / 2;
          sign.position.set(0, 0.72, 0.62);
          group.add(sign);
          geometries.push(sign.geometry);
        } else if (def.kind === "law") {
          const pediment = new THREE.Mesh(new THREE.CylinderGeometry(0, 0.95, 0.42, 3, 1), glass);
          pediment.position.y = 1.5;
          pediment.rotation.y = Math.PI / 2;
          group.add(pediment);
          geometries.push(pediment.geometry);
          for (let i = 0; i < 4; i += 1) {
            add(new THREE.BoxGeometry(0.11, 0.8, 0.11), glass, -0.48 + i * 0.32, 0.58, 0.58);
          }
        } else if (def.kind === "fitness") {
          add(new THREE.BoxGeometry(1.5, 0.06, 1.1), glass, 0, 1.33, 0);
          add(new THREE.BoxGeometry(1.42, 0.09, 0.03), neon, 0, 1.32, 0.56);
          add(new THREE.BoxGeometry(0.05, 0.9, 0.03), neon, -0.4, 0.7, 0.56);
          add(new THREE.BoxGeometry(0.05, 0.9, 0.03), neon, 0.4, 0.7, 0.56);
        } else {
          add(new THREE.BoxGeometry(1.1, 0.06, 1.1), glass, 0, 1.66, 0);
          [-0.3, 0, 0.3].forEach((x) => {
            add(new THREE.BoxGeometry(0.04, 1.05, 0.03), neon, x, 1.1, 0.56);
          });
          for (let i = 0; i < 3; i += 1) {
            add(new THREE.BoxGeometry(1.0, 0.05, 0.03), neon, 0, 0.55 + i * 0.42, 0.56);
          }
        }

        const lamp = new THREE.PointLight(accent, 9, 7, 2);
        lamp.position.y = 1.6;
        group.add(lamp);

        const angle = (index / HOUSES.length) * TAU;
        const baseY = HEIGHT_VAR[index];
        group.position.set(Math.sin(angle) * (4 + RADIUS_VAR[index]), baseY, Math.cos(angle) * (4 + RADIUS_VAR[index]));
        group.rotation.y = angle;
        group.userData.index = index;
        cluster.add(group);
        houseBases.push({ angle, group, baseY });
      });

      const nebulas: { x: number; y: number; z: number; w: number; h: number; opacity: number; stops: [number, string][] }[] = [
        { x: -14, y: 3.5, z: -20, w: 34, h: 22, opacity: 0.16, stops: [[0, "rgba(120,60,220,0.6)"], [1, "rgba(120,60,220,0)"]] },
        { x: 13, y: -2, z: -22, w: 40, h: 26, opacity: 0.15, stops: [[0, "rgba(60,120,255,0.55)"], [1, "rgba(60,120,255,0)"]] },
        { x: 2, y: 6.5, z: -26, w: 46, h: 30, opacity: 0.12, stops: [[0, "rgba(30,180,200,0.4)"], [1, "rgba(30,180,200,0)"]] },
      ];
      nebulas.forEach((n) => {
        const tex = radialTexture(THREE, n.stops);
        textures.push(tex);
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: n.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        });
        materials.push(mat);
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(n.w, n.h), mat);
        plane.position.set(n.x, n.y, n.z);
        plane.rotation.y = Math.PI;
        scene.add(plane);
        geometries.push(plane.geometry);
      });

      const near = makeStars(THREE, 320, 6, 19, 0.05, 0xcdd6ff, 0.9);
      const far = makeStars(THREE, 520, 8, 26, 0.028, 0x9aa7e8, 0.5);
      scene.add(near.points);
      scene.add(far.points);
      geometries.push(near.geo, far.geo);
      materials.push(near.mat, far.mat);

      const glowTex = radialTexture(THREE, [
        [0, "rgba(255,255,255,0.5)"],
        [0.45, "rgba(255,255,255,0.13)"],
        [1, "rgba(255,255,255,0)"],
      ]);
      textures.push(glowTex);
      const discMat = new THREE.MeshBasicMaterial({
        map: glowTex,
        transparent: true,
        opacity: 0.34,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      materials.push(discMat);
      const disc = new THREE.Mesh(new THREE.CircleGeometry(3.9, 64), discMat);
      disc.rotation.x = -Math.PI / 2;
      disc.position.y = -1.95;
      scene.add(disc);
      geometries.push(disc.geometry);

      const ringMatA = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.11, side: THREE.DoubleSide });
      materials.push(ringMatA);
      const ringA = new THREE.Mesh(new THREE.RingGeometry(4.55, 4.66, 96), ringMatA);
      ringA.rotation.x = -Math.PI / 2;
      ringA.position.y = -1.9;
      scene.add(ringA);
      geometries.push(ringA.geometry);

      const ringMatB = new THREE.MeshBasicMaterial({ color: 0x7fa8ff, transparent: true, opacity: 0.05, side: THREE.DoubleSide });
      materials.push(ringMatB);
      const ringB = new THREE.Mesh(new THREE.RingGeometry(5.3, 5.38, 96), ringMatB);
      ringB.rotation.x = -Math.PI / 2;
      ringB.position.y = -1.85;
      scene.add(ringB);
      geometries.push(ringB.geometry);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x07080c, 0.75));
      const key = new THREE.DirectionalLight(0xffffff, 2.6);
      key.position.set(3, 5, 6);
      scene.add(key);
      const rimA = new THREE.PointLight(0x6ea8ff, 55, 24, 2);
      rimA.position.set(-6, 1, 3);
      scene.add(rimA);
      const rimB = new THREE.PointLight(0xff4fa0, 45, 24, 2);
      rimB.position.set(6, -2, 3);
      scene.add(rimB);

      let targetY = 0;
      let rot = 0;
      let vel = 0;
      let dragVel = 0;
      let flingMode = false;
      let dragging = false;
      let lastX = 0;
      let moved = 0;
      let camDist = 9;
      const parallax = { x: 0, y: 0 };
      let raf = 0;
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const raycaster = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const clock = new THREE.Clock();

      const resize = () => {
        const { clientWidth, clientHeight } = mount;
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / Math.max(clientHeight, 1);
        camera.updateProjectionMatrix();
      };

      const bringFront = (index: number) => {
        const targetAngle = -houseBases[index].angle;
        const current = ((rot % TAU) + TAU) % TAU;
        let delta = targetAngle - current;
        while (delta > Math.PI) delta -= TAU;
        while (delta < -Math.PI) delta += TAU;
        targetY = rot + delta;
        dragVel = 0;
        flingMode = false;
      };
      bringFrontRef.current = bringFront;

      const onDown = (event: PointerEvent) => {
        dragging = true;
        moved = 0;
        lastX = event.clientX;
        mount.setPointerCapture?.(event.pointerId);
        mount.classList.add("glass-houses__stage--dragging");
      };
      const onMove = (event: PointerEvent) => {
        const dx = event.clientX - lastX;
        lastX = event.clientX;
        moved += Math.abs(dx);
        if (dragging) {
          dragVel = Math.max(-0.25, Math.min(0.25, dx * 0.015));
          targetY += dragVel;
          rot = targetY;
        }
        const rect = mount.getBoundingClientRect();
        parallax.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        parallax.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      };
      const onUp = (event: PointerEvent) => {
        dragging = false;
        mount.releasePointerCapture?.(event.pointerId);
        mount.classList.remove("glass-houses__stage--dragging");
        if (moved < 8) {
          const rect = mount.getBoundingClientRect();
          ndc.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
          raycaster.setFromCamera(ndc, camera);
          const hits = raycaster.intersectObject(cluster, true);
          if (hits.length > 0) {
            let node: THREE.Object3D | null = hits[0].object;
            while (node && node.userData.index === undefined) node = node.parent;
            if (node && typeof node.userData.index === "number") {
              bringFront(node.userData.index);
              onSelectRef.current?.(node.userData.index);
            }
          }
        } else if (!reduced) {
          flingMode = Math.abs(dragVel) > 0.015;
          if (!flingMode) dragVel = 0;
        }
      };
      const onWheel = (event: WheelEvent) => {
        camDist = Math.min(12.5, Math.max(6.6, camDist + event.deltaY * 0.004));
      };

      let lastFront = -1;
      let elapsed = 0;
      const render = () => {
        const dt = Math.min(clock.getDelta(), 0.04);
        elapsed += dt;
        const t = elapsed;

        if (dragging) {
          rot = targetY;
        } else {
          if (!reduced) {
            targetY += 0.0003;
            if (flingMode) {
              targetY += dragVel;
              dragVel *= 0.975;
              if (Math.abs(dragVel) < 0.002) {
                flingMode = false;
                dragVel = 0;
              }
            }
          } else {
            dragVel = 0;
          }
          if (reduced) {
            rot = targetY;
          } else {
            const accel = (targetY - rot) * SPRING_K - vel * SPRING_C;
            vel += accel * dt;
            rot += vel * dt;
          }
        }
        cluster.rotation.y = rot;

        houseBases.forEach((h, i) => {
          h.group.position.y = h.baseY + (reduced ? 0 : Math.sin(t * 0.45 + i * 1.35) * 0.08);
        });

        if (!reduced) {
          camera.position.x += (parallax.x * 0.55 - camera.position.x) * 0.04;
          camera.position.y += (0.55 + parallax.y * 0.35 - camera.position.y) * 0.04;
        }
        camera.position.z += (camDist - camera.position.z) * 0.1;
        camera.lookAt(0, 0.1, 0);

        near.points.rotation.y = t * 0.006;
        far.points.rotation.y = -t * 0.004;
        near.mat.opacity = reduced ? 0.9 : 0.72 + 0.18 * Math.sin(t * 1.6);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(render);

        const rotNorm = ((rot % TAU) + TAU) % TAU;
        let best = 0;
        let bestD = Infinity;
        houseBases.forEach((h, i) => {
          const a = ((h.angle + rotNorm) % TAU + TAU) % TAU;
          const d = Math.min(a, TAU - a);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        if (best !== lastFront) {
          lastFront = best;
          setFront(best);
        }
      };

      resize();
      mount.addEventListener("pointerdown", onDown);
      mount.addEventListener("pointermove", onMove);
      mount.addEventListener("pointerup", onUp);
      mount.addEventListener("pointercancel", onUp);
      mount.addEventListener("wheel", onWheel, { passive: true });
      window.addEventListener("resize", resize);
      render();
      setStatus("ready");

      dispose = () => {
        cancelAnimationFrame(raf);
        mount.removeEventListener("pointerdown", onDown);
        mount.removeEventListener("pointermove", onMove);
        mount.removeEventListener("pointerup", onUp);
        mount.removeEventListener("pointercancel", onUp);
        mount.removeEventListener("wheel", onWheel);
        window.removeEventListener("resize", resize);
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        textures.forEach((tt) => tt.dispose());
        pmrem.dispose();
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
    <section className="glass-houses" aria-label="Model sites as glass houses">
      <div ref={mountRef} className="glass-houses__stage" />
      {status === "ready" && (
        <div className="glass-houses__hud">
          <p className="glass-houses__eyebrow">
            <span className="glass-houses__eyebrow-dash" style={{ background: HOUSES[front].accent }} />
            {HOUSES[front].label} · {String(front + 1).padStart(2, "0")}
          </p>
          <h3 className="glass-houses__title" style={{ color: HOUSES[front].accent }}>
            {HOUSES[front].title}
          </h3>
          <div className="glass-houses__names">
            {HOUSES.map((h, i) => (
              <button
                key={h.title}
                type="button"
                className={`glass-houses__name${i === front ? " glass-houses__name--active" : ""}`}
                style={{ "--accent": h.accent } as CSSProperties}
                onClick={() => bringFrontRef.current(i)}
              >
                <span className="glass-houses__name-dot" />
                {h.title}
              </button>
            ))}
          </div>
          <p className="glass-houses__instruction">DRAG TO TURN · FLICK TO SPIN · CLICK A HOUSE TO OPEN</p>
        </div>
      )}
      {status === "error" && (
        <p className="glass-houses__fallback">3D VIEW UNAVAILABLE ON THIS DEVICE — SCROLL FOR MODEL SITES</p>
      )}
    </section>
  );
}
