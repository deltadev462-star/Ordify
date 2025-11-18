export default {
  name: "Classic Theme",
  slug: "classic",
  description: "Traditional ecommerce design with proven conversion patterns. Features sidebar filters, breadcrumbs, detailed product information, and customer reviews.",
  
  colors: {
    primary: "#2563eb", // Blue-600 - Brighter
    secondary: "#dc2626", // Red-600
    accent: "#059669", // Emerald-600 - More vibrant
    background: "#ffffff",
    foreground: "#1f2937", // Gray-800
    muted: "#f9fafb", // Gray-50
    mutedForeground: "#6b7280", // Gray-500
    border: "#d1d5db", // Gray-300
    success: "#16a34a", // Green-600
    warning: "#ea580c", // Orange-600
    error: "#dc2626", // Red-600
    info: "#2563eb", // Blue-600
    // Dark mode colors
    darkPrimary: "#3b82f6", // Blue-500 - Lighter for dark mode
    darkSecondary: "#ef4444", // Red-500 - Lighter for dark mode
    darkAccent: "#10b981", // Emerald-500 - Lighter for dark mode
    darkBackground: "#111827", // Gray-900 - Dark background
    darkForeground: "#f9fafb", // Gray-50 - Light text
    darkMuted: "#1f2937", // Gray-800 - Dark muted
    darkMutedForeground: "#9ca3af", // Gray-400 - Light muted text
    darkBorder: "#374151", // Gray-700 - Dark border
    darkSuccess: "#22c55e", // Green-500 - Lighter for dark mode
    darkWarning: "#f97316", // Orange-500 - Lighter for dark mode
    darkError: "#ef4444", // Red-500 - Lighter for dark mode
    darkInfo: "#3b82f6", // Blue-500 - Lighter for dark mode
  },
  
  typography: {
    fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    headingFontFamily: "'Georgia', 'Times New Roman', serif",
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
    containerWidth: "1200px",
    sidebarWidth: "300px",
    headerHeight: "120px", // Taller for dual navigation
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
      sm: "0.75rem",
      base: "1rem",
      lg: "1.5rem",
      xl: "2rem",
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
      height: "400px",
      mobileHeight: "300px",
      overlay: "rgba(0, 0, 0, 0.3)",
      transition: "all 0.3s ease",
    },
    productCard: {
      aspectRatio: "3/4",
      hoverScale: 1,
      shadowHover: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    header: {
      sticky: true,
      transparent: false,
      blurBackground: false,
      topBar: true, // Classic sites often have a top bar
    },
    sidebar: {
      width: "280px",
      sticky: true,
      collapsible: true,
    },
  },
  
  features: {
    animations: false, // More subtle animations
    quickView: true,
    megaMenu: false, // Traditional dropdown instead
    productHover: false, // Classic hover states
    parallaxScrolling: false,
    searchAutocomplete: true,
    productReviews: true,
    breadcrumbs: true,
    sidebarFilters: true,
    wishlist: true,
    compareProducts: true,
  },
  
  presets: {
    colorSchemes: [
      {
        name: "Corporate Blue",
        colors: {
          primary: "#1e40af", // Blue-800
          secondary: "#7c2d12", // Orange-900
          accent: "#0891b2", // Cyan-600
        }
      },
      {
        name: "Trust Green",
        colors: {
          primary: "#166534", // Green-800
          secondary: "#1e40af", // Blue-800
          accent: "#ca8a04", // Yellow-600
        }
      },
      {
        name: "Professional Gray",
        colors: {
          primary: "#374151", // Gray-700
          secondary: "#1f2937", // Gray-800
          accent: "#dc2626", // Red-600
        }
      },
      {
        name: "Warm Earth",
        colors: {
          primary: "#92400e", // Amber-800
          secondary: "#991b1b", // Red-800
          accent: "#166534", // Green-800
        }
      }
    ]
  }
};