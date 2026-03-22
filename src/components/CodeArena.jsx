"use client";
import { useRef } from 'react';
import { Calendar, Trophy, Terminal, Zap, Users } from 'lucide-react';
import PlanetScene from './PlanetScene';
import { motion, useScroll, useTransform } from "framer-motion";


const CodeArena = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yPlanet = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scalePlanet = useTransform(scrollYProgress, [0, 1], [1.2, 2.0]);
  const rotatePlanet = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={containerRef} className="relative min-h-[120dvh] w-full overflow-hidden">
      
      {/* 1. THE PLANET BACKGROUND - Now strictly centered vertically */}
      <motion.div
        style={{ y: yPlanet, scale: scalePlanet, rotate: rotatePlanet }}
        className="fixed inset-0 z-0 pointer-events-none hidden lg:flex items-center justify-end overflow-visible px-12"
      >
        <div className="w-[70%] h-[80%] transform lg:translate-x-24 opacity-80 lg:opacity-100">
          <PlanetScene />
        </div>
      </motion.div>

      {/* 2. THE CONTENT - Using flex-start with a controlled top-offset for consistency */}
      <motion.div
        style={{ opacity: opacityContent }}
        className="relative z-10 flex flex-col justify-start min-h-screen px-6 md:px-12 lg:px-24 pt-[15vh] pb-20"
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Left Content Section */}
          <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-0 tracking-tighter leading-[0.85] text-white">
                CODE <span className="text-purple-500">ARENA&apos;26</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-2xl text-zinc-400 font-light mb-10 tracking-wide max-w-xl"
            >
              A <span className="text-white font-medium underline decoration-purple-500/50 underline-offset-4">Multiverse</span> of coding excellence, hosting four elite tracks for the next generation of engineers.
            </motion.p>

            {/* Feature Lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-4 mb-12"
            >
              <FeatureLine 
                icon={<Users size={18} className="text-blue-400" />} 
                text="Intelligence from top-tier global interns" 
              />
              <FeatureLine 
                icon={<Zap size={18} className="text-yellow-400" />} 
                text="High-stakes tracks across DSA & AI Prompting" 
              />
              <FeatureLine 
                icon={<Trophy size={18} className="text-purple-400" />} 
                text="Bounties featuring cash prizes & exclusive gear" 
              />
              <FeatureLine 
                icon={<Terminal size={18} className="text-magenta-400" />} 
                text="Live ICPC-style Competitive Programming Contest" 
              />
            </motion.div>

            {/* Stat Cards Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl"
            >
              <StatCard 
                label="Event Window" 
                value="25 Mar - 05 Apr" 
                icon={<Calendar size={16} className="text-purple-400" />} 
              />
              <StatCard 
                label="Active Sectors" 
                value="04 Missions" 
                icon={<Zap size={16} className="text-yellow-400" />} 
              />
              <StatCard 
                label="Total Bounty" 
                value="₹50,000+" 
                icon={<Trophy size={16} className="text-amber-400" />} 
              />
              <StatCard 
                label="Battle Engine" 
                value="ICPC Style" 
                icon={<Terminal size={16} className="text-magenta-400" />} 
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Sub-Components ---

const FeatureLine = ({ icon, text }) => (
  <div className="flex items-center gap-4 group cursor-default">
    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 transition-all">
      {icon}
    </div>
    <span className="text-zinc-300 group-hover:text-white transition-colors">
      {text}
    </span>
  </div>
);

const StatCard = ({ label, value, icon }) => (
  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col items-start text-left">
    <div className="text-zinc-500 flex items-center gap-2 mb-2">
      {icon}
      <span className="text-[10px] uppercase font-black tracking-widest">
        {label}
      </span>
    </div>
    <p className="text-white font-bold text-sm sm:text-base">{value}</p>
  </div>
);

export default CodeArena;
