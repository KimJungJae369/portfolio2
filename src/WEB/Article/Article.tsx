import { useEffect, useRef } from 'react';
import './Article.css';

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

    const articles = Array(6).fill(null).map((_, index) => (
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
    ));

    return (
        <section id="article_section" ref={sectionRef}>
            <div className="article-list">
                {articles}
            </div>
        </section>
    );
}