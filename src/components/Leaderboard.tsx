import React, { useEffect, useState } from 'react'
import MenuTab from './MenuTab'
import driverFront from '../assets/sketches/driver_front.svg' // Import the SVG as a regular image

// Define the structure of a Leaderboard Entry
interface LeaderboardEntry {
  rank: number
  username: string
  totalEarnedKJ: string
  experienceLevel: number
  rating: number
}

const Leaderboard: React.FC = () => {
  // Mock data for leaderboard
  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: 'TopDriver123',
      totalEarnedKJ: '5000000n',
      experienceLevel: 10,
      rating: 5.0,
    },
    {
      rank: 2,
      username: 'Speedster89',
      totalEarnedKJ: '4500000n',
      experienceLevel: 9,
      rating: 4.9,
    },
    {
      rank: 3,
      username: 'NightRider',
      totalEarnedKJ: '4000000n',
      experienceLevel: 8,
      rating: 4.8,
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
        className="text-5xl font-cartoon text-center text-[#30ddf0] mb-8 gap-5"
        style={{ textShadow: '2px 2px 8px rgba(0, 229, 255, 0.6)' }}
      >
        Game Leaderboard
      </h2>

      {/* Table Container */}
      <div
        className={`overflow-x-auto rounded-xl ${
          animate ? 'animate-slide-hint' : ''
        }`}
      >
        <table className="min-w-full bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-md rounded-lg">
          {/* Table Header */}
          <thead>
            <tr className="bg-[#4D00FF] text-white">
              <th className="px-4 py-3 text-center text-sm uppercase tracking-wide">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-sm uppercase tracking-wide">
                Username
              </th>
              <th className="px-6 py-3 text-center text-sm uppercase tracking-wide">
                Total Earned
              </th>
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
                <td className="border-t border-gray-700 px-4 py-4 text-center">
                  <span className="font-semibold text-[#30ddf0] text-xl">
                    {entry.rank}
                  </span>
                </td>

                {/* Username Cell with Portrait */}
                <td className="border-t border-gray-700 px-6 py-4">
                  <div className="flex items-center">
                    {/* Driver Portrait */}
                    <img
                      src={driverFront}
                      alt={`${entry.username} portrait`}
                      className="w-12 h-12 mr-4 object-contain rounded-full border-2 border-stone-800"
                    />
                    {/* Username and Additional Details */}
                    <div>
                      <span className="text-white font-bold text-lg">
                        {entry.username}
                      </span>
                      <span className="text-sm text-gray-300 block mt-1">
                        Level {entry.experienceLevel} | ⭐{' '}
                        {entry.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Total Earned KJ Cell */}
                <td className="border-t border-gray-700 px-6 py-4 text-center">
                  <span className="text-[#ee6537] font-medium text-base">
                    {entry.totalEarnedKJ.toString()} KJ
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
