import { RefObject } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { useTranslation } from 'react-i18next';

interface MobileBottomNavProps {
    swiperRef: RefObject<SwiperType | null>;
    currentPage: number;
}

export default function MobileBottomNav({ swiperRef, currentPage }: MobileBottomNavProps) {
    const { t } = useTranslation();

    const navItems = [
        { label: t('mobileNav.home'), icon: '⌂', page: 0 },
        { label: t('mobileNav.about'), icon: 'ⓘ', page: 1 },
        { label: t('mobileNav.projects'), icon: '⚡', page: 6 },
        { label: t('mobileNav.footer'), icon: '✉', page: 7 }
    ];

    const handleNavClick = (page: number) => {
        if (swiperRef.current) {
            swiperRef.current.slideTo(page);
        }
    };

    const isActive = (page: number) => {
        if (page === 1) {
            // About: pages 1-5
            return currentPage >= 1 && currentPage <= 5;
        }
        return currentPage === page;
    };

    return (
        <nav className="mobile-bottom-nav">
            {navItems.map(item => (
                <button
                    key={item.label}
                    className={`mobile-nav-btn ${isActive(item.page) ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.page)}
                    aria-label={item.label}
                >
                    <span className="mobile-nav-icon">{item.icon}</span>
                    <span className="mobile-nav-label">{item.label}</span>
                </button>
            ))}
        </nav>
    );
}
