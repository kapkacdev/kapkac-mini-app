// src/components/MenuTab.tsx
import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';

const MenuTab: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [jigglingIndex, setJigglingIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 4); // Randomly select one of the 4 menu items
      setJigglingIndex(randomIndex);

      // Stop jiggle effect after 1 second
      setTimeout(() => setJigglingIndex(null), 1000);
    }, 10000); // Trigger every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const menuItems = [
    { label: 'Communities', icon: '🏠' },
    { label: 'Earn', icon: '💰' },
    { label: 'Game', icon: '🎮' },
    { label: 'Leaderboard', icon: '🏆' },
  ];

  const handleItemClick = (label: string) => {
    switch (label) {
      case 'Communities':
        navigateTo('Communities');
        break;
      case 'Earn':
        navigateTo('Earn');
        break;
      case 'Game':
        navigateTo('Game');
        break;
      case 'Leaderboard':
        navigateTo('Leaderboard');
        break;
      default:
        navigateTo('Menu');
    }
  };

  return (
    <nav
    className="fixed bottom-0 left-0 right-0 gradient-background bg-opacity-90 shadow-xl flex justify-center items-center py-3 z-10 rounded-t-3xl sm:py-4 lg:py-5 space-x-4"
    aria-label="Main navigation"
    style={{
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 1))',
    }}
    >
      {menuItems.map((item, index) => (
        <div
          key={item.label}
          className={`flex flex-col items-center w-24 max-w-[6rem] cursor-pointer ${
            index === jigglingIndex ? 'animate-smooth-bounce' : ''
          }`}
          onClick={() => handleItemClick(item.label)}
          aria-label={item.label}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-xs text-black">{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default MenuTab;
