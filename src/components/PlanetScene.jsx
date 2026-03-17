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
precision highp float;
uniform float iTime;
uniform vec2  iResolution;
varying vec2  vUv;

#define PI 3.14159265

// Smooth gradient noise
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
  for (int i = 0; i < 6; i++) {
    v += a * vnoise(p);
    p  = rot * p;
    a *= 0.5;
  }
  return v;
}

// Heavy domain warping for visible swirling continents/clouds
float cloudNoise(vec2 p) {
  // First warp pass
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0)),
    fbm(p + vec2(5.2, 1.3))
  );
  // Second warp pass — stronger = more visible features
  vec2 r = vec2(
    fbm(p + 4.5*q + vec2(1.7, 9.2) + 0.10*iTime),
    fbm(p + 4.5*q + vec2(8.3, 2.8) + 0.08*iTime)
  );
  return fbm(p + 4.5*r);
}

// Soft star dots
float starField(vec2 p) {
  vec2  ip = floor(p * 90.0);
  vec2  fp = fract(p * 90.0) - 0.5;
  float h  = fract(sin(dot(ip, vec2(127.1,311.7))) * 43758.5453);
  float brightness = smoothstep(0.93, 1.0, h);
  float glow = 1.0 - smoothstep(0.0, 0.3, length(fp));
  return brightness * glow * glow;
}

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= iResolution.x / iResolution.y;

  float dist   = length(uv);
  float radius = 0.36;

  if (dist > radius * 1.9) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float mask = step(dist, radius);

  // Sphere normal
  float z      = sqrt(max(0.0, radius*radius - dot(uv,uv)));
  vec3  normal = mask > 0.5 ? normalize(vec3(uv, z)) : vec3(0.0,0.0,1.0);

  // Spherical UV
  float spin = iTime * 0.025;
  float wy   = sqrt(max(1e-4, 1.0 - normal.y*normal.y));
  vec2  sUV  = vec2(
    asin(clamp(normal.x/wy, -1.0, 1.0)) / PI + 0.5 + spin,
    asin(clamp(normal.y,    -1.0, 1.0)) / PI + 0.5
  );

  // ── HIGH-CONTRAST surface texture ───────────────────────────────────────
  float c1 = cloudNoise(sUV * 2.2);
  float c2 = cloudNoise(sUV * 3.8 + vec2(3.1, 7.4));  // second layer detail
  float c3 = fbm(sUV * 7.0 + vec2(iTime*0.03));        // fine detail layer

  // Combine layers with contrast boost
  float surface = c1 * 0.55 + c2 * 0.30 + c3 * 0.15;
  // Contrast stretch — push darks darker, lights lighter
  surface = smoothstep(0.25, 0.75, surface);

  // ── COLOR PALETTE — matches warm purple/magenta background ──────────────
  // Darks: very dark navy/charcoal (not pure black — has warmth)
  // Mids:  dark blue-purple matching the bg tone
  // Lights: brighter purple-pink highlights to catch light
  vec3 dark1   = vec3(0.04, 0.02, 0.08);   // near-black warm dark
  vec3 dark2   = vec3(0.08, 0.04, 0.18);   // dark warm purple
  vec3 mid1    = vec3(0.15, 0.07, 0.35);   // medium purple
  vec3 mid2    = vec3(0.28, 0.10, 0.52);   // brighter purple
  vec3 light1  = vec3(0.45, 0.18, 0.70);   // lit purple
  vec3 light2  = vec3(0.62, 0.30, 0.85);   // highlight — warm purple-pink

  vec3 surfColor;
  surfColor = mix(dark1,  dark2,  smoothstep(0.00, 0.20, surface));
  surfColor = mix(surfColor, mid1,   smoothstep(0.20, 0.40, surface));
  surfColor = mix(surfColor, mid2,   smoothstep(0.40, 0.60, surface));
  surfColor = mix(surfColor, light1, smoothstep(0.60, 0.80, surface));
  surfColor = mix(surfColor, light2, smoothstep(0.80, 1.00, surface));

  // Fine detail overlay — adds visible texture variance
  float detail = fbm(sUV * 12.0 + vec2(iTime*0.015)) - 0.5;
  surfColor += detail * 0.10 * vec3(0.5, 0.2, 1.0);

  // ── Stars inside planet ──────────────────────────────────────────────────
  float stars = starField(sUV);
  surfColor += vec3(0.80, 0.70, 1.0) * stars * 0.9;

  // ── Lighting ─────────────────────────────────────────────────────────────
  // Light comes from upper-right to match background light source
  vec3  L     = normalize(vec3(0.6, 0.4, 0.7));
  float diff  = max(dot(normal, L), 0.0);
  // Wide light wrap — so dark side isn't pure black
  float light = pow(diff, 0.5) * 0.75 + 0.25;
  surfColor  *= light;

  // Dark limb: make edge slightly darker before fresnel
  float limbDark = pow(clamp(normal.z, 0.0, 1.0), 0.3);
  surfColor *= (0.5 + 0.5*limbDark);

  // ── Fresnel rim — warm purple-pink to match background ───────────────────
  float fresnel = pow(1.0 - clamp(normal.z, 0.0, 1.0), 3.5);
  // Rim color: warm purple-magenta (matches bg stars/glow)
  vec3 rimColor = vec3(0.55, 0.15, 0.85);
  surfColor += rimColor * fresnel * 1.4;

  // ── Outer halo — soft, blends into background ────────────────────────────
  float haloAlpha = 0.0;
  vec3  haloColor = vec3(0.0);
  if (mask < 0.5) {
    float t = (dist - radius) / (radius * 0.9);
    // Very soft — doesn't fight the background
    float glow = exp(-t * 5.0) * 0.7 + exp(-t * 1.8) * 0.3;
    haloAlpha = clamp(glow, 0.0, 0.9);
    // Warm purple-magenta to match the bg — not cold blue
    vec3 innerRim = vec3(0.60, 0.20, 0.90);   // bright purple-pink
    vec3 outerFade= vec3(0.25, 0.05, 0.45);   // dark fading purple
    haloColor = mix(innerRim, outerFade, smoothstep(0.0, 1.0, t)) * glow;
  }

  vec3  finalColor = mask > 0.5 ? surfColor : haloColor;
  float alpha      = mask > 0.5 ? 1.0 : haloAlpha;

  gl_FragColor = vec4(finalColor, alpha);
}
`;

const PlanetScene = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      iTime:       { value: 0 },
      iResolution: { value: new THREE.Vector2(W, H) },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      uniforms.iTime.value = performance.now() / 1000;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default PlanetScene;