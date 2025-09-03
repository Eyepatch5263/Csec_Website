"use client"
import React from "react"
import { Poppins, Sansita } from "next/font/google"
import { motion } from "framer-motion"
import "../../src/components/css/about.css"

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

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

const HodSay = () => {
    return (
        <section className={`about-section ${poppins.variable} p-4 md:p-8`}>
            <motion.div
                className="about-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
            >
                <div className="bg-[#f4f0eb] flex flex-col md:flex-row justify-center items-center p-6 sm:p-8 md:p-12 lg:p-16 mt-8 md:mt-12 lg:mt-0 gap-10">
                    <motion.div
                        className="flex justify-center items-center w-full rounded-xl"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <img
                            src="./ioc.jpg"
                            className="border rounded-xl w-full md:w-auto md:h-[8rem] object-cover"
                            alt="HOD"
                        />
                    </motion.div>
                    <motion.div
                        className="flex flex-col justify-center items-center md:w-2/3"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        <div className="max-w-screen-lg w-full">
                            <h2 className="text-2xl md:text-3xl font-bold tracking-wide pb-4 sm:pb-6 lg:pb-8 text-center md:text-left">
                                <span className="pl-4">
                                    Message from OIC
                                </span>
                            </h2>
                            <div className="text-base md:text-lg lg:text-xl tracking-wider text-justify md:text-left">
                                <p className="font-bold md:text-2xl text-xl">Greetings to all</p>
                                <br/>
                                <p className="mt-10 text-lg">
                                Welcome to the Computer Science Engineers&apos; Community (CSEC)! As the Faculty Coordinator of CSEC, a warm welcome is extended to all members and visitors. CSEC serves as a platform where students can collaborate, innovate, and enhance their technical skills. Through workshops, hackathons, guest lectures, and project-based activities, opportunities are provided for students to grow, learn, and connect with industry professionals, and develop solutions to real-world challenges. Active engagement and contribution to the CSEC are encouraged to help and shape the future of technology. Let&apos;s work together to push boundaries and develop as the next generation of computer science leaders.</p>
                                <br/>
                                <span className="text-end font-bold text-lg mt-6 block md:inline-block">- Dr. Jyoti Srivastava</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default HodSay