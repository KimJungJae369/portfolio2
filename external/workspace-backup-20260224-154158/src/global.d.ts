export {};

declare global {
  interface SwiperRefLike {
    slideToLoop?: (index: number, speed?: number) => void;
    realIndex?: number;
  }

  interface SwiperStatePayload {
    isHidden?: boolean;
    isScrollOut?: boolean;
    isLastSlide?: boolean;
  }

  interface ProjectsStatePayload {
    forceShow?: boolean;
  }

  interface SectionStatePayload {
    hide?: boolean;
  }

  interface Window {
    swiperRef?: SwiperRefLike;
    setSwiperState?: (s: SwiperStatePayload) => void;
    setProjectsState?: (p: ProjectsStatePayload) => void;
    setSectionState?: (s: SectionStatePayload) => void;
    footerJustLeft?: boolean;
    projectsJustLeft?: boolean;
    preventSwiperShowInProjects?: boolean;
  }
}
