// react hooks not needed in this module
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import Projects from '../Projects/Projects';
import Footer from '../Footer/Footer';
import 'swiper/css';
import 'swiper/css/effect-creative';

// local icons
import reactIcon from '../../assets/icons/react-original.svg?url';
import tsIcon from '../../assets/icons/typescript-original.svg?url';
import jsIcon from '../../assets/icons/javascript-original.svg?url';
import htmlIcon from '../../assets/icons/html5-original.svg?url';
import cssIcon from '../../assets/icons/css3-original.svg?url';
import nextIcon from '../../assets/icons/nextjs-original.svg?url';
import jqIcon from '../../assets/icons/jquery-original.svg?url';

// 슬라이드 데이터 (데스크탑 Swiper와 동일한 내용 사용)
const slides: any[] = [
  {
    src: "https://picsum.photos/id/180/800/450",
    backTitle: "프론트엔드가 되려는 이유",
    backDesc: "처음은 패션의 화려함을 브라우저에 이식하는 것에서 시작했지만, 이제는 사용자 경험을 극대화하고, 직관적인 인터페이스를 구현하는 데 열정을 가지고 있습니다.이제는 유저의 시선을 사로잡는인터페이스를 '재단'하고 싶다는 목표를 가지고 있습니다."
  },
  {
    src: "https://picsum.photos/id/1/800/450",
    backTitle: "힘들었던 점과 극복 방법",
    backDesc: "처음에는 모듯것이 어렵고 자고 일어나면 다시 초기화 하듯이 관리 도구, 프레임워크 등 폭포같이 쏟아지는 새로운 기술에 따라가기가 너무 힘들었지만 처음에는 화도 많이 났지만 한편으로는 이 코드가 작동이 되어서 기 감정에 희열감을 느껴 그 느낌을 잊지못하여 지금까지 오게 되었습니다."
  },
  {
    src: "https://picsum.photos/id/119/800/450",
    backTitle: "Skills",
    isSkills: true,
    skills: [
      { name: "React", icon: reactIcon },
      { name: "TypeScript", icon: tsIcon },
      { name: "JavaScript", icon: jsIcon },
      { name: "HTML5", icon: htmlIcon },
      { name: "CSS3", icon: cssIcon },
      { name: "Next.js", icon: nextIcon },
      { name: "jQuery", icon: jqIcon }
    ]
  },
  {
    src: "https://picsum.photos/id/201/800/450",
    backTitle: "협업과 소통",
    backDesc: "디자이너, 백엔드 개발자와의 원활한 협업을 통해 프로젝트를 성공으로 이끕니다. 클린 코드와 문서화를 중시합니다."
  },
  {
    src: "https://picsum.photos/id/250/800/450",
    backTitle: "지속적인 성장",
    backDesc: "새로운 기술을 학습하고 도전하는 것을 즐깁니다. 더 나은 개발자가 되기 위해 매일 발전하고 있습니다."
  }
];

interface MobileSwiperProps {
  swiperRef: React.MutableRefObject<any>;
  aboutPage: number;
  setAboutPage: (page: number) => void;
  flippedCards: Set<number>;
  handleCardTap: (index: number) => void;
}

export default function MobileSwiper({ swiperRef, aboutPage, setAboutPage, flippedCards, handleCardTap }: MobileSwiperProps) {
  const { t } = useTranslation();
  return (
    <Swiper
      onSwiper={(swiper) => { swiperRef.current = swiper; }}
      initialSlide={aboutPage}
      onSlideChange={(swiper) => setAboutPage(swiper.activeIndex)}
      effect="creative"
      creativeEffect={{
        prev: {
          translate: ['-100%', 0, -400],
          rotate: [0, 0, -15],
          opacity: 0.5,
        },
        next: {
          translate: ['100%', 0, 0],
          rotate: [0, 0, 15],
        },
      }}
      modules={[EffectCreative]}
      className="mobile-swiper"
    >
      {/* Page 0: Home */}
      <SwiperSlide>
        <div className="mobile-page mobile-page-home">
          <div className="mobile-home-content">
            <h1 className="mobile-home-title">
              <span className="mobile-home-subtitle">
                <span className="story-a">{t('mainTitle.story_my')}</span>
                <br />
                <span className="story-b">{t('mainTitle.story_story')}</span>
              </span>
              <span className="mobile-home-main">{t('mainTitle.title')}</span>
            </h1>
            <p className="mobile-home-hint">← Swipe to explore →</p>
          </div>
        </div>
      </SwiperSlide>

      {/* Pages 1-5: About Cards */}
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="mobile-page mobile-page-about">
            <div
              className={`mobile-card ${flippedCards.has(index) ? 'flipped' : ''}`}
              onClick={() => handleCardTap(index)}
            >
              <div className="mobile-card-inner">
                <div className="mobile-card-front">
                  <img
                    src={slide.src}
                    alt={`About ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="mobile-card-overlay">
                    <span className="mobile-tap-hint">Tap to flip</span>
                  </div>
                </div>
                <div className="mobile-card-back">
                  <div className="mobile-card-back-content">
                    <div className="mobile-card-tag">Front-End</div>
                    <h3 className="mobile-card-title">{slide.backTitle}</h3>
                    {slide.isSkills ? (
                      <div className="mobile-skills-grid">
                        {slide.skills?.map((skill: any, idx: number) => (
                          <div key={idx} className="mobile-skill-item">
                            <img src={skill.icon} alt={skill.name} className="mobile-skill-icon" onError={(e)=>{console.warn('mobile icon load failed:', skill.icon); (e.currentTarget as HTMLImageElement).style.visibility='hidden';}} />
                            <span className="mobile-skill-name">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mobile-card-desc">{slide.backDesc}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      {/* Page: Projects */}
      <SwiperSlide>
        <div className="mobile-page mobile-page-projects">
          <Projects isHorizontalPage={true} />
        </div>
      </SwiperSlide>

      {/* Page: Footer */}
      <SwiperSlide>
        <div className="mobile-page mobile-page-footer">
          <Footer />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
