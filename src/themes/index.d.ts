import { ThemeConfig } from '@/context/ThemeContext';

export interface ThemeMetadata {
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
  config: ThemeConfig;
  colors: ThemeConfig['colors'];
  typography: ThemeConfig['typography'];
}

export interface Theme {
  config: ThemeConfig;
  components: Record<string, any>;
  name: string;
  displayName: string;
  description: string;
  preview: string;
  features: string[];
}

declare const themes: {
  modern: Theme;
  classic: Theme;
  minimal: Theme;
  luxe: Theme;
};

export default themes;

export function getTheme(themeName: string): Theme | null;
export function getThemeNames(): string[];
export function getAllThemes(): ThemeMetadata[];
export function isValidTheme(themeName: string): boolean;
export function getThemeConfig(themeName: string): ThemeConfig | null;
export function getThemeComponents(themeName: string): Record<string, any> | null;
export function loadThemeStyles(themeName: string): Promise<boolean>;
export function getThemePreviewData(): Array<{
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
    headingFontFamily: string;
  };
}>;