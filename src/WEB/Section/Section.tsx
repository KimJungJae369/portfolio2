import './Section.css'
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function Section() {
    const { t } = useTranslation();
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
  return (
    <>
        <section>   
            <div className={`mainTitle ${isHidden ? 'slide-up' : ''}`}>
                <span style={{color : '#e6d9c2', fontSize : '12px', letterSpacing : '2px'}}>{t('section.subtitle')}</span>
            <h1>
                {t('section.title1')}
                <p>{t('section.title2')}</p>
            </h1>
            </div>
        </section>
    </>
  )
}
