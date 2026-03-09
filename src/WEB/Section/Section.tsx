import './Section.css'
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { createFirework } from '../utils/fireworks'; // Import firework utility

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
    const [isMobile, setIsMobile] = useState(false);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Gold Dust Effect moved to GlobalMouseEffect.tsx

    useEffect(() => {
        const section = document.getElementById('about_section');
        if (!section) return;

        const updateTitleTransform = () => {
            if (!titleRef.current || isHidden) return;
            const rect = section.getBoundingClientRect(); // relative to viewport
            // start animation when top passes 25% of viewport
            const start = window.innerHeight * 0.25; 
            const end = - (rect.height * 0.5); 
            const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
            const shift = progress * 180; 
            
            titleRef.current.style.setProperty('--title-shift', `${shift}px`);
            titleRef.current.style.setProperty('--title-opacity', `${1 - progress}`);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isHidden || !titleRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 20; 
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            titleRef.current.style.setProperty('--rotate-x', `${-y}deg`);
            titleRef.current.style.setProperty('--rotate-y', `${x}deg`);
        };

        window.addEventListener('scroll', updateTitleTransform, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);
        updateTitleTransform(); // initial

        return () => {
            window.removeEventListener('scroll', updateTitleTransform);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHidden]);

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

    const handleTitleClick = (e: React.MouseEvent) => {
        // Calculate center of the clicked element but use event coordinates for trigger
        const x = e.clientX;
        const y = e.clientY;
        
        // Trigger single firework
        createFirework(x, y);
    };

    return (
        <>
            <section id="about_section">
                <div className="section-decorations" aria-hidden="true">
                    <div className="bg-text-layer">PORTFOLIO</div>
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                    <div className="particles"></div>
                    <div className="shooting-star star-1"></div>
                    <div className="shooting-star star-2"></div>
                </div>
                
                <div ref={titleRef} className={`mainTitle ${isHidden ? 'slide-up' : ''}`}>
                    <span className="section-subtitle">{t('section.subtitle')}</span>
                    <h1>
                        <span onClick={handleTitleClick} style={{cursor: 'pointer', display: 'inline-block', pointerEvents: 'auto'}}>{t('section.title1')}</span>
                        <p>{t('section.title2')}</p>
                    </h1>
                    <div className={`scroll-title ${isMobile ? 'scroll-title-horizontal' : ''}`} aria-hidden="true">
                        <div className="scroll-text">{isMobile ? 'left' : 'scroll'}</div>
                        <div className="scroll-arrow">{isMobile ? '→' : '↓'}</div>
                    </div>
                </div>

                {/* Swiper를 에러 바운더리로 감싸서, Swiper 내부 오류로 전체 앱이 죽지 않게 합니다. */}
            </section>
        </>
    )
}

