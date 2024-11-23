// src/components/Game/TaxiGame.tsx
import React, { useRef, useEffect } from 'react'

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
    <div style={{ width: '100%', height: '100vh', border: 'none' }}>
      <iframe
        ref={iframeRef}
        src={`/taxi-game.html`}
        title="Taxi Game"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default TaxiGame
