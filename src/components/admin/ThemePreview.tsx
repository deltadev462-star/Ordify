import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { getThemeComponents } from "@/themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Star, Heart, Search, Menu, X, ChevronRight, Filter, Grid, List } from "lucide-react";

interface ThemePreviewProps {
  device?: "desktop" | "tablet" | "mobile";
  className?: string;
}

// Component type mapping for different themes
interface ThemeComponentMap {
  header: string[];
  footer: string[];
  hero: string[];
  productGrid: string[];
  productCard: string[];
  categoryCard: string[];
  collectionBanner: string[];
}

// Map of possible component names for each component type across all themes
const COMPONENT_NAME_PATTERNS: ThemeComponentMap = {
  header: ['Header', 'CenteredHeader'],
  footer: ['Footer', 'TwoColumnFooter'],
  hero: ['Hero', 'SplitHero'],
  productGrid: ['ProductGrid', 'ProductShowcase', 'ProductCarousel'],
  productCard: ['ProductCard', 'FeaturedProduct'],
  categoryCard: ['CategoryCard', 'CollectionBanner', 'CollectionGrid'],
  collectionBanner: ['FeaturedCollections', 'AsymmetricCollections', 'ScrollableCollections', 'CollectionBanner']
};

// Theme-specific component name mappings - EXACT names as exported
const THEME_SPECIFIC_NAMES: Record<string, Record<string, string[]>> = {
  modern: {
    hero: ['ModernHero'],
    productGrid: ['ModernProductGrid'],
    header: ['ModernHeader'],
    footer: ['ModernFooter']
  },
  classic: {
    hero: ['ClassicHero'],
    productGrid: ['ClassicProductGrid'],
    header: ['ClassicHeader'],
    footer: ['ClassicFooter']
  },
  minimal: {
    hero: ['MinimalHero'],
    productGrid: ['MinimalProductShowcase', 'MinimalProductGrid'],
    header: ['MinimalHeader', 'MinimalCenteredHeader'],
    footer: ['MinimalFooter', 'MinimalTwoColumnFooter']
  },
  luxe: {
    hero: ['LuxeHero', 'LuxeSplitHero'],
    productGrid: ['LuxeProductCarousel', 'LuxeFeaturedProduct'],
    header: ['LuxeHeader'],
    footer: ['LuxeFooter']
  }
};

// Note: mockHeroSlides will be initialized in component since it needs translations

// Note: mockProducts and mockCategories will be initialized in component since they need translations

// Helper function to find component by type
const findThemeComponent = (
  themeComponents: Record<string, any>,
  componentType: keyof ThemeComponentMap,
  themeName: string
): React.ComponentType<any> | null => {
  if (!themeComponents) return null;

  // First check theme-specific exact names
  const exactNames = THEME_SPECIFIC_NAMES[themeName]?.[componentType];
  if (exactNames) {
    for (const exactName of exactNames) {
      if (themeComponents[exactName]) {
         
        return themeComponents[exactName];
      }
    }
  }

  // Fallback to generic pattern matching if no exact match
  const themePrefix = themeName.charAt(0).toUpperCase() + themeName.slice(1);
  const patterns = COMPONENT_NAME_PATTERNS[componentType];
  
  // Try with theme prefix
  for (const pattern of patterns) {
    const prefixedName = `${themePrefix}${pattern}`;
    if (themeComponents[prefixedName]) {
      return themeComponents[prefixedName];
    }
  }

  return null;
};

// Cart item interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

