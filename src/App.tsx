"use client";

import React from 'react';
import Background from './components/Background';
import MenuTab from './components/MenuTab';
import backgroundVideo from './assets/vecteezy_aerial-view-of-the-bosphorus-bridge-in-istanbul-turkey_51072378.mp4';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import TaxiGame from './components/Game/TaxiGame';
import Communities from './components/Communities';
import Earn from './components/Earn';
import Leaderboard from './components/Leaderboard';
import UserProfile from './components/UserProfile';
import { TonConnectUIProvider } from '@tonconnect/ui-react'; // Import the provider

const AppContent: React.FC = () => {
  const { currentScreen } = useNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Game':
        return <TaxiGame />;
      case 'Communities':
        return <Communities />;
      case 'Earn':
        return <Earn />;
      case 'Leaderboard':
        return <Leaderboard />;
      case 'Profile':
        return <UserProfile />;
      case 'Menu':
      default:
        return (
          <div className="relative h-screen w-screen">
            {/* High Performance Video Background */}
            <Background
              src={backgroundVideo}
              description="A beautiful sunset over the Bosphorus in Istanbul."
            />

            {/* Main Content */}
            <main className="absolute inset-0 flex flex-col justify-center items-center px-2">
              <div>
                <img
                  src="/src/assets/KAPKAÇ-logo-transparent.png"
                  alt="KAPKAÇ Logo"
                  className="logo"
                />
              </div>
            </main>

            {/* Bottom Menu Tab */}
            <MenuTab />
          </div>
        );
    }
  };

  return <>{renderScreen()}</>;
};

const App: React.FC = () => {
  return (
    <TonConnectUIProvider manifestUrl={'https://856d-188-119-39-135.ngrok-free.app/tonconnect-manifest.json'}>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </TonConnectUIProvider>
  );
};

export default App;
