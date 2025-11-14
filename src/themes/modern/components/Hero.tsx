import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

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
  mobileHeight?: string;
  className?: string;
}

export const ModernHero = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  height = "600px",
  mobileHeight = "400px",
  className = "",
}: ModernHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const currentSlideData = slides[currentSlide];

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
                        className="group"
                        onClick={() => {
                          if (slide.ctaLink) {
                            window.location.href = slide.ctaLink;
                          }
                        }}
                      >
                        {slide.ctaText}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className={`${
                          slide.textColor === "dark"
                            ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                            : "border-white text-white hover:bg-white hover:text-gray-900"
                        }`}
                      >
                        Shop Now
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
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 md:left-8"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 backdrop-blur-sm transition-all hover:bg-white/20 md:right-8"
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
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};