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

interface PopupSection {
  icon: string;
  title: string;
  image?: string;
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
        title: '1. 프로젝트 소개: Pastel Budget App',
        items: [
          '데이터 분석으로 스마트한 소비 습관을 만드는 가계부 어플리케이션',
          '이 프로젝트는 사용자가 자신의 수입과 지출을 직관적으로 관리하고, 통계 데이터를 통해 소비 패턴을 분석할 수 있도록 설계된 웹 앱입니다.',
          '복잡한 가계부 관리를 단순하고 즐거운 경험으로 바꾸는 데 초점을 맞췄습니다.',
        ],
      },
      {
        icon: '🛠️',
        title: '2. 주요 기능 (Key Features)',
        items: [
          '스마트 기록 시스템: 수입/지출 유형 선택, 카테고리 지정, 금액 및 날짜 입력을 통해 세밀한 자산 관리가 가능합니다.',
          '통합 자산 관리: 실시간으로 업데이트되는 수입, 지출, 잔액 합계를 한눈에 확인할 수 있습니다.',
          '데이터 분석 및 통계: 평균값 계산으로 소비 수준을 파악하고, 카테고리별 수입/지출 흐름을 시각적으로 분석합니다.',
          '메모장 기능: 단순 금액 외에 기억해야 할 소비 배경이나 일정을 기록할 수 있습니다.',
        ],
      },
      {
        icon: '🧩',
        title: '3. 기술 스택',
        items: [
          'Frontend: React, Vite',
          'Styling: Tailwind CSS (Responsive Design)',
          'State Management: React Hooks',
          'Deployment: GitHub Pages',
        ],
      },
      {
        icon: '⚙️',
        title: '4. 구현 포인트',
        items: [
          '컴포넌트 기반 설계: 기록 입력부, 내역 리스트, 분석 리포트 등 기능별로 컴포넌트를 분리하여 유지보수성을 높였습니다.',
          '데이터 로직 구현: 입력된 수입/지출 데이터를 필터링하고 합산하여 평균값 및 잔액을 도출하는 알고리즘을 직접 설계했습니다.',
        ],
      },
      {
        icon: '🚨',
        title: '5. 문제점 & 해결 방안 (Troubleshooting)',
        items: [
          '문제: 수입과 지출 데이터가 많아질 때 실시간 합계와 평균값이 느리게 업데이트되거나 꼬이는 현상.',
          '해결: 데이터의 불변성(Immutability)을 유지하며 상태를 업데이트하고, useMemo 등을 활용해 불필요한 연산을 줄여 성능을 최적화했습니다.',
          '문제: 다양한 카테고리별로 데이터를 분류하여 보여주는 화면 구현의 복잡함.',
          '해결: 객체(Object)의 키 값을 카테고리로 매핑하는 로직을 사용하여 효율적으로 데이터를 그룹화하고 화면에 렌더링했습니다.',
        ],
      },
      {
        icon: '🗂️',
        title: '6. 페이지 구조 (App Structure)',
        items: [
          '입력부: 유형(수입/지출) 선택 -> 카테고리 -> 금액/날짜/메모 입력',
          '대시보드: 현재 잔액, 총 수입, 총 지출 현황판',
          '분석 내역: 평균 소비 수치 및 카테고리별 분석 리포트',
          '기록 리스트: 전체 내역 확인 및 메모 열람',
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
        title: '1. 프로젝트 소개',
        items: [
          'TypeScript와 React 기반으로 제작된 개인 포트폴리오 사이트입니다.',
          '반응형 웹 디자인과 다국어 지원(i18n) 기능을 포함합니다.',
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

  const activePopupContent = popupContent ?? budgetPopupData;

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

        {isPopupOpen && (
          <div className="popup-overlay" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <button className="popup-close" onClick={closePopup}>&times;</button>
              <div className="popup-body">
                <h2 className="popup-title">{activePopupContent.title}</h2>
                {activePopupContent.subtitle && <p className="popup-subtitle">{activePopupContent.subtitle}</p>}
                <div className="popup-sections">
                  {activePopupContent.sections.map((section) => (
                    <section key={section.title} className="popup-section-item">
                      {section.image && <img className="popup-section-thumb" src={section.image} alt={section.title} />}
                      <h3><span className="popup-section-icon">{section.icon}</span>{section.title}</h3>
                      <ul>
                        {section.items.map((item, idx) => (
                          <li key={`${section.title}-${idx}`}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}
