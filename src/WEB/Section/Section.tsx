import './Section.css'
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

export default function Section() {
    const { t } = useTranslation();
    const [isHidden, setIsHidden] = useState(false);
    const [isScrollOut, setIsScrollOut] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Project 05에서 추가 스크롤 시 사라짐
            if (isLastSlide && currentScrollY > 800) {
                setIsScrollOut(true);
                document.body.classList.add('section-scrolled-out');
            } else {
                setIsScrollOut(false);
                document.body.classList.remove('section-scrolled-out');
            }
            
            if (currentScrollY > 10) {
                if (!isHidden) {
                    setIsHidden(true);

                    setTimeout(() => {
                        swiperRef.current?.slideToLoop(0, 0);
                    }, 100);
                }
                
                // 50px 스크롤 감지
                const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
                
                if (scrollDiff > 100) {
                    if (swiperRef.current) {
                        if (scrollTimeout.current) {
                            clearTimeout(scrollTimeout.current);
                        }
                        
                        const currentIndex = swiperRef.current.realIndex;
                        
                        if (currentScrollY > lastScrollY.current) {
                            // 스크롤 다운 - 왼쪽으로
                            if (currentIndex < 4) {
                                scrollTimeout.current = setTimeout(() => {
                                    swiperRef.current?.slideNext();
                                }, 50);
                                setIsLastSlide(false);
                            } else {
                                // Project 05 도달
                                setIsLastSlide(true);
                            }
                        } else {
                            // 스크롤 업 - 오른쪽으로
                            scrollTimeout.current = setTimeout(() => {
                                swiperRef.current?.slidePrev();
                            }, 50);
                            setIsLastSlide(false);
                        }
                    }
                    lastScrollY.current = currentScrollY;
                }
            } else if (currentScrollY <= 10) {
                setIsHidden(false);
                setIsLastSlide(false);
                document.body.classList.remove('section-scrolled-out');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, [isHidden, isLastSlide]);

    const slides = [
        {
            src: "https://picsum.photos/id/10/800/450",
            backTitle: "Project 01",
            backDesc: "Creative design and development"
        },
        {
            src: "https://picsum.photos/id/20/800/450",
            backTitle: "Project 02",
            backDesc: "Innovative solutions for modern challenges"
        },
        {
            src: "https://picsum.photos/id/30/800/450",
            backTitle: "Project 03",
            backDesc: "Building experiences that matter"
        },
        {
            src: "https://picsum.photos/id/40/800/450",
            backTitle: "Project 04",
            backDesc: "Transforming ideas into reality"
        },
        {
            src: "https://picsum.photos/id/50/800/450",
            backTitle: "Project 05",
            backDesc: "Crafting digital excellence"
        },
    ];

  return (
    <>
        <section>   
            <div className={`mainTitle ${isHidden ? 'slide-up' : ''}`}>
                <span style={{color : '#e6d9c2', fontSize : '12px', letterSpacing : '2px'}}>{t('section.subtitle')}</span>
            <h1>
                {t('section.title1')}
                <p>{t('section.title2')}</p>
            </h1>
            </div>

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
                                        <h3 className="slide-back-title">{slide.backTitle}</h3>
                                        <p className="slide-back-desc">{slide.backDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    </>
  )
}

