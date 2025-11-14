export default {
  name: "Minimal Theme",
  slug: "minimal",
  description: "Clean, minimal design focusing on products. Features full-screen images, subtle animations, lots of white space. Perfect for luxury goods, jewelry, art, and premium brands.",
  
  colors: {
    primary: "#000000", // Black
    secondary: "#666666", // Medium Gray
    accent: "#c9302c", // Subtle Red
    background: "#ffffff",
    foreground: "#111111", // Near Black
    muted: "#fafafa", // Very Light Gray
    mutedForeground: "#888888", // Light Gray
    border: "#e5e5e5", // Light Border
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
      full: "9999px",
    },
    spacing: {
      xs: "0.75rem",
      sm: "1.5rem",
      base: "2rem",
      lg: "3rem",
      xl: "4rem",
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
};