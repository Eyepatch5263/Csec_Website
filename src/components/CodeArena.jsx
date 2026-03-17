'use client';

import { useRef, useState } from 'react';
import { Calendar, Clock, Trophy, Users, Terminal, Zap, ChevronRight, X, ShieldAlert, Code2, Users2, Cpu } from 'lucide-react';
import PlanetScene from './PlanetScene';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const CodeArena = () => {
  const [showRules, setShowRules] = useState(false);
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
    <div ref={containerRef} className="relative min-h-[120dvh] w-full"> {/* Increased height for better scroll feel */}

      {/* 1. THE PLANET - No overflow on parent means no clipping */}
      <motion.div
        style={{ y: yPlanet, scale: scalePlanet, rotate: rotatePlanet }}
        className="fixed inset-0 z-0 pointer-events-none hidden lg:flex items-center justify-center lg:justify-end overflow-visible"
      >
        <div className="w-[75%] h-[85%] transform lg:translate-x-32 opacity-80 lg:opacity-100">
          <PlanetScene />
        </div>
      </motion.div>

      {/* 2. THE CONTENT - Orbital entry feel */}
      <motion.div
        style={{ opacity: opacityContent }}
        className="relative z-10 flex flex-col justify-center min-h-[100dvh] px-6 md:px-12 lg:pl-24 py-20"
      >

        {/* Left Content Section */}
        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-0 tracking-tighter leading-[0.85] text-white">
              CODE <span className="text-purple-500">ARENA'26</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-zinc-400 font-light mb-10 tracking-wide max-w-xl"
          >
            The <span className="text-white font-medium underline decoration-purple-500/50 underline-offset-4">Ultimate</span> Competitive Programming Battle for the next generation of engineers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-4 mb-12"
          >
            {/* <FeatureLine icon={<Zap size={18} className="text-yellow-400" />} text="High-stakes algorithmic challenges" /> */}
            <FeatureLine icon={<Terminal size={18} className="text-magenta-400" />} text="Real-time live scoring system" />
            <FeatureLine icon={<Trophy size={18} className="text-purple-400" />} text="Certificates and recognition" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 w-full max-w-2xl"
          >
            <StatCard label="Date" value="05 April" icon={<Calendar size={16} />} />
            <StatCard label="Time" value="2 Hours" icon={<Clock size={16} />} />
            <StatCard label="Format" value="ICPC Style" icon={<Trophy size={16} />} />
            {/* <StatCard label="Access" value="Global" icon={<Users size={16} />} /> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
          >
            <button className="pointer-events-auto group relative px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]">
              <span className="flex items-center justify-center gap-2 uppercase relative z-10">
                Enter Arena <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => setShowRules(true)}
              className="pointer-events-auto px-10 py-4 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-bold rounded-xl transition-all backdrop-blur-md uppercase"
            >
              View Rules
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Rules Modal */}
      <AnimatePresence>
        {showRules && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRules(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-zinc-900/90 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-magenta-500 to-purple-600" />
              
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                      Arena <span className="text-purple-500">Protocols</span>
                    </h2>
                    <p className="text-zinc-500 text-xs font-mono mt-1 tracking-widest uppercase">Encryption Level: Sigma-9</p>
                  </div>
                  <button 
                    onClick={() => setShowRules(false)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  <RuleItem 
                    icon={<Trophy className="text-purple-500" />}
                    title="ICPC-Style Scoring"
                    desc="Rankings are based on solved problems. Ties are broken by total penalty time. Every second counts."
                  />
                  <RuleItem 
                    icon={<ShieldAlert className="text-magenta-500" />}
                    title="Zero Tolerance Policy"
                    desc="Plagiarism, external help, or AI assistance (including GPT) will result in immediate disqualification."
                  />
                  <RuleItem 
                    icon={<Code2 className="text-yellow-500" />}
                    title="Execution Environment"
                    desc="Supported languages: C++20, Java 17, and Python 3. Ensure your code is optimized for time limits."
                  />
                  <RuleItem 
                    icon={<Users2 className="text-purple-400" />}
                    title="Team Integrity"
                    desc="No inter-team collaboration or sharing of logic. Communication is strictly within your quadrant."
                  />
                  <RuleItem 
                    icon={<Cpu className="text-zinc-400" />}
                    title="Resource Governance"
                    desc="Excessive memory usage or attempts to compromise the arena servers will lead to a system ban."
                  />
                </div>

                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setShowRules(false)}
                    className="px-12 py-4 bg-white text-black font-black rounded-xl hover:bg-zinc-200 transition-colors uppercase tracking-widest text-sm"
                  >
                    Acknowledged
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RuleItem = ({ icon, title, desc }) => (
  <div className="flex gap-6 group">
    <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-white/5 rounded-2xl border border-white/5 group-hover:border-white/20 transition-colors">
      {icon}
    </div>
    <div className="space-y-1">
      <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors">{title}</h4>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FeatureLine = ({ icon, text }) => (
  <div className="flex items-center gap-4 group cursor-default">
    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-white/30 transition-all">
      {icon}
    </div>
    <span className="text-zinc-300 group-hover:text-white transition-colors">{text}</span>
  </div>
);

const StatCard = ({ label, value, icon }) => (
  <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
    <div className="text-zinc-500 flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[10px] uppercase font-black tracking-widest">{label}</span>
    </div>
    <p className="text-white font-bold">{value}</p>
  </div>
);

export default CodeArena;