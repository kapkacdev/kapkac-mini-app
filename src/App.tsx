'use client'

import React from 'react'
import Background from './components/Background'
import MenuTab from './components/MenuTab'
import backgroundVideo from './assets/vecteezy_aerial-view-of-the-bosphorus-bridge-in-istanbul-turkey_51072378.mp4'
import transparentLogo from '/KAPKAC-logo-transparent.png'
import { NavigationProvider, useNavigation } from './context/NavigationContext'
import TaxiGame from './components/Game/TaxiGame'
import Communities from './components/Communities'
import Earn from './components/Earn'
import Leaderboard from './components/Leaderboard'
import UserProfile from './components/UserProfile'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import DriverCommunity from './components/DriverCommunity'

const AppContent: React.FC = () => {
  const { currentScreen, screenProps } = useNavigation()

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Game':
        return <TaxiGame />
      case 'Communities':
        return <Communities />
      case 'Earn':
        return <Earn />
      case 'Leaderboard':
        return <Leaderboard />
      case 'Profile':
        return <UserProfile />
      case 'DriverCommunity':
        return (
          <DriverCommunity
            communityName={
              typeof screenProps?.communityName === 'string'
                ? screenProps.communityName
                : ''
            }
          />
        )
      case 'Menu':
      default:
        return (
          <div className="relative h-full w-full">
            {/* High Performance Video Background */}
            <Background
              src={backgroundVideo}
              description="A beautiful sunset over the Bosphorus in Istanbul."
            />

            {/* Main Content */}
            <main className="absolute inset-0 flex flex-col justify-center items-center px-6">
              <div>
                <img
                  src={transparentLogo}
                  alt="KAPKAÇ Logo"
                  className="w-120 h-auto max-w-full"
                />
              </div>
            </main>
            {/* Bottom Menu Tab */}
            <MenuTab />
          </div>
        )
    }
  }

  return <>{renderScreen()}</>
}

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Set max width for the content */}
      <div className="w-full max-w-[375px] bg-white">
        <TonConnectUIProvider
          manifestUrl={
            'https://d607-188-119-39-135.ngrok-free.app/tonconnect-manifest.json'
          }
        >
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </TonConnectUIProvider>
      </div>
    </div>
  )
}

export default App
