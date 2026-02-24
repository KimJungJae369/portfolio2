import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import AboutCards from './AboutCards';

const slides = [
  { src: 'https://picsum.photos/id/180/1200/800', title: '프론트엔드가 되려는 이유', desc: '사용자 경험을 극대화하고 직관적인 인터페이스 구현에 열정이 있습니다.' },
  { src: 'https://picsum.photos/id/1/1200/800', title: '힘들었던 점과 극복 방법', desc: '새로운 기술을 따라가기 힘들었지만 꾸준함으로 극복했습니다.' },
  { src: 'https://picsum.photos/id/119/1200/800', title: 'Skills', desc: 'React, TypeScript, JS, HTML, CSS 등 다양한 스택을 다룹니다.' }
];

export default function SwiperCarousel() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Show Swiper only after the about_section is fully scrolled out (intersectionRatio === 0)
  useEffect(() => {
    const section = document.getElementById('about_section');
    if (!section) return;

    const check = () => {
      const rect = section.getBoundingClientRect();
      const scrolledOut = rect.bottom <= 0;
      // also show immediately when the section title is hidden
      const titleHidden = document.body.classList.contains('title-hidden');
      const shouldShow = scrolledOut || titleHidden;
      setVisible(shouldShow);
      if (shouldShow) document.body.classList.remove('section-scrolled-out');
    };

    // initial check
    check();

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  // When visible toggles on, animate each about-card sequentially
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cardsContainer = container.querySelector('.about-cards') as HTMLElement | null;
    if (!cardsContainer) return;

    const cards = Array.from(cardsContainer.querySelectorAll('.about-card')) as HTMLElement[];
    if (visible) {
      // prepare initial state
      cards.forEach((c) => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(28px)';
        c.style.transition = 'transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease';
      });
      // stagger in
      cards.forEach((c, i) => {
        const delay = i * 120;
        // use setTimeout to stagger
        setTimeout(() => {
          c.style.opacity = '1';
          c.style.transform = 'translateY(0)';
        }, delay);
      });
    } else {
      // hide again
      cards.forEach((c) => {
        c.style.opacity = '';
        c.style.transform = '';
        c.style.transition = '';
      });
    }
  }, [visible]);

  return (
    <div ref={containerRef} className={`swiperContainer ${visible ? 'show' : ''}`} aria-hidden={!visible}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        autoHeight={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{ rotate: 40, stretch: 0, depth: 120, modifier: 1 }}
        navigation
        modules={[EffectCoverflow, Navigation]}
        className="mySwiper"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i} style={{ width: '80vw', maxWidth: 900 }}>
            <div className="slide-card">
              <div className="slide-card-inner">
                <div className="slide-card-front">
                  <img src={s.src} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                </div>
                <div className="slide-card-back">
                  <div className="slide-back-content">
                    <div className="slide-back-tag">Front-End</div>
                    <h3 className="slide-back-title">{s.title}</h3>
                    <p className="slide-back-desc">{s.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* about-cards animate sequentially when this container becomes visible */}
      <div className={`about-cards-wrapper ${visible ? 'visible' : ''}`}>
        <AboutCards />
      </div>
    </div>
  );
}
