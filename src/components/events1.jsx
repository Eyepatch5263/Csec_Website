"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Layers, ChevronRight, Sparkles } from 'lucide-react';

// --- Individual Event Card Component ---
const EventCard = ({ title, description, link, icon: Icon, delay }) => {
  // Logic to determine if this specific card should be bigger (CodeArena)
  const isFeatured = title === "CodeArena";

  return (
    <motion.a 
      href={link}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`block w-full ${isFeatured ? 'md:w-[42%] h-[55vh] z-20' : 'md:w-[29%] h-[45vh] z-10'} [perspective:1200px] group`}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
      >
        {/* --- FRONT SIDE (Space Glassmorphism) --- */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-[3rem] border-2 backdrop-blur-2xl p-8 [backface-visibility:hidden] shadow-2xl overflow-hidden
          ${isFeatured ? 'border-purple-500/50 bg-purple-950/20 shadow-purple-500/20' : 'border-white/10 bg-[#0a0a0a]/40 shadow-black'}`}>
          
          {/* Internal Grid/Space Background */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          {/* Scanning Laser Effect (Only for CodeArena) */}
          {isFeatured && (
            <motion.div 
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent z-0 opacity-50 shadow-[0_0_15px_purple]"
            />
          )}

          {/* Nebula Glows */}
          <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-20 pointer-events-none 
            ${isFeatured ? 'bg-purple-600' : 'bg-blue-600'}`}></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Icon Wrapper with Orbital Ring */}
            <div className="relative mb-8">
                <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className={`absolute -inset-4 border-2 border-dashed rounded-full opacity-30 ${isFeatured ? 'border-purple-400' : 'border-white/20'}`}
                />
                <div className={`relative p-6 rounded-full border shadow-2xl transition-transform duration-500 group-hover:scale-110 
                  ${isFeatured ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/10'}`}>
                    <Icon size={isFeatured ? 52 : 40} strokeWidth={1} className={isFeatured ? "text-purple-400 drop-shadow-[0_0_8px_#a855f7]" : "text-white"} />
                </div>
            </div>
            
            <h3 className={`${isFeatured ? 'text-4xl' : 'text-2xl'} font-black text-white uppercase tracking-tighter text-center leading-none`}>
              {title}
            </h3>
            
            <div className={`h-[2px] w-12 my-5 rounded-full ${isFeatured ? 'bg-purple-500 shadow-[0_0_15px_#a855f7]' : 'bg-gradient-to-r from-transparent via-purple-500/50 to-transparent'}`}></div>
            
            <span className={`text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2 ${isFeatured ? 'text-purple-300' : 'text-zinc-500'}`}>
               <Sparkles size={10} /> {isFeatured ? 'Main Mission' : 'Side Quest'}
            </span>
          </div>
        </div>

        {/* --- BACK SIDE (Mission Details) --- */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[3rem] bg-[#070707] border-2 border-white/20 p-10 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-2xl overflow-hidden">
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] mb-4">
            System :: Briefing
          </span>
          
          <p className={`${isFeatured ? 'text-lg' : 'text-sm'} leading-relaxed text-zinc-300 font-light`}>
            {description}
          </p>
          
          <div className={`mt-8 flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest px-8 py-3 rounded-full border transition-all duration-300
            ${isFeatured ? 'bg-purple-600/20 border-purple-500 hover:bg-white hover:text-black' : 'bg-white/5 border-white/10 hover:bg-white hover:text-black'}`}>
            Initialize Mission <ChevronRight size={14} />
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
};

// --- Main Events Section ---
const Events = () => {
  const sectionRef = useRef(null);

  const eventData = [
    {
      title: "Logic Loop",
      icon: Terminal,
      description: "Sector: Up To Skills. Mission: DSA Logic Gauntlet. Launching: April 5th. Test your algorithmic speed and precision in a high-stakes competitive quiz.",
      link: "/codearena",
      delay: 0.1
    },
    {
      title: "CodeArena",
      icon: Zap,
      description: "Sector: Codeforces. Mission: ICPC-Style CP Battle. Launching April 5th. Solve the complex, optimize the simple, and dominate the live global leaderboard.",
      link: "https://unstop.com/o/1cJ2LFR?utm_medium=Share&utm_source=online_coding_challenge&utm_campaign=Logged_out_userhttps://share.google/JZJwkBcHxZVeJOoh4",
      delay: 0.2
    },
    {
      title: "Vibe Code Arena",
      icon: Layers,
      description: "Sector: AI-Symmetry. Mission: LLM Prompt Engineering. Active: March 25 – April 4. Leverage the power of the machine to build at the speed of thought.",
      link: "/codearena",
      delay: 0.3
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative overflow-hidden bg-transparent px-6 py-32"
    >
      {/* Background Ambience (Unchanged as requested) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/5 blur-[120px] pointer-events-none"></div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-24 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-white/10"></div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-[0.5em]">Sector :: Missions</span>
            <div className="h-[1px] w-12 bg-white/10"></div>
          </div>

          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
            Our <span className="text-purple-500">Events</span>
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl font-light text-zinc-500 md:text-xl">
            Choose your battleground. From pure logic to full-stack endurance.
          </p>
        </motion.div>

        {/* Interactive Cards Area */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 lg:gap-10">
          {eventData.map((event, idx) => (
            <EventCard 
              key={idx}
              title={event.title}
              icon={event.icon}
              description={event.description}
              link={event.link}
              delay={event.delay}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Events;