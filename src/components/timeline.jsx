"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

export default function Timeline() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const steps = [
    {
      title: "Registration Opens",
      desc: "Sign up and prepare for the coding battle. Form your teams and get ready.",
      time: "17 March",
      color: "from-purple-500 to-purple-600",
      glowColor: "shadow-purple-500/50",
      align: "left",
      stepNumber: "01",
    },
    {
      title: "Contest Begins",
      desc: "Algorithmic challenges unlock and the battle starts in the arena.",
      time: "05 April",
      color: "from-magenta-400 to-magenta-500",
      glowColor: "shadow-magenta-500/50",
      align: "right",
      stepNumber: "02",
    },
    {
      title: "Leaderboard Battle",
      desc: "Compete to climb the live rankings. Solve faster to earn more points.",
      time: "05 April",
      color: "from-yellow-400 to-yellow-500",
      glowColor: "shadow-yellow-500/50",
      align: "left",
      stepNumber: "03",
    },
    {
      title: "Winners Announced",
      desc: "Top performers are recognized and rewarded for their coding prowess.",
      time: "06 April",
      color: "from-purple-400 to-purple-500",
      glowColor: "shadow-purple-500/50",
      align: "right",
      stepNumber: "04",
    },
  ];

  // Calculate which step is currently active (0 to steps.length - 1)
  const activeStep = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(activeStep, "change", (latest) => {
    setActiveIndex(Math.round(latest));
  });

  return (
    <section ref={ref} className="py-24 px-6 md:px-16 overflow-hidden relative">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
              CONTEST <span className="text-purple-500">TIMELINE</span>
            </h2>
            <p className="text-zinc-500 mt-4 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
              Follow the progression of the ultimate competitive programming battle and mark your calendars.
            </p>
          </motion.div>
        </div>

        <div className="relative pt-10 pb-20 px-4 md:px-0">
          {/* Animated Progress Line */}
          <div className="absolute left-[calc(2rem-1px)] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 z-0">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500 to-magenta-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>

          <div className="space-y-24 md:space-y-40 relative">

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className={`flex flex-col md:flex-row items-center justify-between w-full relative z-10 ${
                  step.align === "left" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Empty space for the other side on desktop */}
                <div className="w-5/12 hidden md:block" />

                {/* Center Checkpoint Node */}
                <div className="absolute left-8 md:static md:w-2/12 flex flex-col items-center justify-center z-20 mt-4 md:mt-0">
                  
                  {/* Conditionally Render the Map Pointer right above the node */}
                  {activeIndex === i && (
                    <motion.div 
                      key="map-pointer"
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute inset-0 flex items-center justify-center -translate-y-5 pointer-events-none z-30"
                    >
                      <div className="relative flex justify-center items-center">
                        <div className="absolute -inset-2 bg-purple-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                        <svg 
                          className="relative w-10 h-10 md:w-12 md:h-12 text-purple-500 filter drop-shadow-[0_4px_8px_rgba(147,51,234,0.6)] animate-bounce" 
                          fill="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </motion.div>
                  )}

                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 z-20 flex items-center justify-center transition-all duration-500 ${
                    activeIndex === i 
                      ? 'bg-purple-500 border-white scale-110 shadow-[0_0_20px_rgba(147,51,234,0.6)]' 
                      : 'bg-zinc-900 border-zinc-800 scale-100'
                  }`}>
                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${activeIndex === i ? 'bg-white' : 'bg-zinc-700'} transition-colors duration-500`} />
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full pl-20 md:pl-0 md:w-5/12">
                  <div className={`
                    bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all duration-300
                    ${step.align === "left" ? "md:text-right" : "md:text-left"}
                  `}>
                    <div className={`flex flex-col ${step.align === "left" ? "md:items-end" : "md:items-start"} items-start`}>
                      <span className={`text-5xl font-black text-white/5 mb-4 select-none`}>
                        {step.stepNumber}
                      </span>
                      <h3 className="text-xl md:text-3xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-zinc-400 text-sm md:text-lg font-light leading-relaxed mb-6">
                        {step.desc}
                      </p>
                      
                      <div className="inline-block bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                        <span className="text-zinc-300 text-sm font-medium tracking-wide">
                          {step.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
