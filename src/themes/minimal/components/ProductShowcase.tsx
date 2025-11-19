import { useState, useRef, useEffect } from "react";
import { ProductCard } from "@/themes/shared/components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
}

interface MinimalProductShowcaseProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  spacing?: "tight" | "normal" | "wide";
  showNavigation?: boolean;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWishlist?: (item: { id: string; name: string; price: number; image: string; variant?: string }) => void;
  className?: string;
}

export const MinimalProductShowcase = ({
  products,
  title,
  subtitle,
  columns = 3,
  spacing = "wide",
  showNavigation = false,
  onAddToCart,
  onQuickView,
  onWishlist,
  className = "",
}: MinimalProductShowcaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const getSpacing = () => {
    switch (spacing) {
      case "tight":
        return "gap-4";
      case "normal":
        return "gap-6 lg:gap-8";
      case "wide":
        return "gap-8 lg:gap-12";
      default:
        return "gap-8";
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const containerWidth = scrollContainerRef.current.clientWidth;
      const maxScroll = scrollWidth - containerWidth;
      const targetScroll = (index / (products.length - columns)) * maxScroll;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(products.length - columns, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <section 
      ref={containerRef}
      className={`py-16 lg:py-24 ${className}`}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-12 lg:mb-16 text-center">
            {title && (
              <h2 
                className={`mb-4 text-3xl lg:text-4xl font-light tracking-tight transition-all duration-1000 ${
                  isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p 
                className={`text-sm text-gray-600 uppercase tracking-widest transition-all duration-1000 delay-200 ${
                  isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div 
          ref={scrollContainerRef}
          className={`grid ${getGridColumns()} ${getSpacing()} transition-all duration-1000 delay-400 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${600 + index * 100}ms`,
              }}
            >
              <ProductCard
                {...product}
                variant="minimal"
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onWishlist={onWishlist}
                className="border-0 shadow-none hover:shadow-sm"
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        {showNavigation && products.length > columns && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`p-2 transition-all ${
                currentIndex === 0 
                  ? "opacity-30 cursor-not-allowed" 
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label="Previous products"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: Math.max(1, products.length - columns + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-1 transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gray-900"
                      : "w-1 bg-gray-300 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex >= products.length - columns}
              className={`p-2 transition-all ${
                currentIndex >= products.length - columns 
                  ? "opacity-30 cursor-not-allowed" 
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label="Next products"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Minimal Grid Layout - Static grid without animations
interface MinimalProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWishlist?: (item: { id: string; name: string; price: number; image: string; variant?: string }) => void;
  className?: string;
}

export const MinimalProductGrid = ({
  products,
  columns = 3,
  onAddToCart,
  onQuickView,
  onWishlist,
  className = "",
}: MinimalProductGridProps) => {
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-x-6 gap-y-16 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          variant="minimal"
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          onWishlist={onWishlist}
          className="border-0 shadow-none"
        />
      ))}
    </div>
  );
};