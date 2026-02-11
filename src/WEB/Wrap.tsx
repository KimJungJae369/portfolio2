import './Wrap.css'
import { useState, useEffect } from 'react'
import Loding from './Loding/loding'
import Header from './Header/Header'
import Section from './Section/Section'
import Projects from './Projects/Projects'
import Footer from './Footer/Footer'
import MobileHorizontalLayout from './Mobile/MobileHorizontalLayout'

function Wrap() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="wrap">
      {isLoading && <Loding onLoadingComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        isMobile ? (
          <MobileHorizontalLayout />
        ) : (
          <>
            <Header />
            <Section />
            <Projects/>
            <Footer/>
          </>
        )
      )}
    </div>
  )
}

export default Wrap
