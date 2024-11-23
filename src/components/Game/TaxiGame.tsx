// src/components/Game/TaxiGame.tsx
import React, { useRef, useEffect } from 'react'
import MenuTab from '../MenuTab' // Import the MenuTab component

const TaxiGame: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const sendMessageToGame = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        {
          type: 'START_GAME',
          payload: {
            /* your data */
          },
        },
        window.location.origin,
      )
    }
  }

  useEffect(() => {
    // Example: Send a message after 5 seconds
    const timer = setTimeout(sendMessageToGame, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen">
      {/* Fullscreen Game Iframe */}
      <iframe
        ref={iframeRef}
        src={`/taxi-game.html`}
        title="Taxi Game"
        className="w-full h-full border-none"
        allowFullScreen
      ></iframe>

      {/* Menu Tab at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <MenuTab hideLabels={true} />
      </div>
    </div>
  )
}

export default TaxiGame
