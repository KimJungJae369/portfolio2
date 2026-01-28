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
      }, 800)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`loding-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="explosion-wrapper">
        <div className="circle-explosion circle-1"></div>
        <div className="circle-explosion circle-2"></div>
        <div className="circle-explosion circle-3"></div>
        <div className="circle-explosion circle-4"></div>
        <h1 style={{fontSize : '40px'}}>loading...</h1>
      </div>
    </div>
  )
}

export default Loding
