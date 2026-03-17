"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  const targetDate = new Date("2026-04-05T00:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-24 flex flex-col items-center justify-center bg-transparent relative overflow-hidden">
      {/* Background Hub Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center gap-4 relative z-10"
      >
        <div className="flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.3em] font-bold">
            QUANTUM UPLINK ESTABLISHED
          </span>
        </div>
        <h2 className="text-white/40 text-xs font-black uppercase tracking-[0.5em] ml-[0.5em]">Countdown to Ignition</h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-10 relative z-10 px-6">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeSeparator />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeSeparator className="hidden md:block" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeSeparator />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>

      {/* Decorative Technical data lines */}
      <div className="mt-16 w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-purple-500/40 rounded-full blur-sm" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-purple-500/40 rounded-full blur-sm" />
      </div>
    </section>
  );
};

const TimeUnit = ({ value, label }) => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-purple-500/5 rounded-3xl blur-2xl group-hover:bg-purple-500/10 transition-all duration-700" />
      
      <div className="relative w-24 h-28 md:w-40 md:h-48 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-3xl flex items-center justify-center overflow-hidden">
        {/* Subtle Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
        
        {/* Content */}
        <span className="text-5xl md:text-8xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          {String(value).padStart(2, '0')}
        </span>

        {/* Technical Corner */}
        <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-white/10" />
      </div>
    </div>
    <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-zinc-500 font-black ml-[0.4em]">
      {label}
    </span>
  </div>
);

const TimeSeparator = ({ className = "" }) => (
  <div className={`hidden sm:flex flex-col justify-center gap-3 pt-4 md:pt-12 ${className}`}>
    <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
    <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40" />
  </div>
);

export default Countdown;
