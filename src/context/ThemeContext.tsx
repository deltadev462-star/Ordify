import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
}

export interface ThemeTypography {
  fontFamily: string;
  headingFontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface ThemeLayout {
  containerWidth: string;
  sidebarWidth: string;
  headerHeight: string;
  borderRadius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
  };
}

export interface ThemeConfig {
  name: string;
  slug: string;
  description: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  components?: Record<string, any>;
  features?: Record<string, boolean>;
}

export interface ThemeCustomizations {
  colors?: Partial<ThemeColors>;
  typography?: Partial<ThemeTypography>;
  layout?: Partial<ThemeLayout>;
}

interface ThemeContextType {
  currentTheme: string;
  themeConfig: ThemeConfig | null;
  customizations: ThemeCustomizations;
  availableThemes: string[];
  setTheme: (themeName: string) => void;
  updateCustomizations: (customizations: ThemeCustomizations) => void;
  resetCustomizations: () => void;
  isLoading: boolean;
  error: string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
  merchantId?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "modern",
  merchantId,
}) => {
  const [currentTheme, setCurrentTheme] = useState<string>(defaultTheme);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const [customizations, setCustomizations] = useState<ThemeCustomizations>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableThemes] = useState(["modern", "classic", "minimal", "luxe"]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("merchantTheme");
    const savedCustomizations = localStorage.getItem("themeCustomizations");
    
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedCustomizations) {
      try {
        setCustomizations(JSON.parse(savedCustomizations));
      } catch (error) {
        console.error("Failed to parse theme customizations:", error);
      }
    }
  }, []);

  // Load theme configuration when theme changes
  useEffect(() => {
    const loadTheme = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Dynamically import theme configuration
        const themeModule = await import(`../themes/${currentTheme}/config.js`);
        const config = themeModule.default || themeModule.config;
        
        setThemeConfig(config);
        applyThemeVariables(config, customizations);
        
        // Save theme to localStorage
        localStorage.setItem("merchantTheme", currentTheme);
        
        // If merchantId is provided, save to backend
        if (merchantId) {
          // TODO: Save theme preference to backend API
          // await saveThemeToAPI(merchantId, currentTheme, customizations);
        }
      } catch (error) {
        console.error(`Failed to load theme: ${currentTheme}`, error);
        setError(`Failed to load theme: ${currentTheme}`);
        
        // Fallback to default theme
        if (currentTheme !== defaultTheme) {
          setCurrentTheme(defaultTheme);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [currentTheme, merchantId, defaultTheme]);

  // Apply theme CSS variables
  const applyThemeVariables = (config: ThemeConfig, customizations: ThemeCustomizations) => {
    const root = document.documentElement;
    
    // Apply colors
    const colors = { ...config.colors, ...customizations.colors };
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--theme-${key}`, value);
    });
    
    // Apply typography
    const typography = { 
      ...config.typography, 
      ...customizations.typography,
      fontSize: { ...config.typography.fontSize, ...customizations.typography?.fontSize },
      fontWeight: { ...config.typography.fontWeight, ...customizations.typography?.fontWeight }
    };
    
    root.style.setProperty("--theme-font-family", typography.fontFamily);
    root.style.setProperty("--theme-heading-font-family", typography.headingFontFamily);
    
    Object.entries(typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--theme-font-size-${key}`, value);
    });
    
    Object.entries(typography.fontWeight).forEach(([key, value]) => {
      root.style.setProperty(`--theme-font-weight-${key}`, String(value));
    });
    
    // Apply layout
    const layout = {
      ...config.layout,
      ...customizations.layout,
      borderRadius: { ...config.layout.borderRadius, ...customizations.layout?.borderRadius },
      spacing: { ...config.layout.spacing, ...customizations.layout?.spacing }
    };
    
    root.style.setProperty("--theme-container-width", layout.containerWidth);
    root.style.setProperty("--theme-sidebar-width", layout.sidebarWidth);
    root.style.setProperty("--theme-header-height", layout.headerHeight);
    
    Object.entries(layout.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--theme-border-radius-${key}`, value);
    });
    
    Object.entries(layout.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--theme-spacing-${key}`, value);
    });
  };

  const setTheme = (themeName: string) => {
    if (availableThemes.includes(themeName)) {
      setCurrentTheme(themeName);
    } else {
      console.error(`Theme "${themeName}" is not available`);
    }
  };

  const updateCustomizations = (newCustomizations: ThemeCustomizations) => {
    const updatedCustomizations = { ...customizations, ...newCustomizations };
    setCustomizations(updatedCustomizations);
    localStorage.setItem("themeCustomizations", JSON.stringify(updatedCustomizations));
    
    if (themeConfig) {
      applyThemeVariables(themeConfig, updatedCustomizations);
    }
    
    // Save to backend if merchantId provided
    if (merchantId) {
      // TODO: Save customizations to backend API
      // await saveThemeToAPI(merchantId, currentTheme, updatedCustomizations);
    }
  };

  const resetCustomizations = () => {
    setCustomizations({});
    localStorage.removeItem("themeCustomizations");
    
    if (themeConfig) {
      applyThemeVariables(themeConfig, {});
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    themeConfig,
    customizations,
    availableThemes,
    setTheme,
    updateCustomizations,
    resetCustomizations,
    isLoading,
    error,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};