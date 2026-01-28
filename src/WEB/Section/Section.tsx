import './Section.css'
import { useTranslation } from 'react-i18next';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Section() {
    const { t } = useTranslation();
    const [isHidden, setIsHidden] = useState(false);
    const swiperRef = useRef<SwiperType | null>(null);
    const lastScrollY = useRef(0);
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 10) {
                setIsHidden(true);
                
                // 50px 단위로 스크롤 감지
                const scrollDiff = Math.abs(currentScrollY - lastScrollY.current);
                
                if (scrollDiff >= 50) {
                    if (swiperRef.current) {
                        if (scrollTimeout.current) {
                            clearTimeout(scrollTimeout.current);
                        }
                        
                        if (currentScrollY > lastScrollY.current) {
                            // 스크롤 다운 - 왼쪽으로
                            scrollTimeout.current = setTimeout(() => {
                                swiperRef.current?.slideNext();
                            }, 50);
                        } else {
                            // 스크롤 업 - 오른쪽으로
                            scrollTimeout.current = setTimeout(() => {
                                swiperRef.current?.slidePrev();
                            }, 50);
                        }
                    }
                    lastScrollY.current = currentScrollY;
                }
            } else {
                setIsHidden(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    const images = [
        "https://picsum.photos/id/10/800/450",
        "https://picsum.photos/id/20/800/450",
        "https://picsum.photos/id/30/800/450",
        "https://picsum.photos/id/40/800/450",
        "https://picsum.photos/id/50/800/450",
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

            <div className={`swiperContainer ${isHidden ? 'show' : ''}`}>
                <Swiper
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {images.map((src: string, index: number) => (
                    <SwiperSlide key={index}>
                        <img 
                        src={src} 
                        alt={`Slide ${index}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} 
                        />
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    </>
  )
}

