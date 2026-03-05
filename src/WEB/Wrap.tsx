import './Wrap.css'
import { useState, useEffect } from 'react'
import Loding from './Loding/loding'
import Header from './Header/Header'
import Section from './Section/Section'
import Article from './Article/Article'
import Projects from './Projects/Projects'
import Footer from './Footer/Footer'
import MobileHorizontalLayout from './Mobile/MobileHorizontalLayout'
import GlobalMouseEffect from './GlobalMouseEffect/GlobalMouseEffect'

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
        isMobile ? (
          <MobileHorizontalLayout />
        ) : (
          <>
            <Header />
            <Section />
            <Article />
            <Projects />
            <Footer/>
          </>
        )
      )}
    </div>
  )
}

export default Wrap
