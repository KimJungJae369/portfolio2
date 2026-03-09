import './Projects.css'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// gif previews: first project uses img, second uses img2
import PcGif1 from '../img/pc.gif';
import MoGif1 from '../img/mo.gif';
import PcGif2 from '../img2/pc2.gif';
import MoGif2 from '../img2/mo2.gif';

interface ProjectsProps {
  isHorizontalPage?: boolean;
}

interface PopupSection {
  icon: string;
  title: string;
  items: string[];
}

interface PopupData {
  title: string;
  subtitle?: string;
  sections: PopupSection[];
}

export default function Projects({ isHorizontalPage = false }: ProjectsProps) {
  const { t } = useTranslation();
  const [inView, setInView] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupData | null>(null);

  const budgetPopupData: PopupData = {
    title: '페이지 목록',
    subtitle: '나만의 가계부 - Description',
    sections: [
      {
        icon: '📌',
        title: '프로젝트 소개',
        items: [
          '데이터 분석으로 스마트한 소비 습관을 만드는 가계부 어플리케이션',
          '수입/지출을 직관적으로 관리하고 통계 데이터를 통해 소비 패턴을 분석할 수 있도록 설계되었습니다.',
        ],
      },
      {
        icon: '🛠️',
        title: '주요 기능',
        items: [
          '스마트 기록 시스템 (유형/카테고리/금액/날짜 입력)',
          '통합 자산 관리 (수입/지출/잔액 실시간 확인)',
          '평균 소비 분석 및 카테고리별 리포트',
          '메모 기능',
        ],
      },
      {
        icon: '🧩',
        title: '기술 스택',
        items: [
          'Frontend: React, Vite',
          'Styling: Tailwind CSS',
          'State: React Hooks',
          'Deployment: GitHub Pages',
        ],
      },
      {
        icon: '⚠️',
        title: '어려웠던 점과 해결 방안',
        items: [
          '문제: 수입과 지출 데이터가 많아질 때 실시간 합계와 평균값이 느리게 업데이트되거나 꼬이는 현상.',
          '해결: 데이터의 불변성(Immutability)을 유지하며 상태를 업데이트하고, useMemo 등을 활용해 불필요한 연산을 줄여 성능을 최적화.',
          '문제: 다양한 카테고리별로 데이터를 분류하여 보여주는 화면 구현의 복잡함.',
          '해결: 객체(Object)의 키 값을 카테고리로 매핑하는 로직을 사용하여 효율적으로 데이터를 그룹화하고 화면에 렌더링.',
        ],
      },
    ],
  };

  const portfolioPopupData: PopupData = {
    title: '페이지 목록',
    subtitle: '나만의 공간 - Description',
    sections: [
      {
        icon: '🌐',
        title: '프로젝트 소개',
        items: [
          'TypeScript + React + Vite 기반 포트폴리오',
          '반응형 웹과 다국어(i18n) 지원',
        ],
      },
      {
        icon: '✨',
        title: '주요 기능 (Key Features)',
        items: [
          'Custom Interactive Components: 외부 라이브러리에 의존하기보다 순수 자바스크립트와 CSS를 활용하여 인터랙티브 요소를 직접 구현.',
          'Modular Code Structure: HTML/CSS/JS 코드를 기능별로 모듈화하여 가독성을 높이고 유지보수가 용이한 구조로 설계.',
          'Fluid Grid System: 비율 기반 그리드 시스템을 적용하여 다양한 해상도에서도 일관된 디자인 유지.',
          'Performance Monitoring: 사이트의 로딩 속도와 렌더링 성능을 고려하여 자산(Assets)의 로딩 순서를 최적화.',
        ],
      },
      {
        icon: '🧩',
        title: '기술 스택 (Tech Stack)',
        items: [
          '⚛️ Frontend: React, Vite',
          '🟦 Language: TypeScript',
          '🎨 Styling: Tailwind CSS (Responsive Design)',
          '🌐 i18n: react-i18next',
        ],
      },
      {
        icon: '⚠️',
        title: '문제 해결 경험',
        items: [
          '문제: 중첩된 애니메이션으로 인한 성능 저하(Jank).',
          '상황: 여러 인터랙티브 요소가 동시에 작동할 때 화면이 끊기는 현상 발생.',
          '해결: top, left 대신 transform과 opacity를 사용해 리페인트/리플로우를 최소화하고 GPU 가속을 유도하여 저사양 기기에서도 부드러운 애니메이션 구현.',
          '문제: 브라우저 간 스타일 일관성 부족(Cross-Browsing).',
          '상황: 특정 브라우저에서 CSS Grid 레이아웃이 예상과 다르게 렌더링되는 이슈 발견.',
          '해결: Autoprefixer로 벤더 프리픽스를 자동 관리하고 Reset CSS를 정교화해 Chrome/Safari/Edge에서 동일한 UI 제공.',
          '문제: 비정형 데이터 배치 시 레이아웃 붕괴.',
          '상황: 프로젝트 리스트 텍스트 양에 따라 카드 섹션 높낮이가 달라져 시각적 불균형 발생.',
          '해결: CSS Grid의 grid-template-rows와 minmax 함수를 활용해 일정한 높이를 유지하면서 필요 시 유연하게 확장되는 레이아웃 시스템 구축.',
        ],
      },
      {
        icon: '🗂️',
        title: '페이지 구조 (Structure)',
        items: [
          'Hero Section: 직관적인 타이포그래피로 개발자 아이덴티티 강조.',
          'Core Competencies: 기술적 강점을 카테고리별로 상세히 분류.',
          'Project Showcase: 기술적 도전 과제와 성과를 중심으로 프로젝트 아카이빙.',
          'Professional Journey: 패션 산업에서의 경험을 개발 역량과 연결한 히스토리.',
          'Get in Touch: 협업을 위한 채널 안내.',
        ],
      },
    ],
  };

  const openPopup = (content: PopupData) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
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
                  <button className="project-desc-btn" onClick={() => openPopup(budgetPopupData)}>Description</button>
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
                  <button className="project-desc-btn" onClick={() => openPopup(portfolioPopupData)}>Description</button>
                </div>
              </div>
            </main>
            </div>
        </div>

        {isPopupOpen && popupContent && createPortal(
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={closePopup}>&times;</button>
              <div className="popup-body">
                <h2 className="popup-title">{popupContent.title}</h2>
                {popupContent.subtitle && <p className="popup-subtitle">{popupContent.subtitle}</p>}
                <div className="popup-sections">
                  {popupContent.sections.map((section) => (
                    <div key={section.title} className="popup-section-item">
                      <h3><span className="popup-section-icon">{section.icon}</span>{section.title}</h3>
                      <ul>
                        {section.items.map((item, idx) => (
                          <li key={`${section.title}-${idx}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
