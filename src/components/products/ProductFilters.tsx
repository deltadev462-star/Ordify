import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Download, Plus, Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductFilters {
  status?: string;
  category?: string;
  stockStatus?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onExport?: () => void;
  onCreateProduct?: () => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  onExport,
  onCreateProduct,
  viewMode,
  onViewModeChange,
}: ProductFiltersProps) {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: t('All Status') },
    { value: 'active', label: t('Active') },
    { value: 'draft', label: t('Draft') },
    { value: 'archived', label: t('Archived') },
  ];

  const categoryOptions = [
    { value: 'all', label: t('All Categories') },
    { value: 'electronics', label: t('Electronics') },
    { value: 'clothing', label: t('Clothing') },
    { value: 'food', label: t('Food & Beverages') },
    { value: 'home', label: t('Home & Garden') },
    { value: 'beauty', label: t('Beauty & Health') },
    { value: 'sports', label: t('Sports & Outdoors') },
    { value: 'toys', label: t('Toys & Games') },
  ];

  const stockOptions = [
    { value: 'all', label: t('All Stock Levels') },
    { value: 'in-stock', label: t('In Stock') },
    { value: 'low-stock', label: t('Low Stock') },
    { value: 'out-of-stock', label: t('Out of Stock') },
  ];

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value && value !== 'all'
  ).length;

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={filters.status || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value === 'all' ? undefined : value,
              })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t("Status")} />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.category || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                category: value === 'all' ? undefined : value,
              })
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("Category")} />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.stockStatus || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                stockStatus: value === 'all' ? undefined : value,
              })
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={t("Stock")} />
            </SelectTrigger>
            <SelectContent>
              {stockOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "relative",
              activeFiltersCount > 0 && "border-blue-500"
            )}
          >
            <Filter className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <Badge
                variant="default"
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-1"
            >
              <X className="h-3 w-3" />
              {t("Clear filters")}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('grid')}
              className="rounded-none rounded-l-md"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onViewModeChange('list')}
              className="rounded-none rounded-r-md"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {onExport && (
            <Button variant="outline" onClick={onExport} className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Export")}</span>
            </Button>
          )}
          {onCreateProduct && (
            <Button onClick={onCreateProduct} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">{t("Add Product")}</span>
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Min Price")}</label>
              <Input
                type="number"
                placeholder={t("Minimum price")}
                value={filters.priceRange?.min || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceRange: {
                      min: e.target.value ? Number(e.target.value) : 0,
                      max: filters.priceRange?.max || 999999,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Max Price")}</label>
              <Input
                type="number"
                placeholder={t("Maximum price")}
                value={filters.priceRange?.max || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    priceRange: {
                      min: filters.priceRange?.min || 0,
                      max: e.target.value ? Number(e.target.value) : 999999,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}