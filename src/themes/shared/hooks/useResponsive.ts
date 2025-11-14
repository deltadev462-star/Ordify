import { useState, useEffect } from "react";

interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

const defaultBreakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useResponsive = (breakpoints: Partial<BreakpointConfig> = {}) => {
  const config = { ...defaultBreakpoints, ...breakpoints };

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width < config.md;
  const isTablet = windowSize.width >= config.md && windowSize.width < config.lg;
  const isDesktop = windowSize.width >= config.lg;
  const isSmall = windowSize.width < config.sm;
  const isMedium = windowSize.width >= config.sm && windowSize.width < config.md;
  const isLarge = windowSize.width >= config.lg && windowSize.width < config.xl;
  const isXLarge = windowSize.width >= config.xl && windowSize.width < config["2xl"];
  const is2XLarge = windowSize.width >= config["2xl"];

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isSmall,
    isMedium,
    isLarge,
    isXLarge,
    is2XLarge,
    breakpoints: config,
  };
};

// Hook for checking specific breakpoint
export const useBreakpoint = (breakpoint: keyof BreakpointConfig) => {
  const { windowSize, breakpoints } = useResponsive();
  return windowSize.width >= breakpoints[breakpoint];
};

// Hook for responsive columns
export const useResponsiveColumns = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getColumns = (mobile: number, tablet: number, desktop: number) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    return desktop;
  };

  return { getColumns, isMobile, isTablet, isDesktop };
};