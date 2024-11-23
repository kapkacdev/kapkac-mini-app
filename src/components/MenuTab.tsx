import React, { useState, useEffect } from 'react'
import { useNavigation, Screen } from '../context/NavigationContext'

interface MenuItem {
  label: Screen
  icon: string // Path to the PNG icon
}

const MenuTab: React.FC = () => {
  const { navigateTo } = useNavigation()
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  const menuItems: MenuItem[] = [
    { label: 'Communities', icon: '/icons/community-menu-icon-nolabel.png' },
    { label: 'Game', icon: '/icons/game-menu-icon-brown.png' },
    { label: 'Leaderboard', icon: '/icons/leaderboard-icon.png' },
    { label: 'Profile', icon: '/icons/profile-menu-icon-nolabel.png' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * menuItems.length)
      setHighlightedIndex(randomIndex)

      setTimeout(() => setHighlightedIndex(null), 1000) // Stop highlight effect after 1 second
    }, 10000) // Trigger every 10 seconds

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [menuItems.length])

  const handleItemClick = (label: Screen) => {
    navigateTo(label)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-stone-800 rounded-t-2xl shadow-inner shadow-[#4D00FF] flex justify-evenly items-center py-2 z-10 border-t border-stone-400"
      aria-label="Main navigation"
    >
      {menuItems.map((item, index) => (
        <button
          key={item.label}
          className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 ${
            index === highlightedIndex ? 'scale-110' : 'scale-100'
          } hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
          onClick={() => handleItemClick(item.label)}
          aria-label={item.label}
        >
          <img
            src={item.icon}
            alt=""
            className="w-10 h-10 mb-1"
            aria-hidden="true"
          />
          <span className="text-xs text-stone-200 hover:text-white">
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  )
}

export default MenuTab
