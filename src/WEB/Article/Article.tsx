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
          { threshold: 0.15 } 
        );
    
        const items = document.querySelectorAll('.article-container, .article-wrapper, .tech-category');
        items.forEach(item => observer.observe(item));
    
        return () => {
             items.forEach(item => observer.unobserve(item));
        };
      }, []);

    const articles = Array(4).fill(null).map((_, index) => {
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
        //  MY STORY

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
        // DEVELOPER STORY

        if (index === 2) {
            const categories = [
                {
                    title: "Design & UI/UX",
                    skills: [
                        { name: 'Photoshop', percent: 32, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg', desc: '이미지 리터칭과 합성을 통해 비트맵 기반의 고품질 시각 자료를 자유롭게 제작합니다' },
                        { name: 'Illustrator', percent: 28, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg', desc: '벡터 그래픽을 활용하여 로고 및 아이콘을 직접 디자인하고 웹에 최적화하여 적용합니다' },
                        { name: 'Figma', percent: 36, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', desc: '사용자 중심의 UI/UX를 기획하고, 개발 단계에서의 오차를 줄이는 정교한 프로토타입을 설계합니다' },
                    ]
                },
                {
                    title: "The Core Web",
                    skills: [
                        { name: 'HTML', percent: 39, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', desc: "웹 접근성과 표준을 준수하여 정보의 구조가 명확한 시맨틱 마크업을 작성합니다" },
                        { name: 'CSS', percent: 35, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', desc: "트렌디한 디자인을 코드로 구현하며, 반응형 레이아웃과 애니메이션으로 생동감을 더합니다" },
                        { name: 'JavaScript', percent: 33, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', desc: "ES6+ 문법을 활용하여 사용자와 상호작용하는 동적인 웹 기능을 주도적으로 구현합니다" },
                    ]
                },
                {
                    title: "Modern Development",
                    skills: [
                        { name: 'jQuery', percent: 24, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg', desc: 'DOM 조작과 이벤트 처리를 간결하게 구현하며, 기존 라이브러리와의 호환성을 고려해 활용합니다' },
                        { name: 'React', percent: 37, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', desc: '재사용 가능한 컴포넌트 설계로 개발 생산성을 높이고, SPA(Single Page Application)를 효율적으로 구축합니다' },
                        { name: 'TypeScript', percent: 31, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', desc: "타입 안정성을 확보하여 버그를 줄이고, 협업 시 가독성이 뛰어난 코드를 작성합니다" },
                        { name: 'Next.js', percent: 29, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', desc: 'SSR(서버 사이드 렌더링)을 적용하여 초기 로딩 속도를 개선하고 검색 엔진 최적화(SEO)를 구현합니다' },
                    ]
                }
            ];

            return (
                <div key={index} className="article-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '40px 0' }}>
                    <h2 className="section-header-title">TECHNOLOGY STACK</h2>
                    <div className="tech-stack-container" style={{ width: '100%', maxWidth: '1200px', padding: '0 20px' }}>
                        {categories.map((cat, catIndex) => (
                            <div key={catIndex} className="tech-category" style={{ marginBottom: '60px' }}>
                                <h3 style={{ fontSize: '24px', color: '#d4af6a', marginBottom: '30px', borderBottom: '1px solid rgba(212, 175, 106, 0.3)', paddingBottom: '10px', textAlign: 'left' }}>{cat.title}</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                                    {cat.skills.map((skill, skillIndex) => {
                                        const radius = 40;
                                        const circumference = 2 * Math.PI * radius;
                                        const percent = skill.percent;
                                        const offset = circumference - (percent / 100) * circumference;

                                        return (
                                            <div key={skillIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '250px', textAlign: 'center' }}>
                                                <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                                                    <svg width="120" height="120" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                                                        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="transparent" />
                                                        <circle cx="50" cy="50" r={radius} stroke="#d4af6a" strokeWidth="6" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                                                    </svg>
                                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <img 
                                                            src={skill.icon} 
                                                            alt={skill.name} 
                                                            style={{ 
                                                                width: '100%', 
                                                                height: '100%', 
                                                                objectFit: 'contain',
                                                                filter: (skill.name === 'Next.js' || skill.name === 'Photoshop' || skill.name === 'Illustrator') ? 'brightness(0) invert(1)' : 'none'
                                                            }} 
                                                        />
                                                    </div>
                                                    <div style={{ position: 'absolute', bottom: '-30px', color: '#d4af6a', fontSize: '18px', fontWeight: 'bold' }}>{percent}%</div>
                                                </div>
                                                <h4 style={{ fontSize: '18px', marginBottom: '10px', marginTop: '20px', color: '#fff', fontWeight: 'bold' }}>{skill.name}</h4>
                                                <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.5', wordBreak: 'keep-all' }}>{skill.desc}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        // TECHNOLOGY STACK

        // DEPLOYMENT
        if (index === 3) {
            const deploymentSkills = [
                { name: 'Git & GitHub', percent: 38, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', desc: '체계적인 버전 관리와 GitHub 중심의 협업 워크플로우를 통해 프로젝트 이력을 관리합니다' },
                { name: 'Vercel / Netlify', percent: 34, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg', desc: '정적 사이트 및 서버리스 함수 배포를 자동화하여 빠르고 안정적인 서비스 환경을 구성합니다' },
                { name: 'GitHub Actions', percent: 27, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', desc: 'CI/CD 파이프라인을 구축하여 코드 품질 검증과 자동 배포 프로세스를 운용합니다' },
            ];
            
            return (
                <div key={index} className="article-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '40px 0' }}>
                     <h2 className="section-header-title" style={{ fontSize: '40px', color: '#d4af6a' }}>DEPLOYMENT</h2>
                     <div className="tech-stack-container" style={{ width: '100%', maxWidth: '1200px', padding: '0 20px' }}>
                        <div className="tech-category" style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '24px', color: '#d4af6a', marginBottom: '30px', borderBottom: '1px solid rgba(212, 175, 106, 0.3)', paddingBottom: '10px', textAlign: 'left' }}>Continuous Integration &amp; Deployment</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                                {deploymentSkills.map((skill, skillIndex) => {
                                    const radius = 40;
                                    const circumference = 2 * Math.PI * radius;
                                    const percent = skill.percent;
                                    const offset = circumference - (percent / 100) * circumference;

                                    return (
                                        <div key={skillIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '250px', textAlign: 'center' }}>
                                            <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                                                <svg width="120" height="120" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                                                    <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="transparent" />
                                                    <circle cx="50" cy="50" r={radius} stroke="#d4af6a" strokeWidth="6" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                                                </svg>
                                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <img
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                            filter: 'brightness(0) invert(1)'
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ position: 'absolute', bottom: '-30px', color: '#d4af6a', fontSize: '18px', fontWeight: 'bold' }}>{percent}%</div>
                                            </div>
                                            <h4 style={{ fontSize: '18px', marginBottom: '10px', marginTop: '20px', color: '#fff', fontWeight: 'bold' }}>{skill.name}</h4>
                                            <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.5', wordBreak: 'keep-all' }}>{skill.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
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