"use client";

import React from 'react';
import { motion } from 'framer-motion';
import './css/PrizePool.css';
import { Trophy, Timer } from 'lucide-react';
import { useScroll, useTransform, useMotionValue } from "framer-motion";

const PrizePool = () => {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const mouseXGlobal = useMotionValue(0);
  const mouseYGlobal = useMotionValue(0);

  const handleGlobalMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseXGlobal.set(((clientX - rect.left) / rect.width) - 0.5);
    mouseYGlobal.set(((clientY - rect.top) / rect.height) - 0.5);
  };

  return (
    <section 
      ref={sectionRef} 
      onMouseMove={handleGlobalMouseMove}
      className="prize-pool-section py-32 px-6 relative overflow-visible bg-transparent"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-2 tracking-tighter">
            Prize <span className="text-purple-500">Pool</span>
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            The ultimate bounty for computational elegance and problem-solving mastery.
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-600 to-transparent mx-auto mt-8 rounded-full" />
        </motion.div>

        {/* Revealing Soon Placeholder */}
        <div className="flex justify-center items-center py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full max-w-3xl p-1 rounded-[3rem] bg-gradient-to-b from-purple-500/20 to-transparent border-2 border-purple-500/30 backdrop-blur-3xl overflow-hidden group shadow-[0_0_50px_rgba(168,85,247,0.1)]"
          >
            {/* Background Decorative Icon */}
            <div className="absolute -right-10 -bottom-10 text-purple-500/10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
              <Trophy size={300} />
            </div>

            <div className="relative z-10 p-12 md:p-20 flex flex-col items-center text-center">
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  filter: ["drop-shadow(0 0 5px rgba(168,85,247,0.5))", "drop-shadow(0 0 20px rgba(168,85,247,0.8))", "drop-shadow(0 0 5px rgba(168,85,247,0.5))"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="mb-8 p-6 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20"
              >
                <Timer size={48} strokeWidth={1.5} />
              </motion.div>
              
              <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4">
                Revealing <span className="text-purple-500">Soon</span>
              </h3>
              
              <p className="text-zinc-400 text-base md:text-lg max-w-md font-light leading-relaxed">
                We&apos;re currently finalizing the grant allocations. Prepare yourselves for the most rewarding CodeArena yet.
              </p>

              <div className="mt-10 flex gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    className="w-2 h-2 rounded-full bg-purple-500"
                  />
                ))}
              </div>
            </div>

            {/* Subtle light sweep animation */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrizePool;