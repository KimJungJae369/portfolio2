import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Article.css';
import profileImg from '../img2/KakaoTalk_20260305_211431499.jpg';
import secondImg from '../img2/imag.png';

const nl2br = (text: string) =>
    text.split('\n').map((line, i, arr) => (
        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
    ));

export default function Article() {
    const { t } = useTranslation();
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
        }
        //  MY STORY

        if (index === 1) {
            return (
                <div key={index} className="article-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <h2 className="section-header-title">{t('article.story.headerTitle')}</h2>
                    <div className="article-container">
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