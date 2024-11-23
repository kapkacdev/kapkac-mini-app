// src/components/GameControls.tsx
import React from 'react'

interface GameControlsProps {
  onMoveLeft: () => void
  onMoveRight: () => void
}

const GameControls: React.FC<GameControlsProps> = ({
  onMoveLeft,
  onMoveRight,
}) => (
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
    <button
      className="w-12 h-12 bg-blue-500 bg-opacity-75 text-white rounded-full text-xl"
      onTouchStart={onMoveLeft}
      onTouchEnd={() => {
        /* Optional: Implement onTouchEnd to stop movement */
      }}
      onMouseDown={onMoveLeft}
      onMouseUp={() => {
        /* Optional: Implement onMouseUp to stop movement */
      }}
    >
      ←
    </button>
    <button
      className="w-12 h-12 bg-blue-500 bg-opacity-75 text-white rounded-full text-xl"
      onTouchStart={onMoveRight}
      onTouchEnd={() => {
        /* Optional: Implement onTouchEnd to stop movement */
      }}
      onMouseDown={onMoveRight}
      onMouseUp={() => {
        /* Optional: Implement onMouseUp to stop movement */
      }}
    >
      →
    </button>
  </div>
)

export default GameControls
