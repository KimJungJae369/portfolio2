import { useEffect, useRef } from 'react';
import './Article.css';
import profileImg from '../img2/KakaoTalk_20260305_211431499.jpg';
import secondImg from '../img2/imag.png';

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
    
        const items = document.querySelectorAll('.article-container, .article-wrapper');
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

        if (index === 1) {
            return (
                <div key={index} className="article-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <h2 className="section-header-title">DEVELOPER STORY</h2>
                    <div className="article-container">
                        <div className={`article-image-wrapper ${index % 2 !== 0 ? 'image-right' : ''}`}>
                            <img src={secondImg} alt="Profile" style={{ filter: 'none' }} />
                        </div>
                        <div className={`article-content-wrapper ${index % 2 !== 0 ? 'content-left' : ''}`} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                            <span className="article-subtitle">Developer Story</span>
                            <h2 className="article-title" style={{ fontSize: '20px' }}>
                                고객의 동선을 읽는 개발자
                            </h2>
                            <p className="article-description" style={{ fontSize: '15px', textAlign: 'left' }}>
                                패션 세일즈 현장에서 제가 배운 가장 소중한 것은 '고객의 시선과'을 따라가는 법을 배웠습니다
                                <br /><br />
                                사용자가 길을 잃지 않도록 메뉴 배치 등 과정에서 고객의 시선을 따라가며 웹사이트를 설계하는 개발자가 목표를 하고 
                                오프라인 매장의 한계를 넘어, 전 세계 누구나 제가 만든 '개발 쇼룸'에 들어와 즐거운 경험 만들어 옷을 입었을 때의 자신감을,
                                제가 만든 웹사이트를 사용할 때의 편리함으로 치환해 전달하는 개발자가 되겠습니다
                            </p>
                            <a href="https://github.com/ktk662442-sys/html-css-/tree/main/9.%20%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83" target='_blank' rel='noopener noreferrer' className="article-link">MY GITHUB →</a>
                        </div>
                    </div>
                </div>
            );
        }

        if (index === 2) {
            const techStack = [
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percent: Math.floor(Math.random() * 20) + 30 }, // 30-50%
                { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', percent: Math.floor(Math.random() * 20) + 30 },
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percent: Math.floor(Math.random() * 20) + 30 },
                { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', percent: Math.floor(Math.random() * 20) + 30 },
                { name: 'Illustrator', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', percent: Math.floor(Math.random() * 20) + 30 },
                { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', percent: Math.floor(Math.random() * 20) + 30 },
            ];

            return (
                <div key={index} className="article-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <h2 className="section-header-title">TECHNOLOGY STACK</h2>
                    <div className="article-container">
                        <div className={`article-image-wrapper ${index % 2 !== 0 ? 'image-right' : ''}`}>
                            <img 
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Tech Stack" 
                                style={{ filter: 'none' }}
                            />
                        </div>
                        <div className={`article-content-wrapper ${index % 2 !== 0 ? 'content-left' : ''}`} style={{ alignItems: 'flex-start' }}>
                            <span className="article-subtitle">SKILL</span>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
                                {techStack.map((tech) => (
                                    <li key={tech.name} style={{ marginBottom: '20px', color: '#e6d9c2' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '20px' }}>
                                            <img 
                                                src={tech.icon} 
                                                alt={tech.name} 
                                                style={{ 
                                                    width: '30px', 
                                                    height: '30px', 
                                                    marginRight: '15px', 
                                                    objectFit: 'contain',
                                                    filter: (tech.name === 'Photoshop' || tech.name === 'Illustrator') ? 'brightness(0) invert(1)' : 'none'
                                                }} 
                                            />
                                            {tech.name}
                                            <span style={{ marginLeft: 'auto', fontSize: '16px', color: '#d4af6a' }}>{tech.percent}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative' }}>
                                            <div style={{ width: `${tech.percent}%`, height: '100%', backgroundColor: '#d4af6a', borderRadius: '3px' }}></div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                    <span className="article-subtitle">TECHNOLOGY STACK</span>
                    <h2 className="article-title">
                        NOCTURNAL<br/>VISIONS {index + 1}
                    </h2>
                    <p className="article-description">
                        An exploration of shadow and light through the lens of analog photography
                    </p>
                    <a href="https://github.com/ktk662442-sys/html-css-/tree/main/9.%20%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83" className="article-link">MY GITHUB →</a>
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