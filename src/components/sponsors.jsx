"use client";
import { motion } from "framer-motion";

export default function Sponsors() {
  const sponsorlogos = [
    { name: "TUF", icon: "/sponsors/tufLogo.png" },
    { name: "Codehurdle", icon: "/sponsors/codehurdleLogo.webp" },
    { name: "Praksh", icon: "/sponsors/prakshaLogo.png" },
    { name: "Upto Skills", icon: "/sponsors/uptoskills.png" },
    { name: "Hackerearth", icon: "/sponsors/hackerearth.png" },
  ];

  const marqueeLogos = [...sponsorlogos, ...sponsorlogos];

  return (
    <section className="relative w-full py-32 px-6 md:px-16 overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-magenta-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
              Our <span className="text-purple-500">Sponsors</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Empowering the next generation of algorithmic pioneers through strategic collaboration.
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-transparent mx-auto mt-8 opacity-30" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-14"
        >
          <motion.div
            animate={{ opacity: [0.22, 0.5, 0.22], scale: [0.96, 1.02, 0.96] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-[92%] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[90px]"
          />

          <div className="relative mx-auto flex h-[340px] w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-[3rem] border-2 border-purple-500/40 px-6 py-10 shadow-[0_0_45px_rgba(168,85,247,0.25)] md:h-[420px] md:px-12">
            <div className="pointer-events-none absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)', backgroundSize: '34px 34px' }} />
         

            <div className="relative z-10 mb-5 rounded-full border border-purple-300/35 bg-purple-500/15 p-5 shadow-[0_0_24px_rgba(168,85,247,0.35)] md:p-6">
              <img
                src="/sponsors/unstop.webp"
                alt="Unstop"
                className="h-20 rounded-md w-auto object-contain md:h-30"
                
                loading="lazy"
              />
            </div>

            <h3 className="relative z-10 text-center text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
              Powered By
            </h3>

            <div className="relative z-10 my-4 h-[3px] w-20 rounded-full bg-purple-400 shadow-[0_0_20px_#a855f7]" />

            <p className="relative z-10 text-center text-[11px] font-black uppercase tracking-[0.38em] text-purple-200 md:text-xs">
              Unstop Strategic Partner
            </p>
          </div>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex overflow-hidden  [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              animate={{ x: [0, -(256 + 48) * sponsorlogos.length] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-12 py-10"
            >
              {marqueeLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0  flex items-center justify-center p-8 w-64 h-32 border border-white/5 bg-white/5 rounded-2xl backdrop-blur-xl group hover:border-white/20 hover:bg-white/10 transition-all duration-500 relative"
                >
                  <img
                    src={logo.icon}
                    alt={logo.name}
                    // Removed 'brightness-0 invert' so original colors show.
                    // Removed 'opacity-40' so they don't look faded by default.
                    // Added 'mix-blend-multiply' as an optional trick to hide white backgrounds on JPEGs if needed.
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}