import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  Star, 
  Heart, 
  Search, 
  Menu, 
  X,
  ChevronRight,
  Filter,
  Grid,
  List
} from "lucide-react";

interface ThemePreviewProps {
  device?: "desktop" | "tablet" | "mobile";
  className?: string;
}

// Mock data for preview
const mockProducts = [
  {
    id: 1,
    name: "Premium Leather Bag",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
    badge: "Sale"
  },
  {
    id: 2,
    name: "Classic Watch",
    price: 599.99,
    rating: 5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80",
    badge: "New"
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 199.99,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80"
  },
  {
    id: 4,
    name: "Luxury Perfume",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
    badge: "Limited"
  }
];

const mockCategories = [
  { name: "Bags", count: 156, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80" },
  { name: "Watches", count: 89, image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=400&q=80" },
  { name: "Sunglasses", count: 234, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80" },
  { name: "Perfumes", count: 167, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&q=80" }
];

export const ThemePreview: React.FC<ThemePreviewProps> = ({ 
  device = "desktop",
  className = "" 
}) => {
  const { colors, typography, layout } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (!colors || !typography || !layout) return null;

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px"
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader>
        <CardTitle>Theme Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          className="mx-auto overflow-auto"
          style={{ 
            maxWidth: deviceWidths[device],
            maxHeight: "700px"
          }}
        >
          <div 
            className="min-h-full"
            style={{ 
              backgroundColor: colors.background,
              color: colors.foreground,
              fontFamily: typography.fontFamily
            }}
          >
            {/* Header */}
            <header 
              className="sticky top-0 z-10 shadow-sm"
              style={{ 
                backgroundColor: colors.background,
                borderBottom: `1px solid ${colors.border}`,
                height: layout.headerHeight
              }}
            >
              <div 
                className="mx-auto px-4 h-full flex items-center justify-between"
                style={{ maxWidth: layout.containerWidth }}
              >
                {/* Logo */}
                <div className="flex items-center gap-4">
                  <button 
                    className="lg:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X /> : <Menu />}
                  </button>
                  <h1 
                    className="text-2xl font-bold"
                    style={{ 
                      fontFamily: typography.headingFontFamily,
                      color: colors.primary 
                    }}
                  >
                    Your Store
                  </h1>
                </div>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-6">
                  {["Home", "Shop", "Categories", "About", "Contact"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="hover:opacity-80 transition-opacity"
                      style={{ 
                        fontSize: typography.fontSize.base,
                        fontWeight: typography.fontWeight.medium
                      }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button className="hover:opacity-80">
                    <Search className="h-5 w-5" />
                  </button>
                  <button className="hover:opacity-80">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="hover:opacity-80 relative">
                    <ShoppingBag className="h-5 w-5" />
                    <span 
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center text-xs text-white"
                      style={{ backgroundColor: colors.accent }}
                    >
                      3
                    </span>
                  </button>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-96 bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white max-w-2xl mx-auto px-4">
                  <h2 
                    className="text-4xl mb-4"
                    style={{ 
                      fontFamily: typography.headingFontFamily,
                      fontSize: typography.fontSize["3xl"],
                      fontWeight: typography.fontWeight.bold
                    }}
                  >
                    Summer Collection 2024
                  </h2>
                  <p 
                    className="mb-6"
                    style={{ fontSize: typography.fontSize.lg }}
                  >
                    Discover our latest arrivals and trending styles
                  </p>
                  <Button
                    size="lg"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.background,
                      borderRadius: layout.borderRadius.md
                    }}
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </section>

            <Tabs defaultValue="products" className="w-full">
              <div 
                className="mx-auto px-4 py-6"
                style={{ maxWidth: layout.containerWidth }}
              >
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
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
                        Filters
                      </Button>
                      <span className="text-sm" style={{ color: colors.mutedForeground }}>
                        Showing 4 products
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

                  {/* Product Grid */}
                  <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}>
                    {mockProducts.map((product) => (
                      <div 
                        key={product.id}
                        className="group cursor-pointer"
                        style={{
                          backgroundColor: colors.background,
                          borderRadius: layout.borderRadius.lg,
                          border: `1px solid ${colors.border}`
                        }}
                      >
                        <div className="relative overflow-hidden" style={{ borderRadius: layout.borderRadius.lg }}>
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.badge && (
                            <Badge 
                              className="absolute top-2 left-2"
                              style={{ 
                                backgroundColor: product.badge === "Sale" ? colors.accent : colors.primary,
                                color: colors.background
                              }}
                            >
                              {product.badge}
                            </Badge>
                          )}
                          <button 
                            className="absolute top-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ 
                              backgroundColor: colors.background,
                              color: colors.foreground
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
                              fontWeight: typography.fontWeight.semibold
                            }}
                          >
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-current" : ""}`}
                                  style={{ color: colors.accent }}
                                />
                              ))}
                            </div>
                            <span 
                              className="text-sm"
                              style={{ color: colors.mutedForeground }}
                            >
                              ({product.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span 
                              className="text-xl"
                              style={{ 
                                fontWeight: typography.fontWeight.bold,
                                color: colors.primary
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
                      </div>
                    ))}
                  </div>
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
                          border: `1px solid ${colors.border}`
                        }}
                      >
                        <img 
                          src={category.image}
                          alt={category.name}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div 
                          className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-4"
                        >
                          <div className="text-white">
                            <h3 
                              className="text-xl mb-1"
                              style={{ 
                                fontFamily: typography.headingFontFamily,
                                fontWeight: typography.fontWeight.semibold
                              }}
                            >
                              {category.name}
                            </h3>
                            <p className="text-sm opacity-90">
                              {category.count} Products
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

            {/* Footer */}
            <footer 
              className="mt-16"
              style={{ 
                backgroundColor: colors.muted,
                borderTop: `1px solid ${colors.border}`
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
                        fontWeight: typography.fontWeight.semibold
                      }}
                    >
                      About Us
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: colors.mutedForeground }}
                    >
                      Your trusted destination for premium products and exceptional service.
                    </p>
                  </div>
                  {["Customer Service", "Information", "Follow Us"].map((title) => (
                    <div key={title}>
                      <h4 
                        className="mb-4"
                        style={{ 
                          fontSize: typography.fontSize.lg,
                          fontWeight: typography.fontWeight.semibold
                        }}
                      >
                        {title}
                      </h4>
                      <ul className="space-y-2">
                        {["Link 1", "Link 2", "Link 3"].map((link) => (
                          <li key={link}>
                            <a 
                              href="#"
                              className="text-sm hover:underline"
                              style={{ color: colors.mutedForeground }}
                            >
                              {link}
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
                    color: colors.mutedForeground
                  }}
                >
                  © 2024 Your Store. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};