import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Article.css';
import profileImg from '../img2/KakaoTalk_20260305_211431499.jpg';
import secondImg from '../img2/imag.png';

const nl2br = (text: string) => {
    if (!text || typeof text !== 'string') return text;
    return text.split('\n').map((line, i, arr) => (
        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
    ));
};

export default function Article() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);

    const projectShowcaseContent = {
        monami: {
            title: '모나미',
            description: '문구 브랜드 모나미의 메인 사이트를 기반으로, 브랜드 철학과 제품 카테고리가 자연스럽게 이어지도록 구성한 클론 프로젝트입니다.\n대형 비주얼과 제품 섹션, 뉴스 영역의 흐름을 살리면서 감성적인 브랜드 무드를 웹에서 재현하는 데 집중했습니다.'
        },
        drclone: {
            title: 'DR Clone',
            description: '산업용 열화상 카메라와 안전 제품을 소개하는 사이트 구조를 분석해 제작한 클론 페이지입니다.\n강한 신뢰감을 주는 비주얼, 제품 안내 섹션, 공지형 콘텐츠 배치를 통해 B2B 제품 사이트 특유의 분위기를 구현했습니다.'
        },
        kakao: {
            title: '카카오 엔터프라이즈',
            description: 'AI, 클라우드, 기술 블로그, 서비스 소개가 유기적으로 이어지는 카카오 엔터프라이즈 사이트를 참고해 만든 클론 작업입니다.\n대기업 서비스 페이지 특유의 명확한 메시지 전달과 섹션 전환 리듬을 프론트엔드 관점에서 정리해 구현했습니다.'
        },
        picogram: {
            title: '피앤코',
            description: '친환경 기술과 생활환경가전, 연구개발 비전을 중심으로 전개되는 기업형 사이트를 바탕으로 구성한 클론 프로젝트입니다.\n브랜드 메시지와 제품 카테고리, 기술 소개가 차분하게 이어지는 레이아웃을 통해 기업 홈페이지의 정보 전달 구조를 연습했습니다.'
        }
    } as const;

    type ProjectShowcaseKey = keyof typeof projectShowcaseContent;

    const projectShowcaseItems: Array<{ key: ProjectShowcaseKey; image: string; url: string }> = [
        {
            key: 'monami',
            image: 'https://www.monami.com/images/main/visual1.jpg',
            url: 'https://kimjungjae369.github.io/moname/'
        },
        {
            key: 'drclone',
            image: 'https://www.irguide.co.kr/img/main/video_img.png',
            url: 'https://kimjungjae369.github.io/DRClone/'
        },
        {
            key: 'kakao',
            image: 'https://kimjungjae369.github.io/KAKAO/site_layout/img/main.jpg',
            url: 'https://kimjungjae369.github.io/KAKAO/'
        },
        {
            key: 'picogram',
            image: 'http://www.picogram.co.kr/upload/maindata8/maindata892631_0.jpg',
            url: 'https://kimjungjae369.github.io/picoClon.html/'
        }
    ];

    const projectCards = projectShowcaseItems.map((project, index) => (
        <div key={project.key} className="article-container article-project-card">
            <div className={`article-image-wrapper article-project-image-wrapper ${index % 2 !== 0 ? 'image-right' : ''}`}>
                <img src={project.image} alt={projectShowcaseContent[project.key].title} className="article-project-image" />
            </div>
            <div className={`article-content-wrapper article-project-content ${index % 2 !== 0 ? 'content-left' : ''}`}>
                <span className="article-subtitle">{t(`article.projects.items.${project.key}.subtitle`)}</span>
                <h2 className="article-title article-project-title">
                    {projectShowcaseContent[project.key].title}
                </h2>
                <p className="article-description article-project-description">
                    {nl2br(projectShowcaseContent[project.key].description)}
                </p>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="article-link">
                    {t('article.projects.link')}
                </a>
            </div>
        </div>
    ));

    const profileSection = (
        <div className="article-container article-profile-block">
            <div className="article-image-wrapper">
                <img src={profileImg} alt="Profile" />
            </div>
            <div className="article-content-wrapper">
                <span className="article-subtitle">{t('article.profile.subtitle')}</span>
                <h2 className="article-title" style={{ fontSize: '20px' }}>
                    {t('article.profile.title')}
                </h2>
                <p className="article-description" style={{ fontSize: '18px' }}>
                    {nl2br(t('article.profile.description'))}
                </p>
                <a href="https://blog.naver.com/ktk662002" target='_blank' rel='noopener noreferrer' className="article-link">{t('article.profile.link')}</a>
            </div>
        </div>
    );

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
            return null;
        }
        //  MY STORY

        if (index === 1) {
            return (
                <div key={index} className="article-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <h2 className="section-header-title">{t('article.story.headerTitle')}</h2>
                    {profileSection}
                    <div className="article-container article-story-block">
                        <div className={`article-image-wrapper ${index % 2 !== 0 ? 'image-right' : ''}`}>
                            <img src={secondImg} alt="Profile" style={{ filter: 'none' }} />
                        </div>
                        <div className={`article-content-wrapper ${index % 2 !== 0 ? 'content-left' : ''}`} style={{ textAlign: 'left', alignItems: 'flex-start' }}>
                            <span className="article-subtitle">{t('article.story.subtitle')}</span>
                            <h2 className="article-title" style={{ fontSize: '20px' }}>
                                {t('article.story.title')}
                            </h2>
                            <p className="article-description" style={{ fontSize: '15px', textAlign: 'left' }}>
                                {nl2br(t('article.story.description'))}
                            </p>
                            <a href="https://github.com/ktk662442-sys/html-css-/tree/main/9.%20%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83" target='_blank' rel='noopener noreferrer' className="article-link">{t('article.story.link')}</a>
                        </div>
                    </div>
                    {projectCards}
                </div>
            );
        }
        // DEVELOPER STORY

        if (index === 2) {
            const categories = [
                {
                    title: t('article.techStack.categories.designTitle'),
                    skills: [
                        { name: 'Photoshop', percent: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg', desc: t('article.techStack.skills.photoshop') },
                        { name: 'Illustrator', percent: 62, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-original.svg', desc: t('article.techStack.skills.illustrator') },
                        { name: 'Figma', percent: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', desc: t('article.techStack.skills.figma') },
                    ]
                },
                {
                    title: t('article.techStack.categories.coreWebTitle'),
                    skills: [
                        { name: 'HTML', percent: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', desc: t('article.techStack.skills.html') },
                        { name: 'CSS', percent: 75, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', desc: t('article.techStack.skills.css') },
                        { name: 'JavaScript', percent: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', desc: t('article.techStack.skills.javascript') },
                    ]
                },
                {
                    title: t('article.techStack.categories.modernDevTitle'),
                    skills: [
                        { name: 'jQuery', percent: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg', desc: t('article.techStack.skills.jquery') },
                        { name: 'React', percent: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', desc: t('article.techStack.skills.react') },
                        { name: 'TypeScript', percent: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', desc: t('article.techStack.skills.typescript') },
                        { name: 'Next.js', percent: 55, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', desc: t('article.techStack.skills.nextjs') },
                    ]
                }
            ];

            return (
                <div key={index} className="article-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '40px 0' }}>
                    <h2 className="section-header-title">{t('article.techStack.headerTitle')}</h2>
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
                                                            }} 
                                                        />
                                                    </div>
                                                    
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
                { name: 'Git & GitHub', percent: 38 },
                { name: 'Vercel / Netlify', percent: 34 },
                { name: 'CI/CD Pipelines (GitHub Actions)', percent: 27 },
            ];
            
            return (
                <div key={index} className="article-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '80px 0' }}>
                     <h2 className="section-header-title" style={{ fontSize: '40px', color: '#d4af6a' }}>{t('article.deployment.headerTitle')}</h2>
                     
                     <div className="article-container" style={{flexDirection: 'column', gap: '40px', alignItems: 'center'}}>
                        {/* GitHub Section */}
                        <div className="deployment-content" style={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}>
                             <a href="https://github.com/KimJungJae369/myPORTFOLIO.git" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '30px' }}>
                                <div className="github-icon-wrapper" style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor : '#d4af6a' , border: '2px solid #d4af6a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', transition: 'transform 0.3s ease'}}>
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub Repository" style={{ width: '70px', height: '70px'}} />
                                </div>
                             </a>
                             <h3 style={{ fontSize: '24px', color: '#e6d9c2', marginBottom: '20px' }}>{t('article.deployment.ciTitle')}</h3>
                             <p className="article-description" style={{ fontSize: '16px', lineHeight: '1.8', wordBreak: 'keep-all', textAlign: 'center' }}>
                                 {nl2br(t('article.deployment.description'))}
                             </p>
                        </div>

                        {/* Animated Bar Chart */}
                        <div className="deployment-chart" style={{ width: '100%', maxWidth: '800px', marginTop: '40px' }}>
                            {deploymentSkills.map((skill, i) => (
                                <div key={i} className="bar-container" style={{ marginBottom: '30px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#e6d9c2' }}>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{skill.name}</span>
                                        <span style={{ fontSize: '16px', color: '#d4af6a', fontWeight: 'bold' }}>{skill.percent}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '20px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
                                        <div className="bar-fill" style={{ width: `${skill.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
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