import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define Screen type to include all navigation targets
export type Screen = 'Menu' | 'Game' | 'Communities' | 'Earn' | 'Leaderboard' | 'Profile';

interface NavigationContextType {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Menu');

  const navigateTo = (screen: Screen) => setCurrentScreen(screen);

  return (
    <NavigationContext.Provider value={{ currentScreen, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
