import './Header.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

function useSafeTranslation() {
    try {
        return useTranslation();
    } catch (err) {
        console.error('translation hook failed:', err);
        return { t: (key: string) => key } as any;
    }
}



export default function Header() {
  const { t, i18n } = useSafeTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for section changes from Wrap.tsx
  useEffect(() => {
    const handler = (e: Event) => setActiveSection((e as CustomEvent).detail);
    window.addEventListener('sectionChange', handler);
    return () => window.removeEventListener('sectionChange', handler);
  }, []);

  useEffect(() => {
    const handlerScroll = () => {
      if(window.scrollY >= 1){
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handlerScroll);
    
    // Default to Dark Mode (remove light-mode class if present)
    document.body.classList.remove('light-mode');
    setIsLightMode(false);
    localStorage.setItem('theme', 'dark');

    return () => window.removeEventListener('scroll', handlerScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    if (newMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} style={{ display: 'inline-block' }}>{char}</span>
    ));
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ko' : 'en';
    i18n.changeLanguage(newLang);
  };

  const HomeClick = (e : React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (isMobile && window.slideToSection) {
        window.slideToSection(0);
        return;
      }
      // 다른 버튼 클릭 시 스와이퍼 숨김 및 섹션 타이틀 숨김
      if (typeof window !== 'undefined') {
        window.setSwiperState?.({ isHidden: false, isScrollOut: false, isLastSlide: false });
        window.setProjectsState?.({ forceShow: false });
        window.setSectionState?.({ hide: false });
        // 폴백: 직접 컨테이너 조정
        const sc = document.querySelector('.swiperContainer');
        sc?.classList.remove('hidden-by-projects');
        sc?.classList.add('show');
        document.body.classList.remove('section-scrolled-out');

        // 홈으로 이동 시 스와이퍼 첫 페이지로 이동
        if (window.swiperRef) {
          if (typeof window.swiperRef.slideToLoop === 'function') {
             window.swiperRef.slideToLoop(0, 500);
          } else if (typeof window.swiperRef.slideTo === 'function') {
             window.swiperRef.slideTo(0, 500);
          }
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('[HomeClick] error', err);
    }
  }

  const ArticleClick = (e : React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (isMobile && window.slideToSection) {
        window.slideToSection(1);
        return;
      }
      const articleSection = document.getElementById('article_section');

      // 상태 해제 (AboutClick과 유사)
      if (typeof window !== 'undefined') {
        window.setProjectsState?.({ forceShow: false });
        // 스와이퍼는 Article에서는 필요 없을 수 있으나, 일단 살려둡니다.
        // Article이 Section 아래에 있으므로, Section을 지나쳐야 함.
        window.setSwiperState?.({ isHidden: true, isScrollOut: false, isLastSlide: false }); 
        window.setSectionState?.({ hide: false }); // Section title might be visible or not, usually passing it hides it via scroll.

        const sc = document.querySelector('.swiperContainer');
        sc?.classList.remove('hidden-by-projects');
        sc?.classList.add('show');
        document.body.classList.remove('section-scrolled-out');
      }

      if (articleSection) {
        articleSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {
      console.error('[ArticleClick] error', err);
    }
  }

  const FooterClick = (e : React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (isMobile && window.slideToSection) {
        window.slideToSection(3);
        return;
      }
      if (typeof window !== 'undefined') {
        window.setSwiperState?.({ isHidden: false, isScrollOut: false, isLastSlide: false });
        window.setProjectsState?.({ forceShow: true });
      }
      const footerElement = document.querySelector('#footer_section') as HTMLElement | null;
      if (footerElement) {
        window.scrollTo({ top: footerElement.offsetTop, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('[FooterClick] error', err);
    }
  }

  const ProjectsClick = (e : React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (isMobile && window.slideToSection) {
        window.slideToSection(2);
        return;
      }
      // Projects 클릭 시 스와이퍼 숨김 + Section 완전 해제
      if (typeof window !== 'undefined') {
        window.setSwiperState?.({ isHidden: false, isScrollOut: false, isLastSlide: false });
        window.setProjectsState?.({ forceShow: true });
        window.setSectionState?.({ hide: true });
        // 폴백: 직접 컨테이너 숨김
        const sc = document.querySelector('.swiperContainer');
        sc?.classList.add('hidden-by-projects');
        sc?.classList.remove('show');
        document.body.classList.add('section-scrolled-out');
      }

      const projectsSection = document.getElementById('projects_section');
      if (projectsSection) {
        // force style to make the section visible immediately
        projectsSection.style.opacity = '1';
        projectsSection.style.transform = 'none';
        projectsSection.style.marginTop = '0';
        projectsSection.scrollIntoView({ behavior: 'smooth' });
        // 보조: 스크롤 후 projects에 in-view 클래스를 강제 추가
        setTimeout(() => {
          projectsSection.classList.add('in-view');
          if (typeof window !== 'undefined' && window.swiperRef && typeof window.swiperRef.slideToLoop === 'function') {
            window.swiperRef.slideToLoop(4, 0);
          }
        }, 500);
      }
    } catch (err) {
      console.error('[ProjectsClick] error', err);
    }
  }

  return (
    <>
        <header className={isScrolled ? 'scrolled' : ''}>
            <ul>
                <li><a href="#" onClick={HomeClick}>{splitText(t('header.home'))}</a></li>
                <li><a href="#" onClick={ArticleClick}>{splitText(t('header.article'))}</a></li>
                <li>
                  <a href="#" onClick={ProjectsClick} aria-label={t('header.projects')}>
                    <span className="nav-icon nav-icon-projects" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 7.5L5 12l5.5 4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.5 7.5L19 12l-5.5 4.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="nav-text">{splitText(t('header.projects'))}</span>
                  </a>
                </li>
                <li><a href="#" onClick={FooterClick}>{splitText(t('header.footer'))}</a></li>
                <li><a href="https://github.com/KimJungJae369/myPORTFOLIO" target='_blank' rel="noopener noreferrer">{splitText(t('footer.github'))}</a></li>
            </ul>
        </header>

        <div className="header-controls">
          <button onClick={toggleTheme} className={`theme-toggle-btn ${isLightMode ? 'active' : ''}`} aria-label="Toggle theme">
            <div className="bulb-wire"></div>

            {/* 전구모양 코드 */}
            <svg className="bulb-icon-small" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21C9 21.55 9.45 22 10 22H14C14.55 22 15 21.55 15 21V20H9V21ZM12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5"/>
              <path className="filament-small" d="M9 14 C 9 14, 10 9, 12 9 C 14 9, 15 14, 15 14" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>

            <div className="bulb-glow-small"></div>
          </button>

          <button onClick={toggleLanguage} className="lang-btn">
            {i18n.language === 'en' ? 'KO' : 'EN'}
          </button>
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <nav className="mobile-bottom-nav">
            <button className={`bottom-nav-item ${activeSection === 0 ? 'active' : ''}`} onClick={HomeClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>{t('mobileNav.home')}</span>
            </button>
            <button className={`bottom-nav-item ${activeSection === 1 ? 'active' : ''}`} onClick={ArticleClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
              </svg>
              <span>{t('mobileNav.about')}</span>
            </button>
            <button className={`bottom-nav-item ${activeSection === 2 ? 'active' : ''}`} onClick={ProjectsClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              <span>{t('mobileNav.projects')}</span>
            </button>
            <button className={`bottom-nav-item ${activeSection === 3 ? 'active' : ''}`} onClick={FooterClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span>{t('mobileNav.footer')}</span>
            </button>
          </nav>
        )}
    </>
  )
}
