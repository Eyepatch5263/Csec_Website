"use client";
import { motion } from "framer-motion";
import { Zap, BrainCircuit, BarChart3, Trophy } from 'lucide-react';

export default function AboutCompetition() {
  return (
    <section className="relative w-full py-24 px-6 md:px-16 overflow-hidden">

      
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white mb-2 tracking-tighter"
          >
            About The <span className="text-purple-500">Arena</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A battlefield for logic, speed, and precision. Only the sharpest minds rise to the top of the global leaderboard.
          </motion.p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-transparent mx-auto mt-6 opacity-40"></div>
        </div>

        {/* Main Content Card with Glassmorphism */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-16 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-magenta-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Moving Data Lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <motion.div 
               animate={{ y: [-100, 500] }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent top-0 absolute"
            />
            <motion.div 
               animate={{ y: [-500, 500] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
               className="w-full h-px bg-gradient-to-r from-transparent via-magenta-500/30 to-transparent top-0 absolute"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Text */}
            <div className="space-y-8 text-zinc-400 leading-relaxed text-base md:text-lg">
              <p className="first-line:uppercase first-line:tracking-widest first-line:text-white first-line:font-black">
                <span className="text-white font-bold">Code Arena</span> is a 
                premier competitive programming challenge designed to test your ability 
                to think logically, solve complex problems, and implement efficient 
                algorithms under intense pressure.
              </p>

              <p>
                Participants face a carefully curated set of algorithmic 
                problems inspired by real-world ICPC and LeetCode challenges. 
                Speed, correctness, and optimization will determine who climbs 
                the leaderboard.
              </p>

              <div className="flex flex-wrap gap-4 relative z-10">
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-zinc-300">Algorithm</div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-zinc-300">Logic</div>
                <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-sm text-zinc-300">Speed</div>
              </div>

              {/* Technical Code Decoration */}
              <div className="hidden lg:block absolute bottom-12 left-16 font-mono text-[10px] text-zinc-700 pointer-events-none select-none opacity-40">
                <p>{`while(alive) {`}</p>
                <p className="pl-4">{`solve(logic);`}</p>
                <p className="pl-4">{`optimize(code);`}</p>
                <p>{`}`}</p>
              </div>
            </div>

            {/* Right Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <FeatureCard
                icon={<Zap className="text-yellow-400" />}
                title="Fast Paced"
                desc="Solve multiple algorithmic challenges within a limited time window."
                delay={0}
              />
              <FeatureCard
                icon={<BrainCircuit className="text-purple-400" />}
                title="Logic Driven"
                desc="Problems test your understanding of complex data structures."
                delay={0.1}
              />
              <FeatureCard
                icon={<BarChart3 className="text-purple-400" />}
                title="Live Leaderboard"
                desc="Track your ranking in real time as competitors submit."
                delay={0.2}
              />
              <FeatureCard
                icon={<Trophy className="text-purple-400" />}
                title="Top Performers"
                desc="Compete for recognition and prove your problem solving ability."
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

function FeatureCard({ icon, title, desc, floatClass }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-400/40 transition-all duration-500 group relative ${floatClass}`}>
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/0 group-hover:border-white/40 transition-all" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/0 group-hover:border-white/40 transition-all" />
      <div className="mb-3 transition-transform group-hover:scale-110 duration-300">
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}