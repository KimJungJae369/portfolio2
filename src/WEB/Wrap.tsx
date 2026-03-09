import './Wrap.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import Loding from './Loding/loding'
import Header from './Header/Header'
import Section from './Section/Section'
import Article from './Article/Article'
import Projects from './Projects/Projects'
import Footer from './Footer/Footer'
import GlobalMouseEffect from './GlobalMouseEffect/GlobalMouseEffect'

function Wrap() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const totalSections = 4

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Expose slideToSection to window for Header bottom nav
  useEffect(() => {
    (window as any).slideToSection = (index: number) => {
      setCurrentSection(Math.max(0, Math.min(totalSections - 1, index)));
    };
    return () => { delete (window as any).slideToSection; };
  }, []);

  // Dispatch custom event when section changes (for Header to highlight active nav)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('sectionChange', { detail: currentSection }));
  }, [currentSection]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    // Only horizontal swipe if deltaX > deltaY and above threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
      if (deltaX > 0 && currentSection < totalSections - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (deltaX < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    }
  }, [currentSection]);

  // try to probe/patch localStorage if tracking prevention blocks it
  useEffect(() => {
    try {
      const key = '__storage_test__';
      window.localStorage.setItem(key, key);
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn('localStorage unusable, patching a safe stub', err);
      // create no-op safe storage
      const stub = {
        getItem: (_: string) => null,
        setItem: (_: string, __: string) => {},
        removeItem: (_: string) => {},
        clear: () => {},
      };
      try {
        Object.defineProperty(window, 'localStorage', {
          value: stub,
          configurable: true,
          enumerable: true,
        });
      } catch (e) {
        console.warn('unable to override localStorage', e);
      }
    }
  }, []);

  // global error logging to avoid white screen
  useEffect(() => {
    const handler = (e: any) => {
      console.error('global error captured:', e);
    };
    const promiseHandler = (e: PromiseRejectionEvent) => {
      console.error('unhandled rejection:', e.reason);
    };
    window.addEventListener('error', handler);
    window.addEventListener('unhandledrejection', promiseHandler);
    return () => {
      window.removeEventListener('error', handler);
      window.removeEventListener('unhandledrejection', promiseHandler);
    };
  }, []);


  return (
    <div className="wrap">
      <GlobalMouseEffect />
      {isLoading && <Loding onLoadingComplete={() => setIsLoading(false)} />}
      {!isLoading && (
          <>
            <Header />
            {isMobile ? (
              <div
                className="sections-slider"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="sections-track"
                  style={{ transform: `translateX(-${currentSection * 100}vw)` }}
                >
                  <div className="section-slide"><Section /></div>
                  <div className="section-slide"><Article /></div>
                  <div className="section-slide"><Projects /></div>
                  <div className="section-slide"><Footer /></div>
                </div>
                {/* Page indicator dots */}
                <div className="slide-dots">
                  {Array.from({ length: totalSections }).map((_, i) => (
                    <button
                      key={i}
                      className={`slide-dot ${currentSection === i ? 'active' : ''}`}
                      onClick={() => setCurrentSection(i)}
                      aria-label={`Go to section ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <Section />
                <Article />
                <Projects />
                <Footer/>
              </>
            )}
          </>
      )}
    </div>
  )
}

export default Wrap
