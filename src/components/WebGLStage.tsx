"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { WHEEL_ARTWORKS } from "./wheelData";

type WebGLStageProps = {
  getWheelPosition: () => number;
  getWheelVelocity: () => number;
  activeIndex: number;
  inspected: boolean;
  contactOpen: boolean;
};

const BG_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

const BG_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uWheelAngle;
  uniform float uWheelSpeed;
  uniform vec3 uActiveColor;
  uniform vec3 uSecondaryColor;
  uniform float uInspect;
  uniform vec4 uTrail[8];

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p = rot * p * 2.02 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
    vec2 uv = (vUv - 0.5) * aspect;

    // Accumulate mouse-fluid ripple field from trail points
    vec2 fluidOffset = vec2(0.0);
    float causticGlow = 0.0;
    for (int i = 0; i < 8; i++) {
      vec4 tp = uTrail[i];
      if (tp.z > 0.001) {
        vec2 tPos = (tp.xy - 0.5) * aspect;
        vec2 diff = uv - tPos;
        float dist = length(diff);
        float wave = sin(dist * 26.0 - uTime * 5.5 - float(i) * 0.6);
        float mask = exp(-dist * 7.5) * tp.z;
        fluidOffset += normalize(diff + 0.0001) * wave * mask * 0.025;
        causticGlow += mask * (0.55 + 0.45 * wave);
      }
    }

    vec2 warpedUv = uv + fluidOffset;
    float r = length(warpedUv);

    // Deep obsidian base
    vec3 col = vec3(0.004, 0.008, 0.014);

    // Volumetric atmospheric FBM clouds driven by wheel rotation
    vec2 flowUv = warpedUv * 1.45 + vec2(uWheelAngle * 0.14, -uTime * 0.035);
    float n1 = fbm(flowUv);
    float n2 = fbm(flowUv * 1.8 - vec2(n1 * 0.65, uTime * 0.025));
    float nebula = smoothstep(0.22, 0.86, n1 * 0.55 + n2 * 0.45);

    // Controlled emerald, icy-blue, and silver highlights
    vec3 emerald = vec3(0.063, 0.725, 0.506);
    vec3 icyBlue = vec3(0.490, 0.827, 0.988);
    vec3 silver  = vec3(0.820, 0.865, 0.920);

    vec3 highlightA = mix(emerald, uActiveColor, 0.55);
    vec3 highlightB = mix(icyBlue, uSecondaryColor, 0.5);

    // Upper-left & center-depth studio light shafts
    float centerGlow = exp(-r * (2.1 - uInspect * 0.35));
    float topWash = exp(-length(warpedUv - vec2(-0.32 * aspect.x, 0.36)) * 2.4);
    float bottomRim = exp(-length(warpedUv - vec2(0.25 * aspect.x, -0.38)) * 2.6);

    col += highlightA * nebula * centerGlow * 0.14;
    col += highlightB * topWash * (0.075 + n2 * 0.05);
    col += silver * bottomRim * 0.045;

    // Fluid caustic specular rings around pointer trail
    col += mix(highlightB, silver, 0.45) * causticGlow * 0.11;

    // Subtle kinetic energy boost when wheel spins fast
    float speedGlow = clamp(abs(uWheelSpeed) * 0.45, 0.0, 0.22);
    col += mix(emerald, icyBlue, 0.5) * speedGlow * exp(-r * 1.8) * n2;

    // Fine optical film grain to prevent dark-gradient banding
    float grain = (hash(vUv * uResolution + fract(uTime * 60.0)) - 0.5) * 0.014;
    col += grain;

    // Deep vignette at screen perimeter
    col *= smoothstep(1.45, 0.25, r);

    gl_FragColor = vec4(max(col, 0.0), 1.0);
  }
