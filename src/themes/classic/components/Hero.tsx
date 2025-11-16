import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ClassicHeroProps {
  slides: Array<{
    id: string;
    image: string;
    title: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  }>;
  height?: string;
  mobileHeight?: string;
  className?: string;
}

export const ClassicHero = ({
  slides,
  height = "400px",
  mobileHeight = "300px",
  className = "",
}: ClassicHeroProps) => {
  const { colors, layout } = useTheme();
  
  if (!slides || slides.length === 0) return null;
  
  const currentSlide = slides[0]; // Classic theme shows single hero

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center">
            <div className="max-w-2xl text-white">
              {currentSlide.subtitle && (
                <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider opacity-90">
                  {currentSlide.subtitle}
                </span>
              )}
              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {currentSlide.title}
              </h1>
              {currentSlide.description && (
                <p className="mb-6 text-lg opacity-90">
                  {currentSlide.description}
                </p>
              )}
              {currentSlide.ctaText && (
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
                      if (currentSlide.ctaLink) {
                        window.location.href = currentSlide.ctaLink;
                      }
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      {currentSlide.ctaText}
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
                    className="relative overflow-hidden group border-white text-white transition-all duration-300 hover:scale-105"
                    style={{
                      borderRadius: layout?.borderRadius.md,
                    }}
                  >
                    <span className="relative z-10">Learn More</span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};