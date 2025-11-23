export default {
  name: "Luxe Theme",
  slug: "luxe",
  description: "تصميم متميز وأنيق للعلامات التجارية الراقية. يتميز بخلفيات الفيديو، والطباعة الأنيقة، والشعور بالفخامة. مثالي للأزياء الفاخرة والمجوهرات والمنتجات الراقية.",
  
  colors: {
    primary: "#b8860b", // Goldenrod - Richer gold
    secondary: "#1a1a1a", // Near black - More sophisticated
    accent: "#a855f7", // Purple-500 - Luxurious purple
    // background: "#ffffff",
    foreground: "#0a0a0a", // Very dark
    muted: "#faf9f7", // Warm off-white
    mutedForeground: "#525252", // Neutral-600
    border: "#d6d6d6", // Neutral-300
    success: "#059669", // Emerald-600
    warning: "#d97706", // Amber-600
    error: "#dc2626",
    info: "#2563eb",
    darkPrimary: "#fbbf24",
    darkSecondary: "#f5f5f4", // Stone-100 - Light for dark mode
    darkAccent: "#c084fc", // Purple-400 - Lighter purple
    darkBackground: "#0a0a0a", // Very dark background
    darkForeground: "#faf9f7", // Warm off-white text
    darkMuted: "#1c1917", // Stone-900 - Dark muted
    darkMutedForeground: "#a8a29e", // Stone-400 - Light muted text
    darkBorder: "#424242", // Stone-600 - Dark border
    darkSuccess: "#10b981", // Emerald-500 - Lighter for dark mode
    darkWarning: "#f59e0b", // Amber-500 - Lighter for dark mode
    darkError: "#ef4444", // Red-500 - Lighter for dark mode
    darkInfo: "#3b82f6", // Blue-500 - Lighter for dark mode
  },
  
  typography: {
    fontFamily: "'Playfair Display', 'Georgia', serif",
    headingFontFamily: "'Bodoni Moda', 'Didot', 'Playfair Display', serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.75rem",
      "3xl": "2.5rem",
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
    containerWidth: "1440px",
    sidebarWidth: "360px",
    headerHeight: "100px",
    borderRadius: {
      none: "0px",
      sm: "2px",
      base: "4px",
      md: "6px",
      lg: "8px",
      xl: "12px",
      "2xl": "16px",
      full: "9999px",
    },
    spacing: {
      xs: "1rem",
      sm: "1.5rem",
      base: "2.5rem",
      lg: "4rem",
      xl: "6rem",
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
      mobileHeight: "80vh",
      overlay: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    productCard: {
      aspectRatio: "3/4",
      hoverScale: 1.02,
      shadowHover: "0 20px 40px rgba(0, 0, 0, 0.2)",
    },
    header: {
      sticky: true,
      transparent: true,
      blurBackground: true,
      premium: true,
    },
    footer: {
      premium: true,
      elegant: true,
    },
  },
  
  features: {
    animations: true, // Smooth, elegant animations
    quickView: false, // Focus on detail pages
    megaMenu: false,
    productHover: true, // Sophisticated hover effects
    parallaxScrolling: true,
    searchAutocomplete: false,
    videoBackgrounds: true,
    premiumEffects: true,
    smoothScrolling: true,
  },
  
  presets: {
    colorSchemes: [
      {
        name: "Royal Gold",
        colors: {
          primary: "#d4af37", // Classic gold
          secondary: "#2c2c2c",
          accent: "#8b0000", // Dark red
        }
      },
      {
        name: "Midnight Luxe",
        colors: {
          primary: "#1e3a8a", // Blue-900
          secondary: "#1e1b4b", // Indigo-950
          accent: "#fbbf24", // Amber-400
        }
      },
      {
        name: "Rose Gold",
        colors: {
          primary: "#b76e79", // Rose gold
          secondary: "#831843", // Rose-900
          accent: "#fbbf24", // Amber-400
        }
      },
      {
        name: "Emerald Elite",
        colors: {
          primary: "#064e3b", // Emerald-900
          secondary: "#14532d", // Green-900
          accent: "#d4af37", // Gold
        }
      }
    ]
  }
};
