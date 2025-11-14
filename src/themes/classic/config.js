export default {
  name: "Classic Theme",
  slug: "classic",
  description: "Traditional ecommerce design with proven conversion patterns. Features sidebar filters, breadcrumbs, detailed product information, and customer reviews.",
  
  colors: {
    primary: "#1e40af", // Blue-800
    secondary: "#dc2626", // Red-600
    accent: "#16a34a", // Green-600
    background: "#ffffff",
    foreground: "#1f2937", // Gray-800
    muted: "#f9fafb", // Gray-50
    mutedForeground: "#6b7280", // Gray-500
    border: "#d1d5db", // Gray-300
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
      full: "9999px",
    },
    spacing: {
      xs: "0.5rem",
      sm: "0.75rem",
      base: "1rem",
      lg: "1.5rem",
      xl: "2rem",
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
};