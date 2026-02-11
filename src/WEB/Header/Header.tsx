import './Header.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handlerScroll = () => {
      if(window.scrollY >= 1){
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

  const HomeClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.body.classList.remove('section-scrolled-out');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  const AboutClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.body.classList.remove('section-scrolled-out');
    
    setTimeout(() => {
      window.scrollTo({
        top: 50,
        behavior: 'smooth'
      });
    }, 100);
  }

  const ProjectsClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.body.classList.add('section-scrolled-out');
    requestAnimationFrame(() => {
      const projectsElement = document.querySelector('#projects_section') as HTMLElement;
      if (projectsElement) {
        window.scrollTo({
          top: projectsElement.offsetTop + 100,
          behavior: 'smooth'
        });
      }
    });
  }

  const FooterClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.body.classList.add('section-scrolled-out');
    requestAnimationFrame(() => {
      const footerElement = document.querySelector('#footer_section');
      if (footerElement) {
        footerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  return (
    <>
        <header className={isScrolled ? 'scrolled' : ''}>

            <ul>
                <li><a href="#" onClick={HomeClick}>{splitText(t('header.home'))}</a></li>
                <li><a href="#" onClick={AboutClick}>{splitText(t('header.about'))}</a></li>
                <li><a href="#" onClick={ProjectsClick}>{splitText(t('header.projects'))}</a></li>
                <li><a href="#" onClick={FooterClick}>{splitText(t('header.footer'))}</a></li>
                <li><a href="https://github.com/KimJungJae369/myPORTFOLIO" target='_blank' rel="noopener noreferrer">{splitText(t('Github'))}</a></li>
            </ul>
        </header>
        
        <button onClick={toggleLanguage} className="lang-btn">
          {i18n.language === 'en' ? 'KO' : 'EN'}
        </button>
    </>
  )
}
