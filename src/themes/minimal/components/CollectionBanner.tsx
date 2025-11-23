import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CollectionBannerProps {
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  layout?: "left" | "center" | "right" | "overlay";
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
  fadeIn?: boolean;
  className?: string;
}

export const MinimalCollectionBanner = ({
  image,
  title,
  subtitle,
  description,
  ctaText = "View Collection",
  ctaLink,
  layout = "overlay",
  aspectRatio = "landscape",
  fadeIn = true,
  className = "",
}: CollectionBannerProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`collection-${title.replace(/\s+/g, '-')}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [title]);

  const getAspectRatio = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "landscape":
        return "aspect-[16/9]";
      case "portrait":
        return "aspect-[3/4]";
      case "wide":
        return "aspect-[21/9]";
      default:
        return "aspect-[16/9]";
    }
  };

  const getLayoutClasses = () => {
    if (layout === "overlay") {
      return "absolute inset-0 flex items-center justify-center text-center text-white";
    }
    
    const alignment = {
      left: "justify-start text-left",
      center: "justify-center text-center",
      right: "justify-end text-right",
    }[layout];

    return `flex items-center ${alignment} p-8 md:p-12 lg:p-16`;
  };

  const handleCtaClick = () => {
    if (ctaLink) {
      window.location.href = ctaLink;
    }
  };

  if (layout === "overlay") {
    return (
      <div
        id={`collection-${title.replace(/\s+/g, '-')}`}
        className={`group relative overflow-hidden ${getAspectRatio()} ${className}`}
      >
        {/* Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            onLoad={() => setIsImageLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-1000 group-hover:scale-105 ${
              isImageLoaded && isInView && fadeIn
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
        </div>

        {/* Content */}
        <div className={getLayoutClasses()}>
          <div className="max-w-2xl">
            {subtitle && (
              <p
                className={`mb-2 text-xs font-light uppercase tracking-[0.3em] transition-all duration-700 ${
                  isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                {subtitle}
              </p>
            )}
            <h2
              className={`mb-4 text-3xl md:text-4xl lg:text-5xl font-light transition-all duration-700 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {title}
            </h2>
            {description && (
              <p
                className={`mb-6 text-sm md:text-base font-light opacity-90 transition-all duration-700 ${
                  isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                {description}
              </p>
            )}
            {ctaText && (
              <div
                className={`transition-all duration-700 ${
                  isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "800ms" }}
              >
                <Button
                  variant="ghost"
                  onClick={handleCtaClick}
                  className="border-white bg-transparent text-white hover:bg-white hover:text-black px-6 py-2 text-xs uppercase tracking-wider"
                >
                  {ctaText}
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Split layout (image and content side by side)
  return (
    <div
      id={`collection-${title.replace(/\s+/g, '-')}`}
      className={`grid md:grid-cols-2 ${className}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${getAspectRatio()}`}>
        <img
          src={image}
          alt={title}
          onLoad={() => setIsImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-1000 ${
            isImageLoaded && isInView && fadeIn
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        />
      </div>

      {/* Content */}
      <div className={getLayoutClasses()}>
        <div className="max-w-lg">
          {subtitle && (
            <p
              className={`mb-2 text-xs font-light uppercase tracking-[0.3em] text-gray-600 transition-all duration-700 ${
                isInView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {subtitle}
            </p>
          )}
          <h2
            className={`mb-4 text-3xl md:text-4xl font-light text-gray-900 transition-all duration-700 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`mb-6 text-gray-600 font-light transition-all duration-700 ${
                isInView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {description}
            </p>
          )}
          {ctaText && (
            <div
              className={`transition-all duration-700 ${
                isInView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <Button
                variant="ghost"
                onClick={handleCtaClick}
                className="border-black bg-transparent text-black hover:bg-black hover:text-white px-6 py-2 text-xs uppercase tracking-wider"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Minimal Collection Grid
interface CollectionGridItem {
  id: string;
  title: string;
  image: string;
  productCount?: number;
  link?: string;
}

interface MinimalCollectionGridProps {
  collections: CollectionGridItem[];
  columns?: 2 | 3 | 4;
  aspectRatio?: "square" | "landscape" | "portrait";
  onCollectionClick?: (id: string) => void;
  className?: string;
}

export const MinimalCollectionGrid = ({
  collections,
  columns = 3,
  aspectRatio = "square",
  onCollectionClick,
  className = "",
}: MinimalCollectionGridProps) => {
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

  const getAspectRatio = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "landscape":
        return "aspect-[16/9]";
      case "portrait":
        return "aspect-[3/4]";
      default:
        return "aspect-square";
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-0.5 ${className}`}>
      {collections.map((collection) => (
        <div
          key={collection.id}
          className={`group relative cursor-pointer overflow-hidden ${getAspectRatio()}`}
          onClick={() => onCollectionClick?.(collection.id)}
        >
          <img
            src={collection.image}
            alt={collection.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="text-center text-white">
              <h3 className="mb-1 text-lg font-light tracking-wider">
                {collection.title}
              </h3>
              {collection.productCount && (
                <p className="text-xs uppercase tracking-widest opacity-80">
                  {collection.productCount} Products
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
