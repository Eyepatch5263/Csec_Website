// components/CanvasAnimation.js
"use client";
import { useEffect, useRef } from "react";

// ClassicalNoise implementation
class ClassicalNoise {
  constructor(r = Math) {
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ];
    this.p = Array.from({ length: 256 }, () => Math.floor(r.random() * 256));
    this.perm = [...this.p, ...this.p];
  }

  dot(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  mix(a, b, t) {
    return (1.0 - t) * a + t * b;
  }

  fade(t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  noise(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);

    const gi000 = this.perm[X + this.perm[Y + this.perm[Z]]] % 12;
    const gi001 = this.perm[X + this.perm[Y + this.perm[Z + 1]]] % 12;
    const gi010 = this.perm[X + this.perm[Y + 1 + this.perm[Z]]] % 12;
    const gi011 = this.perm[X + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
    const gi100 = this.perm[X + 1 + this.perm[Y + this.perm[Z]]] % 12;
    const gi101 = this.perm[X + 1 + this.perm[Y + this.perm[Z + 1]]] % 12;
    const gi110 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z]]] % 12;
    const gi111 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;

    const n000 = this.dot(this.grad3[gi000], x, y, z);
    const n100 = this.dot(this.grad3[gi100], x - 1, y, z);
    const n010 = this.dot(this.grad3[gi010], x, y - 1, z);
    const n110 = this.dot(this.grad3[gi110], x - 1, y - 1, z);
    const n001 = this.dot(this.grad3[gi001], x, y, z - 1);
    const n101 = this.dot(this.grad3[gi101], x - 1, y, z - 1);
    const n011 = this.dot(this.grad3[gi011], x, y - 1, z - 1);
    const n111 = this.dot(this.grad3[gi111], x - 1, y - 1, z - 1);

    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);

    const nx00 = this.mix(n000, n100, u);
    const nx01 = this.mix(n001, n101, u);
    const nx10 = this.mix(n010, n110, u);
    const nx11 = this.mix(n011, n111, u);

    const nxy0 = this.mix(nx00, nx10, v);
    const nxy1 = this.mix(nx01, nx11, v);

    return this.mix(nxy0, nxy1, w);
  }
}

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const perlin = useRef(new ClassicalNoise()).current;
  const variation = 0.0025;
  const amp = 300;
  const maxLines = useRef(40).current;
  const variators = useRef(
    Array.from({ length: maxLines }, (_, i) => i * 0.02)
  ).current;
  const maxParticles = 100;
  const particles = useRef([]);
  const particlePool = useRef([]);

  class Particle {
    constructor(x, y) {
      this.init(x, y);
    }

    init(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 1 + 1;
      this.lifeSpan = 50;
      this.alpha = 0.1;
      this.speedX = 0.5 * 2 - 1;
      this.speedY = 0.3 * 2 - 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.lifeSpan--;
      this.alpha = Math.max(0, this.lifeSpan / 70);
    }

    draw(ctx) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const draw = (ctx, canvasWidth, canvasHeight) => {
    ctx.shadowColor = "rgba(43, 205, 255, 1)";
    ctx.shadowBlur = 0;

    // Draw lines
    for (let i = 0; i < variators.length; i++) {
      ctx.beginPath();
      ctx.moveTo(0, canvasHeight / 2);
      let lastY;
      for (let x = 0; x <= canvasWidth; x++) {
        const y = perlin.noise(x * variation + variators[i], x * variation, 0);
        ctx.lineTo(x, canvasHeight / 2 + amp * y);
        lastY = y;
      }
      const alpha = lastY ? Math.min(Math.abs(lastY) + 0.05, 0.05) : 0.05;
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 2})`;
      ctx.stroke();
      ctx.closePath();
      variators[i] += 0.005;
    }

    // Update and draw particles
    particles.current.forEach((particle, index) => {
      particle.update();
      particle.draw(ctx);

      if (particle.lifeSpan <= 0) {
        particlePool.current.push(particle);
        particles.current.splice(index, 1);
      }
    });

    // Add new particles randomly
    if (particles.current.length < maxParticles) {
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      let particle;
      if (particlePool.current.length > 0) {
        particle = particlePool.current.pop();
        particle.init(x, y);
      } else {
        particle = new Particle(x, y);
      }
      particles.current.push(particle);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, canvas.width, canvas.height);
      setTimeout(() => requestAnimationFrame(animate), 16); // Throttle to ~60 FPS
    };

    resizeCanvas();
    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        background: "#000",
        width: "100vw",
        height: "100vh",
        display: "block",
      }}
    />
  );
};

export default CanvasAnimation;
