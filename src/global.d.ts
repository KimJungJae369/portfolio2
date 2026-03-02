export {};

declare global {
    interface Window {
        swiperRef?: { slideToLoop?: (index: number, speed?: number) => void };
        setSwiperState?: (state: { isHidden: boolean; isScrollOut: boolean; isLastSlide: boolean }) => void;
        setProjectsState?: (state: { forceShow: boolean }) => void;
        setSectionState?: (state: { hide: boolean }) => void;
    }
}
