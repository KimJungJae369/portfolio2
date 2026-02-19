import './Section.css'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import SwiperCarousel from '../Swiper/SwiperCarousel';
import ErrorBoundary from '../ErrorBoundary';

export default function Section() {
    const { t } = useTranslation();
    const [isHidden, setIsHidden] = useState(false);
    const [isScrollOut, setIsScrollOut] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);

    // 섹션 타이틀의 스크롤 연동 애니메이션 (아래로 스크롤하면 title이 위로 올라가며 사라짐)
    const [titleShift, setTitleShift] = useState(0);
    const [titleOpacity, setTitleOpacity] = useState(1);

    useEffect(() => {
        const section = document.getElementById('about_section');
        if (!section) return;

        const onScrollTitle = () => {
            const rect = section.getBoundingClientRect();
            const start = window.innerHeight * 0.25; // 시작점(타이틀이 움직이기 시작할 뷰포트 위치)
            const end = - (rect.height * 0.5); // 끝점(완전히 사라진 상태)
            const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
            const shift = progress * 180; // px, 위로 이동량
            setTitleShift(shift);
            setTitleOpacity(1 - progress);
        };

        onScrollTitle();
        window.addEventListener('scroll', onScrollTitle, { passive: true });
        return () => window.removeEventListener('scroll', onScrollTitle);
    }, []);

    // about_section이 뷰포트를 벗어나면 스와이퍼를 완전 숨깁니다 (백그라운드로 보이는 문제 방지)
    useEffect(() => {
        const section = document.getElementById('about_section');
        if (!section) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    // 섹션이 뷰포트 밖으로 나가면 스와이퍼 숨김
                    setIsHidden(false);
                    setIsScrollOut(false);
                    setIsLastSlide(false);

                    // 전역 상태와 DOM 폴백 동기화
                    if (typeof window !== 'undefined' && window.setSwiperState) {
                        window.setSwiperState({ isHidden: false, isScrollOut: false, isLastSlide: false });
                    }
                    document.querySelector('.swiperContainer')?.classList.add('hidden-by-projects');
                    document.body.classList.add('section-scrolled-out');
                } else {
                    // 섹션이 다시 보이면 숨김 클래스 해제
                    document.querySelector('.swiperContainer')?.classList.remove('hidden-by-projects');
                    document.body.classList.remove('section-scrolled-out');
                }
            });
        }, { threshold: 0.05 });

        obs.observe(section);
        return () => obs.disconnect();
    }, []);

    // 전역에서 섹션 타이틀(hidden) 제어할 수 있도록 노출
    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.setSectionState = (state: { hide: boolean }) => {
            setIsHidden(!!state.hide);
        };
        return () => {
            if (typeof window !== 'undefined') {
                delete window.setSectionState;
            }
        };
    }, []);

    // 타이틀 인라인 스타일 계산 (isHidden 우선)
    const titleStyle: React.CSSProperties = isHidden
        ? { transform: 'translate(-50%, -150%)', opacity: 0 }
        : { transform: `translate(-50%, calc(-50% - ${titleShift}px))`, opacity: titleOpacity };

    return (
        <>
            <section id="about_section">   
                <div className={`mainTitle ${isHidden ? 'slide-up' : ''}`} style={titleStyle}>
                    <span className="section-subtitle">{t('section.subtitle')}</span>
                    <h1>
                        {t('section.title1')}
                        <p>{t('section.title2')}</p>
                    </h1>
                </div>

                {/* Swiper를 에러 바운더리로 감싸서, Swiper 내부 오류로 전체 앱이 죽지 않게 합니다. */}
                <ErrorBoundary>
                    <SwiperCarousel 
                        isHidden={isHidden}
                        setIsHidden={setIsHidden}
                        isScrollOut={isScrollOut}
                        setIsScrollOut={setIsScrollOut}
                        isLastSlide={isLastSlide}
                        setIsLastSlide={setIsLastSlide}
                    />
                </ErrorBoundary>
            </section>
        </>
    )
}

