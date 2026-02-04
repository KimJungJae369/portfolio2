import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

interface SwiperCarouselProps {
    isHidden: boolean;
    setIsHidden: (hidden: boolean) => void;
    isScrollOut: boolean;
    setIsScrollOut: (scrollOut: boolean) => void;
    isLastSlide: boolean;
    setIsLastSlide: (lastSlide: boolean) => void;
}

interface Slide {
    src: string;
    backTitle: string;
    backDesc?: string;
    isSkills?: boolean;
    skills?: Array<{ name: string; icon: string }>;
}

export default function SwiperCarousel({
    isHidden,
    setIsHidden,
    isScrollOut,
    setIsScrollOut,
    isLastSlide,
    setIsLastSlide,
}: SwiperCarouselProps) {
    const swiperRef = useRef<SwiperType | null>(null);
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastSlideArmed = useRef(false);

    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    // Projects 섹션에서는 처리 안함
                    if (document.body.classList.contains('section-scrolled-out')) {
                        if (currentScrollY < 50) {
                            document.body.classList.remove('section-scrolled-out');
                            setIsScrollOut(false);
                        }
                        ticking = false;
                        return;
                    }
                    
                    const totalSlides = 5;
                    const firstSlideHeight = 160; // 메인 타이틀 -> 이미지1까지 (50~160px, 110px 구간)
                    const nextSlideHeight = 110; // 이미지1 -> 이미지2, ... 110px씩
                    
                    if (currentScrollY > 50) {
                        if (!isHidden) {
                            setIsHidden(true);

                            setTimeout(() => {
                                swiperRef.current?.slideToLoop(0, 0);
                            }, 100);
                            
                            lastScrollY.current = currentScrollY;
                            ticking = false;
                            return;
                        }
                        
                        // 스크롤 위치에 따라 슬라이드 인덱스 계산
                        let targetSlide = 0;
                        
                        if (currentScrollY <= firstSlideHeight) {
                            // 50~160px: 이미지1 (110px 구간)
                            targetSlide = 0;
                        } else {
                            // 161px 이후 110px씩 슬라이드 전환
                            const afterFirstScroll = currentScrollY - firstSlideHeight;
                            targetSlide = Math.min(Math.floor(afterFirstScroll / nextSlideHeight) + 1, totalSlides - 1);
                        }
                        
                        const currentIndex = swiperRef.current?.realIndex || 0;
                        
                        // 한 번에 한 슬라이드씩만 전환되도록 제한
                        if (targetSlide !== currentIndex && targetSlide >= 0) {
                            const slideStep = targetSlide > currentIndex ? 1 : -1;
                            const nextSlide = currentIndex + slideStep;
                            
                            swiperRef.current?.slideToLoop(nextSlide, 500);
                            
                            if (nextSlide === totalSlides - 1) {
                                setIsLastSlide(true);
                            } else {
                                setIsLastSlide(false);
                            }
                        }
                        
                        // 이미지5(마지막 이미지) 이후 추가 스크롤 시 Projects 전환
                        // 이미지5 표시 후 50px만 더 스크롤하면 Projects 표시
                        const image5StartScroll = firstSlideHeight + (nextSlideHeight * (totalSlides - 1));
                        if (targetSlide === totalSlides - 1 && currentScrollY > image5StartScroll + 50) {
                            setIsScrollOut(true);
                            document.body.classList.add('section-scrolled-out');
                            ticking = false;
                            return;
                        }
                    } else if (currentScrollY <= 50) {
                        setIsHidden(false);
                        setIsLastSlide(false);
                        lastSlideArmed.current = false;
                        document.body.classList.remove('section-scrolled-out');
                    }

                    lastScrollY.current = currentScrollY;
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [isHidden, isLastSlide, setIsHidden, setIsScrollOut, setIsLastSlide]);

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

    return (
        <div className={`swiperContainer ${isHidden ? 'show' : ''} ${isScrollOut ? 'scroll-out' : ''}`}>
            <Swiper
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                initialSlide={0}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="slide-card">
                            <div className="slide-card-inner">
                                <div className="slide-card-front">
                                    <img 
                                        src={slide.src} 
                                        alt={`Slide ${index}`} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} 
                                    />
                                </div>
                                <div className="slide-card-back">
                                    <div className="slide-back-content">
                                        <div className="slide-back-tag">Front-End</div>
                                        <h3 className="slide-back-title">{slide.backTitle}</h3>
                                        {slide.isSkills ? (
                                            <div className="skills-grid">
                                                {slide.skills?.map((skill, idx) => (
                                                    <div key={idx} className="skill-item">
                                                        <img src={skill.icon} alt={skill.name} className="skill-icon" />
                                                        <span className="skill-name">{skill.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="slide-back-desc">{slide.backDesc}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
