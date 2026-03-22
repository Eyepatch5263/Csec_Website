'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
varying vec2  vUv;

#define PI 3.14159265

vec2 hash2(vec2 p) {
  p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f*f*(3.0 - 2.0*f);
  float a = dot(hash2(i + vec2(0,0)), f - vec2(0,0));
  float b = dot(hash2(i + vec2(1,0)), f - vec2(1,0));
  float c = dot(hash2(i + vec2(0,1)), f - vec2(0,1));
  float d = dot(hash2(i + vec2(1,1)), f - vec2(1,1));
  return 0.5 + 0.5*(mix(mix(a,b,u.x), mix(c,d,u.x), u.y));
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p  = rot * p;
    a *= 0.5;
  }
  return v;
}

float cloudNoise(vec2 p) {
  vec2 q = vec2(fbm(p + vec2(0.0, 0.0)), fbm(p + vec2(5.2, 1.3)));
  vec2 r = vec2(
    fbm(p + 4.5*q + vec2(1.7, 9.2) + 0.10*iTime),
    fbm(p + 4.5*q + vec2(8.3, 2.8) + 0.08*iTime)
  );
  return fbm(p + 4.5*r);
}

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= iResolution.x / iResolution.y;
  float dist = length(uv);
  float radius = 0.36;

  // CRITICAL OPTIMIZATION: Discard pixels far from the planet center 
  // so the GPU doesn't run the heavy math for empty space.
  if (dist > radius * 1.5) { discard; }

  float mask = step(dist, radius);
  float z = sqrt(max(0.0, radius*radius - dot(uv,uv)));
  vec3 normal = mask > 0.5 ? normalize(vec3(uv, z)) : vec3(0.0,0.0,1.0);
  float spin = iTime * 0.025;
  float wy = sqrt(max(1e-4, 1.0 - normal.y*normal.y));
  vec2 sUV = vec2(asin(clamp(normal.x/wy, -1.0, 1.0)) / PI + 0.5 + spin, asin(clamp(normal.y, -1.0, 1.0)) / PI + 0.5);

  float surface = cloudNoise(sUV * 2.2) * 0.75 + fbm(sUV * 7.0 + vec2(iTime*0.03)) * 0.25;
  surface = smoothstep(0.25, 0.75, surface);

  vec3 surfColor = mix(vec3(0.04, 0.02, 0.08), vec3(0.08, 0.04, 0.18), smoothstep(0.0, 0.2, surface));
  surfColor = mix(surfColor, vec3(0.15, 0.07, 0.35), smoothstep(0.2, 0.4, surface));
  surfColor = mix(surfColor, vec3(0.28, 0.10, 0.52), smoothstep(0.4, 0.6, surface));
  surfColor = mix(surfColor, vec3(0.45, 0.18, 0.70), smoothstep(0.6, 0.8, surface));
  surfColor = mix(surfColor, vec3(0.62, 0.30, 0.85), smoothstep(0.8, 1.0, surface));

  surfColor *= (pow(max(dot(normal, normalize(vec3(0.6, 0.4, 0.7))), 0.0), 0.5) * 0.75 + 0.25);
  surfColor += vec3(0.55, 0.15, 0.85) * pow(1.0 - clamp(normal.z, 0.0, 1.0), 3.5) * 1.4;

  if (mask < 0.5) {
    float t = (dist - radius) / (radius * 0.9);
    float glow = exp(-t * 5.0) * 0.7 + exp(-t * 1.8) * 0.3;
    gl_FragColor = vec4(mix(vec3(0.6, 0.2, 0.9), vec3(0.25, 0.05, 0.45), smoothstep(0.0, 1.0, t)) * glow, clamp(glow, 0.0, 0.9));
  } else {
    gl_FragColor = vec4(surfColor, 1.0);
  }
}
`;

const PlanetScene = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Fixed Pixel Ratio (1.0) prevents lag on 4K/Retina screens
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(1.0); 
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = { iTime: { value: 0 }, iResolution: { value: new THREE.Vector2(el.clientWidth, el.clientHeight) } };
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, transparent: true });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    const animate = (time) => {
      uniforms.iTime.value = time * 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    const frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default PlanetScene;