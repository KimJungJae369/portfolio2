import './loding.css'
import { useState, useEffect } from 'react'

interface LodingProps {
  onLoadingComplete?: () => void
}

function Loding({ onLoadingComplete }: LodingProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      
      setTimeout(() => {
        if (onLoadingComplete) {
          onLoadingComplete()
        }
      }, 600)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`loding-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="vintage-overlay"></div>
      <div className="room-light"></div>
      
      <div className="bulb-wrapper">
        <div className="bulb-socket"></div>
        <svg className="bulb-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glass shape */}
          <path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
          {/* Filament (Added detail) */}
          <path className="filament" d="M9 14 C 9 14, 10 9, 12 9 C 14 9, 15 14, 15 14" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
        <div className="bulb-glow-core"></div>
        <div className="loading-text">Loading</div>
      </div>
    </div>
  )
}

export default Loding