`;

const SPINE_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uWheelAngle;
  uniform float uWheelSpeed;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Subtle harmonic breathing along the sculptural column
    float wave = sin(uTime * 1.4 + pos.y * 2.4 - uWheelAngle * 1.5);
    pos.xz *= 1.0 + wave * 0.04 + clamp(abs(uWheelSpeed) * 0.03, 0.0, 0.12);

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewDir = normalize(-mvPosition.xyz);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const SPINE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewDir;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uWheelAngle;
  uniform vec3 uActiveColor;
  uniform vec3 uSecondaryColor;

  vec3 thinFilmSpectrum(float t) {
    vec3 emerald = vec3(0.063, 0.725, 0.506);
    vec3 icyBlue = vec3(0.490, 0.827, 0.988);
    vec3 silver  = vec3(0.880, 0.920, 0.960);
    vec3 obsidian = vec3(0.03, 0.05, 0.08);

    float p = fract(t);
    if (p < 0.33) {
      return mix(obsidian, emerald, p / 0.33);
    } else if (p < 0.66) {
      return mix(emerald, icyBlue, (p - 0.33) / 0.33);
    } else {
      return mix(icyBlue, silver, (p - 0.66) / 0.34);
    }
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);

    float ndotv = max(dot(N, V), 0.0);
    float fresnel = pow(1.0 - ndotv, 2.6);

    // Studio key + rim light vectors
    vec3 L1 = normalize(vec3(-0.6, 0.8, 0.7));
    vec3 L2 = normalize(vec3(0.7, -0.4, 0.6));
    vec3 H1 = normalize(L1 + V);
    vec3 H2 = normalize(L2 + V);

    float spec1 = pow(max(dot(N, H1), 0.0), 48.0);
    float spec2 = pow(max(dot(N, H2), 0.0), 28.0);

    // Thin-film interference phase across height and normal
    float phase = fresnel * 1.35 + vWorldPos.y * 0.28 - uWheelAngle * 0.22 + sin(uTime * 0.7 + vWorldPos.x * 2.0) * 0.12;
    vec3 iridescence = thinFilmSpectrum(phase);

    vec3 baseMetal = vec3(0.02, 0.03, 0.045);
    vec3 color = mix(baseMetal, iridescence, fresnel * 0.78);
    color += mix(uActiveColor, vec3(0.92, 0.96, 1.0), 0.6) * spec1 * 0.95;
    color += uSecondaryColor * spec2 * 0.45;

    // Vertical distance attenuation so top and bottom melt into the black void
    float verticalMask = smoothstep(3.8, 1.2, abs(vWorldPos.y));
    color *= verticalMask;

    gl_FragColor = vec4(color, 0.94 * verticalMask);
  }
`;

const PARTICLE_VERTEX_SHADER = /* glsl */ `
  attribute float aPhase;
  attribute float aScale;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vAlpha;

  uniform float uTime;
  uniform float uWheelAngle;
  uniform float uWheelSpeed;
  uniform float uPixelRatio;

  void main() {
    vColor = aColor;
    vec3 pos = position;

    // Orbital curl drift around the central spine
    float angle = uWheelAngle * (0.35 + aScale * 0.25) + uTime * (0.06 + aPhase * 0.04);
    float c = cos(angle);
    float s = sin(angle);
    mat2 rot = mat2(c, -s, s, c);
    pos.xz = rot * pos.xz;

    pos.y += sin(uTime * 0.65 + aPhase * 6.2831) * 0.28;
    float radialDist = length(pos.xz);
    pos.xz *= 1.0 + sin(uTime * 0.9 + aPhase * 12.0) * 0.04;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float depthAtten = clamp(14.0 / max(-mvPosition.z, 1.5), 0.5, 4.5);
    float speedBoost = 1.0 + clamp(abs(uWheelSpeed) * 0.25, 0.0, 0.6);
    gl_PointSize = (1.8 + aScale * 3.4) * depthAtten * uPixelRatio * speedBoost;

    float pulse = 0.55 + 0.45 * sin(uTime * 1.8 + aPhase * 18.0);
    float edgeFade = smoothstep(8.5, 1.8, radialDist) * smoothstep(4.2, 0.8, abs(pos.y));
    vAlpha = pulse * edgeFade * 0.78;
  }
`;

