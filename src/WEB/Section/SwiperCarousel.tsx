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
    isLastSlide: _isLastSlide,
    setIsLastSlide,
}: SwiperCarouselProps) {
    const swiperRef = useRef<SwiperType | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isWheeling = useRef(false);
    const isTransitioning = useRef(false);

    useEffect(() => {
        
        const handleWheel = (e: WheelEvent) => {
            const currentScrollY = window.scrollY;
            const projectsSection = document.getElementById('projects_section');
            const projectsRect = projectsSection?.getBoundingClientRect();
            const projectsTop = projectsRect?.top || 0;
            
            // body 클래스 확인으로 실제 섹션 상태 체크
            const isInProjectsOrFooter = document.body.classList.contains('section-scrolled-out');
            
            // Projects/Footer 섹션에 있을 때는 일반 휠 이벤트 허용 (내부 스크롤)
            // 단, 상단 근처에서 위로 스크롤할 때만 슬라이드로 복귀
            if (isScrollOut || isInProjectsOrFooter) {
                // Projects 섹션의 상단이 viewport 상단 근처(100px 이내)에 있고, 위로 스크롤할 때만 복귀
                if (e.deltaY < 0 && projectsTop >= 50 && projectsTop <= 150) {
                    if (isTransitioning.current) return;
                    
                    e.preventDefault();
                    isWheeling.current = true;
                    isTransitioning.current = true;
                    console.log('Returning to slides from Projects top');
                    
                    setIsScrollOut(false);
                    document.body.classList.remove('section-scrolled-out');
                    
                    setIsHidden(true);
                    setIsLastSlide(true);
                    
                    if (swiperRef.current) {
                        swiperRef.current.slideToLoop(4, 0);
                    }
                    
                    // 스크롤을 0으로 강제 이동하여 섹션이 확실히 보이게 함
                    window.scrollTo({ top: 0, behavior: 'auto' });
                    
                    if (wheelTimeout.current) {
                        clearTimeout(wheelTimeout.current);
                    }
                    wheelTimeout.current = setTimeout(() => {
                        isWheeling.current = false;
                        isTransitioning.current = false;
                    }, 800);
                    
                    return;
                }
                // 그 외의 경우 일반 스크롤 허용
                return;
            }
            
            // 스크롤이 50px 이상일 때만 슬라이드 컨트롤
            if (currentScrollY > 50) {
                // 첫 진입시 hidden 상태로 전환
                if (!isHidden) {
                    e.preventDefault();
                    setIsHidden(true);
                    setTimeout(() => {
                        swiperRef.current?.slideToLoop(0, 0);
                    }, 100);
                    return;
                }
                
                // 휠 이벤트 디바운싱
                // 전환 중일 때 휠 막기
                if (isWheeling.current || isTransitioning.current) {
                    e.preventDefault();
                    return;
                }
                
                e.preventDefault();
                isWheeling.current = true;
                
                const currentIndex = swiperRef.current?.realIndex || 0;
                const totalSlides = 5;
                const direction = e.deltaY > 0 ? 1 : -1;
                
                // 위로 스크롤
                if (direction < 0 && currentIndex > 0) {
                    const nextSlide = currentIndex - 1;
                    swiperRef.current?.slideToLoop(nextSlide, 500);
                    setIsLastSlide(false);
                }
                // 아래로 스크롤
                else if (direction > 0) {
                    if (currentIndex < totalSlides - 1) {
                        const nextSlide = currentIndex + 1;
                        swiperRef.current?.slideToLoop(nextSlide, 500);
                        
                        if (nextSlide === totalSlides - 1) {
                            setIsLastSlide(true);
                        }
                    } else {
                        // 마지막 슬라이드에서 아래로 스크롤 -> Projects로 이동
                        setIsScrollOut(true);
                        isTransitioning.current = true; // 전환 중 표시
                        document.body.classList.add('section-scrolled-out');
                        
                        // Projects 가시성을 위해 스크롤 이동
                        setTimeout(() => {
                            const projectsSection = document.getElementById('projects_section');
                            if (projectsSection) {
                                // offsetTop으로 이동하여 헤더/타이틀이 잘 보이게
                                window.scrollTo({ top: projectsSection.offsetTop, behavior: 'smooth' });
                            }
                        }, 100);
                        
                        // 전환 완료 후 플래그 해제 (스크롤 애니메이션 시간 고려)
                        setTimeout(() => {
                            isTransitioning.current = false;
                        }, 1500);
                    }
                }
                
                // 700ms 후 다음 휠 입력 허용
                if (wheelTimeout.current) {
                    clearTimeout(wheelTimeout.current);
                }
                wheelTimeout.current = setTimeout(() => {
                    isWheeling.current = false;
                }, 700);
            }
        };
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const projectsSection = document.getElementById('projects_section');
            const projectsOffsetTop = projectsSection?.offsetTop || windowHeight;
            const isInProjectsOrFooter = document.body.classList.contains('section-scrolled-out');
            
            // 1. 위로 스크롤해서 50px 이하로 돌아오면 완전 초기화 (Home)
            if (currentScrollY <= 50) {
                if (isHidden || isScrollOut || isInProjectsOrFooter) {
                    setIsHidden(false);
                    setIsScrollOut(false);
                    setIsLastSlide(false);
                    document.body.classList.remove('section-scrolled-out');
                    isWheeling.current = false;
                    isTransitioning.current = false;
                    
                    setTimeout(() => {
                        swiperRef.current?.slideToLoop(0, 0);
                    }, 100);
                }
            }
            // 2. Projects 모드에서 수동으로 스크롤을 올려서 Projects 시작점보다 위로 갔을 때
            // 단, 전환 중이 아닐 때만 체크
            else if ((isScrollOut || isInProjectsOrFooter) && !isTransitioning.current && currentScrollY < projectsOffsetTop - 200) {
                console.log('Manual scroll up from Projects detected');
                setIsScrollOut(false);
                document.body.classList.remove('section-scrolled-out');
                setIsHidden(true); // 슬라이드 보임 상태 유지
                setIsLastSlide(true); // 마지막 슬라이드 상태
                
                if (swiperRef.current && swiperRef.current.realIndex !== 4) {
                    swiperRef.current.slideToLoop(4, 0);
                }
            }
            // 3. 50px 넘으면 hidden 활성화 (일반적인 스크롤 다운 진입)
            else if (currentScrollY > 50 && !isHidden && !isScrollOut && !isInProjectsOrFooter) {
                setIsHidden(true);
                setTimeout(() => {
                    swiperRef.current?.slideToLoop(0, 0);
                }, 100);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            if (wheelTimeout.current) {
                clearTimeout(wheelTimeout.current);
            }
        };
    }, [isHidden, isScrollOut, setIsHidden, setIsScrollOut, setIsLastSlide]);

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
        <div 
            ref={containerRef}
            className={`swiperContainer ${isHidden ? 'show' : ''} ${isScrollOut ? 'scroll-out' : ''}`}
        >
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
