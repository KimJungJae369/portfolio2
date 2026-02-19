
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MobileSwiper from './MobileSwiper';
import Projects from '../Projects/Projects';
import MobileBottomNav from './MobileBottomNav';
import './MobileHorizontalLayout.css';


function MobileHorizontalLayout() {
    const swiperRef = useRef<any>(null);
    const swiperContainerRef = useRef<HTMLDivElement>(null);
    const [aboutPage, setAboutPage] = useState(0);
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
    const { i18n } = useTranslation();

    // 카드 뒤집기 핸들러
    const handleCardTap = (index: number) => {
        setFlippedCards((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    // 섹션 스크롤 함수
    const scrollToSection = (section: 'about' | 'projects' | 'footer', aboutPageNum?: number) => {
        if (section === 'about' && typeof aboutPageNum === 'number' && swiperRef.current) {
            swiperRef.current.slideTo(aboutPageNum);
            setAboutPage(aboutPageNum);
            if (swiperContainerRef.current) {
                swiperContainerRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } else if ((section === 'projects' || section === 'footer') && swiperRef.current) {
            const total = swiperRef.current.slides?.length || 0;
            const projectsIndex = Math.max(0, total - 2); // projects is second last
            const footerIndex = Math.max(0, total - 1);
            if (section === 'projects') {
                swiperRef.current.slideTo(projectsIndex);
                setAboutPage(projectsIndex);
            } else {
                swiperRef.current.slideTo(footerIndex);
                setAboutPage(footerIndex);
            }
            if (swiperContainerRef.current) {
                swiperContainerRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div>
            <div ref={swiperContainerRef}>
                <MobileSwiper
                    swiperRef={swiperRef}
                    aboutPage={aboutPage}
                    setAboutPage={setAboutPage}
                    flippedCards={flippedCards}
                    handleCardTap={handleCardTap}
                />
            </div>
            <MobileBottomNav
                swiperRef={swiperRef}
                aboutPage={aboutPage}
                setAboutPage={setAboutPage}
                scrollToSection={scrollToSection}
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

export default MobileHorizontalLayout;
