export default {
  name: "Modern Theme",
  slug: "modern",
  description: "Clean, contemporary design for fashion & lifestyle brands. Features hero sliders, product grids with hover effects, mega menus, and quick view functionality.",
  
  colors: {
    primary: "#2563eb", // Blue-600
    secondary: "#7c3aed", // Violet-600
    accent: "#f59e0b", // Amber-500
    background: "#ffffff",
    foreground: "#0f172a", // Slate-900
    muted: "#f1f5f9", // Slate-100
    mutedForeground: "#64748b", // Slate-500
    border: "#e2e8f0", // Slate-200
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
      full: "9999px",
    },
    spacing: {
      xs: "0.5rem",
      sm: "1rem",
      base: "1.5rem",
      lg: "2rem",
      xl: "3rem",
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
};