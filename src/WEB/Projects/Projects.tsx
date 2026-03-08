import './Projects.css'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
// gif previews: first project uses img, second uses img2
import PcGif1 from '../img/pc.gif';
import MoGif1 from '../img/mo.gif';
import PcGif2 from '../img2/pc2.gif';
import MoGif2 from '../img2/mo2.gif';

interface ProjectsProps {
  isHorizontalPage?: boolean;
}

export default function Projects({ isHorizontalPage = false }: ProjectsProps) {
  const { t } = useTranslation();
  const [inView, setInView] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState('');

  const openPopup = (content: string) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent('');
  };

  useEffect(() => {
    const section = document.getElementById('projects_section');
    if (!section) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add('in-view');
          setInView(true);
          // 전역 상태로 Projects 진입 알림 (스와이퍼 숨김)
          if (typeof window !== 'undefined') {
            (window as any).setProjectsState?.({ forceShow: true });
            // 폴백: body 클래스 직접 추가
            document.body.classList.add('section-scrolled-out');
            // 컨테이너 직접 숨김 폴백
            document.querySelector('.swiperContainer')?.classList.add('hidden-by-projects');
          }
        } else {
          section.classList.remove('in-view');
          setInView(false);
          if (typeof window !== 'undefined') {
            (window as any).setProjectsState?.({ forceShow: false });
            // 폴백: body 클래스 직접 제거
            document.body.classList.remove('section-scrolled-out');
            // 컨테이너 숨김 해제
            document.querySelector('.swiperContainer')?.classList.remove('hidden-by-projects');
          }
        }
      });
    }, { threshold: 0.25 });

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  
  return (
    <>
        <div id="projects_section" className={`${isHorizontalPage ? 'horizontal-mode' : ''} ${inView ? 'in-view' : ''}`}>
            <div className="projects-header">
              <span className='yell'>{t('projects.subtitle')}</span>
              <h1>{t('projects.title')}</h1>
              {isHorizontalPage && (
                <p className="projects-scroll-hint">{t('projects.scrollHint')}</p>
              )}
            </div>
         
            <div className="projects-list">
            <main>
              <div className="project-device-preview" aria-label="나만의 가계부 PC 및 모바일 화면">
                <figure className="device-frame device-desktop">
                  <figcaption className="device-label">
                    <img src={PcGif1} alt="나만의 가계부 PC 미리보기" />
                  </figcaption>
                </figure>
                <figure className="device-frame device-mobile">
                  <figcaption className="device-label">
                    <img src={MoGif1} alt="나만의 가계부 모바일 미리보기" />
                  </figcaption>
                </figure>
              </div>

              <div className="left_title">
                <h1>나만의 가계부</h1>
                <span>
                  이번 달도 무사히! 한정된 용돈을 스마트하게 관리하는 자취생 맞춤형 앱
                </span>
                <h3 className="feature-icons-title">technology stack</h3>
                <div className="feature-icons" aria-label="기술 스택">
                  <span className="feature-icon-item">⚛️ Frontend: React, Vite</span>
                  <span className="feature-icon-item">🎨 Styling: Tailwind CSS (Responsive Design)</span>
                  <span className="feature-icon-item">🪝 State Management: React Hooks</span>
                  <span className="feature-icon-item">🚀 Deployment: GitHub Pages</span>
                </div>
                <div className="ai-usage ai-usage-68" aria-label="AI 사용률 68 퍼센트">
                  <div className="ai-usage-head">
                    <span>AI 사용률</span>
                  </div>
                  <div className="ai-usage-bar">
                    <span className="ai-usage-fill"></span>
                    <span className="ai-usage-value">68%</span>
                  </div>
                </div>
                <div className="subMenu">
                  <a href="https://github.com/KimJungJae369/portfolio">{t('footer.github')}</a>
                  <a href="https://kimjungjae369.github.io/portfolio/">Demo</a>
                  <button className="project-desc-btn" onClick={() => openPopup("이 프로젝트는 React와 Vite를 사용하여 개발되었습니다. Tailwind CSS로 스타일링되었으며, GitHub Pages를 통해 배포되었습니다. 주요 기능으로는 수입/지출 관리, 차트 시각화 등이 있습니다.")}>Description</button>
                </div>
              </div>
            </main>


            <main>
              <div className="project-device-preview" aria-label="포트폴리오 사이트 PC 및 모바일 화면">
                <figure className="device-frame device-desktop">
                  <figcaption className="device-label">
                    <img src={PcGif2} alt="포트폴리오 사이트 PC 미리보기" />
                  </figcaption>
                </figure>
                <figure className="device-frame device-mobile">
                  <figcaption className="device-label">
                    <img src={MoGif2} alt="포트폴리오 사이트 모바일 미리보기" />
                  </figcaption>
                </figure>
              </div>

              <div className="left_title">
                <h1>나만의 공간</h1>
                <span>
                  나만의 포트폴리오 사이트: React와 Tailwind CSS로 완성한 나만의 디지털 공간
                </span>
                <h3 className="feature-icons-title">technology stack</h3>
                <div className="feature-icons" aria-label="기술 스택">
                  <span className="feature-icon-item">⚛️ Frontend: React, Vite</span>
                  <span className="feature-icon-item">🟦 Language: TypeScript</span>
                  <span className="feature-icon-item">🎨 Styling: Tailwind CSS (Responsive Design)</span>
                  <span className="feature-icon-item">🌐 i18n: react-i18next</span>
                </div>
                <div className="ai-usage ai-usage-72" aria-label="AI 사용률 72 퍼센트">
                  <div className="ai-usage-head">
                    <span>AI 사용률</span>
                  </div>
                  <div className="ai-usage-bar">
                    <span className="ai-usage-fill"></span>
                    <span className="ai-usage-value">72%</span>
                  </div>
                </div>
                <div className="subMenu">
                  <a href="https://github.com/KimJungJae369/portfolio2">{t('footer.github')}</a>
                  <a href="https://kimjungjae369.github.io/portfolio2/">Demo</a>
                  <button className="project-desc-btn" onClick={() => openPopup("이 프로젝트는 TypeScript와 React를 기반으로 제작된 개인 포트폴리오 사이트입니다. 반응형 웹 디자인을 적용하였으며, 다국어 지원(i18n) 기능을 포함하고 있습니다.")}>Description</button>
                </div>
              </div>
            </main>
            </div>
        </div>

        {isPopupOpen && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={closePopup}>&times;</button>
              <p>{popupContent}</p>
            </div>
          </div>
        )}
    </>
  )
}
