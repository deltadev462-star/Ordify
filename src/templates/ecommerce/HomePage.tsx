import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { getThemeComponents } from "@/themes";
interface HomePageProps {
  heroData?: {
    slides?: Array<{
      id: string;
      image: string;
      title: string;
      subtitle?: string;
      description?: string;
      ctaText?: string;
      ctaLink?: string;
    }>;
    backgroundSrc?: string;
    title?: string;
    subtitle?: string;
  };
  featuredProducts?: Array<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category?: string;
    rating?: number;
    inStock?: boolean;
  }>;
  collections?: Array<{
    id: string;
    name: string;
    image: string;
    productCount?: number;
    description?: string;
  }>;
  brandStory?: {
    title: string;
    subtitle?: string;
    story: string;
    image?: string;
    stats?: Array<{
      label: string;
      value: string;
    }>;
  };
  showNewsletter?: boolean;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  heroData,
  featuredProducts = [],
  collections = [],
  brandStory,
  showNewsletter = true,
  onAddToCart,
  onQuickView,
  onWishlist,
}) => {
  const { currentTheme, components: sharedComponents, variant } = useTheme();
  // Get theme-specific components
  const themeComponents = getThemeComponents(currentTheme);
  if (!themeComponents) return null;

  // Get hero component based on current theme
  const getHeroComponent = () => {
    switch (currentTheme) {
      case "modern": {
        const ModernHero = themeComponents.ModernHero;
        return heroData?.slides && ModernHero ? (
          <ModernHero slides={heroData.slides} />
        ) : null;
      }

      case "classic": {
        const ClassicHero = themeComponents.ClassicHero;
        return heroData?.slides && ClassicHero ? (
          <ClassicHero slides={heroData.slides} />
        ) : null;
      }

      case "minimal": {
        const MinimalHero = themeComponents.MinimalHero;
        return heroData?.backgroundSrc && MinimalHero ? (
          <MinimalHero
            image={heroData.backgroundSrc}
            title={heroData.title || ""}
            subtitle={heroData.subtitle}
          />
        ) : null;
      }

      case "luxe": {
        const LuxeHero = themeComponents.LuxeHero;
        return heroData?.backgroundSrc && LuxeHero ? (
          <LuxeHero
            backgroundType="image"
            backgroundSrc={heroData.backgroundSrc}
            title={heroData.title || ""}
            subtitle={heroData.subtitle}
          />
        ) : null;
      }

      default:
        return null;
    }
  };

  const getProductsComponent = () => {
    if (featuredProducts.length === 0) return null;

    switch (currentTheme) {
      case "modern": {
        const ModernProductGrid = themeComponents.ModernProductGrid;
        return ModernProductGrid ? (
          <ModernProductGrid
            products={featuredProducts}
            title={"Featured Products"}
            description={"Discover Handpicked"}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onWishlist={onWishlist}
          />
        ) : null;
      }

      case "classic": {
        const ClassicProductGrid = themeComponents.ClassicProductGrid;
        return ClassicProductGrid ? (
          <ClassicProductGrid
            products={featuredProducts}
            title={"Featured Products"}
            showBreadcrumbs={false}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onWishlist={onWishlist}
          />
        ) : null;
      }

      case "minimal": {
        const MinimalProductShowcase = themeComponents.MinimalProductShowcase;
        return MinimalProductShowcase ? (
          <MinimalProductShowcase
            products={featuredProducts}
            title={"Featured Products"}
            subtitle={"Curated Selection"}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onWishlist={onWishlist}
          />
        ) : null;
      }

      case "luxe": {
        const LuxeProductCarousel = themeComponents.LuxeProductCarousel;
        return LuxeProductCarousel ? (
          <LuxeProductCarousel
            products={featuredProducts}
            title={"Exclusive Collection"}
            subtitle={"Handcrafted Excellence"}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            onWishlist={onWishlist}
          />
        ) : null;
      }

      default:
        return null;
    }
  };

  const getCollectionsComponent = () => {
    if (collections.length === 0) return null;

    switch (currentTheme) {
      case "modern": {
        const ModernFeaturedCollections =
          themeComponents.ModernFeaturedCollections;
        return ModernFeaturedCollections ? (
          <ModernFeaturedCollections
            collections={collections}
            title={"Shop By Collection"}
            subtitle={"Explore Collections"}
          />
        ) : null;
      }

      case "classic": {
        // Classic theme uses shared CategoryCard
        const CategoryCard = sharedComponents.CategoryCard;
        return (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-2xl font-bold">
                {"Shop By Category"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                  <CategoryCard
                    key={collection.id}
                    {...collection}
                    variant="default"
                  />
                ))}
              </div>
            </div>
          </section>
        );
      }

      case "minimal": {
        const MinimalCollectionGrid = themeComponents.MinimalCollectionGrid;
        return MinimalCollectionGrid ? (
          <MinimalCollectionGrid collections={collections} columns={3} />
        ) : null;
      }

      case "luxe": {
        // For luxe theme, use modern's asymmetric collections if available
        const ModernAsymmetricCollections =
          getThemeComponents("modern")?.ModernAsymmetricCollections;
        if (ModernAsymmetricCollections && collections.length > 0) {
          return (
            <ModernAsymmetricCollections
              largeCollection={collections[0]}
              smallCollections={collections.slice(1, 3)}
              title={"Explore Our Collections"}
            />
          );
        }
        return null;
      }

      default:
        return null;
    }
  };

  const getBrandStoryComponent = () => {
    if (!brandStory || currentTheme !== "luxe") return null;

    const LuxeBrandStory = themeComponents.LuxeBrandStory;
    return LuxeBrandStory ? <LuxeBrandStory {...brandStory} /> : null;
  };

  const getNewsletterComponent = () => {
    if (!showNewsletter) return null;

    const Newsletter = sharedComponents.Newsletter;

    // Only show in footer for classic theme
    if (currentTheme === "classic") return null;

    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Newsletter variant={variant} />
        </div>
      </section>
    );
  };

  return (
    <div className={`theme-${currentTheme} home-page`}>
      {/* Hero Section */}
      {getHeroComponent()}

      {/* Featured Products */}
      {getProductsComponent()}

      {/* Collections */}
      {getCollectionsComponent()}

      {/* Brand Story (Luxe theme only) */}
      {getBrandStoryComponent()}

      {/* Newsletter */}
      {getNewsletterComponent()}
    </div>
  );
};

export default HomePage;

