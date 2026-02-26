import './Section.css'
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

// provide wrapper that catches exceptions from useTranslation (possibly
// thrown when i18n storage access is blocked)
function useSafeTranslation() {
    try {
        return useTranslation();
    } catch (err) {
        console.error('translation hook failed:', err);
        return { t: (key: string) => key } as any;
    }
}

export default function Section() {
    const { t } = useSafeTranslation();

    const [isHidden, setIsHidden] = useState(false); // controls mainTitle slide

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


    // 전역에서 섹션 타이틀(hidden) 제어할 수 있도록 노출
    useEffect(() => {
        if (typeof window === 'undefined') return;
        (window as any).setSectionState = (state: { hide: boolean }) => {
            setIsHidden(!!state.hide);
        };
        // expose function to animate title flying to header/button
        (window as any).flyTitleTo = (targetRect?: { left: number; top: number; width: number; height: number }) => {
            try {
                const main = document.querySelector('.mainTitle') as HTMLElement | null;
                if (!main) return;
                const origRect = main.getBoundingClientRect();

                // clone node for animation
                const clone = main.cloneNode(true) as HTMLElement;
                clone.classList.add('title-fly-clone');
                // set initial fixed position matching original
                clone.style.position = 'fixed';
                clone.style.left = `${origRect.left}px`;
                clone.style.top = `${origRect.top}px`;
                clone.style.width = `${origRect.width}px`;
                clone.style.height = `${origRect.height}px`;
                clone.style.margin = '0';
                clone.style.pointerEvents = 'none';
                clone.style.zIndex = '12000';
                clone.style.transform = 'translateZ(0)';
                document.body.appendChild(clone);

                // hide scroll hint and subtitle inside clone so only main heading flies
                const cloneScroll = clone.querySelector('.scroll-title') as HTMLElement | null;
                if (cloneScroll) cloneScroll.style.display = 'none';
                const cloneSub = clone.querySelector('.section-subtitle') as HTMLElement | null;
                if (cloneSub) cloneSub.style.display = 'none';

                // hide original during flight
                main.style.transition = 'opacity 220ms ease';
                main.style.opacity = '0';

                // compute target center (default: header top-left if not provided)
                let targetCenterX = window.innerWidth / 2;
                let targetCenterY = 36; // default header area
                if (targetRect) {
                    targetCenterX = targetRect.left + targetRect.width / 2;
                    targetCenterY = targetRect.top + targetRect.height / 2;
                }

                const origCenterX = origRect.left + origRect.width / 2;
                const origCenterY = origRect.top + origRect.height / 2;
                const deltaX = targetCenterX - origCenterX;
                const deltaY = targetCenterY - origCenterY;

                // force reflow then animate
                requestAnimationFrame(() => {
                    clone.style.transition = 'transform 900ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease';
                    clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.5) rotateX(12deg)`;
                    clone.style.opacity = '0.0';
                });

                // cleanup after animation
                const cleanup = () => {
                    clone.remove();
                    // mark original hidden state
                    setIsHidden(true);
                    // ensure original remains hidden
                    main.style.opacity = '';
                    if (typeof window !== 'undefined') {
                        // sync global state
                        (window as any).setSectionState?.({ hide: true });
                    }
                };

                clone.addEventListener('transitionend', cleanup, { once: true });
                // safety timeout
                setTimeout(() => { if (document.body.contains(clone)) cleanup(); }, 1200);
            } catch (err) {
                console.error('flyTitleTo error', err);
            }
        };
        return () => {
            if (typeof window !== 'undefined') {
                delete (window as any).setSectionState;
                delete (window as any).flyTitleTo;
            }
        };
    }, []);

    // animate the whole section when scrolled into view
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const sec = document.getElementById('about_section');
        if (!sec) return;
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    document.body.classList.add('section-in-view');
                } else {
                    document.body.classList.remove('section-in-view');
                }
            });
        }, { threshold: 0.2 });
        obs.observe(sec);
        return () => {
            obs.disconnect();
            document.body.classList.remove('section-in-view');
        };
    }, []);

    // 타이틀 인라인 스타일 계산: CSS custom properties로 전달
    const titleStyle: React.CSSProperties = { ['--title-shift' as any]: `${titleShift}px`, ['--title-opacity' as any]: `${titleOpacity}` };

    return (
        <>
            <section id="about_section">   
                <div className={`mainTitle ${isHidden ? 'slide-up' : ''}`} style={titleStyle}>
                    <span className="section-subtitle">{t('section.subtitle')}</span>
                    <h1>
                        {t('section.title1')}
                        <p>{t('section.title2')}</p>
                    </h1>
                    <div className="scroll-title" aria-hidden="true">
                        <div className="scroll-text">scroll</div>
                        <div className="scroll-arrow">↓</div>
                    </div>
                </div>

                {/* Swiper를 에러 바운더리로 감싸서, Swiper 내부 오류로 전체 앱이 죽지 않게 합니다. */}
            </section>
        </>
    )
}