// Wishlist item interface
interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({
  device = "desktop",
  className = ""
}) => {
  const { t } = useTranslation();
  const { colors, typography, layout, currentTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  
  // Mock hero slides for modern theme
  const mockHeroSlides = [
    {
      id: "slide1",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
      title: t("summerCollection2024"),
      subtitle: t("newArrivals"),
      description: t("discoverLatestArrivals"),
      ctaText: t("shopNow"),
      ctaLink: "/collections/summer",
      textPosition: "center" as const,
      textColor: "light" as const
    }
  ];

  // Mock data for preview
  const mockProducts = [
    {
      id: "1",
      name: t("Premium Leather Bag"),
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.5,
      reviewCount: 128,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
      category: "Bags & Accessories",
      description: "Handcrafted genuine leather bag with premium finish. Perfect for business and casual occasions.",
      features: ["100% Genuine Leather", "Handmade", "Water Resistant", "Multiple Compartments"],
      badge: t("sale"),
      inStock: true,
      freeShipping: true,
      fastDelivery: true,
      warranty: "2 Year Warranty",
      isBestseller: true
    },
    {
      id: "2",
      name: t("Classic Watch"),
      price: 599.99,
      rating: 5,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80",
      category: "Watches",
      description: "Swiss movement automatic watch with sapphire crystal glass and stainless steel case.",
      features: ["Swiss Movement", "Sapphire Crystal", "Water Resistant 100m", "Automatic", "Date Display"],
      badge: t("new"),
      inStock: true,
      freeShipping: true,
      warranty: "5 Year Warranty",
      isNew: true
    },
    {
      id: "3",
      name: t("Designer Sunglasses"),
      price: 199.99,
      rating: 4.8,
      reviewCount: 234,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",
      category: "Eyewear",
      description: "UV400 protection polarized sunglasses with titanium frame. Stylish and durable.",
      features: ["UV400 Protection", "Polarized Lens", "Titanium Frame", "Anti-Glare"],
      inStock: true,
      freeShipping: false,
      fastDelivery: true,
      warranty: "1 Year Warranty"
    },
    {
      id: "4",
      name: t("Luxury Perfume"),
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.7,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
      category: "Fragrances",
      description: "Exclusive eau de parfum with notes of bergamot, jasmine, and sandalwood. Long-lasting fragrance.",
      features: ["Eau de Parfum", "Long Lasting", "Natural Ingredients", "Gift Box Included"],
      badge: t("limited"),
      inStock: true,
      freeShipping: true,
      warranty: "Authentic Guarantee"
    }
  ];

  // Cart functions
  const handleAddToCart = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem) {
        // Update quantity if item already in cart
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      }
    });
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    alert(t("Proceeding to checkout..."));
  };

  // Wishlist functions
  const handleAddToWishlist = (item: { id: string; name: string; price: number; image: string; variant?: string }) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(wishlistItem => wishlistItem.id === item.id);
      if (existingItem) {
        // Remove from wishlist if already exists
        return prevItems.filter(wishlistItem => wishlistItem.id !== item.id);
      } else {
        // Add to wishlist
        return [...prevItems, item];
      }
    });
  };

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleMoveToCart = (item: WishlistItem) => {
    // Add to cart
    handleAddToCart(item.id);
    // Remove from wishlist
    handleRemoveFromWishlist(item.id);
  };

  const mockCategories = [
    { name: t("Bags"), count: 156, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
    { name: t("Watches"), count: 89, image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&q=80" },
    { name: t("Sunglasses"), count: 234, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80" },
    { name: t("Perfumes"), count: 167, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80" }
  ];
  
  // State for all theme components
  const [themeComponents, setThemeComponents] = useState<{
    Header: React.ComponentType<any> | null;
    Footer: React.ComponentType<any> | null;
    Hero: React.ComponentType<any> | null;
    ProductGrid: React.ComponentType<any> | null;
    ProductCard: React.ComponentType<any> | null;
    CategoryCard: React.ComponentType<any> | null;
  }>({
    Header: null,
    Footer: null,
    Hero: null,
    ProductGrid: null,
    ProductCard: null,
    CategoryCard: null
  });
  
  // Track the current loaded theme to force re-render
  const [loadedTheme, setLoadedTheme] = useState<string | null>(null);

  // Load all theme components when theme changes
  useEffect(() => {
    if (currentTheme && currentTheme !== loadedTheme) {
       
      // Clear components first
      setThemeComponents({
        Header: null,
        Footer: null,
        Hero: null,
        ProductGrid: null,
        ProductCard: null,
        CategoryCard: null
      });
      
      // Small delay to ensure clean state
      setTimeout(() => {
        const components = getThemeComponents(currentTheme);
        
        if (components) {
          // Direct component mapping based on theme
          let heroComponent = null;
          
          // Explicitly check for the correct Hero component
          switch(currentTheme) {
            case 'modern':
              heroComponent = components.ModernHero || components.Hero;
              break;
            case 'classic':
              heroComponent = components.ClassicHero || components.Hero;
              break;
            case 'minimal':
              heroComponent = components.MinimalHero || components.Hero;
              break;
            case 'luxe':
              heroComponent = components.LuxeHero || components.Hero;
              break;
          }
          
          const loadedComponents = {
            Header: findThemeComponent(components, 'header', currentTheme),
            Footer: findThemeComponent(components, 'footer', currentTheme),
            Hero: heroComponent,
            ProductGrid: findThemeComponent(components, 'productGrid', currentTheme),
            ProductCard: findThemeComponent(components, 'productCard', currentTheme),
            CategoryCard: findThemeComponent(components, 'categoryCard', currentTheme),
          };


          setThemeComponents(loadedComponents);
          setLoadedTheme(currentTheme);
        } else {
          setLoadedTheme(null);
        }
      }, 50); // Small delay to ensure state is cleared
    }
  }, [currentTheme, loadedTheme]);

  if (!colors || !typography || !layout) return null;

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px"
  };

  const { Header, Footer, ProductGrid } = themeComponents;
 
  return (
    <Card className={`overflow-hidden   ${className} border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] dark:text-white`}>
      <CardHeader>
        <CardTitle>
          {t("themePreview")} - {currentTheme}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="mx-auto overflow-auto"
          style={{
            maxWidth: deviceWidths[device],
            maxHeight: "700px",
          }}
        >
          <div
            key={`theme-preview-${currentTheme}`} // Force re-mount on theme change
            className="min-h-full"
            style={{
              backgroundColor: colors.background,
              color: colors.foreground,
              fontFamily: typography.fontFamily,
            }}
          >
            {/* Theme-specific Header or Fallback */}
            {Header ? (
              <Header
                logo={
                  <span
                    className="text-2xl font-bold bg-clip-text text-transparent"
                    style={{
                      fontFamily: typography.headingFontFamily,
                      backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    }}
                  >
                    {t("yourStore")}
                      </span>
                    }
                    cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
                    cartItems={cartItems}
                    wishlistCount={wishlistItems.length}
                    wishlistItems={wishlistItems}
                    onCartClick={() => {}}
                    onAccountClick={() => {}}
                    onWishlistClick={() => {}}
                    onAddToWishlist={handleAddToWishlist}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onMoveToCart={handleMoveToCart}
                    onSearch={(_query: string) => {}}
                    onQuantityChange={handleQuantityChange}
                    onRemoveFromCart={handleRemoveFromCart}
                    onCheckout={handleCheckout}
                  />
            ) : (
              /* Fallback generic header */
              <header
                className="sticky top-0 z-10 backdrop-blur-md"
                style={{
                  background: `linear-gradient(to bottom, ${colors.background}ee, ${colors.background}dd)`,
                  borderBottom: `1px solid ${colors.border}`,
                  height: layout.headerHeight,
                  boxShadow: `0 2px 10px ${colors.primary}10`,
                }}
              >
                <div
                  className="mx-auto px-4 h-full flex items-center justify-between"
                  style={{ maxWidth: layout.containerWidth }}
                >
                  <div className="flex items-center gap-4">
                    <button
                      className="lg:hidden"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                    <h1
                      className="text-2xl font-bold bg-clip-text text-transparent"
                      style={{
                        fontFamily: typography.headingFontFamily,
                        backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      }}
                    >
                      {t("yourStore")}
                    </h1>
                  </div>

                  <nav className="hidden lg:flex items-center gap-6">
                    {[
                      { key: "home", label: t("home") },
                      { key: "shop", label: t("shop") },
                      { key: "categories", label: t("categories") },
                      { key: "about", label: t("about") },
                      { key: "contact", label: t("contact") },
                    ].map((item) => (
                      <a
                        key={item.key}
                        href="#"
                        className="relative hover:opacity-90 transition-all duration-300 group"
                        style={{
                          fontSize: typography.fontSize.base,
                          fontWeight: typography.fontWeight.medium,
                          color: colors.foreground,
                        }}
                      >
                        {item.label}
                        <span
                          className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                          style={{
                            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                          }}
                        />
                      </a>
                    ))}
                  </nav>

                  <div className="flex items-center gap-4">
                    <button
                      className="hover:opacity-80 transition-all duration-300 hover:scale-110"
                      style={{ color: colors.foreground }}
                    >
                      <Search className="h-5 w-5" />
                    </button>
                    <button
                      className="hover:opacity-80 transition-all duration-300 hover:scale-110"
                      style={{ color: colors.foreground }}
                    >
                      <Heart className="h-5 w-5" />
                    </button>
                    <button
                      className="hover:opacity-80 relative transition-all duration-300 hover:scale-110"
                      style={{ color: colors.foreground }}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center text-xs text-white shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                          boxShadow: `0 2px 8px ${colors.accent}40`,
                        }}
                      >
                        3
                      </span>
                    </button>
                  </div>
                </div>
              </header>
            )}

            {/* Theme-specific Hero Section */}
            {(() => {
              // Render Hero based on current theme and loaded components
              if (
                !currentTheme ||
                !loadedTheme ||
                currentTheme !== loadedTheme
              ) {
                return (
                  <div className="h-96 bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-500">{t("loadingThemePreview")}</p>
                  </div>
                );
              }

              const HeroComponent = themeComponents.Hero;

              if (!HeroComponent) {
                // Fallback hero section when no component is found
                return (
                  <section className="relative h-96 bg-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                      alt={t("hero")}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center text-white max-w-2xl mx-auto px-4">
                        <h2
                          className="text-4xl mb-4"
                          style={{
                            fontFamily: typography.headingFontFamily,
                            fontSize: typography.fontSize["3xl"],
                            fontWeight: typography.fontWeight.bold,
                          }}
                        >
                          {t("summerCollection2024")}
                        </h2>
                        <p
                          className="mb-6"
                          style={{ fontSize: typography.fontSize.lg }}
                        >
                          {t("discoverLatestArrivals")}
                        </p>
                        <Button
                          size="lg"
                          className="relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                            color: colors.background,
                            borderRadius: layout.borderRadius.md,
                            boxShadow: `0 4px 15px ${colors.primary}40`,
                            border: "none",
                          }}
                        >
                          <span className="relative z-10">{t("shopNow")}</span>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                  </section>
                );
              }

              // Render the Hero component with theme-specific props
              try {
                switch (currentTheme) {
                  case "modern":
                  case "classic":
                    return (
                      <HeroComponent
                        key={`${currentTheme}-hero-${Date.now()}`}
                        slides={mockHeroSlides}
                        autoPlay={true}
                        autoPlayInterval={5000}
                        showNavigation={true}
                        showDots={true}
                        height="500px"
                        mobileHeight="400px"
                      />
                    );
                  case "minimal":
                    return (
                      <HeroComponent
                        key={`${currentTheme}-hero-${Date.now()}`}
                        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                        title={t("summerCollection2024")}
                        subtitle={t("discoverLatestArrivals")}
                        ctaText={t("shopNow")}
                        ctaLink="/collections/summer"
                        overlay={false}
                        fullHeight={false}
                        centered={true}
                      />
                    );
                  case "luxe":
                    return (
                      <HeroComponent
                        key={`${currentTheme}-hero-${Date.now()}`}
                        backgroundType="image"
                        backgroundSrc="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                        title={t("summerCollection2024")}
                        subtitle={t("newArrivals")}
                        description={t("discoverLatestArrivals")}
                        ctaText={t("shopNow")}
                        onCtaClick={() => {}}
                        showScrollIndicator={false}
                        overlayOpacity={0.4}
                      />
                    );
                  default:
                    return (
                      <HeroComponent
                        key={`${currentTheme}-hero-${Date.now()}`}
                        title={t("summerCollection2024")}
                        subtitle={t("discoverLatestArrivals")}
                        buttonText={t("shopNow")}
                        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                        onButtonClick={() => {}}
                      />
                    );
                }
              } catch (error) {
                return (
                  <div className="h-96 bg-red-50 flex items-center justify-center">
                    <p className="text-red-500">{t("error")} {t("loading")} {t("hero")}</p>
                  </div>
                );
              }
            })()}

            <Tabs defaultValue="products" className="w-full">
              <div
                className="mx-auto px-4 py-6"
                style={{ maxWidth: layout.containerWidth }}
              >
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                  <TabsTrigger value="products">{t("products")}</TabsTrigger>
                  <TabsTrigger value="categories">
                    {t("categories")}
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Products Tab */}
              <TabsContent value="products">
                <div
                  className="mx-auto px-4 pb-8"
                  style={{ maxWidth: layout.containerWidth }}
                >
                  {/* Filters Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        {t("filters")}
                      </Button>
                      <span
                        className="text-sm"
                        style={{ color: colors.mutedForeground }}
                      >
                        {t("showingProducts", { count: mockProducts.length })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Theme-specific Product Grid or Fallback */}
                  {ProductGrid ? (
                    <ProductGrid
                      products={mockProducts}
                      viewMode={viewMode}
                      onAddToCart={handleAddToCart}
                      onQuickView={(_id: string) => {}}
                      onWishlist={handleAddToWishlist}
                    />
                  ) : (
                    /* Fallback product grid */
                    <div
                      className={`grid gap-6 ${
                        viewMode === "grid"
                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                          : "grid-cols-1"
                      }`}
                    >
                      {mockProducts.map((product) => (
                        <div
                          key={product.id}
                          className="group cursor-pointer relative"
                          style={{
                            backgroundColor: colors.background,
                            borderRadius: layout.borderRadius.lg,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          <div
                            className="relative overflow-hidden"
                            style={{ borderRadius: layout.borderRadius.lg }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {product.badge && (
                              <Badge
                                className="absolute top-2 left-2"
                                style={{
                                  backgroundColor:
                                    product.badge === "Sale"
                                      ? colors.accent
                                      : colors.primary,
                                  color: colors.background,
                                }}
                              >
                                {t(product.badge.toLowerCase())}
                              </Badge>
                            )}
                            <button
                              className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              style={{
                                backgroundColor: colors.background,
                                color: colors.foreground,
                              }}
                            >
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="p-4">
                            <h3
                              className="mb-2"
                              style={{
                                fontSize: typography.fontSize.base,
                                fontWeight: typography.fontWeight.semibold,
                              }}
                            >
                              {product.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(product.rating)
                                        ? "fill-current"
                                        : ""
                                    }`}
                                    style={{ color: colors.accent }}
                                  />
                                ))}
                              </div>
                              <span
                                className="text-sm"
                                style={{ color: colors.mutedForeground }}
                              >
                                {t("reviews", { count: product.reviewCount })}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-xl"
                                  style={{
                                    fontWeight: typography.fontWeight.bold,
                                    color: colors.primary,
                                  }}
                                >
                                  ${product.price}
                                </span>
                                {product.originalPrice && (
                                  <span
                                    className="text-sm line-through"
                                    style={{ color: colors.mutedForeground }}
                                  >
                                    ${product.originalPrice}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => handleAddToCart(product.id)}
                              style={{
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                                color: colors.background,
                                borderRadius: layout.borderRadius.md,
                              }}
                            >
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              {t("addToCart")}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Categories Tab */}
              <TabsContent value="categories">
                <div
                  className="mx-auto px-4 pb-8"
                  style={{ maxWidth: layout.containerWidth }}
                >
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {mockCategories.map((category) => (
                      <div
                        key={category.name}
                        className="group cursor-pointer relative overflow-hidden"
                        style={{
                          borderRadius: layout.borderRadius.lg,
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                          <div className="text-white">
                            <h3
                              className="text-xl mb-1"
                              style={{
                                fontFamily: typography.headingFontFamily,
                                fontWeight: typography.fontWeight.semibold,
                              }}
                            >
                              {category.name}
                            </h3>
                            <p className="text-sm opacity-90">
                              {t("productsCount", { count: category.count })}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 ml-auto text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Theme-specific Footer or Fallback */}
            {Footer ? (
              <Footer
                logo={
                  <span
                    style={{
                      fontFamily: typography.headingFontFamily,
                      fontSize: typography.fontSize["2xl"],
                      color: colors.primary,
                    }}
                  >
                    {t("yourStore")}
                  </span>
                }
                onSubscribe={(_email: string) => {}}
              />
            ) : (
              /* Fallback generic footer */
              <footer
                className="mt-16"
                style={{
                  backgroundColor: colors.muted,
                  borderTop: `1px solid ${colors.border}`,
                }}
              >
                <div
                  className="mx-auto px-4 py-8"
                  style={{ maxWidth: layout.containerWidth }}
                >
                  <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
                    <div>
                      <h4
                        className="mb-4"
                        style={{
                          fontSize: typography.fontSize.lg,
                          fontWeight: typography.fontWeight.semibold,
                        }}
                      >
                        {t("aboutUs")}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: colors.mutedForeground }}
                      >
                        {t("trustedDestination")}
                      </p>
                    </div>
                    {[
                      { key: "customerService", label: t("customerService") },
                      { key: "information", label: t("information") },
                      { key: "followUs", label: t("followUs") },
                    ].map((section) => (
                      <div key={section.key}>
                        <h4
                          className="mb-4"
                          style={{
                            fontSize: typography.fontSize.lg,
                            fontWeight: typography.fontWeight.semibold,
                          }}
                        >
                          {section.label}
                        </h4>
                        <ul className="space-y-2">
                          {[
                            { key: "link1", label: t("link1") },
                            { key: "link2", label: t("link2") },
                            { key: "link3", label: t("link3") },
                          ].map((link) => (
                            <li key={link.key}>
                              <a
                                href="#"
                                className="text-sm hover:underline"
                                style={{ color: colors.mutedForeground }}
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-8 pt-8 text-center text-sm"
                    style={{
                      borderTop: `1px solid ${colors.border}`,
                      color: colors.mutedForeground,
                    }}
                  >
                    {t("copyright", { year: 2024, storeName: t("yourStore") })}
                  </div>
                </div>
              </footer>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};