import type { ThemeConfig } from '@/context/ThemeContext';
import type { ComponentType } from 'react';

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
  components: Record<string, ComponentType<Record<string, unknown>>>;
  name: string;
  displayName: string;
  description: string;
  preview: string;
  features: string[];
}
