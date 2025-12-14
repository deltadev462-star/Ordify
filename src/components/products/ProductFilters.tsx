import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { ProductFilters } from "@/types/product.types";
import { Filter, X, Search } from "lucide-react";

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
  productCounts?: {
    total: number;
    draft: number;
    published: number;
    archived: number;
    active: number;
    featured: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}

export function ProductFilters({ filters, onFiltersChange, productCounts }: ProductFiltersProps) {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState<Partial<ProductFilters>>(filters);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0,
    filters.maxPrice || 1000
  ]);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange({
      ...localFilters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    });
  };

  const resetFilters = () => {
    const defaultFilters: Partial<ProductFilters> = {
      search: '',
      status: 'all',
      isActive: 'all',
      isFeatured: 'all',
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    };
    setLocalFilters(defaultFilters);
    setPriceRange([0, 1000]);
    onFiltersChange(defaultFilters);
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'page' || key === 'limit' || key === 'sortBy' || key === 'sortOrder') return false;
    if (value === 'all' || value === '' || value === null || value === undefined) return false;
    if (key === 'minPrice' && value === 0) return false;
    if (key === 'maxPrice' && value === 1000) return false;
    return true;
  }).length;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search Input */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('products.searchPlaceholder', 'Search products...')}
          value={localFilters.search || ''}
          onChange={(e) => {
            handleFilterChange('search', e.target.value);
            // Apply search immediately
            onFiltersChange({ search: e.target.value });
          }}
          className="pl-9 bg-card"
        />
      </div>

      {/* Sort Select */}
      <Select
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onValueChange={(value) => {
          const [sortBy, sortOrder] = value.split('-');
          onFiltersChange({ sortBy: sortBy as any, sortOrder: sortOrder as any });
        }}
      >
        <SelectTrigger className="w-[200px] bg-card">
          <SelectValue placeholder={t('products.sortBy', 'Sort by')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt-desc">{t('products.newest', 'Newest First')}</SelectItem>
          <SelectItem value="createdAt-asc">{t('products.oldest', 'Oldest First')}</SelectItem>
          <SelectItem value="name-asc">{t('products.nameAZ', 'Name (A-Z)')}</SelectItem>
          <SelectItem value="name-desc">{t('products.nameZA', 'Name (Z-A)')}</SelectItem>
          <SelectItem value="price-asc">{t('products.priceLowHigh', 'Price (Low to High)')}</SelectItem>
          <SelectItem value="price-desc">{t('products.priceHighLow', 'Price (High to Low)')}</SelectItem>
          <SelectItem value="soldCount-desc">{t('products.bestSelling', 'Best Selling')}</SelectItem>
          <SelectItem value="viewCount-desc">{t('products.mostViewed', 'Most Viewed')}</SelectItem>
        </SelectContent>
      </Select>

      {/* Filters Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="h-4 w-4 mr-2" />
            {t('products.filters', 'Filters')}
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 h-5 px-1.5 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{t('products.filterProducts', 'Filter Products')}</SheetTitle>
            <SheetDescription>
              {t('products.filterDescription', 'Refine your product search with these filters')}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Status Filter */}
            <div>
              <Label className="mb-2 block">{t('products.status', 'Status')}</Label>
              <Select
                value={localFilters.status || 'all'}
                onValueChange={(value) => handleFilterChange('status', value as any)}
              >
                <SelectTrigger className="bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {t('products.allStatuses', 'All Statuses')}
                    {productCounts && ` (${productCounts.total})`}
                  </SelectItem>
                  <SelectItem value="DRAFT">
                    {t('products.draft', 'Draft')}
                    {productCounts && ` (${productCounts.draft})`}
                  </SelectItem>
                  <SelectItem value="PUBLISHED">
                    {t('products.published', 'Published')}
                    {productCounts && ` (${productCounts.published})`}
                  </SelectItem>
                  <SelectItem value="ARCHIVED">
                    {t('products.archived', 'Archived')}
                    {productCounts && ` (${productCounts.archived})`}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filter */}
            <div>
              <Label className="mb-2 block">{t('products.visibility', 'Visibility')}</Label>
              <Select
                value={String(localFilters.isActive) || 'all'}
                onValueChange={(value) => handleFilterChange('isActive', value === 'all' ? 'all' : value === 'true')}
              >
                <SelectTrigger className="bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('products.allProducts', 'All Products')}</SelectItem>
                  <SelectItem value="true">
                    {t('products.activeOnly', 'Active Only')}
                    {productCounts && ` (${productCounts.active})`}
                  </SelectItem>
                  <SelectItem value="false">{t('products.inactiveOnly', 'Inactive Only')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Filter */}
            <div className="flex items-center justify-between">
              <Label htmlFor="featured">{t('products.featuredOnly', 'Featured Only')}</Label>
              <Switch
                id="featured"
                checked={localFilters.isFeatured === true}
                onCheckedChange={(checked) => handleFilterChange('isFeatured', checked ? true : 'all')}
              />
            </div>

            {/* Stock Filter */}
            <div>
              <Label className="mb-2 block">{t('products.stockStatus', 'Stock Status')}</Label>
              <Select
                value={localFilters.inStock === true ? 'inStock' : localFilters.inStock === false ? 'outOfStock' : 'all'}
                onValueChange={(value) => {
                  handleFilterChange('inStock', value === 'all' ? undefined : value === 'inStock');
                }}
              >
                <SelectTrigger className="bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('products.allStock', 'All Stock Levels')}</SelectItem>
                  <SelectItem value="inStock">
                    {t('products.inStock', 'In Stock')}
                    {productCounts && ` (${productCounts.inStock})`}
                  </SelectItem>
                  <SelectItem value="lowStock">
                    {t('products.lowStock', 'Low Stock')}
                    {productCounts && ` (${productCounts.lowStock})`}
                  </SelectItem>
                  <SelectItem value="outOfStock">
                    {t('products.outOfStock', 'Out of Stock')}
                    {productCounts && ` (${productCounts.outOfStock})`}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <Label className="mb-2 block">
                {t('products.priceRange', 'Price Range')}: ${priceRange[0]} - ${priceRange[1]}
              </Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange as any}
                max={1000}
                step={10}
                className="mt-3"
              />
            </div>

            {/* Filter Actions */}
            <div className="flex gap-3 pt-4">
              <Button onClick={applyFilters} className="flex-1">
                {t('products.applyFilters', 'Apply Filters')}
              </Button>
              <Button variant="outline" onClick={resetFilters}>
                <X className="h-4 w-4 mr-2" />
                {t('products.reset', 'Reset')}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}