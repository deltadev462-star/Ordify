import { useState } from "react";
import { ProductCard } from "@/themes/shared/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
}

interface ModernProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
  showFilters?: boolean;
  showSorting?: boolean;
  showGridControls?: boolean;
  defaultColumns?: number;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  className?: string;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
];

const mockCategories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Beauty",
];

export const ModernProductGrid = ({
  products,
  title,
  description,
  showFilters = true,
  showSorting = true,
  showGridControls = true,
  defaultColumns = 4,
  onAddToCart,
  onQuickView,
  onWishlist,
  className = "",
}: ModernProductGridProps) => {
  const [columns, setColumns] = useState(defaultColumns);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (showInStockOnly && !product.inStock) return false;
    if (selectedCategories.length > 0 && product.category && !selectedCategories.includes(product.category)) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        // Assuming products have an index that represents newness
        return products.indexOf(b) - products.indexOf(a);
      default:
        return 0;
    }
  });

  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 font-semibold">Categories</h3>
        <div className="space-y-2">
          {mockCategories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category));
                  }
                }}
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-semibold">Price Range</h3>
        <div className="space-y-3">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <label className="flex items-center space-x-2">
          <Checkbox
            checked={showInStockOnly}
            onCheckedChange={(checked: boolean) => setShowInStockOnly(checked)}
          />
          <span className="text-sm">Show In Stock Only</span>
        </label>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 1000]);
          setShowInStockOnly(false);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className={`py-8 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && <h2 className="mb-2 text-3xl font-bold">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {showFilters && (
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          )}
          <p className="text-sm text-gray-600">
            {sortedProducts.length} products found
          </p>
        </div>

        <div className="flex items-center gap-4">
          {showSorting && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {showGridControls && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setColumns(2)}
                className={`rounded p-1.5 transition-colors ${
                  columns === 2
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="2 columns"
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setColumns(3)}
                className={`rounded p-1.5 transition-colors ${
                  columns === 3
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="3 columns"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`rounded p-1.5 transition-colors ${
                  columns === 4
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="4 columns"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Desktop Filters */}
        {showFilters && (
          <aside className="hidden w-64 lg:block">
            <FilterSidebar />
          </aside>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className={`grid gap-6 ${getGridColumns()}`}>
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  variant="modern"
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                  onWishlist={onWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-gray-600">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 1000]);
                  setShowInStockOnly(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {sortedProducts.length > 0 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};