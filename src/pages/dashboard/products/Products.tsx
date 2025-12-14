import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import Empty from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { SquarePlay, Plus } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Pagination, PaginationInfo } from "@/components/ui/pagination";
import { fetchProducts } from "@/store/slices/product/actions";
import { setProductFilters, productSelectors } from "@/store/slices/product/productSlice";
import { Skeleton } from "@/components/ui/skeleton";

function Products() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // Redux selectors
  const products = useAppSelector(productSelectors.selectAllProducts);
  const loading = useAppSelector(productSelectors.selectProductLoading);
  const filters = useAppSelector(productSelectors.selectProductFilters);
  const productCounts = useAppSelector(productSelectors.selectProductCountsByStatus);
  const pagination = useAppSelector(productSelectors.selectProductPagination);

  useSEO({
    title: "Products - Ordify Dashboard",
    description:
      "Manage your products in Ordify. Add, edit, and organize products to increase purchase rates and conversions.",
    ogTitle: "Products Management - Ordify",
    ogDescription:
      "Advanced product management tools for e-commerce businesses.",
  });

  // Fetch products on mount and when filters change
  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleFiltersChange = (newFilters: any) => {
    dispatch(setProductFilters(newFilters));
  };

  const handlePageChange = (page: number) => {
    dispatch(setProductFilters({ page }));
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderProductSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex bg-card rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <Title
            title={t('products.title')}
            Subtitle={t('products.pageSubtitle')}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate("/dashboard/product/create")}
              className="bg-primary hover:bg-primary/90 rounded-xl"
            >
              <Plus size={16} className="mr-2" />
              {t('products.createProduct', 'Create Product')}
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-xl"
                size="sm"
              >
                {t('products.howToCreateSimple')} <SquarePlay size={16} className="ml-1" />
              </Button>
              <Button
                variant="outline"
                className="rounded-xl"
                size="sm"
              >
                {t('products.howToCreateVariations')} <SquarePlay size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <ProductFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          productCounts={productCounts}
        />

        {/* Products Grid */}
        {loading ? (
          renderProductSkeleton()
        ) : products.length === 0 ? (
          <Empty
            Name={t('products.title').toLowerCase()}
            onCreate={() => navigate("/dashboard/product/create")}
          />
        ) : (
          <>
            {/* Product Info */}
            <PaginationInfo
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              itemsPerPage={pagination.productsPerPage}
              totalItems={pagination.totalProducts}
              className="mb-4"
            />
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onView={(product) => navigate(`/dashboard/products/${product.id}`)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Products;
