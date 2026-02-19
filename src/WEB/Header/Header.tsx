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
    // 다른 버튼 클릭 시 스와이퍼 숨김 및 섹션 타이틀 숨김
    if (typeof window !== 'undefined') {
      window.setSwiperState?.({ isHidden: false, isScrollOut: false, isLastSlide: false });
      window.setProjectsState?.({ forceShow: false });
      window.setSectionState?.({ hide: true });
      // 폴백: 직접 컨테이너 숨김 해제
      document.querySelector('.swiperContainer')?.classList.remove('hidden-by-projects');
      document.body.classList.remove('section-scrolled-out');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  const AboutClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about_section');

    // 즉시 상태 해제: Projects 관련 숨김을 먼저 해제해서 스크롤/클릭이 정상 동작하도록 함
    if (typeof window !== 'undefined') {
      window.setProjectsState?.({ forceShow: false });
      window.setSwiperState?.({ isHidden: true, isScrollOut: false, isLastSlide: false });
      window.setSectionState?.({ hide: false });
      document.querySelector('.swiperContainer')?.classList.remove('hidden-by-projects');
      document.body.classList.remove('section-scrolled-out');
    }

    if (aboutSection) {
      // 스크롤은 상태 정리 후 실행
      aboutSection.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        if (typeof window !== 'undefined' && window.swiperRef && typeof window.swiperRef.slideToLoop === 'function') {
          window.swiperRef.slideToLoop(0, 0);
        }
      }, 500);
    }
  }

  const ProjectsClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Projects 클릭 시 스와이퍼 숨김 + Section 완전 해제
    if (typeof window !== 'undefined') {
      window.setSwiperState?.({ isHidden: false, isScrollOut: false, isLastSlide: false });
      window.setProjectsState?.({ forceShow: true });
      window.setSectionState?.({ hide: true });
      // 폴백: 직접 컨테이너 숨김
      document.querySelector('.swiperContainer')?.classList.add('hidden-by-projects');
      document.body.classList.add('section-scrolled-out');
    }

    const projectsSection = document.getElementById('projects_section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
      // 보조: 스크롤 후 projects에 in-view 클래스를 강제 추가 (IntersectionObserver가 늦게 반응할 경우 대비)
      setTimeout(() => {
        projectsSection.classList.add('in-view');
        if (typeof window !== 'undefined' && window.swiperRef && typeof window.swiperRef.slideToLoop === 'function') {
          window.swiperRef.slideToLoop(4, 0);
        }
      }, 500);
    }
  }

  const FooterClick = (e : React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Footer 클릭 시 스와이퍼 숨김 + Section 완전 해제
    if (typeof window !== 'undefined') {
      window.setSwiperState?.({ isHidden: false, isScrollOut: false, isLastSlide: false });
      window.setProjectsState?.({ forceShow: true });
    }

    const footerElement = document.querySelector('#footer_section') as HTMLElement;
    if (footerElement) {
      window.scrollTo({
        top: footerElement.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  return (
    <>
        <header className={isScrolled ? 'scrolled' : ''}>
            <ul>
                <li><a href="#" onClick={HomeClick}>{splitText(t('header.home'))}</a></li>
                <li><a href="#" onClick={AboutClick}>{splitText(t('header.about'))}</a></li>
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
        <button onClick={toggleLanguage} className="lang-btn">
          {i18n.language === 'en' ? 'KO' : 'EN'}
        </button>
    </>
  )
}
