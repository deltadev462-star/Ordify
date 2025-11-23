export default {
  name: "Modern Theme",
  slug: "modern",
  description: "تصميم نظيف ومعاصر لماركات الموضة ونمط الحياة. يتميز بشرائح البطل، وشبكات المنتجات مع تأثيرات التحويم، والقوائم الضخمة، ووظيفة العرض السريع.",
  
  colors: {
    primary: "#6366f1", // Indigo-500 - More vibrant
    secondary: "#ec4899", // Pink-500 - More energetic
    accent: "#14b8a6", // Teal-500 - Fresh accent
    // background: "#ffffff",
    foreground: "#0f172a", // Slate-900
    muted: "#f8fafc", // Slate-50 - Lighter
    mutedForeground: "#64748b", // Slate-500
    border: "#d6d6d6", // Slate-200
    success: "#10b981", // Emerald-500
    warning: "#f59e0b", // Amber-500
    error: "#ef4444",
    info: "#3b82f6",
    darkPrimary: "#818cf8",
    darkSecondary: "#f472b6", // Pink-400 - Lighter for dark mode
    darkAccent: "#2dd4bf", // Teal-400 - Lighter for dark mode
    darkBackground: "#0f172a", // Slate-900 - Dark background
    darkForeground: "#f1f5f9", // Slate-100 - Light text
    darkMuted: "#1e293b", // Slate-800 - Dark muted
    darkMutedForeground: "#94a3b8", // Slate-400 - Light muted text
    darkBorder: "#424242", // Slate-700 - Dark border
    darkSuccess: "#34d399", // Emerald-400 - Lighter for dark mode
    darkWarning: "#fbbf24", // Amber-400 - Lighter for dark mode
    darkError: "#f87171", // Red-400 - Lighter for dark mode
    darkInfo: "#60a5fa", // Blue-400 - Lighter for dark mode
  },
  
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    headingFontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  
  layout: {
    containerWidth: "1280px",
    sidebarWidth: "280px",
    headerHeight: "80px",
    borderRadius: {
      none: "0px",
      sm: "0.125rem",
      base: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      full: "9999px",
    },
    spacing: {
      xs: "0.5rem",
      sm: "1rem",
      base: "1.5rem",
      lg: "2rem",
      xl: "3rem",
    },
    shadow: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
  },
  
  components: {
    hero: {
      height: "600px",
      mobileHeight: "400px",
      overlay: "rgba(0, 0, 0, 0.4)",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    productCard: {
      aspectRatio: "1/1.2",
      hoverScale: 1.05,
      shadowHover: "0 10px 30px rgba(0, 0, 0, 0.1)",
    },
    header: {
      sticky: true,
      transparent: false,
      blurBackground: true,
    },
  },
  
  features: {
    animations: true,
    quickView: true,
    megaMenu: true,
    productHover: true,
    parallaxScrolling: true,
    searchAutocomplete: true,
  },
  
  presets: {
    colorSchemes: [
      {
        name: "Ocean Breeze",
        colors: {
          primary: "#0891b2", // Cyan-600
          secondary: "#7c3aed", // Violet-600
          accent: "#10b981", // Emerald-500
        }
      },
      {
        name: "Sunset Glow",
        colors: {
          primary: "#f97316", // Orange-500
          secondary: "#e11d48", // Rose-600
          accent: "#fbbf24", // Amber-400
        }
      },
      {
        name: "Forest Mist",
        colors: {
          primary: "#059669", // Emerald-600
          secondary: "#0d9488", // Teal-600
          accent: "#84cc16", // Lime-500
        }
      },
      {
        name: "Royal Purple",
        colors: {
          primary: "#7c3aed", // Violet-600
          secondary: "#a855f7", // Purple-500
          accent: "#ec4899", // Pink-500
        }
      }
    ]
  }
};
