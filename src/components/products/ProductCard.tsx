import type { Product } from "@/types/product.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
}

export function ProductCard({ product, onEdit, onDelete, onView }: ProductCardProps) {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-success text-success-foreground";
      case "DRAFT":
        return "bg-secondary text-secondary-foreground";
      case "ARCHIVED":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStockStatus = () => {
    if (!product.trackQuantity) return { text: "In Stock", color: "text-success" };
    if (product.quantity === 0) return { text: "Out of Stock", color: "text-destructive" };
    if (product.quantity <= product.lowStockAlert) return { text: "Low Stock", color: "text-amber-600" };
    return { text: "In Stock", color: "text-success" };
  };

  const stockStatus = getStockStatus();

  return (
    <Card className="group relative overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <Badge className={cn("text-xs font-medium", getStatusColor(product.status))}>
          {product.status}
        </Badge>
      </div>

      {/* Featured Badge */}
      {product.isFeatured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-primary text-primary-foreground">
            Featured
          </Badge>
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {product.mainImage?.path ? (
          <img
            src={product.mainImage.path}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={48} className="text-muted-foreground opacity-50" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-foreground truncate mb-2">
          {product.name}
        </h3>

        {/* Short Description */}
        {product.shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.shortDescription}
          </p>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ${product.comparePrice.toFixed(2)}
              </span>
              <Badge variant="secondary" className="text-xs">
                {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
              </Badge>
            </>
          )}
        </div>

        {/* Stock & SKU Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className={cn("font-medium", stockStatus.color)}>
              {stockStatus.text}
            </span>
            {product.trackQuantity && (
              <span className="text-muted-foreground">
                ({product.quantity} units)
              </span>
            )}
          </div>
          {product.sku && (
            <span className="text-xs text-muted-foreground">
              SKU: {product.sku}
            </span>
          )}
        </div>

        {/* Analytics */}
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye size={12} />
            {product.viewCount} views
          </span>
          <span className="flex items-center gap-1">
            <Package size={12} />
            {product.soldCount} sold
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => {
            if (onView) {
              onView(product);
            } else {
              navigate(`/dashboard/products/${product.id}`);
            }
          }}
        >
          <Eye size={16} className="mr-1" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit ? onEdit(product) : navigate(`/dashboard/product/edit/${product.id}`)}
        >
          <Edit size={16} className="mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => onDelete?.(product)}
        >
          <Trash2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}