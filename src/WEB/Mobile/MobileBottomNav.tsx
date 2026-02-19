import { RefObject } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface MobileBottomNavProps {
    swiperRef: RefObject<SwiperType | null>;
    aboutPage: number;
    setAboutPage: (page: number) => void;
    scrollToSection: (section: 'about' | 'projects', aboutPageNum?: number) => void;
}

export default function MobileBottomNav({ swiperRef, aboutPage, setAboutPage, scrollToSection }: MobileBottomNavProps) {

    const { t } = useTranslation();

    const navItems = [
        { label: t('mobileNav.home'), icon: '⌂', section: 'about', page: 0 },
        { label: t('mobileNav.about'), icon: 'ⓘ', section: 'about', page: 1 },
        { label: t('mobileNav.projects'), icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="3" y="3" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="9" y="3" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="15" y="3" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="3" y="9" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="15" y="9" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="3" y="15" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="9" y="15" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="15" y="15" width="6" height="6" rx="1" fill="currentColor" />
            </svg>
        ), section: 'projects', page: null },
        { label: t('mobileNav.footer'), icon: '✉', section: 'footer', page: null }
    ];

    const handleNavClick = (item: any) => {
        if (item.section === 'projects') {
            scrollToSection('projects');
        } else if (item.section === 'about') {
            scrollToSection('about', item.page);
        }
    };

    const isActive = (item: any) => {
        const total = swiperRef.current?.slides?.length || 0;
        const projectsIndex = Math.max(0, total - 2);
        const footerIndex = Math.max(0, total - 1);

        if (item.section === 'projects') return aboutPage === projectsIndex;
        if (item.section === 'footer') return aboutPage === footerIndex;
        if (item.page === 1) return aboutPage >= 1 && aboutPage <= Math.max(1, projectsIndex - 1);
        if (typeof item.page === 'number') return aboutPage === item.page;
        return false;
    };

    return (
        <nav className="mobile-bottom-nav">
            {navItems.map(item => (
                <button
                    key={item.label}
                    className={`mobile-nav-btn ${isActive(item) ? 'active' : ''}`}
                    onClick={() => handleNavClick(item)}
                    aria-label={item.label}
                >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}
