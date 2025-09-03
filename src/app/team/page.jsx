"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Poppins, Inria_Serif } from "next/font/google"
import Modal from "../../components/ui/Modal"
import SearchBar from "../../components/ui/SearchBar"
import alumniData from "../../utils/team.json"
import "../../components/css/team.css"
import Image from "next/image"

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})



const TeamsPage = () => {
  const [selectedBatch, setSelectedBatch] = useState("")
  const [selectedName, setSelectedName] = useState("")
  const [showModal, setShowModal] = useState(false)

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value)
  }

  const handleNameChange = (e) => {
    setSelectedName(e.target.value)
  }

  const filterOptions = [
    { value: "", title: "Select Batch" },
    { value: "2026", title: "Batch 2026" },
    { value: "2027", title: "Batch 2027" },
    { value: "2028", title: "Batch 2028" },
  ]

  const filteredCards = alumniData.filter((card) => {
    return (
      (!selectedBatch || card.batch.includes(selectedBatch)) &&
      (!selectedName || card.name.toLowerCase().startsWith(selectedName.toLowerCase()))
    )
  })

  const groupedCards = filteredCards.reduce((acc, card) => {
    if (!acc[card.batch]) {
      acc[card.batch] = []
    }
    acc[card.batch].push(card)
    return acc
  }, {})

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <section className={`teams-section ${poppins.variable} `}>
      <div className="teams-container">
        <motion.div
          className="teams-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-7xl font-extrabold mb-4 text-gray-400 ${poppins.className}`}>Meet Our Team</h2>
          <p className={`text-gray-500 max-w-2xl text-3xl mx-auto font-semibold`}>
            The brilliant minds behind CSEC
          </p>
        </motion.div>

        <div className="filter-container">
          <button onClick={openModal} className={`filter-button `}>
            Open Filter Options
          </button>
          <SearchBar selectedName={selectedName} handleNameChange={handleNameChange} />
        </div>

        {showModal && (
          <Modal
            showModal={showModal}
            handleClose={closeModal}
            handleBatchChange={handleBatchChange}
            selectedBatch={selectedBatch}
            filterOptions={filterOptions}
          >
            <SearchBar selectedName={selectedName} handleNameChange={handleNameChange} />
          </Modal>
        )}

        <div className="teams-grid">
          {Object.keys(groupedCards).map((batch) => (
            <motion.div
              key={batch}
              className="batch-container"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-center text-3xl md:text-5xl`}>{batch}</h3>
              <div className="cards-container">
                {groupedCards[batch].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-lg shadow-lg"
                  >
                    <Image
                      src={card.imgSrc || "/placeholder.svg"}
                      alt={card.name}
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className={`text-xl font-bold mb-1 `}>{card.name}</h3>
                        <p className={`text-sm mb-2 `}>{card.quote}</p>
                        <div className="flex space-x-2">
                          {card.instagram && (
                            <a href={card.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                              <img src="/Instagram.png" alt="Instagram" className="w-6 h-6 filter invert" />
                            </a>
                          )}
                          {card.linkedin && (
                            <a href={card.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                              <img src="/Linkedin.png" alt="LinkedIn" className="w-6 h-6 filter invert" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamsPage