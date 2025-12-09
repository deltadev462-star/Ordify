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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Filter, X, Download, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrderFilters {
  status?: string;
  paymentMethod?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  minAmount?: number;
  maxAmount?: number;
}

interface OrderFiltersProps {
  filters: OrderFilters;
  onFiltersChange: (filters: OrderFilters) => void;
  onExport?: () => void;
  onCreateOrder?: () => void;
}

export function OrderFilters({
  filters,
  onFiltersChange,
  onExport,
  onCreateOrder,
}: OrderFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: "All  Status" },
    { value: 'pending', label: "Pending" },
    { value: 'processing', label: "Processing" },
    { value: 'shipped', label: "Shipped" },
    { value: 'delivered', label: "Delivered" },
    { value: 'cancelled', label: "Cancelled" },
    { value: 'refunded', label: "Refunded" },
  ];

  const paymentOptions = [
    { value: 'all', label: "All  Payment  Methods" },
    { value: 'cash', label: "Cash on  Delivery" },
    { value: 'card', label: "Credit/ Debit  Card" },
    { value: 'wallet', label: "Digital  Wallet" },
    { value: 'bank', label: "Bank  Transfer" },
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
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={"Select status"} />
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
            value={filters.paymentMethod || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                paymentMethod: value === 'all' ? undefined : value,
              })
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={"Payment method"} />
            </SelectTrigger>
            <SelectContent>
              {paymentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border-gray-200 dark:border-gray-700">
                <Calendar className="h-4 w-4" />
                {"Date  Range"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>{"Select date range"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{"Today"}</DropdownMenuItem>
              <DropdownMenuItem>{"Yesterday"}</DropdownMenuItem>
              <DropdownMenuItem>{"Last 7 days"}</DropdownMenuItem>
              <DropdownMenuItem>{"Last 30 days"}</DropdownMenuItem>
              <DropdownMenuItem>{"This month"}</DropdownMenuItem>
              <DropdownMenuItem>{"Last month"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "relative border-gray-200 dark:border-gray-700",
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
              {"Clear filters"}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onExport && (
            <Button variant="outline" onClick={onExport} className="gap-2 border-gray-200 dark:border-gray-700">
              <Download className="h-4 w-4" />
              {"Export"}
            </Button>
          )}
          {onCreateOrder && (
            <Button onClick={onCreateOrder} className="gap-2 ">
              <Plus className="h-4 w-4" />
              {"Create  Order"}
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 space-y-4 border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{"Minimum  Amount"}</label>
              <Input
                type="number"
                placeholder={"Min amount"}
                value={filters.minAmount || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    minAmount: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{"Maximum  Amount"}</label>
              <Input
                type="number"
                placeholder={"Max amount"}
                value={filters.maxAmount || ''}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    maxAmount: e.target.value ? Number(e.target.value) : undefined,
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