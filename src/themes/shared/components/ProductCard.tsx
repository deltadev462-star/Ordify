import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Heart,
  Eye,
  Star,
  TruckIcon,
  ShieldCheck,
  Package,
  Clock,
  CheckCircle2,
  Zap
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
  description?: string;
  features?: string[];
  freeShipping?: boolean;
  fastDelivery?: boolean;
  warranty?: string;
  reviewCount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onWishlist?: (item: { id: string; name: string; price: number; image: string; variant?: string }) => void;
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
  description,
  features = [],
  freeShipping = false,
  fastDelivery = false,
  warranty,
  reviewCount = 0,
  isNew = false,
  isBestseller = false,
  onAddToCart,
  onQuickView,
  onWishlist,
  variant = "default",
  className = "",
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { t } = useTranslation();

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onWishlist?.({
      id,
      name,
      price,
      image,
      variant: features?.[0] // Use first feature as variant if available
    });
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card
      className={`group pt-0 relative overflow-hidden transition-all duration-300 hover:shadow-xl border border-[#d6d6d6] dark:border-[#424242] dark:bg-gray-900 dark:text-white ${
        isHovered ? "shadow-2xl " : "shadow-md"
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-101  cursor-pointer"
        />

        {/* Professional Gradient Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
              <Zap className="h-3 w-3 mr-1" />
              {discount}% OFF
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
              NEW
            </Badge>
          )}
          {isBestseller && (
            <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 shadow-lg">
              <Star className="h-3 w-3 mr-1 fill-current" />
              BESTSELLER
            </Badge>
          )}
          {!inStock && (
            <Badge className="bg-gray-800 text-white border-0 shadow-lg">
              {t("outOfStock")}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute right-2 top-2 z-10 rounded-full p-2.5 shadow-lg transition-all hover:scale-125 ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white"
          }`}
          aria-label={t("addToWishlist")}
        >
          <Heart
            className={`h-4 w-4 transition-all ${
              isWishlisted ? "fill-current scale-110" : ""
            }`}
          />
        </button>

        {/* Quick Actions - Show on Hover with Professional Animation */}
        {variant !== "minimal" && (
          <div
            className={`absolute inset-x-0 bottom-0 flex gap-2 p-3 transition-all duration-300 ease-out
               ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }
              `}
          >
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 backdrop-blur-md bg-white/70 hover:bg-white text-gray-800 shadow-lg border-0 font-medium"
              onClick={() => onQuickView?.(id)}
            >
              <Eye className="mr-1.5 h-4 w-4" />
              {t("quickView")}
            </Button>
            {inStock && (
              <Button
                size="sm"
                className="flex-1 backdrop-blur-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg border-0 font-medium"
                onClick={() => onAddToCart?.(id)}
              >
                <ShoppingCart className="mr-1.5 h-4 w-4" />
                {t("addToCart")}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <CardContent className="p-4 space-y-3">
        {category && (
          <p className="text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold">
            {category}
          </p>
        )}
        <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
          {name}
        </h3>

        {/* Rating with Review Count */}
        {rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : i < rating
                        ? "fill-yellow-400/50 text-yellow-400"
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {rating.toFixed(1)}
            </span>
            {reviewCount > 0 && (
              <span className="text-xs text-gray-500 dark:text-gray-500">
                ({reviewCount} {t("reviews")})
              </span>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}

        {/* Features Icons */}
        <div className="flex flex-wrap gap-3">
          {freeShipping && (
            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <TruckIcon className="h-3.5 w-3.5" />
              <span className="font-medium">{t("freeShipping")}</span>
            </div>
          )}
          {fastDelivery && (
            <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
              <Clock className="h-3.5 w-3.5" />
              <span className="font-medium">{t("fastDelivery")}</span>
            </div>
          )}
          {warranty && (
            <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="font-medium">{warranty}</span>
            </div>
          )}
        </div>

        {/* Price Section */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-end justify-between">
            <div>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${price.toFixed(2)}
                </span>
                {discount > 0 && (
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {t("save")} ${(originalPrice! - price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            {inStock && (
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="font-medium">{t("inStock")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Feature Tags */}
        {features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {features.slice(0, 3).map((feature, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                {feature}
              </Badge>
            ))}
            {features.length > 3 && (
              <Badge
                variant="secondary"
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                +{features.length - 3} {t("more")}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {/* Mobile Add to Cart (for minimal variant) */}
      {variant === "minimal" && (
        <CardFooter className="p-4 pt-0 space-y-2">
          {inStock ? (
            <>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg font-semibold"
                onClick={() => onAddToCart?.(id)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("addToCart")}
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700"
                onClick={() => onQuickView?.(id)}
              >
                <Eye className="mr-2 h-4 w-4" />
                {t("quickView")}
              </Button>
            </>
          ) : (
            <Button
              className="w-full"
              disabled
            >
              <Package className="mr-2 h-4 w-4" />
              {t("outOfStock")}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};