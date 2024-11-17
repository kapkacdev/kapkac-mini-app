// src/App.tsx
import React from 'react';
import Background from './components/Background';
import MenuTab from './components/MenuTab';
import backgroundVideo from './assets/vecteezy_aerial-view-of-the-bosphorus-bridge-in-istanbul-turkey_51072378.mp4';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import TaxiGame from './components/Game/TaxiGame.tsx';
import Communities from './components/Communities.tsx';
import Earn from './components/Earn.tsx';
import Leaderboard from './components/Leaderboard.tsx';

// Handles rendering based on the current screen
const AppContent: React.FC = () => {
  const { currentScreen } = useNavigation();

  // Render the component based on the current screen
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
              <img src="/src/assets/KAPKAÇ-logo-transparent.png" alt="KAPKAÇ Logo" className="logo" />
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
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
};

export default App;
