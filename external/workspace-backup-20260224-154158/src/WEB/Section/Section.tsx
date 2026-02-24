import './Section.css';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';
// no direct children here; content moved to SwiperCarousel

export default function Section() {
    const { t } = useTranslation();
    const [isHidden, setIsHidden] = useState(false);

    // 섹션 타이틀의 스크롤 연동 애니메이션
    const [titleShift, setTitleShift] = useState(0);
    const [titleOpacity, setTitleOpacity] = useState(1);

    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const titleShiftRef = useRef<number>(0);
    const rafIdRef = useRef<number | null>(null);
    const lastTouchYRef = useRef<number | null>(null);
    const maxShiftRef = useRef<number>(180);

    useEffect(() => {
        const section = sectionRef.current || document.getElementById('about_section');
        if (!section) return;

        const recalcMax = () => {
            maxShiftRef.current = Math.min(260, (section.clientHeight || window.innerHeight) * 0.6);
        };

        recalcMax();

        const flush = () => {
            setTitleShift(titleShiftRef.current);
            const op = 1 - titleShiftRef.current / Math.max(1, maxShiftRef.current);
            setTitleOpacity(Math.max(0, Math.min(1, op)));
            rafIdRef.current = null;
        };

        const scheduleFlush = () => {
            if (rafIdRef.current == null) {
                rafIdRef.current = requestAnimationFrame(flush) as unknown as number;
            }
        };

        const clamp = (v: number) => Math.max(0, Math.min(v, maxShiftRef.current));

        const onWheel = (e: WheelEvent) => {
            titleShiftRef.current = clamp(titleShiftRef.current + e.deltaY);
            scheduleFlush();
        };

        const onTouchStart = (e: TouchEvent) => {
            lastTouchYRef.current = e.touches[0]?.clientY ?? null;
        };

        const onTouchMove = (e: TouchEvent) => {
            const last = lastTouchYRef.current;
            const cur = e.touches[0]?.clientY ?? null;
            if (last != null && cur != null) {
                const delta = last - cur;
                titleShiftRef.current = clamp(titleShiftRef.current + delta);
                scheduleFlush();
            }
            lastTouchYRef.current = cur;
        };

        const onResize = () => {
            recalcMax();
            titleShiftRef.current = clamp(titleShiftRef.current);
            scheduleFlush();
        };

        window.addEventListener('wheel', onWheel, { passive: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('resize', onResize);

        const titleEl = titleRef.current;
        if (titleEl) {
            titleEl.addEventListener('wheel', onWheel, { passive: true });
            titleEl.addEventListener('touchstart', onTouchStart, { passive: true });
            titleEl.addEventListener('touchmove', onTouchMove, { passive: true });
        }

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('resize', onResize);
            if (titleEl) {
                titleEl.removeEventListener('wheel', onWheel);
                titleEl.removeEventListener('touchstart', onTouchStart);
                titleEl.removeEventListener('touchmove', onTouchMove);
            }
            if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current as unknown as number);
        };
    }, []);

    // Observe all sections and toggle `.in-view` when a section becomes active (for snap transitions)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
        if (!sections.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const el = entry.target as HTMLElement;
                if (entry.isIntersecting) {
                    el.classList.add('in-view');
                    if (el.id) document.body.dataset.activeSection = el.id;
                } else {
                    el.classList.remove('in-view');
                }
            });
        }, { threshold: 0.55 });

        sections.forEach((s) => obs.observe(s));
        return () => obs.disconnect();
    }, []);

    // about_section이 뷰포트를 벗어나면 스와이퍼 관련 폴백 처리
    useEffect(() => {
        const section = document.getElementById('about_section');
        if (!section) return;

        const obs = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    // keep section hidden state in sync but do NOT toggle global body classes here
                    if (!entry.isIntersecting) {
                        setIsHidden(false);
                        if (typeof window !== 'undefined' && (window as any).setSwiperState) {
                            (window as any).setSwiperState({ isHidden: false, isScrollOut: false, isLastSlide: false });
                        }
                    } else {
                        // section is in view; clear any 'hidden' fallback on swiper container
                        document.querySelector('.swiperContainer')?.classList.remove('hidden-by-projects');
                    }
                });
            }, { threshold: 0.05 });

        obs.observe(section);
        return () => obs.disconnect();
    }, []);

    // Swiper 섹션이 뷰포트에 들어오면 타이틀에 '커튼' 애니메이션을 적용
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const target = document.getElementById('swiper_section');
        const titleEl = titleRef.current;
        if (!target || !titleEl) return;

        const onAnimEnd = (e: AnimationEvent) => {
            // cleanup curtain-show after open animation
            if ((e.target as HTMLElement).classList.contains('curtain-show')) {
                (e.target as HTMLElement).classList.remove('curtain-show');
            }
        };

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!titleRef.current) return;
                if (entry.isIntersecting) {
                    // swiper가 보이면 타이틀을 커튼처럼 닫음
                    titleRef.current.classList.remove('curtain-show');
                    titleRef.current.classList.add('curtain-hide');
                } else {
                    // swiper가 나가면 다시 열기 애니메이션
                    titleRef.current.classList.remove('curtain-hide');
                    titleRef.current.classList.add('curtain-show');
                }
            });
        }, { threshold: 0.45 });

        titleEl.addEventListener('animationend', onAnimEnd as any);
        obs.observe(target);

        return () => {
            obs.disconnect();
            titleEl.removeEventListener('animationend', onAnimEnd as any);
        };
    }, []);

    // 전역에서 섹션 타이틀(hidden) 제어
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const win: any = window;
        win.setSectionState = (state: any) => {
            setIsHidden(!!state?.hide);
        };
        return () => {
            if (typeof window !== 'undefined') delete (window as any).setSectionState;
        };
    }, []);

    const scale = 0.96 + 0.04 * titleOpacity;
    const titleStyle: React.CSSProperties = isHidden
        ? { transform: 'translate(-50%, -150%) scale(0.94)', opacity: 0 }
        : { transform: `translate(-50%, calc(-50% - ${titleShift}px)) scale(${scale}) translateZ(0)`, opacity: titleOpacity };

    // 섹션 레이아웃 변형은 레이아웃 문제를 일으킬 수 있으므로
    // 섹션 자체에 transform을 적용하지 않습니다. 타이틀과 내부 요소만 애니메이션 처리합니다.

    // expose a body-class so other components (Swiper) can show immediately
    useEffect(() => {
        const hidden = isHidden || titleOpacity <= 0.02;
        if (hidden) document.body.classList.add('title-hidden');
        else document.body.classList.remove('title-hidden');
    }, [titleOpacity, isHidden]);

    // Scroll indicator visibility and behavior
    const scrollToSwiper = useCallback(() => {
        const el = document.getElementById('swiper_section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const showScrollIndicator = !isHidden && titleOpacity > 0.12;

    return (
        <section id="about_section" ref={sectionRef}>
            <div ref={titleRef} className={`mainTitle ${isHidden ? 'slide-up' : ''}`} style={titleStyle}>
                <span className="section-subtitle">{t('section.subtitle')}</span>
                <h1>
                    {t('section.title1')}
                    <p>{t('section.title2')}</p>
                </h1>
            </div>

            {/* Scroll indicator below portfolio title */}
            <div
                role="button"
                tabIndex={0}
                className={`scroll-indicator ${showScrollIndicator ? 'show' : 'hide'}`}
                aria-label={t('section.scrollLabel') || 'Scroll down'}
                onClick={scrollToSwiper}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToSwiper(); } }}
                style={{ marginTop: '100px' }}
            >
                <span className="scroll-label">{t('section.scroll') || 'Scroll'}</span>
                <svg className="scroll-arrow" width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M14 4v20" stroke="#d4af6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path className="chev" d="M6 20l8 8 8-8" stroke="#d4af6a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            </div>

            {/* content below title removed; AboutCards are rendered in the Swiper section placed after this section */}
        </section>
    );
}

