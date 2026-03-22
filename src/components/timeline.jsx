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
      time: "20 March",
      stepNumber: "01",
    },
    {
      title: "Intern Talk",
      desc: "Exclusive insights into industry standards and internship opportunities. Timings: 5 PM to 8 PM.",
      time: "25 March - 5 PM to 8 PM",
      stepNumber: "02",
    },
    {
      title: "Vibe Coding Arena Registration",
      desc: "HackerEarth Vibe Coding Event (online) live registrations open. Secure your spot in the arena.",
      time: "25 March",
      stepNumber: "03",
    },
    {
      title: "Vibe Coding Arena Ends",
      desc: "Vibe coding event close. Last call to submit the galactic battle.",
      time: "04 April",
      stepNumber: "04",
    },
    {
      title: "Logic Loop",
      desc: "Up To Skills Quiz starts. Test your foundational knowledge before the main event.",
      time: "05 April - 10 AM",
      stepNumber: "05",
    },
    {
      title: "Guest Lecture",
      desc: "Expert session from industry leaders to inspire and guide the participants.",
      time: "05 April - 11 AM",
      stepNumber: "06",
    },
    {
      title: " Code Arena - Main Contest",
      desc: "The ultimate battle begins. High-intensity coding challenges go live.",
      time: "05 April - 1 PM",
      stepNumber: "07",
    },
    {
      title: "Final Results",
      desc: "Winners are announced. Top performers take home the bounty from the prize pool.",
      time: "05 April - 3 PM",
      stepNumber: "08",
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
            <h2 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter">
              Event <span className="text-purple-500">Timeline</span>
            </h2>
            <p className="text-zinc-500 mt-4 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
              Track the trajectory of the mission. Don&apos;t miss the critical launch windows.
            </p>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-6" />
          </motion.div>
        </div>

        <div className="relative pt-10 pb-20 px-4 md:px-0">
          {/* Animated Progress Line */}
          <div className="absolute left-[calc(2rem-1px)] md:left-1/2 top-4 bottom-4 w-[2px] bg-white/5 z-0">
            <motion.div 
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500 to-cyan-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>

          <div className="space-y-24 md:space-y-32 relative">

            {steps.map((step, i) => {
              const isEven = i % 2 === 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                  className={`flex flex-col md:flex-row items-center justify-between w-full relative z-10 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Empty space for the other side on desktop */}
                  <div className="w-5/12 hidden md:block" />

                  {/* Center Checkpoint Node */}
                  <div className="absolute left-8 md:static md:w-2/12 flex flex-col items-center justify-center z-20 mt-4 md:mt-0">
                    
                    {/* Map Pointer */}
                    {activeIndex === i && (
                      <motion.div 
                        key="map-pointer"
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute inset-0 flex items-center justify-center -translate-y-6 pointer-events-none z-30"
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
                  <div className="w-full pl-14 md:pl-0 md:w-5/12">
                    <div className={`
                      bg-white/[0.03] backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl hover:border-white/20 transition-all duration-300
                      ${!isEven ? "md:text-right" : "md:text-left"}
                    `}>
                      <div className={`flex flex-col ${!isEven ? "md:items-end" : "md:items-start"} items-start`}>
                        <span className="text-4xl md:text-5xl font-black text-white/5 mb-2 select-none">
                          {step.stepNumber}
                        </span>
                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-6">
                          {step.desc}
                        </p>
                        
                        <div className="inline-block bg-purple-500/10 rounded-xl px-4 py-2 border border-purple-500/20">
                          <span className="text-purple-400 text-xs md:text-sm font-bold tracking-widest uppercase">
                            {step.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}