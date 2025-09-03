"use client"

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

