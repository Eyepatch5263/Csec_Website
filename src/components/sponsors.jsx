"use client";
import { motion } from "framer-motion";

export default function Sponsors() {
  const sponsorlogos = [
    { name: "TUF", icon: "/sponsors/tufLogo.png" },
    { name: "Codehurdle", icon: "/sponsors/codehurdleLogo.webp" },
    { name: "Praksh", icon: "/sponsors/prakshaLogo.png" },
  ];

  // Duplicate for infinite marquee
  const marqueeLogos = [...sponsorlogos, ...sponsorlogos];

  return (
    <section className="relative w-full py-32 px-6 md:px-16 overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-magenta-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
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

        {/* Marquee Container */}
        <div className="relative">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              animate={{ x: [0, -(256 + 48) * sponsorlogos.length] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-12 py-10"
            >
              {marqueeLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center justify-center p-8 w-64 h-32 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-xl group hover:border-purple-500/40 transition-colors duration-500 relative"
                >
                  <img
                    src={logo.icon}
                    alt={logo.name}
                    className="h-10 object-contain brightness-0 invert opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Hover Decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
