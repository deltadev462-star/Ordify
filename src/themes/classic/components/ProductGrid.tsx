import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductCard } from "@/themes/shared/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Grid2X2,
  List
} from "lucide-react";

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

interface ClassicProductGridProps {
  products: Product[];
  title?: string;
  showBreadcrumbs?: boolean;
  showViewOptions?: boolean;
  showSorting?: boolean;
  showResultsCount?: boolean;
  defaultView?: "grid" | "list";
  gridColumns?: 2 | 3 | 4;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onWishlist?: (item: { id: string; name: string; price: number; image: string; variant?: string }) => void;
  className?: string;
}

export const ClassicProductGrid = ({
  products,
  title,
  showBreadcrumbs = true,
  showViewOptions = true,
  showSorting = true,
  showResultsCount = true,
  defaultView = "grid",
  gridColumns = 3,
  onAddToCart,
  onQuickView,
  onWishlist,
  className = "",
}: ClassicProductGridProps) => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState(defaultView);
  const [sortBy, setSortBy] = useState("position");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const sortOptions = [
    { value: "position", label: t("Position") },
    { value: "name-asc", label: t("Product Name: A to Z") },
    { value: "name-desc", label: t("Product Name: Z to A") },
    { value: "price-asc", label: t("Price: Low to High") },
    { value: "price-desc", label: t("Price: High to Low") },
  ];

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getGridColumns = () => {
    switch (gridColumns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={`${className}  `}>
      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <nav className="mb-4 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <a href="/" className="hover:text-gray-900 dark:hover:text-gray-100">{t("Home")}</a>
          <ChevronRight className="h-4 w-4" />
          <a href="/shop" className="hover:text-gray-900 dark:hover:text-gray-100">{t("Shop")}</a>
          {title && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 dark:text-gray-100">{title}</span>
            </>
          )}
        </nav>
      )}

      {/* Title */}
      {title && (
        <h1 className="mb-6 text-2xl font-serif text-gray-900 dark:text-gray-100">{title}</h1>
      )}

      {/* Toolbar */}
      <div className="mb-6 rounded border border-[#e0e0e0] dark:border-[#3a3a3a] bg-gray-50 dark:bg-[#2e2e2e] p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Results Count */}
          {showResultsCount && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("Showing ... results", {
                start: (currentPage - 1) * itemsPerPage + 1,
                end: Math.min(currentPage * itemsPerPage, sortedProducts.length),
                total: sortedProducts.length
              })}
            </p>
          )}

          <div className="flex items-center gap-4">
            {/* View Options */}
            {showViewOptions && (
              <div className="flex items-center gap-1 rounded border border-[#e0e0e0] dark:border-[#3a3a3a] bg-white dark:bg-[#242424]">
                <button
                  onClick={() => setCurrentView("grid")}
                  className={`p-2 ${
                    currentView === "grid"
                      ? "bg-[#34495e] dark:bg-[#8b7355] text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2e2e2e]"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentView("list")}
                  className={`p-2 ${
                    currentView === "list"
                      ? "bg-[#34495e] dark:bg-[#8b7355] text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2e2e2e]"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Sorting */}
            {showSorting && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t("Sort by:")}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded border border-[#e0e0e0] dark:border-[#3a3a3a] bg-white dark:bg-[#242424] dark:text-gray-100 px-3 py-1.5 text-sm focus:border-[#34495e] dark:focus:border-[#8b7355] focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {currentView === "grid" ? (
        <div className={`grid gap-6 ${getGridColumns()}`}>
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              variant="default"
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onWishlist={onWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-lg border border-[#e0e0e0] dark:border-[#3a3a3a] bg-white dark:bg-[#242424] p-4 hover:shadow-md dark:hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-32 w-32 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
                {product.category && (
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                )}
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onAddToCart?.(product.id)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? t("Add to Cart") : t("Out of Stock")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onQuickView?.(product.id)}
                  >
                    {t("Quick View")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-1">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {t("Previous")}
            </Button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const isCurrentPage = page === currentPage;
              const showPage = 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 2;

              if (!showPage && page === currentPage - 3) {
                return <span key={page} className="px-2 text-gray-500 dark:text-gray-400">...</span>;
              }

              if (!showPage && page === currentPage + 3) {
                return <span key={page} className="px-2 text-gray-500 dark:text-gray-400">...</span>;
              }

              if (!showPage) return null;

              return (
                <Button
                  key={page}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              );
            })}

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {t("Next")}
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
};
