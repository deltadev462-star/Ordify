export default {
  name: "Minimal Theme",
  slug: "minimal",
  description: "تصميم نظيف وبسيط يركز على المنتجات. يتميز بصور ملء الشاشة، والرسوم المتحركة الدقيقة، ومساحة بيضاء كبيرة. مثالي للسلع الفاخرة والمجوهرات والفن والعلامات التجارية الممتازة.",
  
  colors: {
    primary: "#18181b", // Zinc-900 - Sophisticated black
    secondary: "#71717a", // Zinc-500 - Elegant gray
    accent: "#ef4444", // Red-500 - Bold accent
    background: "#ffffff",
    foreground: "#18181b", // Zinc-900
    muted: "#fafafa", // Neutral-50
    mutedForeground: "#71717a", // Zinc-500
    border: "#d6d6d6", // Zinc-200
    success: "#22c55e", // Green-500
    warning: "#f59e0b", // Amber-500
    error: "#ef4444",
    info: "#3b82f6",
    darkPrimary: "#fafafa",
    darkSecondary: "#a1a1aa", // Zinc-400 - Lighter gray
    darkAccent: "#f87171", // Red-400 - Lighter accent
    darkBackground: "#18181b", // Zinc-900 - Dark background
    darkForeground: "#fafafa", // Neutral-50 - Light text
    darkMuted: "#27272a", // Zinc-800 - Dark muted
    darkMutedForeground: "#a1a1aa", // Zinc-400 - Light muted text
    darkBorder: "#424242", // Zinc-700 - Dark border
    darkSuccess: "#4ade80", // Green-400 - Lighter for dark mode
    darkWarning: "#fbbf24", // Amber-400 - Lighter for dark mode
    darkError: "#f87171", // Red-400 - Lighter for dark mode
    darkInfo: "#60a5fa", // Blue-400 - Lighter for dark mode
  },
  
  typography: {
    fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
    headingFontFamily: "'Futura', 'Helvetica Neue', -apple-system, sans-serif",
    fontSize: {
      xs: "0.625rem",
      sm: "0.75rem",
      base: "0.875rem",
      lg: "1rem",
      xl: "1.125rem",
      "2xl": "1.375rem",
      "3xl": "1.75rem",
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
    containerWidth: "1400px",
    sidebarWidth: "320px",
    headerHeight: "60px",
    borderRadius: {
      none: "0px",
      sm: "0px",
      base: "0px",
      md: "0px",
      lg: "0px",
      xl: "0px",
      "2xl": "0px",
      full: "9999px",
    },
    spacing: {
      xs: "0.75rem",
      sm: "1.5rem",
      base: "2rem",
      lg: "3rem",
      xl: "4rem",
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
      height: "100vh",
      mobileHeight: "70vh",
      overlay: "none",
      transition: "opacity 1s ease-in-out",
    },
    productCard: {
      aspectRatio: "3/4",
      hoverScale: 1,
      shadowHover: "none",
    },
    header: {
      sticky: false,
      transparent: true,
      blurBackground: false,
      minimal: true,
    },
    footer: {
      minimal: true,
      centered: true,
    },
  },
  
  features: {
    animations: true, // Very subtle animations
    quickView: false, // Focus on product pages
    megaMenu: false,
    productHover: false, // No hover effects on products
    parallaxScrolling: true,
    searchAutocomplete: false,
    infiniteScroll: true,
    fadeOnScroll: true,
    minimalistNavigation: true,
  },
  
  presets: {
    colorSchemes: [
      {
        name: "Pure Monochrome",
        colors: {
          primary: "#000000",
          secondary: "#666666",
          accent: "#000000",
        }
      },
      {
        name: "Soft Blush",
        colors: {
          primary: "#18181b",
          secondary: "#71717a",
          accent: "#fbbf24", // Amber-400
        }
      },
      {
        name: "Ocean Minimal",
        colors: {
          primary: "#0c4a6e", // Sky-900
          secondary: "#0284c7", // Sky-600
          accent: "#0ea5e9", // Sky-500
        }
      },
      {
        name: "Sage Green",
        colors: {
          primary: "#14532d", // Green-900
          secondary: "#166534", // Green-800
          accent: "#16a34a", // Green-600
        }
      }
    ]
  }
};
