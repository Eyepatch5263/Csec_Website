"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Poppins, Inria_Serif } from 'next/font/google'
import { Input } from '../../components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Medal } from 'lucide-react'
import axios from 'axios'
import '../../components/css/leaderboards.css'

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})



const Leaderboards = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchLeaderboardData()
  }, [])

  const fetchLeaderboardData = async () => {
    try {
      // const response = await axios.get('/api/fetch_user')
      // setLeaderboardData(response.data)
      setLeaderboardData([
        { Rank: '1', Name: ' antrikshkatna03', Score: '7974' },
        { Rank: '2', Name: 'harsh580g', Score: '6011' },
        { Rank: '3', Name: 'Navdeep066', Score: '5833' },
        { Rank: '4', Name: 'Tanishq_v010', Score: '5792' },
        { Rank: '5', Name: 'himanshu12102004', Score: '5731' },
        { Rank: '6', Name: 'kashu_06', Score: '5403' },
        { Rank: '7', Name: 'srijansharma1605', Score: '5319' },
        { Rank: '8', Name: 'Aryan3612_', Score: '4951' },
        { Rank: '9', Name: 'Prashant_thakur77', Score: '4762' },
        { Rank: '10', Name: 'Harry_0509', Score: '4737' }
      ])
    } catch (error) {
      console.error('Error fetching leaderboard data:', error)
      // Fallback to dummy data if API fails
    }
  }

  const getAvatarColor = (rank) => {
    switch (rank) {
      case '1': return 'gold'
      case '2': return 'silver'
      case '3': return 'bronze'
      default: return 'gray'
    }
  }

  const filteredLeaderboard = leaderboardData.filter(contestant =>
    contestant.Name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className={`}`}>
      <div className="text-5xl font-bold">

        Leaderboards

        <motion.div
          className="search-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            // @ts-expect-error build
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-input `}
          />
        </motion.div>

        <div className="leaderboard-grid">
          {filteredLeaderboard.map((contestant, index) => (
            <motion.div
              key={contestant.Rank}
              className="contestant-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {/* @ts-expect-error build */}
              <Avatar className={`avatar ${getAvatarColor(contestant.Rank)}`}>

                {/* @ts-expect-error build */}

                <AvatarFallback>{contestant.Name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="contestant-info">
                <p className={`contestant-name `}>{contestant.Name}</p>
                <p className={`contestant-score ${poppins.className}`}>{contestant.Score}</p>
              </div>
              <span className={`rank ${poppins.className}`}>#{contestant.Rank}</span>
              {contestant.Rank <= 3 && <Medal className={`medal ${getAvatarColor(contestant.Rank)}`} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Leaderboards
