import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Edit2, Trash2, Package, ShoppingBag, MoreVertical, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/types/category.types";

export interface CategoryCardProps {
  category: Category & {
    Icon: React.ElementType;
    color: string;
    borderColor: string;
    iconColor: string;
    productCount: number;
  };
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onView: (categoryId: string) => void;
  deleteLoading: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = memo(({
  category,
  isHovered,
  onHover,
  onEdit,
  onDelete,
  onView,
  deleteLoading
}) => {
  const { t, i18n } = useTranslation();
  const { Icon } = category;

  const handleMouseEnter = () => onHover(category.id);
  const handleMouseLeave = () => onHover(null);
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(category);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(category);
  };
  
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onView(category.id);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onView(category.id)}
      className={`
        relative overflow-hidden rounded-2xl border-2
        ${category.borderColor}
        bg-gradient-to-br ${category.color}
        backdrop-blur-sm
        transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]
        cursor-pointer group
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-black/10 to-transparent" />
        <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-tl from-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className={`
            p-3 rounded-xl bg-white/50 dark:bg-black/20
            backdrop-blur-sm shadow-lg
            ${isHovered ? 'scale-110 rotate-3' : ''}
            transition-all duration-300
          `}>
            <Icon className={`h-6 w-6 ${category.iconColor}`} />
          </div>
          
          <div className="flex items-center gap-2">
            <Badge
              variant={category.isActive ? "default" : "secondary"}
              className={`
                ${category.isActive
                  ? 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30'
                  : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30'
                }
              `}
            >
              {category.isActive ? t('common.active') : t('common.inactive')}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-xl hover:bg-black/10 dark:hover:bg-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem
                  onClick={handleView}
                  className="rounded-lg cursor-pointer"
                >
                  <Eye className={i18n.language === 'ar' ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                  {t('categories.viewProducts')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="rounded-lg cursor-pointer"
                >
                  <Edit2 className={i18n.language === 'ar' ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                  {t('common.edit')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="rounded-lg cursor-pointer text-red-600 dark:text-red-400"
                  disabled={deleteLoading}
                >
                  <Trash2 className={i18n.language === 'ar' ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
                  {t('common.delete')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-foreground">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {category.description || t('categories.noDescription')}
          </p>
          
          {/* Product Count */}
          <div className="flex items-center gap-2 pt-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              {category.productCount} {t('categories.products')}
            </span>
          </div>
        </div>

        {/* Hover Actions */}
        <div className={`
          absolute bottom-0 left-0 right-0 p-4
          bg-gradient-to-t from-black/10 dark:from-black/30 to-transparent
          transform ${isHovered ? 'translate-y-0' : 'translate-y-full'}
          transition-transform duration-300
        `}>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleEdit}
              className="flex-1 rounded-xl bg-white/90 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/70 text-foreground"
            >
              <Edit2 className={i18n.language === 'ar' ? "h-4 w-4 mr-1" : "h-4 w-4 ml-1"} />
              {t('common.edit')}
            </Button>
            <Button
              size="sm"
              onClick={handleView}
              variant="secondary"
              className="flex-1 rounded-xl"
            >
              <ShoppingBag className={i18n.language === 'ar' ? "h-4 w-4 mr-1" : "h-4 w-4 ml-1"} />
              {t('common.view')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.category.id === nextProps.category.id &&
    prevProps.category.name === nextProps.category.name &&
    prevProps.category.description === nextProps.category.description &&
    prevProps.category.isActive === nextProps.category.isActive &&
    prevProps.category.productCount === nextProps.category.productCount &&
    prevProps.isHovered === nextProps.isHovered &&
    prevProps.deleteLoading === nextProps.deleteLoading
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;