"use client";

import React, { useState } from 'react';
import { motion, useScroll, useMotionValue } from 'framer-motion';
import { Trophy, Award, Medal, Sparkles, ChevronRight } from 'lucide-react';

// --- Individual Flip Card Component (Sleek Space Version) ---
const PrizeCard = ({ prize }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = prize.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: prize.delay }}
      className={`relative w-full max-w-[320px] h-[420px] flex flex-col ${prize.mobileOrder} ${prize.desktopOrder} ${prize.transform} cursor-pointer [perspective:1000px] group`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      >
        {/* --- FRONT FACE (Frosted Glass) --- */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-[#0a0a0a]/40 backdrop-blur-md overflow-hidden [backface-visibility:hidden] shadow-2xl">
          {/* Subtle Side Glow */}
          <div className={`absolute -top-12 -right-12 w-40 h-40 blur-[60px] opacity-20 bg-gradient-to-br ${prize.bgGlow}`}></div>
          
          <div className="h-full w-full p-8 flex flex-col items-center justify-center relative z-10">
            {/* Floating Icon Housing */}
            <div className="relative mb-8">
              <div className={`absolute inset-0 blur-3xl opacity-30 ${prize.color}`}>
                <Icon size={60} />
              </div>
              <div className="relative p-6 rounded-full border border-white/5 bg-white/5 backdrop-blur-2xl shadow-inner">
                <Icon size={44} strokeWidth={1} className={prize.color} />
              </div>
            </div>

            <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-1 text-center">
              {prize.contest}
            </h4>
            
            <div className="h-[1px] w-12 bg-white/10 my-4"></div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-1 font-bold">Allocated Pool</span>
              <span className={`text-4xl font-black tracking-tighter ${prize.color} drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]`}>
                {prize.amount}
              </span>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity duration-500">
              Details <ChevronRight size={12} className="text-cyan-400" />
            </div>
          </div>
        </div>

        {/* --- BACK FACE (Distribution Info) --- */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-[#070707]/90 backdrop-blur-2xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl">
          {/* Reverse Side Glow */}
          <div className={`absolute -bottom-12 -left-12 w-40 h-40 blur-[60px] opacity-20 bg-gradient-to-br ${prize.bgGlow}`}></div>

          <div className="h-full w-full p-8 flex flex-col relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">
                Distribution 
              </h4>
              <div className="h-[1px] flex-grow bg-white/10 ml-4"></div>
            </div>
            
            <div className="space-y-3">
              {[
                { label: "1st Place", val: prize.first, highlight: true },
                { label: "2nd Place", val: prize.second, highlight: false },
                { label: "3rd Place", val: prize.third, highlight: false },
                // Conditional Row for Best Beginner (CodeArena only)
                ...(prize.beginner ? [{ label: "Best Beginner*", val: prize.beginner, highlight: false }] : [])
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-end border-b border-white/5 pb-1">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{item.label}</span>
                  <span className={`text-lg font-black ${item.highlight ? prize.color : 'text-zinc-200'}`}>
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="h-4 w-[1px] bg-gradient-to-b from-transparent to-white/10 mb-2 mx-auto"></div>
              <p className="text-[10px] leading-relaxed text-zinc-400 font-light italic text-center px-2">
                {prize.info}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Section Component ---
const PrizePool = () => {
  const sectionRef = React.useRef(null);
  
  const totalPrize = "₹50,000+";
  const breakdown = [
    {
      contest: "Vibe Coding Arena",
      amount: "Revealing..",
      first: "------",
      second: "------",
      third: "------",
      info: "Awarded for the most creative, fluid, and innovative competition with llms.",
      icon: Medal,
      color: "text-zinc-300",
      bgGlow: "from-blue-500/20",
      borderGlow: "from-blue-500",
      delay: 0.2,
      mobileOrder: "order-2",
      desktopOrder: "md:order-1",
      transform: "md:translate-y-8" 
    },
    {
      contest: "Logic Loop",
      amount: "Revealing..",
      first: "------",
      second: "------",
      third: "------",
      info: "Awarded for flawless algorithmic problem-solving and ultimate speed.",
      icon: Trophy,
      color: "text-purple-400",
      bgGlow: "from-purple-500/20",
      borderGlow: "from-purple-500",
      delay: 0,
      mobileOrder: "order-1", 
      desktopOrder: "md:order-2", 
      transform: "md:-translate-y-4 scale-105 z-10" 
    },
    {
      contest: "CodeArena",
      amount: "₹25,000",
      first: "₹10,000",
      second: "₹7,000",
      third: "₹4,000",
      beginner: "₹4,000", // New Field added here
      info: "*Best Beginner prize awarded exclusively to the top performing 1st year team.",
      icon: Award,
      color: "text-amber-500",
      bgGlow: "from-amber-600/20",
      borderGlow: "from-amber-600",
      delay: 0.4,
      mobileOrder: "order-3",
      desktopOrder: "md:order-3",
      transform: "md:translate-y-8" 
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6 relative bg-transparent overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter">
            Prize <span className="text-purple-500">Pool</span>
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6" />
        </motion.div>

        {/* --- SLEEK SPACE TOTAL PRIZE DISPLAY --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-4xl mb-32 p-12 overflow-hidden rounded-[3rem] border border-white/5 bg-[#050505]/60 shadow-[0_0_80px_-20px_rgba(168,85,247,0.15)] backdrop-blur-md"
        >
          {/* Side Glow Lights */}
          <div className="absolute -top-12 -left-12 w-72 h-72 bg-purple-600 rounded-full blur-[110px] opacity-20 pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500 rounded-full blur-[130px] opacity-[0.15] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-white/10"></div>
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.5em] text-zinc-400">
                  <Sparkles size={16} className="text-cyan-400" /> 
                  Deep Space Allocation 
                  <Sparkles size={16} className="text-purple-400" />
                </span>
                <div className="h-[1px] w-12 bg-white/10"></div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-purple-600/30 rounded-full scale-150 opacity-60"></div>
              <h3 className="relative text-7xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                {totalPrize}
              </h3>
            </div>

            <div className="mt-12 flex gap-8 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-cyan-400"></div> Sector :: 0x-Event</span>
                <div className="w-[1px] h-3 bg-white/10"></div>
                <span className="text-zinc-400">Protocol :: Encode V.2026</span>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-8 lg:gap-12 mt-12">
          {breakdown.map((prize, idx) => (
            <PrizeCard key={idx} prize={prize} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PrizePool;