"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const CosmicShader = {
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float iTime;
    uniform vec3 iResolution;

    // LOWERED ITERATIONS: Reduces complexity for a "cleaner" look
    #define iterations 13
    #define formuparam 0.53
    
    // LOWERED VOLSTEPS: Decreases the density of the light layers
    #define volsteps 14
    #define stepsize 0.1
    #define zoom 0.850
    #define tile 0.850
    #define speed 0.002 

    // LOWERED BRIGHTNESS: Makes the light less "blown out"
    #define brightness 0.0009
    #define darkmatter 0.400
    #define distfading 0.760
    #define saturation 0.900

    void main() {
      vec2 uv = gl_FragCoord.xy / iResolution.xy - .5;
      uv.y *= iResolution.y / iResolution.x;
      vec3 dir = vec3(uv * zoom, 1.);
      float time = iTime * speed + .25;

      float a1 = .5;
      float a2 = .8;
      mat2 rot1 = mat2(cos(a1), sin(a1), -sin(a1), cos(a1));
      mat2 rot2 = mat2(cos(a2), sin(a2), -sin(a2), cos(a2));
      dir.xz *= rot1;
      dir.xy *= rot2;
      
      vec3 from = vec3(1., .5, 0.5);
      from += vec3(time * 2., time, -2.2);
      from.xz *= rot1;
      from.xy *= rot2;
      
      float s = 0.1, fade = 1.;
      vec3 v = vec3(0.);
      for (int r = 0; r < volsteps; r++) {
        vec3 p = from + s * dir * .5;
        p = abs(vec3(tile) - mod(p, vec3(tile * 2.)));
        float pa, a = pa = 0.;
        for (int i = 0; i < iterations; i++) { 
          p = abs(p) / dot(p, p) - formuparam;
          a += abs(length(p) - pa);
          pa = length(p);
        }
        float dm = max(0., darkmatter - a * a * .001);
        
        a *= a * a;
        if (r > 6) fade *= 1. - dm;

        v += fade;
        
        // VIOLET/MAGENTA RECIPE: 
        // We use more Red (s*s*2.5) and Blue (s*3.0) with minimal Green (s*0.3)
        v += vec3(s * s * 2.5, s * 0.3, s * 3.0) * a * brightness * fade;

        fade *= distfading;
        s += stepsize;
      }
      
      v = mix(vec3(length(v)), v, saturation);
      
      // Final Output: Slight dimming for better background contrast
      gl_FragColor = vec4(v * .007, 1.0); 
    }
  `
};

const ShaderPlane = () => {
  const meshRef = useRef();
  const { size } = useThree();
  const material = useMemo(() => new THREE.ShaderMaterial(CosmicShader), []);

  useFrame((state) => {
    if (meshRef.current) {
      material.uniforms.iTime.value = state.clock.getElapsedTime();
      material.uniforms.iResolution.value.set(size.width, size.height, 1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const Starfield = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, // This keeps it behind your content
        pointerEvents: "none", // This ensures you can still click buttons/links "through" the background
        backgroundColor: "#020205", // Deep dark base
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 1] }} 
        gl={{ antialias: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
};

export default Starfield;