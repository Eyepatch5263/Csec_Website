"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Poppins, Sansita } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const sansita = Sansita({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHackAd, setShowHackAd] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const targetDate = new Date("2025-03-21T00:00:00").getTime();
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  function calculateTimeLeft() {
    const difference = targetDate - new Date().getTime();
    return {
      days: formatTime(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: formatTime(Math.floor((difference / 1000 / 60) % 60)),
      seconds: formatTime(Math.floor((difference / 1000) % 60)),
    };
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }


  // Trigger glitch effect every few seconds
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      const hackText = document.getElementById("landing");
      if (hackText) {
        const hackheight = hackText.offsetHeight;
        setShowHackAd(window.scrollY > hackheight * 0.5);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar with adjusted position */}
      <motion.nav
        className={`fixed w-full z-40 transition-all duration-300 text-white/90 ${
          scrolled
            ? "bg-black/50 backdrop-blur-md shadow-lg"
            : "bg-transparent "
        }`}
      >
        <div
          className={`container  mx-auto flex justify-between items-center p-4`}
        >
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 hidden md:block duration-300 text-white/90 ${
              scrolled
                ? "bg-black/50 backdrop-blur-md shadow-lg"
                : "bg-transparent"
            }
             style={{ width:}}
              {/* Content */}`}
          >
            <div className="flex items-center justify-center">
              {" "}
              {/* Content */}
              <div className="container min-w-full mx-auto px-4 py-3 relative z-10 ">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:justify-evenly">
                  {/* CSEC and Hack Logo */}
                  <div className="flex items-center space-x-3 mb-2 md:mb-0 md:w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                          key="logos"
                          className="flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* CSEC Logo - Link to external site */}
                          <motion.a
                            href="/"
                            className="relative w-[64px] h-[64px] mr-3"
                            whileHover={{}}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          >
                            <Image
                              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/csec-RitzmBrgdmOMfzaijUqHFSmOVA4LzO.png"
                              alt="CSEC Logo"
                              fill
                              className="object-contain"
                            />
                          </motion.a>
                        </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Nav Links*/}
                  <div className="container items-center ">
                    <div className="hidden md:flex space-x-12 md:w-full md:justify-end">
                      <Link
                        href="/gallery"
                        className="hover:text-gray-400 md:text-2xl text-xl"
                      >
                        Gallery
                      </Link>
                      <Link
                        href="/team"
                        className="hover:text-gray-400 md:text-2xl text-xl"
                      >
                        Team
                      </Link>
                      <Link
                        href="/alumni"
                        className="hover:text-gray-400 md:text-2xl text-xl"
                      >
                        Alumni
                      </Link>
                    </div>
                    <div className="md:hidden">
                      <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <AnimatePresence mode="wait">
              <motion.div
                key="logos"
                className="flex items-center md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* CSEC Logo - Link to external site */}
                <motion.a
                  href="/"
                  className="relative w-[48px] h-[48px] mr-3"
                  whileHover={{}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/csec-RitzmBrgdmOMfzaijUqHFSmOVA4LzO.png"
                    alt="CSEC Logo"
                    fill
                    className="object-contain"
                  />
                </motion.a>
              </motion.div>
          </AnimatePresence>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black/50 backdrop-blur-md shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                href="/gallery"
                className="hover:text-gray-400"
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/team"
                className="hover:text-gray-400"
                onClick={() => setMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href="/alumni"
                className="hover:text-gray-400"
                onClick={() => setMenuOpen(false)}
              >
                Alumni
              </Link>
            </div>
          </div>
        )}
      </motion.nav>

      {/* Add keyframes for animations */}
      <style jsx global>{`
        @keyframes digitalRain {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(60px);
            opacity: 0;
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </>
  );
}
