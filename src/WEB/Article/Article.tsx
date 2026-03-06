import { useEffect, useRef } from 'react';
import './Article.css';
import profileImg from '../img2/KakaoTalk_20260305_211431499.jpg';

export default function Article() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
              } else {
                entry.target.classList.remove('in-view');
              }
            });
          },
          { threshold: 0.2 } 
        );
    
        const items = document.querySelectorAll('.article-container');
        items.forEach(item => observer.observe(item));
    
        return () => {
             items.forEach(item => observer.unobserve(item));
        };
      }, []);

    const articles = Array(6).fill(null).map((_, index) => {
        if (index === 0) {
            return (
                <div key={index} className="article-container">
                    <div className={`article-image-wrapper ${index % 2 !== 0 ? 'image-right' : ''}`}>
                        <img src={profileImg} alt="Profile" />
                    </div>
                    <div className={`article-content-wrapper ${index % 2 !== 0 ? 'content-left' : ''}`}>
                        <span className="article-subtitle">1996-2026 year</span>
                        <h2 className="article-title" style={{ fontSize: '20px' }}>
                            런웨이 대신 브라우저로 출근하는 '핏(Fit)'이 다른 개발자 김정재입니다
                        </h2>
                        <p className="article-description" style={{ fontSize: '18px' }}>
                            계절보다 앞서가는 패션계의 속도감 속에서 살아남았습니다.
                            <br />
                            매일같이 쏟아지는 새로운 프레임워크와 라이브러리라는 '신상'들 앞에서도 
                            <br />
                            누구보다 빠르게 트렌드를 분석해 서비스에 입힐 준비가 되어 있습니다
                        </p>
                        <a href="https://blog.naver.com/ktk662002" target='_blank' rel='noopener noreferrer' className="article-link">MY BLOG →</a>
                    </div>
                </div>
            );
        }

        return (
            <div key={index} className="article-container">
                <div className={`article-image-wrapper ${index % 2 !== 0 ? 'image-right' : ''}`}>
                    <img src={`https://picsum.photos/600/800?grayscale=${index}`} alt={`Nocturnal Visions ${index + 1}`} />
                </div>
                <div className={`article-content-wrapper ${index % 2 !== 0 ? 'content-left' : ''}`}>
                    <span className="article-subtitle">Photography — 2024</span>
                    <h2 className="article-title">
                        NOCTURNAL<br/>VISIONS {index + 1}
                    </h2>
                    <p className="article-description">
                        An exploration of shadow and light through the lens of analog photography
                    </p>
                    <a href="#" className="article-link">VIEW PROJECT →</a>
                </div>
            </div>
        );
    });

    return (
        <section id="article_section" ref={sectionRef}>
            <div className="article-list">
                {articles}
            </div>
        </section>
    );
}