import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreVertical, Trash, Eye, Copy, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  currency: string;
  images: string[];
  category: string;
  inventory: {
    quantity: number;
    trackInventory: boolean;
  };
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

interface ProductCardProps {
  product: Product;
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onDuplicate?: (product: Product) => void;
}

export function ProductCard({ 
  product, 
  onView, 
  onEdit, 
  onDelete,
  onDuplicate 
}: ProductCardProps) {
  const { t } = useTranslation();

  const getStatusColor = (status: Product['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
      archived: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const discount = product.comparePrice 
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const isLowStock = product.inventory.trackInventory && product.inventory.quantity < 10;
  const isOutOfStock = product.inventory.trackInventory && product.inventory.quantity === 0;

  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <Badge 
          className={cn(
            "absolute top-2 left-2",
            getStatusColor(product.status)
          )}
        >
          {t(product.status)}
        </Badge>

        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white">
            -{discount}%
          </Badge>
        )}

        {/* Stock Alert */}
        {isOutOfStock && (
          <Badge className="absolute bottom-2 left-2 bg-red-600 text-white">
            {t("Out of Stock")}
          </Badge>
        )}
        {isLowStock && !isOutOfStock && (
          <Badge className="absolute bottom-2 left-2 bg-yellow-600 text-white">
            {t("Low Stock")} ({product.inventory.quantity})
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Category */}
          <p className="text-xs text-muted-foreground">{product.category}</p>
          
          {/* Product Name */}
          <h3 className="font-semibold text-sm line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">
              {product.currency} {product.price.toLocaleString()}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.currency} {product.comparePrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Info */}
          {product.inventory.trackInventory && (
            <p className="text-xs text-muted-foreground">
              {t("Stock")}: {product.inventory.quantity} {t("units")}
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Button
          variant="default"
          size="sm"
          onClick={() => onView?.(product)}
          className="flex-1"
        >
          <Eye className="h-4 w-4 mr-1" />
          {t("View")}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("Actions")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onView?.(product)}>
              <Eye className="mr-2 h-4 w-4" />
              {t("View Details")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit?.(product)}>
              <Edit className="mr-2 h-4 w-4" />
              {t("Edit Product")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate?.(product)}>
              <Copy className="mr-2 h-4 w-4" />
              {t("Duplicate")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onDelete?.(product)}
              className="text-red-600 dark:text-red-400"
            >
              <Trash className="mr-2 h-4 w-4" />
              {t("Delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}