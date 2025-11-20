import { useThemeContext } from "@/context/ThemeContext";
import { useThemeComponents } from "@/themes/shared/hooks/useThemeComponents";
import { useComponentVariant } from "@/themes/shared/hooks/useThemeComponents";
import { useMemo } from "react";

export const useTheme = () => {
  const {
    currentTheme,
    themeConfig,
    customizations,
    availableThemes,
    setTheme,
    updateCustomizations,
    resetCustomizations,
    isLoading,
    error,
  } = useThemeContext();

  const variant = useComponentVariant(currentTheme);
  const components = useThemeComponents({ variant });

  // Get current theme colors with customizations applied
  const colors = useMemo(() => {
    if (!themeConfig) return null;
    return { ...themeConfig.colors, ...customizations.colors };
  }, [themeConfig, customizations.colors]);

  // Get current theme typography with customizations applied
  const typography = useMemo(() => {
    if (!themeConfig) return null;
    return {
      ...themeConfig.typography,
      ...customizations.typography,
      fontSize: {
        ...themeConfig.typography.fontSize,
        ...customizations.typography?.fontSize,
      },
      fontWeight: {
        ...themeConfig.typography.fontWeight,
        ...customizations.typography?.fontWeight,
      },
    };
  }, [themeConfig, customizations.typography]);

  // Get current theme layout with customizations applied
  const layout = useMemo(() => {
    if (!themeConfig) return null;
    return {
      ...themeConfig.layout,
      ...customizations.layout,
      borderRadius: {
        ...themeConfig.layout.borderRadius,
        ...customizations.layout?.borderRadius,
      },
      spacing: {
        ...themeConfig.layout.spacing,
        ...customizations.layout?.spacing,
      },
    };
  }, [themeConfig, customizations.layout]);

  // Helper function to update specific color
  const updateColor = (colorKey: string, value: string) => {
    updateCustomizations({
      colors: {
        ...customizations.colors,
        [colorKey]: value,
      },
    });
  };

  // Helper function to update specific typography setting
  const updateTypography = (key: string, value: unknown) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      updateCustomizations({
        typography: {
          ...customizations.typography,
          [parent]: {
            ...(customizations.typography as Record<string, any>)?.[parent],
            [child]: value,
          },
        },
      });
    } else {
      updateCustomizations({
        typography: {
          ...customizations.typography,
          [key]: value,
        },
      });
    }
  };

  // Helper function to update specific layout setting
  const updateLayout = (key: string, value: unknown) => {
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      updateCustomizations({
        layout: {
          ...customizations.layout,
          [parent]: {
            ...(customizations.layout as Record<string, any>)?.[parent],
            [child]: value,
          },
        },
      });
    } else {
      updateCustomizations({
        layout: {
          ...customizations.layout,
          [key]: value,
        },
      });
    }
  };

  return {
    // Theme state
    currentTheme,
    themeConfig,
    customizations,
    availableThemes,
    isLoading,
    error,

    // Theme settings
    colors,
    typography,
    layout,
    variant,

    // Theme components
    components,

    // Theme actions
    setTheme,
    updateCustomizations,
    resetCustomizations,
    updateColor,
    updateTypography,
    updateLayout,
  };
};

// Hook for using theme-specific styles
export const useThemeStyles = () => {
  const { colors, typography, layout, variant } = useTheme();

  const styles = useMemo(
    () => ({
      // Container styles
      container: {
        maxWidth: layout?.containerWidth,
        margin: "0 auto",
        padding: `0 ${layout?.spacing.base}`,
      },

      // Typography styles
      heading1: {
        fontFamily: typography?.headingFontFamily,
        fontSize: typography?.fontSize["3xl"],
        fontWeight: typography?.fontWeight.bold,
        color: colors?.foreground,
      },
      heading2: {
        fontFamily: typography?.headingFontFamily,
        fontSize: typography?.fontSize["2xl"],
        fontWeight: typography?.fontWeight.semibold,
        color: colors?.foreground,
      },
      heading3: {
        fontFamily: typography?.headingFontFamily,
        fontSize: typography?.fontSize.xl,
        fontWeight: typography?.fontWeight.semibold,
        color: colors?.foreground,
      },
      body: {
        fontFamily: typography?.fontFamily,
        fontSize: typography?.fontSize.base,
        fontWeight: typography?.fontWeight.normal,
        color: colors?.foreground,
      },

      // Button styles
      button: {
        primary: {
          backgroundColor: colors?.primary,
          color: colors?.background,
          borderRadius: layout?.borderRadius.md,
          padding: `${layout?.spacing.sm} ${layout?.spacing.base}`,
        },
        secondary: {
          backgroundColor: colors?.secondary,
          color: colors?.background,
          borderRadius: layout?.borderRadius.md,
          padding: `${layout?.spacing.sm} ${layout?.spacing.base}`,
        },
      },

      // Card styles
      card: {
        backgroundColor: colors?.background,
        borderColor: colors?.border,
        borderRadius: layout?.borderRadius.lg,
        padding: layout?.spacing.base,
      },

      // Input styles
      input: {
        backgroundColor: colors?.background,
        borderColor: colors?.border,
        borderRadius: layout?.borderRadius.base,
        padding: `${layout?.spacing.xs} ${layout?.spacing.sm}`,
        color: colors?.foreground,
      },
    }),
    [colors, typography, layout, variant]
  );

  return styles;
};

// Hook for using theme CSS variables
export const useThemeCSSVariables = () => {
  const { colors, typography, layout } = useTheme();

  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {};

    // Colors
    if (colors) {
      Object.entries(colors).forEach(([key, value]) => {
        vars[`--theme-${key}`] = value;
      });
    }

    // Typography
    if (typography) {
      vars["--theme-font-family"] = typography.fontFamily;
      vars["--theme-heading-font-family"] = typography.headingFontFamily;

      Object.entries(typography.fontSize).forEach(([key, value]) => {
        vars[`--theme-font-size-${key}`] = value;
      });

      Object.entries(typography.fontWeight).forEach(([key, value]) => {
        vars[`--theme-font-weight-${key}`] = String(value);
      });
    }

    // Layout
    if (layout) {
      vars["--theme-container-width"] = layout.containerWidth;
      vars["--theme-sidebar-width"] = layout.sidebarWidth;
      vars["--theme-header-height"] = layout.headerHeight;

      Object.entries(layout.borderRadius).forEach(([key, value]) => {
        vars[`--theme-border-radius-${key}`] = value;
      });

      Object.entries(layout.spacing).forEach(([key, value]) => {
        vars[`--theme-spacing-${key}`] = value;
      });
    }

    return vars;
  }, [colors, typography, layout]);

  return cssVars;
};
