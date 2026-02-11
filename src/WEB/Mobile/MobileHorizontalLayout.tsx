import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useTranslation } from 'react-i18next';
import Projects from '../Projects/Projects';
import Footer from '../Footer/Footer';
import MobileBottomNav from './MobileBottomNav';
import './MobileHorizontalLayout.css';

import 'swiper/css';
import 'swiper/css/effect-creative';

interface Slide {
    src: string;
    backTitle: string;
    backDesc?: string;
    isSkills?: boolean;
    skills?: Array<{ name: string; icon: string }>;
}

export default function MobileHorizontalLayout() {
    const { t, i18n } = useTranslation();
    const swiperRef = useRef<SwiperType | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const slides: Slide[] = [
        {
            src: "https://picsum.photos/id/180/800/450",
            backTitle: "프론트엔드가 되려는 이유",
            backDesc: "처음은 패션의 화려함을 브라우저에 이식하는 것에서 시작했지만, 이제는 사용자 경험을 극대화하고, 직관적인 인터페이스를 구현하는 데 열정을 가지고 있습니다.이제는 유저의 시선을 사로잡는 인터페이스를 '재단'하고 싶다는 목표를 가지고 있습니다."
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
                { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
                { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                { name: "jQuery", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
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
        },
    ];

    const handleCardTap = (index: number) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <div className="mobile-horizontal-container">
            <Swiper
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                onSlideChange={(swiper) => setCurrentPage(swiper.activeIndex)}
                effect="creative"
                creativeEffect={{
                    prev: {
                        translate: ['-100%', 0, -400],
                        rotate: [0, 0, -15],
                        opacity: 0.5
                    },
                    next: {
                        translate: ['100%', 0, 0],
                        rotate: [0, 0, 15]
                    }
                }}
                modules={[EffectCreative]}
                className="mobile-swiper"
            >
                {/* Page 0: Home */}
                <SwiperSlide>
                    <div className="mobile-page mobile-page-home">
                        <div className="mobile-home-content">
                            <h1 className="mobile-home-title">
                                <span className="mobile-home-subtitle">VISUAL ARTISTS<br/>AND FASHION</span>
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
                                                    {slide.skills?.map((skill, idx) => (
                                                        <div key={idx} className="mobile-skill-item">
                                                            <img src={skill.icon} alt={skill.name} className="mobile-skill-icon" />
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

                {/* Page 6: Projects */}
                <SwiperSlide>
                    <div className="mobile-page mobile-page-projects">
                        <Projects isHorizontalPage={true} />
                    </div>
                </SwiperSlide>

                {/* Page 7: Footer */}
                <SwiperSlide>
                    <div className="mobile-page mobile-page-footer">
                        <Footer />
                    </div>
                </SwiperSlide>
            </Swiper>

            <MobileBottomNav 
                swiperRef={swiperRef} 
                currentPage={currentPage}
            />

            {/* Language Button */}
            <button 
                onClick={() => {
                    const newLang = i18n.language === 'en' ? 'ko' : 'en';
                    i18n.changeLanguage(newLang);
                }}
                className="mobile-lang-btn"
            >
                {i18n.language === 'en' ? 'KO' : 'EN'}
            </button>
        </div>
    );
}
