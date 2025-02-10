import { useEffect, useState } from 'react';

interface ResponsiveState {
  isTablet: boolean;
  isMobile: boolean;
  isLargeDesktop: boolean;
  isExtraDesktop: boolean;
}

const useResponsiveV2 = (): ResponsiveState => {
  const [screens, setScreens] = useState<ResponsiveState>({
    isTablet: false,
    isMobile: false,
    isLargeDesktop: false,
    isExtraDesktop: false
  });

  useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 2000) {
        setScreens({
          isTablet: false,
          isMobile: false,
          isLargeDesktop: false,
          isExtraDesktop: true,
        });
        return;
      }
      if (window.innerWidth >= 1400) {
        setScreens({
          isTablet: false,
          isMobile: false,
          isLargeDesktop: true,
          isExtraDesktop: false,
        });
        return;
      }
      if (window.innerWidth >= 1200) {
        setScreens({
          isTablet: false,
          isMobile: false,
          isLargeDesktop: false,
          isExtraDesktop: false,
        });
      } else if (window.innerWidth >= 991) {
        setScreens({
          isTablet: false,
          isMobile: false,
          isLargeDesktop: false,
          isExtraDesktop: false,
        });
      } else if (window.innerWidth >= 768 && window.innerHeight <= 991) {
        setScreens({
          isTablet: true,
          isMobile: false,
          isLargeDesktop: false,
          isExtraDesktop: false,
        });
      } else {
        setScreens({
          isTablet: false,
          isMobile: true,
          isLargeDesktop: false,
          isExtraDesktop: false,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screens;
};

export default useResponsiveV2;
