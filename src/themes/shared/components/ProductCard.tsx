import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onWishlist?: (id: string) => void;
  variant?: "default" | "minimal" | "modern" | "luxe";
  className?: string;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating,
  inStock = true,
  onAddToCart,
  onQuickView,
  onWishlist,
  variant = "default",
  className = "",
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.(id);
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 ${
        isHovered ? "shadow-lg" : "shadow-sm"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-2">
          {discount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
          {!inStock && (
            <span className="rounded-full bg-gray-800 px-2 py-1 text-xs font-semibold text-white">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-all hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Quick Actions - Show on Hover */}
        {variant !== "minimal" && (
          <div
            className={`absolute inset-x-0 bottom-0 flex gap-2 p-2 transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => onQuickView?.(id)}
            >
              <Eye className="mr-1 h-4 w-4" />
              Quick View
            </Button>
            {inStock && (
              <Button
                size="sm"
                className="flex-1"
                onClick={() => onAddToCart?.(id)}
              >
                <ShoppingCart className="mr-1 h-4 w-4" />
                Add to Cart
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <CardContent className="p-4">
        {category && (
          <p className="mb-1 text-xs text-gray-500 uppercase tracking-wide">
            {category}
          </p>
        )}
        <h3 className="mb-2 font-semibold text-gray-900 line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        {rating && (
          <div className="mb-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">({rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      {/* Mobile Add to Cart (for minimal variant) */}
      {variant === "minimal" && inStock && (
        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full"
            onClick={() => onAddToCart?.(id)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};