import './Section.css'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SwiperCarousel from './SwiperCarousel';

export default function Section() {
    const { t } = useTranslation();
    const [isHidden, setIsHidden] = useState(false);
    const [isScrollOut, setIsScrollOut] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);

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

                <SwiperCarousel 
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                    isScrollOut={isScrollOut}
                    setIsScrollOut={setIsScrollOut}
                    isLastSlide={isLastSlide}
                    setIsLastSlide={setIsLastSlide}
                />
            </section>
        </>
    )
}

