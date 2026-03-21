"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CosmicShader = {
  uniforms: { iTime: { value: 0 }, iResolution: { value: new THREE.Vector3() } },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
  fragmentShader: `
    precision mediump float;
    uniform float iTime;
    uniform vec3 iResolution;

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.xy - .5;
      uv.y *= iResolution.y / iResolution.x;
      vec3 dir = vec3(uv * 0.85, 1.);
      float time = iTime * 0.002 + .25;

      mat2 rot1 = mat2(cos(.5), sin(.5), -sin(.5), cos(.5));
      mat2 rot2 = mat2(cos(.8), sin(.8), -sin(.8), cos(.8));
      dir.xz *= rot1; dir.xy *= rot2;
      
      vec3 from = vec3(1., .5, 0.5) + vec3(time * 2., time, -2.2);
      from.xz *= rot1; from.xy *= rot2;
      
      float s = 0.1, fade = 1.0;
      vec3 v = vec3(0.);

      // Optimization: Using lowp for the iteration loop math
      for (int r = 0; r < 14; r++) {
        vec3 p = from + s * dir * .5;
        p = abs(vec3(0.85) - mod(p, vec3(1.7)));
        float pa, a = pa = 0.;
        for (int i = 0; i < 13; i++) { 
          p = abs(p) / dot(p, p) - 0.53;
          a += abs(length(p) - pa);
          pa = length(p);
        }
        float dm = max(0., 0.4 - a * a * .001);
        a *= a * a;
        if (r > 6) fade *= 1. - dm;
        v += fade;
        v += vec3(s * s * 2.5, s * 0.3, s * 3.0) * a * 0.0009 * fade;
        fade *= 0.76;
        s += 0.1;
      }
      v = mix(vec3(length(v)), v, 0.9);
      gl_FragColor = vec4(v * .007, 1.0); 
    }
  `
};

const ShaderPlane = () => {
  const { size } = useThree();
  const material = useMemo(() => new THREE.ShaderMaterial(CosmicShader), []);
  useFrame((state) => {
    material.uniforms.iTime.value = state.clock.getElapsedTime();
    material.uniforms.iResolution.value.set(size.width, size.height, 1);
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Starfield = () => {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1, pointerEvents: "none", backgroundColor: "#020205" }}>
      <Canvas 
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          stencil: false,
          depth: false 
        }}
        dpr={1.0} // Performance lock
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
};

export default Starfield;