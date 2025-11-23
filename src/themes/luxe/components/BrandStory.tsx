import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface BrandStoryProps {
  title: string;
  subtitle?: string;
  story: string;
  image?: string;
  videoUrl?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export const LuxeBrandStory = ({
  title,
  subtitle,
  story,
  image,
  videoUrl,
  stats,
  ctaText,
  ctaLink,
  className = "",
}: BrandStoryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("brand-story");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="brand-story" className={`py-24 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          {subtitle && (
            <p
              className={`mb-4 font-serif text-sm italic tracking-widest text-primary transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {subtitle}
            </p>
          )}
          <h2
            className={`font-heading text-4xl lg:text-5xl font-light tracking-wide text-gray-900 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {title}
          </h2>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Media */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {videoUrl && !showVideo ? (
              <div className="relative group cursor-pointer" onClick={() => setShowVideo(true)}>
                <img
                  src={image || "https://via.placeholder.com/600x400"}
                  alt="Brand story"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-gray-900 ml-1" />
                  </div>
                </div>
              </div>
            ) : videoUrl && showVideo ? (
              <div className="relative aspect-video">
                <iframe
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={image || "https://via.placeholder.com/600x400"}
                alt="Brand story"
                className="w-full h-auto"
              />
            )}
          </div>

          {/* Story */}
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p className="text-gray-600 leading-relaxed mb-8 font-light">
              {story}
            </p>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`text-center transition-all duration-1000 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="font-heading text-3xl font-light text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {ctaText && (
              <div
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "1000ms" }}
              >
                <Button
                  onClick={() => ctaLink && (window.location.href = ctaLink)}
                  className="bg-primary px-8 py-3 text-sm font-light uppercase tracking-widest text-white hover:bg-primary/90"
                >
                  {ctaText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Heritage Timeline Component
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface LuxeHeritageTimelineProps {
  title: string;
  subtitle?: string;
  events: TimelineEvent[];
  className?: string;
}

export const LuxeHeritageTimeline = ({
  title,
  subtitle,
  events,
  className = "",
}: LuxeHeritageTimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
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

    const element = document.getElementById("heritage-timeline");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="heritage-timeline" className={`py-24 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          {subtitle && (
            <p className="mb-4 font-serif text-sm italic tracking-widest text-primary">
              {subtitle}
            </p>
          )}
          <h2 className="font-heading text-4xl lg:text-5xl font-light tracking-wide text-gray-900">
            {title}
          </h2>
        </div>

        {/* Timeline Navigation */}
        <div
          className={`flex justify-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex space-x-8 overflow-x-auto pb-2">
            {events.map((event, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`text-lg font-light whitespace-nowrap transition-all ${
                  activeIndex === index
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {event.year}
              </button>
            ))}
          </div>
        </div>

        {/* Active Event */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {events[activeIndex].image && (
              <img
                src={events[activeIndex].image}
                alt={events[activeIndex].title}
                className="w-full h-auto"
              />
            )}
          </div>

          {/* Content */}
          <div>
            <h3
              className={`font-heading text-3xl font-light mb-4 text-gray-900 transition-all duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {events[activeIndex].title}
            </h3>
            <p
              className={`text-gray-600 leading-relaxed font-light transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {events[activeIndex].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Craftsmanship Showcase
interface CraftsmanshipProps {
  title: string;
  subtitle?: string;
  features: {
    icon?: React.ReactNode;
    title: string;
    description: string;
  }[];
  image?: string;
  className?: string;
}

export const LuxeCraftsmanship = ({
  title,
  subtitle,
  features,
  image,
  className = "",
}: CraftsmanshipProps) => {
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

    const element = document.getElementById("craftsmanship");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="craftsmanship" className={`py-24 bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          {subtitle && (
            <p className="mb-4 font-serif text-sm italic tracking-widest text-primary">
              {subtitle}
            </p>
          )}
          <h2 className="font-heading text-4xl lg:text-5xl font-light tracking-wide">
            {title}
          </h2>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features */}
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  {feature.icon && (
                    <div className="text-primary">{feature.icon}</div>
                  )}
                  <div>
                    <h3 className="font-heading text-xl font-light mb-2 text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          {image && (
            <div
              className={`transition-all duration-1000 delay-600 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <img
                src={image}
                alt="Craftsmanship"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
