import { useEffect, useState, useCallback, useMemo, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  updateCategory,
  deleteCategory
} from "@/store/slices/category/actions";
import {
  categorySelectors,
  setSelectedCategory,
  clearError
} from "@/store/slices/category/categorySlice";
import { Plus, SquarePlay, Smartphone, Shirt, Home, Heart, Book, Gamepad2, Package, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import Empty from "@/components/Empty";
import { CategoryCard, CategoryFormModal, DeleteConfirmationDialog } from "./components";
import { useToast } from "@/hooks/use-toast";
import type { Category } from "@/types/category.types";

// Icon mapping for categories - can be extended
const iconMap: Record<string, React.ElementType> = {
  electronics: Smartphone,
  fashion: Shirt,
  home: Home,
  beauty: Heart,
  books: Book,
  sports: Gamepad2,
};

// Color schemes for categories
const colorSchemes = [
  {
    color: "from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20",
    borderColor: "border-blue-500/20 dark:border-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-400"
  },
  {
    color: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
    borderColor: "border-purple-500/20 dark:border-purple-500/30",
    iconColor: "text-purple-600 dark:text-purple-400"
  },
  {
    color: "from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20",
    borderColor: "border-green-500/20 dark:border-green-500/30",
    iconColor: "text-green-600 dark:text-green-400"
  },
  {
    color: "from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20",
    borderColor: "border-rose-500/20 dark:border-rose-500/30",
    iconColor: "text-rose-600 dark:text-rose-400"
  },
  {
    color: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20",
    borderColor: "border-amber-500/20 dark:border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400"
  },
  {
    color: "from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20",
    borderColor: "border-indigo-500/20 dark:border-indigo-500/30",
    iconColor: "text-indigo-600 dark:text-indigo-400"
  }
];

function Categories() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  // Redux state selectors
  const categories = useAppSelector(categorySelectors.selectAllCategories);
  const loading = useAppSelector(categorySelectors.selectCategoryLoading);
  const deleteLoading = useAppSelector(categorySelectors.selectCategoryDeleteLoading);
  const error = useAppSelector(categorySelectors.selectCategoryError);
  const filters = useAppSelector(categorySelectors.selectCategoryFilters);
  
  // Local state
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  
  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories(filters.includeInactive));
  }, [dispatch, filters.includeInactive]);
  
  // Clear errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  
  // Handle error messages
  useEffect(() => {
    if (error) {
      toast({
        title: t('common.error'),
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast, t]);
  
  // Memoized categories with UI properties
  const categoriesWithUI = useMemo(() => {
    return categories.map((category, index) => {
      const colorScheme = colorSchemes[index % colorSchemes.length];
      const iconKey = category.name.toLowerCase().replace(/\s+/g, '');
      const Icon = iconMap[iconKey] || Package;
      
      return {
        ...category,
        Icon,
        ...colorScheme,
        productCount: category._count?.products || 0
      };
    });
  }, [categories]);
  
  // Callbacks for actions
  const handleEdit = useCallback((category: Category) => {
    setEditingCategory(category);
    setIsEditModalOpen(true);
  }, []);
  
  const handleDelete = useCallback((category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  }, []);
  
  const handleConfirmDelete = useCallback(async () => {
    if (!categoryToDelete) return;
    
    try {
      await dispatch(deleteCategory(categoryToDelete.id)).unwrap();
      toast({
        title: t('common.success'),
        description: t('categories.deleteSuccess'),
      });
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Failed to delete category:', error);
      // Error handling is done via the error state effect
    }
  }, [categoryToDelete, dispatch, toast, t]);
  
  const handleView = useCallback((categoryId: string) => {
    navigate(`/dashboard/products?category=${categoryId}`);
  }, [navigate]);
  
  const handleFormSubmit = useCallback(async (values: any) => {
    try {
      await dispatch(updateCategory({ 
        categoryId: editingCategory!.id, 
        data: values 
      })).unwrap();
      
      toast({
        title: t('common.success'),
        description: t('categories.updateSuccess'),
      });
      setIsEditModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to update category:', error);
      // Error handling is done via the error state effect
    }
  }, [editingCategory, dispatch, toast, t]);

  // Loading state
  if (loading) {
    return (
      <div className="flex bg-white dark:bg-transparent rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex bg-white dark:bg-transparent rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Title
            title={t('categories.title')}
            Subtitle={t('categories.subtitle')}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/dashboard/products/categories/new')}
              className="bg-primary hover:bg-primary/90 border-0 rounded-2xl text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={16} className={i18n.language === 'ar' ? "mr-1" : "ml-1"} /> 
              {t('categories.createCategory')}
            </Button>
            <Button className="bg-[#252525] border-0 md:mb-0 rounded-2xl text-white/80 hover:text-white">
              {t('categories.howToCreate')} <SquarePlay size={16} />
            </Button>
          </div>
        </div>
        
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t('common.error')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Categories Grid */}
        {categoriesWithUI.length === 0 ? (
          <Empty className={""} Name={t('categories.title').toLowerCase()} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesWithUI.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isHovered={hoveredId === category.id}
                onHover={setHoveredId}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
                deleteLoading={deleteLoading}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <CategoryFormModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingCategory(null);
          }}
          category={editingCategory}
          onSubmit={handleFormSubmit}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={t('categories.deleteTitle')}
        description={t('categories.deleteDescription', { 
          name: categoryToDelete?.name 
        })}
        loading={deleteLoading}
      />
    </div>
  );
}

export default Categories;
