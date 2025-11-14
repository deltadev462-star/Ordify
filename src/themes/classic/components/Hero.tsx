import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface ClassicHeroProps {
  slides: HeroSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  height?: string;
  mobileHeight?: string;
  className?: string;
}

export const ClassicHero = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 4000,
  height = "400px",
  mobileHeight = "300px",
  className = "",
}: ClassicHeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentSlide, autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl text-white">
                {slide.subtitle && (
                  <p className="mb-2 text-lg font-medium">
                    {slide.subtitle}
                  </p>
                )}
                <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                {slide.ctaText && (
                  <Button
                    size="lg"
                    onClick={() => {
                      if (slide.ctaLink) {
                        window.location.href = slide.ctaLink;
                      }
                    }}
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    {slide.ctaText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded bg-white/80 p-2 shadow hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-white/80 p-2 shadow hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-6 bg-white"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            div[style*="height"] {
              height: ${mobileHeight} !important;
            }
          }
        `
      }} />
    </div>
  );
};