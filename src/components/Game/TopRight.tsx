// src/components/TopRight.tsx
import React from 'react'
import coinIcon from '../assets/coinIcon.svg'
import expIcon from '../assets/expIcon.svg'

interface TopRightProps {
  lives: number
  remainingTime: number // in seconds
}

const TopRight: React.FC<TopRightProps> = ({ lives, remainingTime }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-75 text-white p-2 rounded flex items-center space-x-4">
      <div className="flex items-center">
        <span>Lives: {lives}</span>
      </div>
      {lives === 0 && (
        <div>
          <span>Refresh in: {formatTime(remainingTime)}</span>
        </div>
      )}
    </div>
  )
}

export default TopRight
