import { useState } from "react";
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
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: "All  Status" },
    { value: 'active', label: "Active" },
    { value: 'draft', label: "Draft" },
    { value: 'archived', label: "Archived" },
  ];

  const categoryOptions = [
    { value: 'all', label: "All  Categories" },
    { value: 'electronics', label: "Electronics" },
    { value: 'clothing', label: "Clothing" },
    { value: 'food', label: "Food &  Beverages" },
    { value: 'home', label: "Home &  Garden" },
    { value: 'beauty', label: "Beauty &  Health" },
    { value: 'sports', label: "Sports &  Outdoors" },
    { value: 'toys', label: "Toys &  Games" },
  ];

  const stockOptions = [
    { value: 'all', label: "All  Stock  Levels" },
    { value: 'in-stock', label: "In  Stock" },
    { value: 'low-stock', label: "Low  Stock" },
    { value: 'out-of-stock', label: "Out of  Stock" },
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
              <SelectValue placeholder={"Status"} />
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
              <SelectValue placeholder={"Category"} />
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
              <SelectValue placeholder={"Stock"} />
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
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "relative hover:bg-transparent dark:hover:bg-transparent",
              activeFiltersCount > 0 && "text-blue-500"
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
              {"Clear filters"}
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
              <span className="hidden sm:inline">{"Export"}</span>
            </Button>
          )}
          {onCreateProduct && (
            <Button onClick={onCreateProduct} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">{"Add  Product"}</span>
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{"Min  Price"}</label>
              <Input
                type="number"
                placeholder={"Minimum price"}
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
              <label className="text-sm font-medium">{"Max  Price"}</label>
              <Input
                type="number"
                placeholder={"Maximum price"}
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