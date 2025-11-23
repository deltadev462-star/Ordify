import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

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
  className?: string;
}

export const ClassicHero = ({
  slides,
  height = "400px",
  className = "",
}: ClassicHeroProps) => {
  const { colors, layout } = useTheme();
  const { t } = useTranslation();
  
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
        {/* Slightly darker overlay in dark mode for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 dark:from-black/80 dark:to-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full">
        <div className="container mx-auto h-full px-4">
          <div className="flex h-full items-center">
            <div className="max-w-2xl text-white">
              {currentSlide.subtitle && (
                <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-gray-100">
                  {currentSlide.subtitle}
                </span>
              )}
              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl text-white">
                {currentSlide.title}
              </h1>
              {currentSlide.description && (
                <p className="mb-6 text-lg text-gray-100">
                  {currentSlide.description}
                </p>
              )}
              {currentSlide.ctaText && (
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl bg-[#34495e] dark:bg-[#8b7355]"
                    style={{
                      background: colors ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` : undefined,
                      color: 'white',
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
                    className="relative overflow-hidden group border-white text-white hover:bg-white hover:text-gray-900 dark:hover:text-[#1a1a1a] transition-all duration-300 hover:scale-105"
                    style={{
                      borderRadius: layout?.borderRadius.md,
                    }}
                  >
                    <span className="relative z-10">{t("Learn More")}</span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        background: 'white'
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
