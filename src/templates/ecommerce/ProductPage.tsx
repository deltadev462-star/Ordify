import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { ProductCard } from "@/themes/shared/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Share2, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";

interface ProductPageProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
    description: string;
    features?: string[];
    specifications?: Record<string, string>;
    category: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    variants?: {
      sizes?: string[];
      colors?: string[];
    };
  };
  relatedProducts?: Array<{
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category?: string;
    rating?: number;
    inStock?: boolean;
  }>;
  onAddToCart?: (productId: string, quantity: number, variant?: any) => void;
  onWishlist?: (productId: string) => void;
  onShare?: (productId: string) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({
  product,
  relatedProducts = [],
  onAddToCart,
  onWishlist,
  onShare,
}) => {
  const { currentTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleAddToCart = () => {
    onAddToCart?.(product.id, quantity, {
      size: selectedSize,
      color: selectedColor,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`theme-${currentTheme} product-page`}>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" className="hover:text-primary">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-primary">Shop</a>
          <span>/</span>
          <a href={`/category/${product.category}`} className="hover:text-primary">
            {product.category}
          </a>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 overflow-hidden rounded-lg ${
                      selectedImage === index ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-20 w-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-2 text-gray-600">{product.category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge variant="destructive">-{discount}%</Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600">{product.description}</p>

            {/* Variants */}
            {product.variants?.sizes && (
              <div>
                <h3 className="mb-3 font-semibold">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`rounded border px-4 py-2 text-sm ${
                        selectedSize === size
                          ? "border-primary bg-primary text-white"
                          : "border-gray-300 hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.variants?.colors && (
              <div>
                <h3 className="mb-3 font-semibold">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="mb-3 font-semibold">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {product.inStock ? (
                  <span className="text-sm text-green-600">In Stock</span>
                ) : (
                  <span className="text-sm text-red-600">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={() => onWishlist?.(product.id)}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => onShare?.(product.id)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="mb-3 font-semibold">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h3 className="mb-3 font-semibold">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                {...relatedProduct}
                variant={currentTheme as any}
                onAddToCart={(id) => onAddToCart?.(id, 1)}
                onWishlist={onWishlist}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;