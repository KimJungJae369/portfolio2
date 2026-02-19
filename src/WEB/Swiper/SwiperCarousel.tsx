// window 커스텀 속성 타입 선언
declare global {
    interface Window {
        swiperRef?: SwiperType;
        setSwiperState?: (state: { isHidden: boolean; isScrollOut: boolean; isLastSlide: boolean }) => void;
        setProjectsState?: (state: { forceShow: boolean }) => void;
        setSectionState?: (state: { hide: boolean }) => void;
    }
}
import { useEffect, useRef, useState } from 'react';
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

    // 디버깅/폴백용 상태
    const [internalError, setInternalError] = useState(false);
    // 강제 숨김 플래그 (about/ projects 섹션 상태에 따라 컴포넌트가 아예 사라지게 함)
    const [forceHidden, setForceHidden] = useState(false);

    const swiperRef = useRef<SwiperType | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isWheeling = useRef(false);
    const isTransitioning = useRef(false);
    const [isMobile, setIsMobile] = useState(false);

    // 마운트/언마운트 로깅
    useEffect(() => {
        console.debug('[SwiperCarousel] mounted');
        return () => console.debug('[SwiperCarousel] unmounted');
    }, []);

    // 자체 IntersectionObserver로 about/projects 상태 감시 — 더 안정적인 숨김 제어
    useEffect(() => {
        let aboutIn = false;
        let projectsIn = false;
        const update = () => setForceHidden(projectsIn || !aboutIn);

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = (entry.target as HTMLElement).id;
                if (id === 'about_section') {
                    aboutIn = entry.isIntersecting;
                }
                if (id === 'projects_section') {
                    projectsIn = entry.isIntersecting;
                }
            });
            update();
        }, { threshold: 0.1 });

        const aboutEl = document.getElementById('about_section');
        const projectsEl = document.getElementById('projects_section');
        if (aboutEl) obs.observe(aboutEl);
        if (projectsEl) obs.observe(projectsEl);

        return () => obs.disconnect();
    }, []);



    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile); 

        // expose control API so other components (Header) can show/hide the swiper
        if (typeof window !== 'undefined') {
            window.setSwiperState = (state: { isHidden: boolean; isScrollOut: boolean; isLastSlide: boolean }) => {
                try {
                    // 외부에서 강제로 스와이퍼 보이기/숨기기
                    setIsHidden(state.isHidden);
                    setIsScrollOut(state.isScrollOut);
                    setIsLastSlide(state.isLastSlide);
                    // 외부 호출은 강제 숨김을 해제하도록 처리(헤더에서 About 클릭 시 즉시 보이게 함)
                    setForceHidden(false);
                } catch (err) {
                    console.error('[SwiperCarousel] window.setSwiperState error', err);
                }
            };
            window.setProjectsState = (state: { forceShow: boolean }) => {
                if (state.forceShow) {
                    setIsScrollOut(true);
                    document.body.classList.add('section-scrolled-out');
                    setForceHidden(true);
                } else {
                    setIsScrollOut(false);
                    document.body.classList.remove('section-scrolled-out');
                    setForceHidden(false);
                }
            };
        }
        
        return () => {
            window.removeEventListener('resize', checkMobile);
            if (typeof window !== 'undefined') {
                delete window.setSwiperState;
                delete window.setProjectsState;
            }
        };
    }, []);

    useEffect(() => {
        
        const handleWheel = (e: WheelEvent) => {
        try {
            // 컴포넌트가 강제 숨김 상태면 휠을 차단하지 않음
            if (forceHidden) return;

            // 항상 플래그 초기화 안전장치 (슬라이더가 멈추는 현상 방지)
            if (isWheeling.current && !isScrollOut && !isHidden) {
                isWheeling.current = false;
            }
            if (isTransitioning.current && !isScrollOut && !isHidden) {
                isTransitioning.current = false;
            }
            const isFooterNavScroll = document.body.classList.contains('footer-nav-scroll');
            if (isFooterNavScroll) {
                return;
            }

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

                    // 추가 안전장치: 2초 후에도 플래그가 남아있으면 무조건 해제
                    setTimeout(() => {
                        isWheeling.current = false;
                        isTransitioning.current = false;
                    }, 2000);

                    return;
                }
                // 그 외의 경우 일반 스크롤 허용
                // 추가 안전장치: Projects에서 벗어나면 플래그 무조건 해제
                isWheeling.current = false;
                isTransitioning.current = false;
                return;
            }
            
            // 모바일은 10px, PC는 50px 이상일 때 슬라이드 컨트롤
            const scrollThreshold = isMobile ? 10 : 50;
            const canControlSlides = isHidden || currentScrollY > scrollThreshold;
            if (canControlSlides) {
                // 첫 진입시 hidden 상태로 전환
                if (!isHidden) {
                    e.preventDefault();
                    setIsHidden(true);
                    setTimeout(() => {
                        swiperRef.current?.slideToLoop(0, 0);
                    }, 100);
                    return;
                }
                
                // 모바일에서는 세로 스크롤 완전 차단 (버튼으로만 이동)
                if (isMobile) {
                    e.preventDefault();
                    return;
                }
                
                // PC에서는 기존 슬라이드 로직
                if (!isMobile) {
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
                    if (direction < 0) {
                        if (currentIndex > 0) {
                            const nextSlide = currentIndex - 1;
                            swiperRef.current?.slideToLoop(nextSlide, 500);
                            setIsLastSlide(false);
                        } else {
                            // 첫 슬라이드에서 위로 스크롤하면 슬라이더 닫고 메인으로 복귀
                            setIsHidden(false);
                            setIsScrollOut(false);
                            setIsLastSlide(false);
                            document.body.classList.remove('section-scrolled-out');
                            // 스크롤을 상단으로 이동해서 메인 타이틀이 보이게 함
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
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
                            // 마지막 슬라이드에서 아래로 스크롤 -> Projects로 이동 (부드러운 전환)
                            // 즉시 스와이퍼를 완전 숨겨서 플리커 제거
                            setForceHidden(true);

                            setIsScrollOut(true);
                            isTransitioning.current = true; // 전환 중 표시
                            document.body.classList.add('section-scrolled-out');

                            // 시각적 준비: 스와이퍼 컨테이너에 나가는 애니메이션 클래스 추가 (폴백)
                            containerRef.current?.classList.add('scrolling-out');

                            // 짧은 딜레이로 더 빠르게 전환 (모션이 자연스럽게 이어지도록)
                            setTimeout(() => {
                                const projectsSection = document.getElementById('projects_section');
                                if (projectsSection) {
                                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                                }
                            }, 120);

                            // 상태 정리 지연도 단축
                            setTimeout(() => {
                                isTransitioning.current = false;
                                // 임시 애니메이션 클래스 제거
                                containerRef.current?.classList.remove('scrolling-out');
                            }, 900);
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
            }
        } catch (err) {
            console.error('[SwiperCarousel] handleWheel error', err);
            setInternalError(true);
        }
    };
        
        const handleScroll = () => {
            try {
                // 강제 숨김 상태면 아무 작업도 하지 않음 (Projects/Outside 상태에서 휠 차단 방지)
                if (forceHidden) return;

                const isFooterNavScroll = document.body.classList.contains('footer-nav-scroll');
                if (isFooterNavScroll) {
                    return;
                }

                const currentScrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const projectsSection = document.getElementById('projects_section');
                const projectsOffsetTop = projectsSection?.offsetTop || windowHeight;
                const isInProjectsOrFooter = document.body.classList.contains('section-scrolled-out');
                const scrollThreshold = isMobile ? 10 : 50;
                
                // 1. 위로 스크롤해서 threshold 이하로 돌아오면 완전 초기화 (Home)
                if (currentScrollY <= scrollThreshold) {
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
                // 3. threshold 넘으면 hidden 활성화 (일반적인 스크롤 다운 진입)
                else if (currentScrollY > scrollThreshold && !isHidden && !isScrollOut && !isInProjectsOrFooter) {
                    setIsHidden(true);
                    setTimeout(() => {
                        swiperRef.current?.slideToLoop(0, 0);
                    }, 100);
                }
            } catch (err) {
                console.error('[SwiperCarousel] handleScroll error', err);
                setInternalError(true);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleScroll, { passive: true });

        // container 내부에서 발생하는 wheel 이벤트도 처리 (Swiper 내부 스코프에서 휠 캡처되는 경우 대비)
        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', handleWheel, { passive: false });
        }
        
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleScroll);
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', handleWheel);
            }
            if (wheelTimeout.current) {
                clearTimeout(wheelTimeout.current);
            }
        };
    }, [isHidden, isScrollOut, setIsHidden, setIsScrollOut, setIsLastSlide, isMobile]);

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

    const handlePrevSlide = () => {
        if (swiperRef.current && !isWheeling.current) {
            swiperRef.current.slidePrev();
            const currentIndex = swiperRef.current.realIndex;
            if (currentIndex < 4) {
                setIsLastSlide(false);
            }
        }
    };

    const handleNextSlide = () => {
        if (swiperRef.current && !isWheeling.current) {
            swiperRef.current.slideNext();
            const currentIndex = swiperRef.current.realIndex;
            if (currentIndex === 4) {
                setIsLastSlide(true);
            }
        }
    };

    const handleGoToProjects = () => {
        // 모든 상황에서 슬라이더 플래그/클래스 강제 해제 (최종 안전장치)
        isTransitioning.current = false;
        isWheeling.current = false;
        if (window && window.document && window.document.body) {
            document.body.classList.remove('section-scrolled-out');
            document.body.classList.remove('footer-nav-scroll');
        }

        setIsScrollOut(true);
        document.body.classList.add('section-scrolled-out');

        const projectsSection = document.getElementById('projects_section');
        if (projectsSection) {
            const targetY = projectsSection.offsetTop;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
    };

    if (internalError) {
        return (
            <div className="swiper-error" style={{height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af6a'}}>
                <div>
                    <strong>Swiper 로드 중 오류가 발생했습니다.</strong>
                    <div style={{marginTop:8}}>콘솔을 확인하거나 페이지를 새로 고침해주세요.</div>
                </div>
            </div>
        );
    }

    // 강제 숨김(about 섹션 벗어나거나 projects 진입 시) — 가장 강력한 폴백
    if (forceHidden) {
        return null;
    }

    return (
        <div 
            ref={containerRef}
            className={`swiperContainer ${isHidden ? 'show' : ''} ${isScrollOut ? 'scroll-out' : ''}`}
        >
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // window.swiperRef에 할당하여 외부에서 접근 가능하게
                    if (typeof window !== 'undefined') {
                        window.swiperRef = swiper;
                    }
                }}
                effect={'coverflow'}
                grabCursor={!isMobile}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                initialSlide={0}
                allowTouchMove={!isMobile}
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
            
            {/* 모바일 전용 네비게이션 버튼 */}
            {isMobile && isHidden && (
                <div className="mobile-nav-bottom">
                    <button 
                        className="nav-btn nav-btn-prev" 
                        onClick={handlePrevSlide}
                        aria-label="이전 슬라이드"
                    >
                        ‹
                    </button>
                    
                    {_isLastSlide ? (
                        <button 
                            className="nav-btn nav-btn-projects" 
                            onClick={handleGoToProjects}
                            aria-label="프로젝트 보기"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M10.5 7.5L5 12l5.5 4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.5 7.5L19 12l-5.5 4.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    ) : (
                        <button 
                            className="nav-btn nav-btn-next" 
                            onClick={handleNextSlide}
                            aria-label="다음 슬라이드"
                        >
                            ›
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
