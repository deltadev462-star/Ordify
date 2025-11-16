import type { ThemeConfig } from '@/context/ThemeContext';

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