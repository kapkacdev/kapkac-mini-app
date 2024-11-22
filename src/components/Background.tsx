import React, { useRef, useEffect } from 'react'

interface BackgroundProps {
  src: string
  description?: string // Optional description for accessibility
}

const Background: React.FC<BackgroundProps> = ({ src, description }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Add fade-in effect at the start
      video.style.opacity = '0'
      video.onplay = () => {
        video.style.transition = 'opacity 2s'
        video.style.opacity = '1'
      }
    }
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="object-cover w-full h-full fixed top-0 left-0 z-0"
      aria-label={description} // Provides an accessible description
    >
      <source src={src} type="video/mp4" />
      {/* Fallback content for browsers that do not support the video tag */}
      {description && <p>{description}</p>}
    </video>
  )
}

export default Background