const PARTICLE_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r2 = dot(cxy, cxy);
    if (r2 > 1.0) discard;

    float core = exp(-r2 * 3.2);
    gl_FragColor = vec4(vColor * (1.0 + core * 0.6), vAlpha * (1.0 - r2));
  }
`;

const FLOOR_VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const FLOOR_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vWorldPos;

  uniform float uTime;
  uniform float uWheelAngle;
  uniform vec3 uActiveColor;
  uniform vec3 uSecondaryColor;

  void main() {
    vec2 p = vWorldPos.xz;
    float r = length(p);
    if (r > 8.5) discard;

    float angle = atan(p.y, p.x) + uWheelAngle;
    float concentric = sin(r * 5.5 - uTime * 1.2) * 0.5 + 0.5;
    float spokes = pow(abs(cos(angle * 4.0)), 14.0);
    float caustic = sin(p.x * 3.2 + uTime * 0.8) * cos(p.y * 3.2 - uTime * 0.6) * 0.5 + 0.5;

    vec3 emerald = vec3(0.063, 0.725, 0.506);
    vec3 icyBlue = vec3(0.490, 0.827, 0.988);

    vec3 col = mix(emerald, uActiveColor, 0.6) * exp(-r * 0.55) * (0.14 + caustic * 0.12);
    col += mix(icyBlue, uSecondaryColor, 0.5) * spokes * exp(-r * 0.45) * 0.16;
    col += vec3(0.75, 0.85, 0.95) * smoothstep(0.96, 1.0, concentric) * exp(-r * 0.5) * 0.08;

    float alpha = smoothstep(8.2, 0.8, r) * 0.65;
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function WebGLStage({
  getWheelPosition,
  getWheelVelocity,
  activeIndex,
  inspected,
  contactOpen,
}: WebGLStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    activeIndex,
    inspected,
    contactOpen,
  });

  useEffect(() => {
    stateRef.current = { activeIndex, inspected, contactOpen };
  }, [activeIndex, inspected, contactOpen]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl2", {
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }) ||
      testCanvas.getContext("webgl", {
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });

    if (!gl) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: testCanvas,
        context: gl as WebGLRenderingContext,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    const isMobile = window.innerWidth <= 768 || matchMedia("(pointer: coarse)").matches;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);

    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.autoClear = false;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    // Start slightly farther out for the cinematic entrance glide
    camera.position.set(0, 1.45, isMobile ? 13.2 : 11.8);

    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const trailVectors = Array.from({ length: 8 }, () => new THREE.Vector4(0.5, 0.5, 0, 0));
    const currentActiveColor = new THREE.Color(WHEEL_ARTWORKS[0].accent);
    const currentSecondaryColor = new THREE.Color(WHEEL_ARTWORKS[0].secondaryAccent);
    const targetActiveColor = new THREE.Color(WHEEL_ARTWORKS[0].accent);
    const targetSecondaryColor = new THREE.Color(WHEEL_ARTWORKS[0].secondaryAccent);

    const bgUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uWheelAngle: { value: 0 },
      uWheelSpeed: { value: 0 },
      uActiveColor: { value: currentActiveColor },
      uSecondaryColor: { value: currentSecondaryColor },
      uInspect: { value: 0 },
      uTrail: { value: trailVectors },
    };

    const bgGeo = new THREE.PlaneGeometry(2, 2);
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERTEX_SHADER,
      fragmentShader: BG_FRAGMENT_SHADER,
      uniforms: bgUniforms,
      depthWrite: false,
      depthTest: false,
    });
    bgScene.add(new THREE.Mesh(bgGeo, bgMat));

    const disposables: { dispose: () => void }[] = [bgGeo, bgMat];

    // Central Iridescent Sculptural Axis (inspired by Active Theory WorkItems spine)
    const spineGroup = new THREE.Group();
    scene.add(spineGroup);

    const spineUniforms = {
      uTime: { value: 0 },
      uWheelAngle: { value: 0 },
      uWheelSpeed: { value: 0 },
      uActiveColor: { value: currentActiveColor },
      uSecondaryColor: { value: currentSecondaryColor },
    };

    const spineMaterial = new THREE.ShaderMaterial({
      vertexShader: SPINE_VERTEX_SHADER,
      fragmentShader: SPINE_FRAGMENT_SHADER,
      uniforms: spineUniforms,
      transparent: true,
      side: THREE.DoubleSide,
    });
    disposables.push(spineMaterial);

    // Construct 24 articulated sculptural vertebrae along the central vertical axis
    const vertebraCount = isMobile ? 16 : 24;
    const ribGeo = new THREE.TorusGeometry(0.56, 0.075, 16, 48);
    ribGeo.scale(1.35, 0.42, 0.92);
    const coreFinGeo = new THREE.OctahedronGeometry(0.32, 2);
    coreFinGeo.scale(1.65, 0.32, 0.65);
    disposables.push(ribGeo, coreFinGeo);

    for (let i = 0; i < vertebraCount; i++) {
      const t = i / (vertebraCount - 1) - 0.5;
      const y = t * 5.8;
      const envelope = 1.0 - Math.pow(Math.abs(t * 1.65), 2.2) * 0.48;

      const node = new THREE.Group();
      node.position.y = y;
      node.rotation.y = i * 0.34;
      node.rotation.z = Math.sin(i * 0.5) * 0.14;
      node.scale.setScalar(Math.max(0.35, envelope));

      const ribMesh = new THREE.Mesh(ribGeo, spineMaterial);
      ribMesh.rotation.x = Math.PI * 0.5 + Math.sin(i * 0.4) * 0.18;
      node.add(ribMesh);

      const finMesh = new THREE.Mesh(coreFinGeo, spineMaterial);
      finMesh.rotation.y = i * 0.7;
      node.add(finMesh);

      spineGroup.add(node);
    }

    // Precision Gyroscope Rings & Orbital Track
    const gyroGroup = new THREE.Group();
    scene.add(gyroGroup);

    const ringMatA = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ringMatB = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ringMatC = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposables.push(ringMatA, ringMatB, ringMatC);

    const gyroGeo1 = new THREE.TorusGeometry(2.15, 0.009, 12, 128);
    const gyroGeo2 = new THREE.TorusGeometry(3.25, 0.008, 12, 160);
    const gyroGeo3 = new THREE.TorusGeometry(4.35, 0.007, 12, 180);
    disposables.push(gyroGeo1, gyroGeo2, gyroGeo3);

    const gyro1 = new THREE.Mesh(gyroGeo1, ringMatA);
    gyro1.rotation.set(Math.PI * 0.42, 0.2, 0.15);
    const gyro2 = new THREE.Mesh(gyroGeo2, ringMatB);
    gyro2.rotation.set(Math.PI * 0.5, 0, 0);
    gyro2.position.y = -0.15;
    const gyro3 = new THREE.Mesh(gyroGeo3, ringMatC);
    gyro3.rotation.set(Math.PI * 0.48, -0.12, 0.08);
    gyro3.position.y = -0.35;

    gyroGroup.add(gyro1, gyro2, gyro3);

    // 3D Orbital Wheel Tether Filaments & Carrier Beacons
    const wheelNodesGroup = new THREE.Group();
    scene.add(wheelNodesGroup);

    const count = WHEEL_ARTWORKS.length;
    const orbitRadius = isMobile ? 2.55 : 3.55;
    const beaconGeo = new THREE.OctahedronGeometry(0.065, 1);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(beaconGeo, beaconMat);

    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const x = Math.sin(a) * orbitRadius;
      const z = Math.cos(a) * orbitRadius;

      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(x, -0.15, z);
      wheelNodesGroup.add(beacon);

      const linePoints = [
        new THREE.Vector3(0, -0.15, 0),
        new THREE.Vector3(x * 0.5, -0.32, z * 0.5),
        new THREE.Vector3(x, -0.15, z),
      ];
      const curve = new THREE.CatmullRomCurve3(linePoints);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(WHEEL_ARTWORKS[i].accent),
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      });
      disposables.push(lineGeo, lineMat);
      wheelNodesGroup.add(new THREE.Line(lineGeo, lineMat));
    }

    // Obsidian Reflective Caustic Floor
    const floorUniforms = {
      uTime: { value: 0 },
      uWheelAngle: { value: 0 },
      uActiveColor: { value: currentActiveColor },
      uSecondaryColor: { value: currentSecondaryColor },
    };
    const floorGeo = new THREE.PlaneGeometry(18, 18, 1, 1);
    floorGeo.rotateX(-Math.PI / 2);
    const floorMat = new THREE.ShaderMaterial({
      vertexShader: FLOOR_VERTEX_SHADER,
      fragmentShader: FLOOR_FRAGMENT_SHADER,
      uniforms: floorUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -2.35;
    scene.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // Volumetric Curl-Noise Particle Field
    const particleCount = isMobile ? 650 : 1500;
    const positions = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color("#10b981"), // Emerald
      new THREE.Color("#38bdf8"), // Icy Blue
      new THREE.Color("#7dd3fc"), // Pale Ice
      new THREE.Color("#e2e8f0"), // Liquid Silver
    ];

    for (let i = 0; i < particleCount; i++) {
      // Concentrate particles both around the central spine and along the orbital wheel
      const inCore = i < particleCount * 0.42;
      const radius = inCore
        ? 0.35 + Math.pow(Math.random(), 1.5) * 1.65
        : 2.0 + Math.random() * 5.2;
      const theta = Math.random() * Math.PI * 2;
      const ySpread = inCore ? (Math.random() - 0.5) * 6.2 : (Math.random() - 0.5) * 3.8;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = ySpread;
      positions[i * 3 + 2] = Math.sin(theta) * radius;

      phases[i] = Math.random();
      scales[i] = 0.4 + Math.random() * 1.1;

      const c = palette[i % palette.length];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    particleGeo.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    particleGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const particleUniforms = {
      uTime: { value: 0 },
      uWheelAngle: { value: 0 },
      uWheelSpeed: { value: 0 },
      uPixelRatio: { value: dpr },
    };

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX_SHADER,
      fragmentShader: PARTICLE_FRAGMENT_SHADER,
      uniforms: particleUniforms,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);
    disposables.push(particleGeo, particleMat);

    // Pointer tracking for fluid trail & camera parallax
    const pointerTarget = { x: 0.5, y: 0.5 };
    const pointerCurrent = { x: 0.5, y: 0.5 };
    let lastTrailSample = 0;
    let trailHead = 0;

    const onPointerMove = (e: PointerEvent) => {
      const nx = e.clientX / Math.max(window.innerWidth, 1);
      const ny = 1.0 - e.clientY / Math.max(window.innerHeight, 1);
      const dx = nx - pointerTarget.x;
      const dy = ny - pointerTarget.y;
      const speed = Math.min(1.0, Math.hypot(dx, dy) * 18.0);

      pointerTarget.x = nx;
      pointerTarget.y = ny;

      const now = performance.now();
      if (now - lastTrailSample > 28 && speed > 0.02) {
        lastTrailSample = now;
        trailVectors[trailHead].set(nx, ny, Math.min(1.0, 0.35 + speed), 0);
        trailHead = (trailHead + 1) % trailVectors.length;
      }
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, true);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      bgUniforms.uResolution.value.set(w, h);
    };

    onResize();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);

    const startTime = performance.now();
    let prevTime = startTime;
    let smoothWheelPos = getWheelPosition();
    let inspectBlend = 0;
    let rafId = 0;

    const render = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - prevTime) / 1000));
      prevTime = now;
      const elapsed = (now - startTime) / 1000;

      const rawPos = getWheelPosition();
      const rawVel = getWheelVelocity();
      smoothWheelPos += (rawPos - smoothWheelPos) * Math.min(1, dt * 16);
      const wheelRadians = (smoothWheelPos / count) * Math.PI * 2;

      const { activeIndex: actIdx, inspected: isInspected, contactOpen: isContact } =
        stateRef.current;
      const artwork = WHEEL_ARTWORKS[actIdx] ?? WHEEL_ARTWORKS[0];
      targetActiveColor.set(artwork.accent);
      targetSecondaryColor.set(artwork.secondaryAccent);

      currentActiveColor.lerp(targetActiveColor, dt * 4.5);
      currentSecondaryColor.lerp(targetSecondaryColor, dt * 4.5);

      const targetInspect = isInspected || isContact ? 1.0 : 0.0;
      inspectBlend += (targetInspect - inspectBlend) * Math.min(1, dt * 5.0);

      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * Math.min(1, dt * 7.5);
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * Math.min(1, dt * 7.5);

      // Decay fluid trail points
      for (let i = 0; i < trailVectors.length; i++) {
        trailVectors[i].z *= Math.pow(0.92, dt * 60);
      }

      const timeVal = reducedMotion ? 0 : elapsed;

      bgUniforms.uTime.value = timeVal;
      bgUniforms.uPointer.value.set(pointerCurrent.x, pointerCurrent.y);
      bgUniforms.uWheelAngle.value = wheelRadians;
      bgUniforms.uWheelSpeed.value = rawVel;
      bgUniforms.uInspect.value = inspectBlend;

      spineUniforms.uTime.value = timeVal;
      spineUniforms.uWheelAngle.value = wheelRadians;
      spineUniforms.uWheelSpeed.value = rawVel;

      floorUniforms.uTime.value = timeVal;
      floorUniforms.uWheelAngle.value = wheelRadians;

      particleUniforms.uTime.value = timeVal;
      particleUniforms.uWheelAngle.value = wheelRadians;
      particleUniforms.uWheelSpeed.value = rawVel;

      // Rotate central spine and gyroscopes in coupled harmonic motion
      spineGroup.rotation.y = -wheelRadians * 0.85 + timeVal * 0.08;
      spineGroup.position.y = Math.sin(timeVal * 0.7) * 0.08;

      gyro1.rotation.z = wheelRadians * 1.4 + timeVal * 0.18;
      gyro2.rotation.z = -wheelRadians * 1.0 - timeVal * 0.05;
      gyro3.rotation.z = wheelRadians * 0.65 + timeVal * 0.09;

      wheelNodesGroup.rotation.y = -wheelRadians;

      // Cinematic entrance camera glide (first 1.6s) + pointer parallax + inspection dolly
      const entranceT = reducedMotion ? 1 : Math.min(1, elapsed / 1.65);
      const entranceEase = 1 - Math.pow(1 - entranceT, 3);

      const baseZ = isMobile ? 9.4 : 8.15;
      const startZ = isMobile ? 13.0 : 11.6;
      const targetZ = startZ + (baseZ - startZ) * entranceEase - inspectBlend * 1.35;

      const px = (pointerCurrent.x - 0.5) * (isMobile ? 0.28 : 0.68) * (1 - inspectBlend * 0.6);
      const py =
        0.22 +
        (1 - entranceEase) * 1.15 +
        (pointerCurrent.y - 0.5) * (isMobile ? 0.18 : 0.42) * (1 - inspectBlend * 0.6);

      camera.position.x += (px - camera.position.x) * Math.min(1, dt * 5.5);
      camera.position.y += (py - camera.position.y) * Math.min(1, dt * 5.5);
      camera.position.z += (targetZ - camera.position.z) * Math.min(1, dt * 6.0);
      camera.lookAt(0, -0.06, 0);

      renderer.clear();
      renderer.render(bgScene, bgCamera);
      renderer.clearDepth();
      renderer.render(scene, camera);

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [getWheelPosition, getWheelVelocity]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}
