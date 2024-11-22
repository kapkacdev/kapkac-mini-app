import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define Screen type to include all navigation targets
export type Screen =
  | 'Menu'
  | 'Game'
  | 'Communities'
  | 'Earn'
  | 'Leaderboard'
  | 'Profile'
  | 'DriverCommunity'

interface NavigationContextType {
  currentScreen: Screen
  navigateTo: (screen: Screen, props?: Record<string, unknown>) => void
  screenProps: Record<string, unknown> | null
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
)

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Menu')
  const [screenProps, setScreenProps] = useState<Record<
    string,
    unknown
  > | null>(null)

  const navigateTo = (screen: Screen, props?: Record<string, unknown>) => {
    setCurrentScreen(screen) // Set the new screen
    setScreenProps(props || null) // Update screenProps with the provided props
  }

  return (
    <NavigationContext.Provider
      value={{ currentScreen, navigateTo, screenProps }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
