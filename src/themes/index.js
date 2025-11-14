// Theme Registry - Central registry for all available themes
import modern from './modern';
import classic from './classic';
import minimal from './minimal';
import luxe from './luxe';

// Define theme registry with all available themes
const themes = {
  modern,
  classic,
  minimal,
  luxe,
};

// Export themes object for dynamic access
export default themes;

// Export individual themes for direct import if needed
export { modern, classic, minimal, luxe };

// Helper function to get theme by name
export const getTheme = (themeName) => {
  return themes[themeName] || null;
};

// Helper function to get all theme names
export const getThemeNames = () => {
  return Object.keys(themes);
};

// Helper function to get all themes with metadata
export const getAllThemes = () => {
  return Object.entries(themes).map(([key, theme]) => ({
    id: key,
    name: theme.displayName || theme.name,
    description: theme.description,
    preview: theme.preview,
    features: theme.features || [],
    config: theme.config,
    colors: theme.config.colors,
    typography: theme.config.typography,
  }));
};

// Helper function to validate if a theme exists
export const isValidTheme = (themeName) => {
  return themeName in themes;
};

// Helper function to get theme configuration
export const getThemeConfig = (themeName) => {
  const theme = getTheme(themeName);
  return theme ? theme.config : null;
};

// Helper function to get theme components
export const getThemeComponents = (themeName) => {
  const theme = getTheme(themeName);
  return theme ? theme.components : null;
};

// Helper function to load theme styles dynamically
export const loadThemeStyles = async (themeName) => {
  if (!isValidTheme(themeName)) {
    throw new Error(`Theme "${themeName}" not found`);
  }
  
  // The styles are already imported in each theme's index.js
  // This function is here for future dynamic loading needs
  return true;
};

// Helper function to get theme preview data for showcase
export const getThemePreviewData = () => {
  return Object.entries(themes).map(([key, theme]) => ({
    id: key,
    name: theme.displayName || theme.name,
    description: theme.description,
    preview: theme.preview || `https://via.placeholder.com/600x400?text=${theme.name}`,
    features: theme.features || [],
    colors: {
      primary: theme.config.colors.primary,
      secondary: theme.config.colors.secondary,
      accent: theme.config.colors.accent,
    },
    typography: {
      fontFamily: theme.config.typography.fontFamily,
      headingFontFamily: theme.config.typography.headingFontFamily,
    },
  }));
};