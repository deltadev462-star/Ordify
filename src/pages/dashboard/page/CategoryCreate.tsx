import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { ArrowRight, Upload, ChevronLeft, X, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createCategory, fetchCategories } from "@/store/slices/category/actions";
import type { CategoryFormData } from "@/types/category.types";

function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Get parent categories from Redux store
  const { categories } = useAppSelector((state) => state.categories);
  const { createLoading } = useAppSelector((state) => state.categories);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories(false)); // false for includeInactive parameter
  }, [dispatch]);

  // Validation function
  const validate = (values: CategoryFormData) => {
    const errors: Partial<Record<keyof CategoryFormData, string>> = {};
    
    if (!values.name.trim()) {
      errors.name = t("categories.categoryNameRequired");
    }
    
    if (!values.description || !values.description.trim()) {
      errors.description = t("categories.descriptionRequired");
    }
    
    if (values.sortOrder !== undefined && values.sortOrder < 0) {
      errors.sortOrder = t("categories.sortOrderError");
    }
    
    return errors;
  };

  // Formik setup
  const formik = useFormik<CategoryFormData>({
    initialValues: {
      name: "",
      description: "",
      parentId: null,
      isActive: true,
      sortOrder: 0,
    },
    validate,
    onSubmit: async (values) => {
      try {
        await dispatch(createCategory({
          categoryData: values,
          imageFile: imageFile,
        })).unwrap();
        
        toast({
          title: t("common.success"),
          description: t("messages.createSuccess"),
        });
        navigate("/dashboard/products/categories");
      } catch (error: any) {
        toast({
          title: t("common.error"),
          description: error || t("messages.error"),
          variant: "destructive",
        });
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast({
          title: t("common.error"),
          description: t("validation.invalidFormat"),
          variant: "destructive",
        });
        return;
      }

      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: t("common.error"),
          description: t("messages.uploadError"),
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);

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
  };

  return (
    <div className="container max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-xl hover:bg-primary/10"
          >
            <ChevronLeft className={i18n.language === "ar" ? "h-5 w-5 rotate-180" : "h-5 w-5"} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("categories.createNewCategory")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("categories.createNewCategorySubtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="space-y-8">
        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-6 text-card-foreground">
              {t("categories.basicInformation")}
            </h2>

            <div className="space-y-6">
              {/* Category Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  {t("categories.categoryName")} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("categories.categoryNamePlaceholder")}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-xl h-12 ${
                    formik.touched.name && formik.errors.name ? "border-destructive" : ""
                  }`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-destructive">{formik.errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  {t("common.description")} <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder={t("categories.descriptionPlaceholder")}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={4}
                  className={`rounded-xl resize-none ${
                    formik.touched.description && formik.errors.description
                      ? "border-destructive"
                      : ""
                  }`}
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-sm text-destructive">{formik.errors.description}</p>
                )}
              </div>

              {/* Parent Category */}
              <div className="space-y-2">
                <Label htmlFor="parentId" className="text-sm font-medium">
                  {t("categories.parentCategory")}
                </Label>
                <Select
                  value={formik.values.parentId || "none"}
                  onValueChange={(value) =>
                    formik.setFieldValue("parentId", value === "none" ? null : value)
                  }
                >
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder={t("categories.selectParentCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("categories.noParentCategory")}</SelectItem>
                    {categories
                      .filter((cat) => cat.parentId === null) // Only show root categories as parent options
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Image Upload Card */}
          <div className="rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-6 text-card-foreground">
              {t("categories.categoryImage")}
            </h2>

            <div className="space-y-4">
              {!imagePreview ? (
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium text-muted-foreground">
                      {t("categories.clickToUploadImage")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("categories.imageFormat")}
                    </p>
                  </div>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-full h-64 object-cover rounded-xl cursor-pointer"
                    onClick={() => setShowImagePreview(true)}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowImagePreview(true);
                      }}
                      className="p-2 bg-background/90 backdrop-blur rounded-xl hover:bg-background"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="p-2 bg-background/90 backdrop-blur rounded-xl hover:bg-background"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Settings Card */}
          <div className="rounded-2xl p-6 shadow-sm border border-border">
            <h2 className="text-lg font-semibold mb-6 text-card-foreground">
              {t("common.settings")}
            </h2>

            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isActive" className="text-sm font-medium">
                    {t("categories.activeStatus")}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {t("categories.activeStatusDescription")}
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formik.values.isActive}
                  onCheckedChange={(checked) => formik.setFieldValue("isActive", checked)}
                  className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <Label htmlFor="sortOrder" className="text-sm font-medium">
                  {t("categories.sortOrder")}
                </Label>
                <Input
                  id="sortOrder"
                  name="sortOrder"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formik.values.sortOrder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-xl h-12 w-32 ${
                    formik.touched.sortOrder && formik.errors.sortOrder
                      ? "border-destructive"
                      : ""
                  }`}
                />
                {formik.touched.sortOrder && formik.errors.sortOrder && (
                  <p className="text-sm text-destructive">{formik.errors.sortOrder}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {t("categories.sortOrderDescription")}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pb-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="rounded-xl"
              disabled={createLoading}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={createLoading}
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground min-w-[150px]"
            >
              {createLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  {t("categories.creating")}
                </div>
              ) : (
                <>
                  {t("categories.createCategory")}{" "}
                  <ArrowRight
                    className={i18n.language === "ar" ? "ml-2 h-4 w-4 rotate-180" : "mr-2 h-4 w-4"}
                  />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="max-w-4xl">
          <DialogTitle>{t("categories.categoryImage")}</DialogTitle>
          <div className="mt-4">
            <img
              src={imagePreview || ""}
              alt="Category preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CategoryCreate;
