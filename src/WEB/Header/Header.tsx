import './Header.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handlerScroll = () => {
      if(window.scrollY >= 10){
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handlerScroll);
    return () => window.removeEventListener('scroll', handlerScroll);
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} style={{ display: 'inline-block' }}>{char}</span>
    ));
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ko' : 'en';
    i18n.changeLanguage(newLang);
  };

  const  HomeClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <>
        <header className={isScrolled ? 'scrolled' : ''}>
            <h3><a href="#">FRONTEND</a></h3>

            <ul>
                <li><a href="#" onClick={HomeClick}>{splitText(t('header.home'))}</a></li>
                <li><a href="#">{splitText(t('header.about'))}</a></li>
                <li><a href="#">{splitText(t('header.projects'))}</a></li>
                <li><a href="#">{splitText(t('header.contact'))}</a></li>
            </ul>
        </header>
        
        <button onClick={toggleLanguage} className="lang-btn">
          {i18n.language === 'en' ? 'KO' : 'EN'}
        </button>
    </>
  )
}
