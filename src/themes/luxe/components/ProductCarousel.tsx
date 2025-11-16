import { useState, useRef, useEffect } from "react";
import { ProductCard } from "@/themes/shared/components/ProductCard";
import { Button } from "@/components/ui/button";
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

interface LuxeProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllLink?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  productsPerView?: number;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  className?: string;
}

export const LuxeProductCarousel = ({
  products,
  title,
  subtitle,
  viewAllLink,
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  productsPerView = 4,
  onAddToCart,
  onQuickView,
  onWishlist,
  className = "",
}: LuxeProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | undefined>(undefined);

  const maxIndex = Math.max(0, products.length - productsPerView);

  useEffect(() => {
    if (autoPlay && !isHovered && products.length > productsPerView) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, autoPlay, isHovered, products.length, productsPerView, autoPlayInterval]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index * productsPerView);
  };

  const getTransform = () => {
    const itemWidth = 100 / productsPerView;
    return `translateX(-${currentIndex * itemWidth}%)`;
  };

  const dotCount = Math.ceil(products.length / productsPerView);

  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          {subtitle && (
            <p className="mb-2 font-serif text-sm italic tracking-widest text-primary">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="mb-4 font-heading text-4xl font-light tracking-wide text-gray-900">
              {title}
            </h2>
          )}
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="inline-block text-sm font-light uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
            >
              View All
              <span className="ml-2">→</span>
            </a>
          )}
        </div>

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Products */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: getTransform() }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 px-3`}
                  style={{ width: `${100 / productsPerView}%` }}
                >
                  <ProductCard
                    {...product}
                    variant="luxe"
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                    onWishlist={onWishlist}
                    className="border-0 shadow-none hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {showArrows && products.length > productsPerView && (
            <>
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-lg p-3 transition-all hover:bg-gray-50 ${
                  currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Previous products"
              >
                <ChevronLeft className="h-5 w-5 text-gray-900" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-lg p-3 transition-all hover:bg-gray-50 ${
                  currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Next products"
              >
                <ChevronRight className="h-5 w-5 text-gray-900" />
              </button>
            </>
          )}
        </div>

        {/* Dots Navigation */}
        {showDots && dotCount > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(dotCount)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 transition-all duration-300 ${
                  Math.floor(currentIndex / productsPerView) === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Featured Product Showcase
interface LuxeFeaturedProductProps {
  product: Product & {
    features?: string[];
    details?: string;
  };
  imagePosition?: "left" | "right";
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export const LuxeFeaturedProduct = ({
  product,
  imagePosition = "left",
  onAddToCart,
  className = "",
}: LuxeFeaturedProductProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`featured-${product.id}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [product.id]);

  return (
    <section id={`featured-${product.id}`} className={`py-20 ${className}`}>
      <div className="container mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${
          imagePosition === "right" ? "lg:flex-row-reverse" : ""
        }`}>
          {/* Image */}
          <div className={`${imagePosition === "right" ? "lg:order-2" : ""}`}>
            <div className={`relative overflow-hidden transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${
                imagePosition === "left" ? "-translate-x-8" : "translate-x-8"
              }`
            }`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div className={`${imagePosition === "right" ? "lg:order-1" : ""}`}>
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${
                imagePosition === "left" ? "translate-x-8" : "-translate-x-8"
              }`
            }`}>
              {product.category && (
                <p className="mb-4 font-serif text-sm italic tracking-widest text-primary">
                  {product.category}
                </p>
              )}
              
              <h2 className="mb-4 font-heading text-3xl lg:text-4xl font-light tracking-wide text-gray-900">
                {product.name}
              </h2>

              <div className="mb-6 flex items-baseline gap-4">
                <span className="text-2xl font-light text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {product.details && (
                <p className="mb-8 text-gray-600 leading-relaxed">
                  {product.details}
                </p>
              )}

              {product.features && product.features.length > 0 && (
                <ul className="mb-8 space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 text-primary">•</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <Button
                onClick={() => onAddToCart?.(product.id)}
                disabled={!product.inStock}
                className="bg-primary px-8 py-4 text-sm font-light uppercase tracking-widest text-white hover:bg-primary/90"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};