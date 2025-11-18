import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  textPosition?: "left" | "center" | "right";
  textColor?: "light" | "dark";
}

interface ModernHeroProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  height?: string;
  className?: string;
}

export const ModernHero = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  height = "600px",
  className = "",
}: ModernHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { colors, layout } = useTheme();

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      handleNextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentSlide, autoPlay, autoPlayInterval, slides.length]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getTextAlignment = (position?: string) => {
    switch (position) {
      case "left":
        return "items-start text-left";
      case "right":
        return "items-end text-right";
      default:
        return "items-center text-center";
    }
  };

  const getTextColor = (color?: string) => {
    return color === "dark" ? "text-gray-900" : "text-white";
  };

  if (slides.length === 0) return null;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ height, minHeight: "100vh" }}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full">
              <div className="container mx-auto h-full px-4">
                <div
                  className={`flex h-full flex-col justify-center ${getTextAlignment(
                    slide.textPosition
                  )} ${getTextColor(slide.textColor)}`}
                >
                  {slide.subtitle && (
                    <span className="mb-2 text-sm font-medium uppercase tracking-wider opacity-90">
                      {slide.subtitle}
                    </span>
                  )}
                  <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  {slide.description && (
                    <p className="mb-8 max-w-2xl text-lg opacity-90 md:text-xl">
                      {slide.description}
                    </p>
                  )}
                  {slide.ctaText && (
                    <div className="flex gap-4">
                      <Button
                        size="lg"
                        className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{
                          background: colors ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` : undefined,
                          color: colors?.background,
                          borderRadius: layout?.borderRadius.md,
                          boxShadow: colors ? `0 4px 15px ${colors.primary}40` : undefined,
                          border: 'none'
                        }}
                        onClick={() => {
                          if (slide.ctaLink) {
                            window.location.href = slide.ctaLink;
                          }
                        }}
                      >
                        <span className="relative z-10 flex items-center">
                          {slide.ctaText}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: colors ? `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` : undefined
                          }}
                        />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className={`relative overflow-hidden group transition-all duration-300 hover:scale-105 ${
                          slide.textColor === "dark"
                            ? "border-gray-900 text-gray-900"
                            : "border-white text-white"
                        }`}
                        style={{
                          borderRadius: layout?.borderRadius.md,
                        }}
                      >
                        <span className="relative z-10">Shop Now</span>
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: slide.textColor === "dark" 
                              ? colors ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` : undefined
                              : 'rgba(255, 255, 255, 0.2)'
                          }}
                        />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110 md:left-8"
            style={{
              background: colors ? `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` : 'rgba(255, 255, 255, 0.1)',
              border: `1px solid ${colors?.primary}40`
            }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 backdrop-blur-sm transition-all hover:scale-110 md:right-8"
            style={{
              background: colors ? `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)` : 'rgba(255, 255, 255, 0.1)',
              border: `1px solid ${colors?.primary}40`
            }}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 transition-all ${
                index === currentSlide
                  ? "w-8"
                  : "w-2 hover:scale-125"
              } rounded-full`}
              style={{
                background: index === currentSlide 
                  ? colors ? `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` : 'white'
                  : 'rgba(255, 255, 255, 0.5)'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};