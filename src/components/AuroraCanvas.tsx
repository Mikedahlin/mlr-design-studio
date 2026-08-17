"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(9.2, 5.7);
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 p = uv - 0.5;
  p.x *= resolution.x / resolution.y;

  float t = time * 0.085;
  float flow = fbm(p * 2.1 + vec2(t, -t * 0.7));
  float flow2 = fbm(p * 3.4 + vec2(-t * 1.3, t * 0.4) + flow);

  float ribbonA = exp(-18.0 * abs(p.y + 0.18 * sin(p.x * 2.8 + t * 5.0) - (flow - 0.5) * 0.52));
  float ribbonB = exp(-22.0 * abs(p.y - 0.18 + 0.15 * sin(p.x * 3.6 - t * 4.0) + (flow2 - 0.5) * 0.42));
  float ribbonC = exp(-16.0 * abs(p.y + 0.43 - 0.11 * sin(p.x * 4.2 + t * 3.0) - (flow - 0.5) * 0.34));

  vec3 cyan = vec3(0.0, 0.88, 1.0);
  vec3 violet = vec3(0.39, 0.08, 1.0);
  vec3 pink = vec3(1.0, 0.03, 0.37);
  vec3 amber = vec3(1.0, 0.31, 0.02);

  vec3 color = mix(cyan, violet, smoothstep(-0.7, 0.7, p.x)) * ribbonA;
  color += mix(violet, pink, uv.x) * ribbonB * 0.9;
  color += mix(pink, amber, uv.x) * ribbonC * 0.58;
  color *= 0.55 + flow2 * 0.9;

  vec2 m = mouse / resolution - 0.5;
  m.x *= resolution.x / resolution.y;
  float pointerGlow = exp(-5.5 * distance(p, m));
  color += vec3(0.25, 0.55, 1.0) * pointerGlow * 0.16;

  float vignette = smoothstep(1.08, 0.14, length(p * vec2(0.88, 1.0)));
  color *= vignette;
  color = pow(color, vec3(0.84));
  gl_FragColor = vec4(color, 1.0);
}
`;

export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "high-performance" });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "resolution");
    const mouseLocation = gl.getUniformLocation(program, "mouse");
    const timeLocation = gl.getUniformLocation(program, "time");
    const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      const width = Math.floor(canvas.clientWidth * ratio);
      const height = Math.floor(canvas.clientHeight * ratio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const ratioX = canvas.width / rect.width;
      const ratioY = canvas.height / rect.height;
      pointer.x = (event.clientX - rect.left) * ratioX;
      pointer.y = canvas.height - (event.clientY - rect.top) * ratioY;
    };

    const render = (now: number) => {
      resize();
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, pointer.x, pointer.y);
      gl.uniform1f(timeLocation, now * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="aurora-canvas" aria-hidden="true" />;
}
