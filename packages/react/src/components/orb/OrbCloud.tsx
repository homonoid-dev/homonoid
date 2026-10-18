"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { match, cond } from "../../utils/condition";
import type { OrbCloudProps, OrbSize, OrbState } from "./types";

export const cloudContainerVariants = cva(
  "relative inline-flex items-center justify-center select-none transform-gpu origin-center transition-[transform,opacity] duration-[var(--motion-duration-slow)] ease-[var(--motion-easing-standard)] rounded-full",
  {
    variants: {
      size: {
        sm: "w-orb-sm h-orb-sm",
        md: "w-orb-md h-orb-md",
        lg: "w-orb-lg h-orb-lg"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_activity;
uniform vec3 u_deepColor;
uniform vec3 u_upperColor;
uniform vec3 u_lowerColor;
uniform vec3 u_highlightColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.52;
  mat2 rotation = mat2(0.80, 0.60, -0.60, 0.80);

  for (int octave = 0; octave < 5; octave++) {
    value += amplitude * noise(p);
    p = rotation * p * 1.92 + vec2(9.7, 4.3);
    amplitude *= 0.5;
  }

  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 centered = uv - 0.5;
  float radius = length(centered);

  // Exact 1.5 physical device pixel antialiasing width
  float pixelDelta = 1.5 / min(u_resolution.x, u_resolution.y);
  float edge = 1.0 - smoothstep(0.5 - pixelDelta, 0.5, radius);

  if (edge <= 0.0) {
    discard;
  }

  vec2 p = centered * 2.0;
  float t = u_time;

  vec2 warp = vec2(
    fbm(p * 1.02 + vec2(t * 0.34, -t * 0.24)),
    fbm(p * 1.08 + vec2(-t * 0.27, t * 0.32) + vec2(6.7, 2.9))
  );
  vec2 curl = vec2(
    sin(p.y * 2.4 + t * 0.68 + warp.y * 3.2),
    cos(p.x * 2.1 - t * 0.61 + warp.x * 3.0)
  );
  vec2 warped =
    p +
    (warp - 0.5) * (1.18 + u_activity * 0.38) +
    curl * (0.035 + u_activity * 0.07);
  float broad = fbm(warped * 0.92 + vec2(t * 0.14, -t * 0.18));
  float folded = fbm(warped * 1.66 + vec2(-t * 0.23, t * 0.19) + 5.2);
  float field = mix(broad, folded, 0.3 + u_activity * 0.14);

  float horizon =
    0.46 +
    0.08 * sin((uv.x + warp.x * 0.2) * 5.4 + t * 0.42) +
    0.16 * (broad - 0.5);
  float upper = smoothstep(horizon - 0.12, horizon + 0.08, uv.y);
  float band = exp(-pow((uv.y - horizon) * (5.2 + u_activity * 0.8), 2.0));
  float cloud = smoothstep(0.24, 0.79, field);

  vec3 color = mix(u_lowerColor, u_upperColor, upper);
  float upperDepth = upper * (0.14 + smoothstep(0.42, 0.78, folded) * 0.5);
  color = mix(color, u_deepColor, upperDepth);

  float milkAmount = clamp(band * (0.42 + cloud * 0.62), 0.0, 0.88);
  color = mix(color, u_highlightColor, milkAmount);

  float lowerMist = (1.0 - upper) * smoothstep(0.58, 0.9, broad) * 0.18;
  color = mix(color, u_highlightColor, lowerMist);

  float grain = (noise(gl_FragCoord.xy * 0.64) - 0.5) / 255.0;
  color += grain;

  gl_FragColor = vec4(color * edge, edge);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const COLOR_PALETTES = {
  default: {
    deep: [0.36, 0.39, 0.985] as [number, number, number],
    upper: [0.48, 0.56, 0.985] as [number, number, number],
    lower: [0.72, 0.78, 0.975] as [number, number, number],
    highlight: [0.89, 0.92, 0.995] as [number, number, number]
  },
  error: {
    deep: [0.86, 0.15, 0.15] as [number, number, number],
    upper: [0.94, 0.27, 0.27] as [number, number, number],
    lower: [0.98, 0.65, 0.65] as [number, number, number],
    highlight: [0.99, 0.89, 0.89] as [number, number, number]
  }
};

const getPixelSize = (size: OrbSize): number =>
  match<OrbSize, number>(
    size,
    {
      sm: 64,
      md: 128,
      lg: 224
    },
    128
  );

export const OrbCloud = forwardRef<HTMLDivElement, OrbCloudProps>(function OrbCloud(
  { state = "idle", volume = 0, size = "md", className, style, ...props },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const volumeRef = useRef(volume);

  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  useEffect(() => {
    stateRef.current = state;
    volumeRef.current = volume;
  }, [state, volume]);

  const pixelSize = getPixelSize(size);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true
      }) ||
      canvas.getContext("webgl", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true
      });

    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    if (!program || !buffer) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const posAttr = gl.getAttribLocation(program, "a_position");
    const resUniform = gl.getUniformLocation(program, "u_resolution");
    const timeUniform = gl.getUniformLocation(program, "u_time");
    const activityUniform = gl.getUniformLocation(program, "u_activity");
    const deepUniform = gl.getUniformLocation(program, "u_deepColor");
    const upperUniform = gl.getUniformLocation(program, "u_upperColor");
    const lowerUniform = gl.getUniformLocation(program, "u_lowerColor");
    const highlightUniform = gl.getUniformLocation(program, "u_highlightColor");

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 3) : 1;
    const renderWidth = Math.max(1, Math.round(pixelSize * dpr));

    canvas.width = renderWidth;
    canvas.height = renderWidth;
    gl.viewport(0, 0, renderWidth, renderWidth);

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    let animationFrameId = 0;
    let accumulatedTime = 0;
    let lastTimestamp = performance.now();

    const render = (now: number) => {
      const delta = Math.min((now - lastTimestamp) / 1000, 0.05);
      lastTimestamp = now;

      const currentState = stateRef.current;
      const currentVol = Math.min(1, Math.max(0, volumeRef.current));

      const speed = match<OrbState, number>(
        currentState,
        {
          speaking: 0.8 + currentVol * 0.4,
          thinking: 0.65,
          listening: 0.35 + currentVol * 0.25,
          connecting: 0.45,
          idle: 0.2,
          error: 0.12
        },
        0.2
      );

      const activity = match<OrbState, number>(
        currentState,
        {
          speaking: 0.65 + currentVol * 0.35,
          thinking: 0.5,
          listening: 0.25 + currentVol * 0.35,
          connecting: 0.2,
          idle: 0.1,
          error: 0.2
        },
        0.1
      );

      accumulatedTime += delta * speed;

      const palette = currentState === "error" ? COLOR_PALETTES.error : COLOR_PALETTES.default;

      gl.useProgram(program);
      gl.uniform2f(resUniform, renderWidth, renderWidth);
      gl.uniform1f(timeUniform, accumulatedTime);
      gl.uniform1f(activityUniform, activity);
      gl.uniform3fv(deepUniform, palette.deep);
      gl.uniform3fv(upperUniform, palette.upper);
      gl.uniform3fv(lowerUniform, palette.lower);
      gl.uniform3fv(highlightUniform, palette.highlight);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [pixelSize]);

  const normalizedVolume = Math.min(1, Math.max(0, volume));
  const scaleValue = cond(
    state === "speaking",
    1 + normalizedVolume * 0.12,
    cond(state === "listening", 0.98 - normalizedVolume * 0.04, 1)
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn(cloudContainerVariants({ size }), className)}
      style={{
        width: pixelSize,
        height: pixelSize,
        transform: `scale(${scaleValue})`,
        ...style
      }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: pixelSize,
          height: pixelSize
        }}
        className="w-full h-full rounded-full pointer-events-none transform-gpu block"
      />
    </div>
  );
});

OrbCloud.displayName = "OrbCloud";
