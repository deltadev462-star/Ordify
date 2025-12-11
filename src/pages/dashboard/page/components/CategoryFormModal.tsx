import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Upload, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAppSelector } from "@/store/hooks";
import { categorySelectors } from "@/store/slices/category/categorySlice";
import type { Category, CategoryFormData } from "@/types/category.types";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  onSubmit: (values: CategoryFormData, imageFile?: File | null) => Promise<void>;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  isOpen,
  onClose,
  category,
  onSubmit,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  
  // Get all categories for parent selection
  const allCategories = useAppSelector(categorySelectors.selectAllCategories);
  const availableParentCategories = allCategories.filter(c => 
    c.id !== category?.id && !isDescendantOf(c, category?.id || '', allCategories)
  );

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.minLength', { min: 2 }))
      .max(100, t('validation.maxLength', { max: 100 })),
    description: Yup.string()
      .max(500, t('validation.maxLength', { max: 500 })),
    parentId: Yup.string().nullable(),
    isActive: Yup.boolean(),
    sortOrder: Yup.number()
      .min(0, t('validation.minValue', { min: 0 }))
      .max(999, t('validation.maxValue', { max: 999 }))
  });

  // Formik configuration
  const formik = useFormik<CategoryFormData>({
    initialValues: {
      name: category?.name || '',
      description: category?.description || '',
      parentId: category?.parentId || null,
      isActive: category?.isActive ?? true,
      sortOrder: category?.sortOrder || 0,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // Pass the image file to the parent component
        await onSubmit(values, removeExistingImage ? null : imageFile);
        handleClose();
      } catch (error: any) {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Reset form when category changes
  useEffect(() => {
    if (category) {
      formik.setValues({
        name: category.name || '',
        description: category.description || '',
        parentId: category.parentId || null,
        isActive: category.isActive ?? true,
        sortOrder: category.sortOrder || 0,
      });
      // Set the existing image preview
      if (category.image) {
        setImagePreview(category.image.path);
      }
    } else {
      // Reset image when creating a new category
      setImagePreview(null);
      setImageFile(null);
      setRemoveExistingImage(false);
    }
  }, [category]);

  const handleClose = () => {
    formik.resetForm();
    setImageFile(null);
    setImagePreview(null);
    setRemoveExistingImage(false);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        formik.setFieldError('image', t('validation.invalidImageType'));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        formik.setFieldError('image', t('validation.imageTooLarge', { max: '5MB' }));
        return;
      }

      setImageFile(file);
      setRemoveExistingImage(false);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (category?.image) {
      setRemoveExistingImage(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {category 
              ? t('categories.editCategory') 
              : t('categories.createCategory')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="required">
              {t('categories.categoryName')}
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={t('categories.categoryNamePlaceholder')}
              className={`rounded-xl ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          {/* Category Image */}
          <div className="space-y-2">
            <Label htmlFor="image">
              {t('categories.categoryImage')}
            </Label>
            
            {/* Image Preview */}
            {imagePreview && !removeExistingImage && (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600">
                <img 
                  src={imagePreview} 
                  alt="Category preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Upload Button */}
            {!imagePreview || removeExistingImage ? (
              <div className="flex items-center gap-4">
                <label
                  htmlFor="image"
                  className="flex items-center gap-2 px-4 py-2 border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                  <span>{t('categories.uploadImage')}</span>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <label
                  htmlFor="image-change"
                  className="text-sm text-primary hover:underline cursor-pointer"
                >
                  {t('categories.changeImage')}
                  <input
                    id="image-change"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}

            <p className="text-xs text-muted-foreground">
              {t('categories.imageHelp')}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {t('common.description')}
            </Label>
            <Textarea
              id="description"
              placeholder={t('categories.descriptionPlaceholder')}
              className={`rounded-xl min-h-[100px] ${
                formik.touched.description && formik.errors.description ? 'border-red-500' : ''
              }`}
              rows={4}
              {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500">{formik.errors.description}</p>
            )}
          </div>

          {/* Parent Category */}
          <div className="space-y-2">
            <Label htmlFor="parentId">
              {t('categories.parentCategory')}
            </Label>
            <Select
              value={formik.values.parentId ?? 'none'}
              onValueChange={(value) => formik.setFieldValue('parentId', value === 'none' ? null : value)}
            >
              <SelectTrigger 
                id="parentId"
                className={`rounded-xl ${
                  formik.touched.parentId && formik.errors.parentId ? 'border-red-500' : ''
                }`}
              >
                <SelectValue placeholder={t('categories.selectParentCategory')} />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectItem value="none">
                  {t('categories.noParentCategory')}
                </SelectItem>
                {availableParentCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {getCategoryPath(cat, allCategories)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formik.touched.parentId && formik.errors.parentId && (
              <p className="text-sm text-red-500">{formik.errors.parentId}</p>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/50">
            <div className="space-y-0.5">
              <Label htmlFor="isActive" className="text-base">
                {t('categories.activeStatus')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('categories.activeStatusDescription')}
              </p>
            </div>
            <Switch
              id="isActive"
              checked={formik.values.isActive}
              onCheckedChange={(checked) => formik.setFieldValue('isActive', checked)}
              className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-600"
            />
          </div>

          {/* Sort Order */}
          <div className="space-y-2">
            <Label htmlFor="sortOrder">
              {t('categories.sortOrder')}
            </Label>
            <Input
              id="sortOrder"
              type="number"
              placeholder="0"
              className={`rounded-xl ${
                formik.touched.sortOrder && formik.errors.sortOrder ? 'border-red-500' : ''
              }`}
              {...formik.getFieldProps('sortOrder')}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                formik.setFieldValue('sortOrder', value);
              }}
            />
            <p className="text-xs text-muted-foreground">
              {t('categories.sortOrderDescription')}
            </p>
            {formik.touched.sortOrder && formik.errors.sortOrder && (
              <p className="text-sm text-red-500">{formik.errors.sortOrder}</p>
            )}
          </div>

          {/* Form Error */}
          {formik.status && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formik.status}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={formik.isSubmitting}
              className="rounded-xl"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="rounded-xl bg-primary hover:bg-primary/90"
            >
              {formik.isSubmitting && (
                <Loader2 className={`h-4 w-4 animate-spin ${isRTL ? 'ml-2' : 'mr-2'}`} />
              )}
              {category 
                ? t('common.saveChanges') 
                : t('common.create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Helper functions
function isDescendantOf(category: Category, ancestorId: string, allCategories: Category[]): boolean {
  if (!category.parentId) return false;
  if (category.parentId === ancestorId) return true;
  
  const parent = allCategories.find(c => c.id === category.parentId);
  return parent ? isDescendantOf(parent, ancestorId, allCategories) : false;
}

function getCategoryPath(category: Category, allCategories: Category[]): string {
  const path: string[] = [category.name];
  let current = category;
  
  while (current.parentId) {
    const parent = allCategories.find(c => c.id === current.parentId);
    if (!parent) break;
    path.unshift(parent.name);
    current = parent;
  }
  
  return path.join(' > ');
}

export default CategoryFormModal;