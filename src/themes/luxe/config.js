export default {
  name: "Luxe Theme",
  slug: "luxe",
  description: "Premium, elegant design for high-end brands. Features video backgrounds, elegant typography, premium feel. Perfect for luxury fashion, jewelry, and high-end products.",
  
  colors: {
    primary: "#d4af37", // Gold
    secondary: "#2c2c2c", // Dark Gray
    accent: "#8b0000", // Dark Red
    background: "#ffffff",
    foreground: "#1a1a1a", // Rich Black
    muted: "#f7f7f7", // Off White
    mutedForeground: "#666666", // Medium Gray
    border: "#e0e0e0", // Light Gray
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
      full: "9999px",
    },
    spacing: {
      xs: "1rem",
      sm: "1.5rem",
      base: "2.5rem",
      lg: "4rem",
      xl: "6rem",
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
};