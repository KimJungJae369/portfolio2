import './Header.css'
import { useState } from 'react'

function Header() {
  const [bar, setBar] = useState(false)

  return (
    <>
      <header>
        <ul>
            <li>
                <a href="#">TOP</a>
                <ul className='subMenu'>
                    <li>dd</li>
                </ul>
            </li>
            <li><a href="#">bottom</a></li>
            <li><a href="#">BRANDS</a></li>
            <li><a href="#">COLLECTION</a></li>
            <li><a href="#">PROJECTS</a></li>
            <li><a href="#">HIGHLIGHTS</a></li>
            <li><a href="#">STORE LOCATOR</a></li>
            <li><a href="#">SHOP ONLINE</a></li>
            <li><a href="#">WILDSIDE ONLINE</a></li>
             <li>
                  <button 
                    className={`bar ${bar ? 'active' : ''}`}
                    onClick={() => setBar(!bar)}
                    aria-label="Toggle menu"
                    >
                    <span></span>
                    <span></span>
                    <span></span>
                    </button>
            </li>
        </ul>
      </header>
    </>
  )
}

export default Header
