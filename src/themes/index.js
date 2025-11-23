import modern from './modern';
import classic from './classic';
import minimal from './minimal';
import luxe from './luxe';

const themes = {
  modern,
  classic,
  minimal,
  luxe,
};

export default themes;

export { modern, classic, minimal, luxe };

export const getTheme = (themeName) => {
  return themes[themeName] || null;
};

export const getThemeNames = () => {
  return Object.keys(themes);
};

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

export const isValidTheme = (themeName) => {
  return themeName in themes;
};

export const getThemeConfig = (themeName) => {
  const theme = getTheme(themeName);
  return theme ? theme.config : null;
};

export const getThemeComponents = (themeName) => {
  const theme = getTheme(themeName);
  return theme ? theme.components : null;
};

export const loadThemeStyles = async (themeName) => {
  if (!isValidTheme(themeName)) {
    throw new Error(`Theme "${themeName}" not found`);
  }
  
  // The styles are already imported in each theme's index.js
  // This function is here for future dynamic loading needs
  return true;
};

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
