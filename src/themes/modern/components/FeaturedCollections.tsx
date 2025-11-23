import { CategoryCard } from "@/themes/shared/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Collection {
  id: string;
  name: string;
  image: string;
  productCount?: number;
  description?: string;
}

interface ModernFeaturedCollectionsProps {
  collections: Collection[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  viewAllLink?: string;
  onCollectionClick?: (collectionId: string) => void;
  className?: string;
}

export const ModernFeaturedCollections = ({
  collections,
  title,
  subtitle,
  columns = 3,
  viewAllLink,
  onCollectionClick,
  className = "",
}: ModernFeaturedCollectionsProps) => {
  const { t } = useTranslation();
  
  // Use default values from translations if not provided
  const displayTitle = title || t("featuredCollections");
  const displaySubtitle = subtitle || t("discoverCuratedCollections");
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {displayTitle}
          </h2>
          {subtitle && (
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {displaySubtitle}
            </p>
          )}
        </div>

        {/* Collections Grid */}
        <div className={`grid gap-6 ${getGridColumns()}`}>
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden"
            >
              <CategoryCard
                {...collection}
                variant="overlay"
                onClick={onCollectionClick}
                className="h-full"
              />
              
              {/* Modern Hover Effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {viewAllLink && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              className="group"
              onClick={() => {
                window.location.href = viewAllLink;
              }}
            >
              {t("viewAllCollections")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

// Alternative layout with side-by-side large/small collections
interface ModernAsymmetricCollectionsProps {
  largeCollection: Collection;
  smallCollections: Collection[];
  title?: string;
  onCollectionClick?: (collectionId: string) => void;
  className?: string;
}

export const ModernAsymmetricCollections = ({
  largeCollection,
  smallCollections,
  title,
  onCollectionClick,
  className = "",
}: ModernAsymmetricCollectionsProps) => {
  const { t } = useTranslation();
  const displayTitle = title || t("shopByCategory");
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
            {displayTitle}
          </h2>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Large Featured Collection */}
          <div className="lg:row-span-2">
            <CategoryCard
              {...largeCollection}
              variant="overlay"
              onClick={onCollectionClick}
              className="h-full min-h-[600px]"
            />
          </div>

          {/* Small Collections */}
          <div className="grid gap-6">
            {smallCollections.slice(0, 2).map((collection) => (
              <CategoryCard
                key={collection.id}
                {...collection}
                variant="overlay"
                onClick={onCollectionClick}
                className="h-[290px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Scrollable collections for modern infinite scroll experience
interface ModernScrollableCollectionsProps {
  collections: Collection[];
  title?: string;
  autoScroll?: boolean;
  scrollSpeed?: number;
  onCollectionClick?: (collectionId: string) => void;
  className?: string;
}

export const ModernScrollableCollections = ({
  collections,
  title,
  autoScroll = false,
  scrollSpeed = 30,
  onCollectionClick,
  className = "",
}: ModernScrollableCollectionsProps) => {
  const { t } = useTranslation();
  const displayTitle = title || t("trendingCategories");
  return (
    <section className={`overflow-hidden py-16 ${className}`}>
      {title && (
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          {displayTitle}
        </h2>
      )}

      <div className="relative">
        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

        {/* Scrollable Container */}
        <div
          className={`flex gap-6 overflow-x-auto pb-4 scrollbar-hide ${
            autoScroll ? "animate-scroll" : ""
          }`}
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {/* Duplicate collections for infinite scroll effect */}
          {[...collections, ...collections].map((collection, index) => (
            <div
              key={`${collection.id}-${index}`}
              className="w-80 flex-shrink-0"
            >
              <CategoryCard
                {...collection}
                variant="minimal"
                onClick={onCollectionClick}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-100% - 1.5rem));
            }
          }
          .animate-scroll {
            animation: scroll ${scrollSpeed}s linear infinite;
          }
        `
      }} />
    </section>
  );
};
