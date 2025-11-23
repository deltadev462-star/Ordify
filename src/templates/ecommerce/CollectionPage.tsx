import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { ProductCard } from "@/themes/shared/components/ProductCard";

interface CollectionPageProps {
  collection: {
    id: string;
    name: string;
    description?: string;
    image?: string;
    productCount: number;
  };
  products: Array<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category?: string;
    rating?: number;
    inStock?: boolean;
  }>;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWishlist?: (item: {
    id: string;
    name: string;
    price: number;
    image: string;
    variant?: string;
  }) => void;
}

const CollectionPage: React.FC<CollectionPageProps> = ({
  collection,
  products,
  onAddToCart,
  onQuickView,
  onWishlist,
}) => {
  const { currentTheme, variant } = useTheme();

  return (
    <div className={`theme-${currentTheme} collection-page`}>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-primary">
            Home
          </a>
          <span>/</span>
          <a href="/collections" className="hover:text-primary">
            Collections
          </a>
          <span>/</span>
          <span className="text-gray-900">{collection.name}</span>
        </nav>
      </div>

      {/* Collection Header */}
      <div className="container mx-auto px-4 py-8">
        {collection.image && (
          <div className="mb-8 aspect-[3/1] overflow-hidden rounded-lg">
            <img
              src={collection.image}
              alt={collection.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
              {collection.description}
            </p>
          )}
          <p className="text-sm text-gray-500">
            {collection.productCount} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              variant={variant}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;

