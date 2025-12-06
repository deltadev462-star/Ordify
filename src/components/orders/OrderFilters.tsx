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
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { value: 'all', label: t('All Status') },
    { value: 'pending', label: t('Pending') },
    { value: 'processing', label: t('Processing') },
    { value: 'shipped', label: t('Shipped') },
    { value: 'delivered', label: t('Delivered') },
    { value: 'cancelled', label: t('Cancelled') },
    { value: 'refunded', label: t('Refunded') },
  ];

  const paymentOptions = [
    { value: 'all', label: t('All Payment Methods') },
    { value: 'cash', label: t('Cash on Delivery') },
    { value: 'card', label: t('Credit/Debit Card') },
    { value: 'wallet', label: t('Digital Wallet') },
    { value: 'bank', label: t('Bank Transfer') },
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
              <SelectValue placeholder={t("Select status")} />
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
              <SelectValue placeholder={t("Payment method")} />
            </SelectTrigger>
            <SelectContent>
              {paymentOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                {t("Date Range")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuLabel>{t("Select date range")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>{t("Today")}</DropdownMenuItem>
              <DropdownMenuItem>{t("Yesterday")}</DropdownMenuItem>
              <DropdownMenuItem>{t("Last 7 days")}</DropdownMenuItem>
              <DropdownMenuItem>{t("Last 30 days")}</DropdownMenuItem>
              <DropdownMenuItem>{t("This month")}</DropdownMenuItem>
              <DropdownMenuItem>{t("Last month")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
          {onExport && (
            <Button variant="outline" onClick={onExport} className="gap-2">
              <Download className="h-4 w-4" />
              {t("Export")}
            </Button>
          )}
          {onCreateOrder && (
            <Button onClick={onCreateOrder} className="gap-2">
              <Plus className="h-4 w-4" />
              {t("Create Order")}
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-900 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("Minimum Amount")}</label>
              <Input
                type="number"
                placeholder={t("Min amount")}
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
              <label className="text-sm font-medium">{t("Maximum Amount")}</label>
              <Input
                type="number"
                placeholder={t("Max amount")}
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