// src/components/Leaderboard.tsx
import React from 'react'
import { shortenAddress } from '../../utils/helpers'

interface LeaderboardProps {
  data: Array<{
    walletAddress: string
    kmDriven: number
    coinsEarned: number
    expPoints: number
  }>
  onClose: () => void
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data, onClose }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 max-h-3/4 overflow-y-auto">
        <h2 className="text-xl mb-4 flex justify-between items-center">
          Leaderboard
          <button onClick={onClose} className="text-red-500">
            X
          </button>
        </h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Km Driven</th>
              <th className="px-4 py-2">Coins Earned</th>
              <th className="px-4 py-2">
                Exp Points <span className="cursor-pointer">i</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.walletAddress} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {shortenAddress(user.walletAddress)}
                </td>
                <td className="border px-4 py-2">{user.kmDriven}</td>
                <td className="border px-4 py-2 flex justify-center items-center">
                  <img
                    src="/assets/coinIcon.svg"
                    alt="Coin"
                    className="w-4 h-4 mr-1"
                  />
                  {user.coinsEarned}
                </td>
                <td className="border px-4 py-2 flex justify-center items-center">
                  <img
                    src="/assets/expIcon.svg"
                    alt="Exp"
                    className="w-4 h-4 mr-1"
                  />
                  {user.expPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 text-sm text-gray-500">
          <strong>Exp Points</strong> = Km Driven + (Coins Earned * 10)
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
