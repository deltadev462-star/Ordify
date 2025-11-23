import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface LuxeHeroProps {
  backgroundType?: "image" | "video";
  backgroundSrc: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaSecondaryText?: string;
  onCtaClick?: () => void;
  onCtaSecondaryClick?: () => void;
  showScrollIndicator?: boolean;
  overlayOpacity?: number;
  className?: string;
}

export const LuxeHero = ({
  backgroundType = "image",
  backgroundSrc,
  title,
  subtitle,
  description,
  ctaText,
  ctaSecondaryText,
  onCtaClick,
  onCtaSecondaryClick,
  showScrollIndicator = true,
  overlayOpacity = 0.3,
  className = "",
}: LuxeHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMediaLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative h-screen overflow-hidden ${className}`}>
      {/* Background Media */}
      {backgroundType === "video" ? (
        <video
          src={backgroundSrc}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleMediaLoad}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <img
          src={backgroundSrc}
          alt="Hero background"
          onLoad={handleMediaLoad}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <div className="max-w-4xl">
          {subtitle && (
            <p
              className={`mb-6 font-serif text-lg italic tracking-widest text-primary transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {subtitle}
            </p>
          )}

          <h1
            className={`mb-6 font-heading text-5xl font-light leading-tight tracking-tight transition-all duration-1000 md:text-6xl lg:text-7xl ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              {description}
            </p>
          )}

          <div
            className={`flex flex-col gap-4 sm:flex-row sm:justify-center transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            {ctaText && (
              <Button
                onClick={onCtaClick}
                className="border-2 border-primary bg-primary px-8 py-6 text-sm font-light uppercase tracking-widest text-white hover:bg-transparent hover:text-primary"
              >
                {ctaText}
              </Button>
            )}
            {ctaSecondaryText && (
              <Button
                variant="outline"
                onClick={onCtaSecondaryClick}
                className="border-2 border-white bg-transparent px-8 py-6 text-sm font-light uppercase tracking-widest text-white hover:bg-white hover:text-black"
              >
                {ctaSecondaryText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "1200ms" }}
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-xs font-light uppercase tracking-widest">Scroll to Explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 border-l-2 border-t-2 border-primary/20" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 border-b-2 border-r-2 border-primary/20" />
    </div>
  );
};

// Split Screen Hero for Luxe Theme
interface LuxeSplitHeroProps {
  leftImage: string;
  rightImage: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const LuxeSplitHero = ({
  leftImage,
  rightImage,
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  className = "",
}: LuxeSplitHeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative flex h-screen ${className}`}>
      {/* Left Side */}
      <div className="relative w-1/2 overflow-hidden">
        <img
          src={leftImage}
          alt="Hero left"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50" />
      </div>

      {/* Right Side */}
      <div className="relative w-1/2 overflow-hidden">
        <img
          src={rightImage}
          alt="Hero right"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/50" />
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="z-10 max-w-3xl rounded-lg bg-white/95 p-12 text-center backdrop-blur-sm shadow-2xl">
          {subtitle && (
            <p
              className={`mb-4 font-serif text-sm italic tracking-widest text-primary transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {subtitle}
            </p>
          )}

          <h1
            className={`mb-6 font-heading text-4xl font-light tracking-wide text-gray-900 transition-all duration-1000 md:text-5xl ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {title}
          </h1>

          {description && (
            <p
              className={`mb-8 text-gray-600 transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              {description}
            </p>
          )}

          {ctaText && (
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <Button
                onClick={onCtaClick}
                className="bg-primary px-8 py-3 text-sm font-light uppercase tracking-widest text-white hover:bg-primary/90"
              >
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
