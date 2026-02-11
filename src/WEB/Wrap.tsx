import './Wrap.css'
import { useState } from 'react'
import Loding from './Loding/loding'
import Header from './Header/Header'
import Section from './Section/Section'
import Projects from './Projects/Projects'
import Footer from './Footer/Footer'

function Wrap() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="wrap">
      {isLoading && <Loding onLoadingComplete={() => setIsLoading(false)} />}
      {!isLoading && <Header />}
      {!isLoading && <Section />}
      {!isLoading && <Projects/>}
      {!isLoading && <Footer/>}
    </div>
  )
}

export default Wrap
