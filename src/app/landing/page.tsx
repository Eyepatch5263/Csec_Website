"use client"

import { useRouter } from "next/navigation";
import { Sansita, Poppins } from "next/font/google"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Typewriter from "typewriter-effect"
import "../../components/css/landing.css"

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

const sansita = Sansita({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const backgroundImages = [
  "https://res.cloudinary.com/dtxjhtjv2/image/upload/v1737840220/csec_q6cmnn.webp",
  "https://res.cloudinary.com/dtxjhtjv2/image/upload/v1737826104/pic5_yzrf3s.jpg",
  "https://res.cloudinary.com/dtxjhtjv2/image/upload/v1737846883/pic12_rvqhhq.webp",
  "https://res.cloudinary.com/dtxjhtjv2/image/upload/v1737846891/pic7_j7dltr.webp",
  "https://res.cloudinary.com/dtxjhtjv2/image/upload/v1737846888/pic3_d3nckj.webp"
]

export default function Landing() {
   const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      router.push("/codearena");
    }, 700);
  };


  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [nextImageIndex, setNextImageIndex] = useState(1)

  useEffect(() => {
    const transitionDuration = 2000 // 2 seconds, matching the CSS transition
    const intervalDuration = 7000 // 7 seconds total (5 seconds display + 2 seconds transition)

    const intervalId = setInterval(() => {
      setNextImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
      }, transitionDuration)
    }, intervalDuration)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={`landing-container ${poppins.variable}`} id="landing">
      {/* {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`background-image ${index === currentImageIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))} */}
      <div className="content-container">
        <div className="main-content">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className={`title ${poppins.variable}`}>CSEC</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className={`subtitle ${sansita.className}`}>
              <Typewriter
                options={{
                  strings: ["Computer Science Engineers' Community"],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 25,
                }}
              />
            </h2>
            <motion.button
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.95 }}
  className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
             text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
>
       <a
      href="/codearena"
      onClick={handleClick}
      className="relative inline-flex items-center justify-center px-12 py-6 text-lg font-mono font-medium tracking-tighter text-white rounded-2xl 
      bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 
      shadow-lg hover:shadow-2xl 
      transition-all duration-300 
      group overflow-hidden
      disabled:opacity-70"
    >
      {/* Glow Effect */}
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

      {/* Animated Border */}
      <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/40 transition-all duration-300"></span>

      {/* Content */}
      <span className="relative flex flex-col items-center justify-center text-center leading-tight transition-all duration-300">
        {loading ? (
          <div className="flex flex-col items-center gap-3 animate-fadeIn">
            <div className="w-7 h-7 border-4 border-white/80 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm tracking-widest opacity-90 animate-pulse">
              Redirecting...
            </span>
          </div>
        ) : (
          <div className="transition-all duration-300 group-hover:scale-105">
            <span className="text-2xl">
              Welcome to Code Arena
            </span>
            <br />
            <span className="text-sm tracking-widest opacity-90">
              OUR LATEST EVENT
            </span>
          </div>
        )}
      </span>
    </a>
    </motion.button>
          </motion.div>   
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className={`text-lg ${sansita.className}`}>Empowering the Future, One Code at a Time</p>
        </motion.div>
      </div>
    </div>
  )
}

