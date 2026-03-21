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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <style>{`
                .get-started-btn {
                  position: relative;
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                  padding: 14px 48px;
                  border-radius: 10px;
                  background: rgba(0, 0, 0, 0.4);
                  border: 1.5px solid rgba(255, 255, 255, 0.3);
                  cursor: pointer;
                  text-decoration: none;
                  transition: all 0.3s ease;
                  overflow: hidden;
                  min-width: 200px;
                  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05);
                  animation: glowPulse 3s ease-in-out infinite;
                }

                .get-started-btn::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: -100%;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                  transition: left 0.5s ease;
                }

                .get-started-btn:hover::before {
                  left: 100%;
                }

                .get-started-btn:hover {
                  background: rgba(0, 0, 0, 0.5);
                  border-color: rgba(255, 255, 255, 0.5);
                  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.15);
                  transform: scale(1.05);
                  animation: glowPulse 1.5s ease-in-out infinite;
                }

                .get-started-btn:active {
                  transform: scale(0.98);
                }

                .btn-text {
                  font-size: 18px;
                  font-weight: 500;
                  letter-spacing: 1px;
                  color: #ffffff;
                  text-shadow: 0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.3);
                  transition: all 0.3s ease;
                  position: relative;
                  z-index: 1;
                  animation: textFloat 3s ease-in-out infinite;
                }

                .get-started-btn:hover .btn-text {
                  text-shadow: 0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.6);
                  animation: textFloat 1.5s ease-in-out infinite;
                }

                .spinner {
                  width: 20px;
                  height: 20px;
                  border: 2px solid rgba(255, 255, 255, 0.2);
                  border-top: 2px solid #ffffff;
                  border-radius: 50%;
                  animation: spin 0.8s linear infinite;
                  margin-right: 10px;
                  position: relative;
                  z-index: 1;
                }

                @keyframes spin {
                  to { transform: rotate(360deg); }
                }

                @keyframes glowPulse {
                  0%, 100% {
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05);
                  }
                  50% {
                    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 25px rgba(255, 255, 255, 0.1);
                  }
                }

                @keyframes textFloat {
                  0%, 100% {
                    transform: translateY(0px);
                    letter-spacing: 1px;
                  }
                  50% {
                    transform: translateY(-2px);
                    letter-spacing: 1.5px;
                  }
                }
              `}</style>

              <a
                href="/codearena"
                className="get-started-btn"
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="spinner"></div>
                    <span className="btn-text">Entering...</span>
                  </div>
                ) : (
                  <span className="btn-text">CodeArena</span>
                )}
              </a>
            </motion.div>
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

