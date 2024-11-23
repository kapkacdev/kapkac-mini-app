import React, { useEffect, useState } from 'react'
import MenuTab from './MenuTab'
import driverFront from '../assets/sketches/driver_front.svg' // Import the SVG as a regular image

// Define the structure of a Leaderboard Entry
interface LeaderboardEntry {
  rank: number
  username: string
  totalDrivenKm: number
  totalCollectedCoins: number
  rating: number
}

const Leaderboard: React.FC = () => {
  // Mock data for leaderboard
  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: 'TopDriver123',
      totalDrivenKm: 15000,
      totalCollectedCoins: 50000,
      rating: 5.0,
    },
    {
      rank: 2,
      username: 'Speedster89',
      totalDrivenKm: 12500,
      totalCollectedCoins: 45000,
      rating: 4.9,
    },
    {
      rank: 3,
      username: 'NightRider',
      totalDrivenKm: 10000,
      totalCollectedCoins: 40000,
      rating: 4.8,
    },
    {
      rank: 4,
      username: 'TurboTaxi',
      totalDrivenKm: 9500,
      totalCollectedCoins: 38000,
      rating: 4.7,
    },
    {
      rank: 5,
      username: 'RoadWarrior',
      totalDrivenKm: 8500,
      totalCollectedCoins: 34000,
      rating: 4.6,
    },
    {
      rank: 6,
      username: 'DriftKing',
      totalDrivenKm: 8000,
      totalCollectedCoins: 32000,
      rating: 4.5,
    },
    {
      rank: 7,
      username: 'PedalPusher',
      totalDrivenKm: 7500,
      totalCollectedCoins: 30000,
      rating: 4.4,
    },
    {
      rank: 8,
      username: 'StreetSlider',
      totalDrivenKm: 7000,
      totalCollectedCoins: 28000,
      rating: 4.3,
    },
    {
      rank: 9,
      username: 'WheeliePro',
      totalDrivenKm: 6800,
      totalCollectedCoins: 26000,
      rating: 4.2,
    },
    {
      rank: 10,
      username: 'TaxiTornado',
      totalDrivenKm: 6500,
      totalCollectedCoins: 24000,
      rating: 4.1,
    },
    {
      rank: 11,
      username: 'HighwayHero',
      totalDrivenKm: 6200,
      totalCollectedCoins: 22000,
      rating: 4.0,
    },
    {
      rank: 12,
      username: 'RaceRider',
      totalDrivenKm: 6000,
      totalCollectedCoins: 20000,
      rating: 3.9,
    },
    {
      rank: 13,
      username: 'FastFare',
      totalDrivenKm: 5800,
      totalCollectedCoins: 18000,
      rating: 3.8,
    },
    {
      rank: 14,
      username: 'SkylineCabbie',
      totalDrivenKm: 5500,
      totalCollectedCoins: 17000,
      rating: 3.7,
    },
    {
      rank: 15,
      username: 'NitroDriver',
      totalDrivenKm: 5200,
      totalCollectedCoins: 16000,
      rating: 3.6,
    },
    {
      rank: 16,
      username: 'TaxiRocket',
      totalDrivenKm: 5000,
      totalCollectedCoins: 15000,
      rating: 3.5,
    },
    {
      rank: 17,
      username: 'FastLanePro',
      totalDrivenKm: 4800,
      totalCollectedCoins: 14000,
      rating: 3.4,
    },
    {
      rank: 18,
      username: 'UrbanRacer',
      totalDrivenKm: 4500,
      totalCollectedCoins: 13000,
      rating: 3.3,
    },
    {
      rank: 19,
      username: 'MetroSpeed',
      totalDrivenKm: 4300,
      totalCollectedCoins: 12000,
      rating: 3.2,
    },
    {
      rank: 20,
      username: 'CitySurge',
      totalDrivenKm: 4000,
      totalCollectedCoins: 10000,
      rating: 3.1,
    },
  ]

  // State to control the animation trigger
  const [animate, setAnimate] = useState<boolean>(false)

  useEffect(() => {
    // Trigger the slide animation on component mount
    setAnimate(true)
    // Remove the animation class after the animation duration to prevent replaying
    const timer = setTimeout(() => setAnimate(false), 1000) // 1 second duration
    return () => clearTimeout(timer) // Cleanup the timer on unmount
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 px-4 pt-12">
      {/* Leaderboard Title */}
      <h2
        className="text-4xl text-center font-serif text-[#30ddf0] mb-6"
        style={{ textShadow: '2px 2px 8px rgba(0, 229, 255, 0.6)' }}
      >
        Game Leaderboard
      </h2>
      <p className="text-stone-400 text-sm mb-4">
        Drive as long as you can to get more coins and top up the leaderboard by
        the longest ride! 🚖💨
      </p>

      {/* Table Container */}
      <div
        className={`overflow-x-auto rounded-xl ${
          animate ? 'animate-slide-hint' : ''
        }`}
      >
        <table className="w-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-md rounded-lg text-sm">
          {/* Table Header */}
          <thead>
            <tr className="bg-gradient-to-b from-[#4D00FF] to-[#200072] text-stone-100 divide-x divide-stone-700">
              <th className="px-2 py-2 text-center tracking-wide">Rank</th>
              <th className="px-4 py-2 text-center tracking-wide">Profile</th>
              <th className="px-2 py-2 text-center tracking-wide">Driven KM</th>
              <th className="px-2 py-2 text-center tracking-wide">Coins</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {leaderboard.map((entry) => (
              <tr
                key={entry.rank}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                {/* Rank Cell */}
                <td className="border-t border-gray-700 px-2 py-3 text-center">
                  <span className="font-semibold text-[#30ddf0]">
                    {entry.rank}
                  </span>
                </td>

                {/* Username Cell */}
                <td className="border-t border-gray-700 px-2 py-3">
                  <div className="flex items-center gap-1">
                    {/* Driver Portrait */}
                    <img
                      src={driverFront}
                      alt={`${entry.username} portrait`}
                      className="w-8 h-8 rounded-full border border-stone-800"
                    />
                    {/* Username and Star Rating */}
                    <div className="text-stone-200">
                      <span className="block font-bold">{entry.username}</span>
                      <span className="text-xs text-gray-400">
                        ⭐ {entry.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Total Driven KM Cell */}
                <td className="border-t border-gray-700 px-2 py-3 text-center">
                  <span className="text-[#30ddf0]">
                    {entry.totalDrivenKm.toLocaleString()} KM
                  </span>
                </td>

                {/* Total Collected Coins Cell */}
                <td className="border-t border-gray-700 px-2 py-3 text-center">
                  <span className="text-[#FFD700]">
                    {entry.totalCollectedCoins.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Menu Tab */}
      <MenuTab />
    </div>
  )
}

export default Leaderboard
