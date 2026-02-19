import './Projects.css'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Portfolio1 from './img/Portfolio1.png';
import Portfolio2 from './img/Portfolio2.png';

interface ProjectsProps {
  isHorizontalPage?: boolean;
}

export default function Projects({ isHorizontalPage = false }: ProjectsProps) {
  const { t } = useTranslation();
  const [inView, setInView] = useState(false);

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
            window.setProjectsState?.({ forceShow: true });
            // 폴백: body 클래스 직접 추가
            document.body.classList.add('section-scrolled-out');
            // 컨테이너 직접 숨김 폴백
            document.querySelector('.swiperContainer')?.classList.add('hidden-by-projects');
          }
        } else {
          section.classList.remove('in-view');
          setInView(false);
          if (typeof window !== 'undefined') {
            window.setProjectsState?.({ forceShow: false });
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
            <span className='yell'>{t('projects.subtitle')}</span>
            <h1>{t('projects.title')}</h1>
            {isHorizontalPage && (
              <p className="projects-scroll-hint">{t('projects.scrollHint')}</p>
            )}
         
            <div className="projects-list">
            <main>
              <div className="project-device-preview" aria-label="나만의 가계부 PC 및 모바일 화면">
                <figure className="device-frame device-desktop">
                  <figcaption className="device-label">PC VERSION</figcaption>
                  <img src={Portfolio1} alt="나만의 가계부 PC 버전" />
                </figure>
                <figure className="device-frame device-mobile">
                  <figcaption className="device-label">MOBILE VERSION</figcaption>
                  <img src={Portfolio1} alt="나만의 가계부 모바일 버전" />
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
                </div>
              </div>
            </main>


            <main>
              <div className="project-device-preview" aria-label="포트폴리오 사이트 PC 및 모바일 화면">
                <figure className="device-frame device-desktop">
                  <figcaption className="device-label">PC VERSION</figcaption>
                  <img src={Portfolio2} alt="포트폴리오 사이트 PC 버전" />
                </figure>
                <figure className="device-frame device-mobile">
                  <figcaption className="device-label">MOBILE VERSION</figcaption>
                  <img src={Portfolio2} alt="포트폴리오 사이트 모바일 버전" />
                </figure>
              </div>

              <div className="left_title">
                <h1>사이트</h1>
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
                </div>
              </div>
            </main>
            </div>
        </div>
    </>
  )
}
