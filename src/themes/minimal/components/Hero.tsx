import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface MinimalHeroProps {
  image: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  overlay?: boolean;
  fullHeight?: boolean;
  centered?: boolean;
  fadeIn?: boolean;
  className?: string;
}

export const MinimalHero = ({
  image,
  title,
  subtitle,
  ctaText,
  ctaLink,
  overlay = false,
  fullHeight = true,
  centered = true,
  fadeIn = true,
  className = "",
}: MinimalHeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setIsLoaded(true);
  }, [image]);

  const handleCtaClick = () => {
    if (ctaLink) {
      window.location.href = ctaLink;
    }
  };

  return (
    <div 
      className={`relative overflow-hidden ${fullHeight ? 'h-screen' : 'h-[70vh]'} ${className}`}
    >
      {/* Background Image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded && fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={image}
          alt={title || "Hero image"}
          className="h-full w-full object-cover"
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/10" />
        )}
      </div>

      {/* Content */}
      {(title || subtitle || ctaText) && (
        <div 
          className={`relative h-full ${
            centered 
              ? 'flex items-center justify-center' 
              : 'flex items-end pb-24'
          }`}
        >
          <div 
            className={`px-6 ${
              centered ? 'text-center' : 'container mx-auto'
            }`}
          >
            {subtitle && (
              <p 
                className={`mb-4 text-xs font-light uppercase tracking-[0.3em] ${
                  overlay ? 'text-white/80' : 'text-gray-600'
                } transition-all duration-1000 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {subtitle}
              </p>
            )}
            {title && (
              <h1 
                className={`mb-8 font-light leading-tight ${
                  centered 
                    ? 'text-4xl md:text-5xl lg:text-6xl' 
                    : 'text-3xl md:text-4xl lg:text-5xl'
                } ${
                  overlay ? 'text-white' : 'text-gray-900'
                } transition-all duration-1000 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                {title}
              </h1>
            )}
            {ctaText && (
              <div 
                className={`transition-all duration-1000 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: '700ms' }}
              >
                <Button
                  variant="outline"
                  onClick={handleCtaClick}
                  className={`border-${overlay ? 'white' : 'black'} bg-transparent ${
                    overlay 
                      ? 'text-white hover:bg-white hover:text-black' 
                      : 'text-black hover:bg-black hover:text-white'
                  } px-8 py-2 text-xs uppercase tracking-wider transition-all duration-300`}
                >
                  {ctaText}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      {fullHeight && (
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex flex-col items-center">
            <span className={`mb-2 text-xs uppercase tracking-wider ${
              overlay ? 'text-white/60' : 'text-gray-600'
            }`}>
              Scroll
            </span>
            <div className={`h-12 w-px ${
              overlay ? 'bg-white/30' : 'bg-gray-300'
            } animate-pulse`} />
          </div>
        </div>
      )}
    </div>
  );
};
