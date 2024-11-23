import React from 'react'
import ExpIcon from '../../assets/KAPKAC_exp_coin.svg'

interface InfoModalProps {
  kmDriven: number
  coinsEarned: number
  onClose: () => void
}

const InfoModal: React.FC<InfoModalProps> = ({
  kmDriven,
  coinsEarned,
  onClose,
}) => {
  const expPoints = kmDriven + coinsEarned * 10

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-xl mb-4">Game Over</h2>
        <p>
          You drove {kmDriven} km and earned {coinsEarned} coins.
        </p>
        <p className="mt-2 flex items-center justify-center">
          <img src={ExpIcon} alt="Coin" className="w-4 h-4 mr-1" />
          Experience Points: {expPoints}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default InfoModal
