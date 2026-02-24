import './Wrap.css'
import { useState, useEffect } from 'react'
import Loding from './Loding/loding'
import Header from './Header/Header'
import Section from './Section/Section'
import Projects from './Projects/Projects'
import SwiperCarousel from './Swiper/SwiperCarousel'
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

  // Safety fallback: if loading takes too long, hide loader automatically
  useEffect(() => {
    console.log('[Wrap] mounted, isLoading:', isLoading)
    const fallback = setTimeout(() => {
      if (isLoading) {
        console.warn('[Wrap] loading fallback triggered')
        setIsLoading(false)
      }
    }, 7000)
    return () => clearTimeout(fallback)
  }, [isLoading])


  return (
    <div className="wrap">
      {isLoading && <Loding onLoadingComplete={() => { console.log('[Wrap] onLoadingComplete'); setIsLoading(false) }} />}
      {!isLoading && (
        isMobile ? (
          <MobileHorizontalLayout />
        ) : (
          <>
            <Header />
            <Section />
            <SwiperCarousel />
            <Projects />
            <Footer/>
          </>
        )
      )}
    </div>
  )
}

export default Wrap
