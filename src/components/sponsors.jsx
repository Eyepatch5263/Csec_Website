"use client";
import { motion } from "framer-motion";

export default function Sponsors() {
  const sponsorlogos = [
    { name: "TUF", icon: "/sponsors/tufLogo.png" },
    { name: "Codehurdle", icon: "/sponsors/codehurdleLogo.webp" },
    { name: "Praksh", icon: "/sponsors/prakshaLogo.png" },
    { name: "Upto Skills", icon: "/sponsors/uptoskills.png" },
    { name: "Hackerearth", icon: "/sponsors/hackerearth.webp" },
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
          <div className="flex overflow-hidden  [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              animate={{ x: [0, -(320 + 48) * sponsorlogos.length] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-12 py-12"
            >
              {marqueeLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center justify-center p-10 w-80 h-48 rounded-3xl group relative overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/10 rounded-3xl" />
                  
                  {/* Border with Glow */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-500" />
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/30 via-transparent to-transparent shadow-[inset_0_0_30px_rgba(168,85,247,0.3),0_0_40px_rgba(168,85,247,0.4)]" />
                  
                  {/* Backdrop */}
                  <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-lg rounded-3xl group-hover:bg-white/[0.08] transition-all duration-500" />
                  
                  {/* Logo Container */}
                  <div className="relative z-10 h-[90%] w-[90%] flex items-center justify-center">
                    <img
                      src={logo.icon}
                      alt={logo.name}
                      className="h-full w-full object-contain transition-all duration-500 group-hover:scale-125 group-hover:brightness-110 filter drop-shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                    />
                  </div>
                  
                  {/* Top Accent Light */}
                  <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-b from-purple-400/30 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Bottom Accent Light */}
                  <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-to-t from-pink-400/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}