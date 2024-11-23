// src/components/TopLeft.tsx
import React from 'react'
import { shortenAddress } from '../../utils/helpers'
import CoinIcon from '../../assets/KAC_gold_coin.svg'

interface TopLeftProps {
  walletAddress: string
  kmDriven: number
  coinsEarned: number
}

const TopLeft: React.FC<TopLeftProps> = ({
  walletAddress,
  kmDriven,
  coinsEarned,
}) => {
  return (
    <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-75 text-white p-2 rounded">
      <div className="mb-1">User: {shortenAddress(walletAddress)}</div>
      <div>Km Driven: {kmDriven} km</div>
      <div className="flex items-center">
        <img src={CoinIcon} alt="Coin" className="w-4 h-4 mr-1" />
        {coinsEarned} Coins
      </div>
    </div>
  )
}

export default TopLeft
