"use client";

import React from 'react';
import { motion } from 'framer-motion';
import  './css/PrizePool.css'
import { Trophy, Award, Medal } from 'lucide-react';
import { useScroll, useTransform, useMotionValue } from "framer-motion";

const PrizePool = () => {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const mainPrizes = [
    {
      rank: "2nd",
      amount: "7,000",
      title: "Silver",
      icon: <Medal size={40} />,
      color: "border-zinc-400",
      text: "text-zinc-400",
      glow: "shadow-zinc-500/10",
      order: "order-2 md:order-1",
      height: "h-[320px] md:h-[380px]"
    },
    {
      rank: "1st",
      amount: "10,000",
      title: "Gold",
      icon: <Trophy size={56} />,
      color: "border-purple-500",
      text: "text-purple-500",
      glow: "shadow-purple-600/30",
      order: "order-1 md:order-2",
      height: "h-[400px] md:h-[460px]"
    },
    {
      rank: "3rd",
      amount: "4,000",
      title: "Bronze",
      icon: <Award size={40} />,
      color: "border-purple-900/50",
      text: "text-purple-900",
      glow: "shadow-purple-900/10",
      order: "order-3 md:order-3",
      height: "h-[280px] md:h-[320px]"
    }
  ];

  const specialPrizes = [
    {
      rank: "Beginner",
      amount: "4,000",
      title: "Rising Star",
      icon: <Award size={40} />,
      color: "border-magenta-500/40",
      text: "text-magenta-400",
      glow: "shadow-magenta-500/10",
      description: "Best Beginners Team Category"
    }
  ];

  const mouseXGlobal = useMotionValue(0);
  const mouseYGlobal = useMotionValue(0);

  const handleGlobalMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseXGlobal.set((clientX / window.innerWidth) - 0.5);
    mouseYGlobal.set((clientY / window.innerHeight) - 0.5);
  };

  const orbX = useTransform(mouseXGlobal, [-0.5, 0.5], [-50, 50]);
  const orbY = useTransform(mouseYGlobal, [-0.5, 0.5], [-50, 50]);

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleGlobalMouseMove}
      className="prize-pool-section py-32 px-6 relative overflow-visible bg-transparent"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 relative"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-2 tracking-tighter">
            Prize <span className="text-purple-500">Pool</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            The ultimate bounty for computational elegance and problem-solving mastery.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-transparent mx-auto mt-8 rounded-full" />
        </motion.div>

        <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-6 mb-32">
          {mainPrizes.map((prize, index) => (
            <PrizeCard key={index} prize={prize} index={index} />
          ))}
        </div>

        <div className="pt-20 border-t border-white/5 relative">
          <div className="flex justify-center px-4">
            {specialPrizes.map((prize, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`prize-card max-w-2xl w-full bg-white/[0.02] border-2 border-magenta-500/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl relative overflow-hidden group transition-all duration-700 hover:border-magenta-500/40 shadow-2xl hover:shadow-magenta-500/20`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-40 transition-all duration-700 text-magenta-400 group-hover:rotate-12">
                  <Award size={80} />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                   <div className="flex flex-col items-center md:items-start shrink-0">
                      <span className="text-magenta-400 text-[10px] font-black uppercase tracking-[0.4em] mb-1">GRANT TOTAL</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-magenta-400">₹</span>
                        <span className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(232,121,249,0.2)]">
                          {prize.amount}
                        </span>
                      </div>
                   </div>

                   <div className="h-px w-full md:w-px md:h-20 bg-white/10" />

                   <div className="text-center md:text-left">
                      <h4 className="text-2xl font-black text-white mb-2 tracking-tight uppercase italic">{prize.title}</h4>
                      <p className="text-zinc-500 text-sm leading-relaxed font-light max-w-sm">
                        Honoring the most promising emerging talent. Target: {prize.description}.
                      </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PrizeCard = ({ prize, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -15, scale: 1.02 }}
      className={`prize-card relative w-full md:w-1/3 flex flex-col p-1 rounded-3xl border-2 transition-all duration-500 backdrop-blur-2xl bg-gradient-to-b from-white/10 to-transparent 
      ${prize.color} ${prize.glow} ${prize.order} ${prize.height} overflow-hidden group`}
    >
      <div className="absolute top-[-20px] right-[-10px] text-[18rem] font-black opacity-[0.04] select-none group-hover:opacity-[0.08] transition-all duration-500 pointer-events-none z-0 tracking-tighter leading-none">
        {prize.rank[0]}
      </div>

      <div className={`absolute right-8 top-20 opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:-translate-y-4 z-0 ${prize.text}`}>
        {prize.icon}
      </div>

      <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 z-10 bg-black/40 backdrop-blur-md">
        <span className={`text-xs font-black tracking-widest uppercase ${prize.text}`}>
          RANK {prize.rank}
        </span>
      </div>

      <div className="flex-1 flex flex-col p-10 z-10 relative">
        <div className="mt-4 mb-auto">
           <h3 className="text-white text-3xl font-black italic tracking-tighter uppercase">{prize.title}</h3>
           <div className="w-12 h-1.5 bg-current opacity-60 mt-2 rounded-full" style={{color: prize.rank === '1st' ? '#a855f7' : prize.rank === '2nd' ? '#e879f9' : '#581c87'}}></div>
        </div>
        
        <div className="pb-4">
           <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest block mb-1">Grant Allocation</span>
           <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-bold ${prize.text}`}>₹</span>
              <span className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter">
                {prize.amount}
              </span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrizePool;