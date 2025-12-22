import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSEO } from "@/hooks/useSEO";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/ui/floating-label-input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createProduct } from "@/store/slices/product/actions";
import { fetchCategories } from "@/store/slices/category/actions";
import { categorySelectors } from "@/store/slices/category/categorySlice";
import { productCreateSchema } from "@/validators/product.schema";
import { ProductStatus } from "@/types/product.types";
import { toast } from "@/hooks/use-toast";
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  Settings,
  Save,
  ChevronDown,
  ChevronRight,
  Globe,
  Zap,
  Truck,
  Star,
  Barcode,
  Weight,
  Tag
} from "lucide-react";

// Import image upload components
import ProductImagesWithFiles from "@/components/product/ProductImagesWithFiles";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  description, 
  icon, 
  children, 
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden">
      <CardHeader 
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-primary">{icon}</div>}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {description && (
                <CardDescription className="text-sm mt-1">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform" />
          )}
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent className="pt-0">
          <Separator className="mb-6" />
          {children}
        </CardContent>
      )}
    </Card>
  );
};

function ProductCreate() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(categorySelectors.selectActiveCategories);
  const categoriesLoading = useAppSelector(state => state.categories.loading);
  const categoriesError = useAppSelector(state => state.categories.error);
  const createLoading = useAppSelector(state => state.products.createLoading);
  
  // Images - File objects for upload
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [subImageFiles, setSubImageFiles] = useState<File[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories(false));
  }, [dispatch]);

  // Debug categories
  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Categories Loading:', categoriesLoading);
    console.log('Categories Error:', categoriesError);
  }, [categories, categoriesLoading, categoriesError]);

  // Auto-generate product slug from product name
  const generateProductSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      // Essential Information
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      categoryId: "",
      
      // Pricing
      price: 0,
      comparePrice: null,
      costPrice: null,
      
      // Inventory
      sku: "",
      barcode: "",
      trackQuantity: true,
      quantity: 0,
      lowStockAlert: 10,
      
      // Product Details
      weight: null,
      weightUnit: "kg",
      
      // SEO
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [] as string[],
      
      // Status
      status: ProductStatus.DRAFT,
      isActive: true,
      isFeatured: false,
    },
    validationSchema: productCreateSchema,
    onSubmit: async (values) => {
      try {
        // Prepare image data
        const images = {
          mainImage: mainImageFile,
          subImages: subImageFiles.length > 0 ? subImageFiles : null,
        };

        const result = await dispatch(createProduct({
          productData: values,
          images: images.mainImage || images.subImages ? images : undefined,
        })).unwrap();

        toast({
          title: t('common.success'),
          description: t('products.productCreatedSuccessfully'),
        });

        // Navigate to product edit page or products list
        navigate(`/dashboard/products/edit/${result.id}`);
      } catch (error: any) {
        toast({
          title: t('common.error'),
          description: error || t('products.failedToCreateProduct'),
          variant: "destructive",
        });
      }
    },
  });

  // Handle name change and auto-generate slug
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    formik.setFieldValue('name', name);
    if (!formik.values.slug || formik.values.slug === generateProductSlug(formik.values.name)) {
      formik.setFieldValue('slug', generateProductSlug(name));
    }
  };


  // Transform categories for select options
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  const currencyOptions = [
    { value: "USD", label: t('products.currencies.USD') },
    { value: "EUR", label: t('products.currencies.EUR') },
    { value: "GBP", label: t('products.currencies.GBP') },
    { value: "EGP", label: t('products.currencies.EGP') },
    { value: "SAR", label: t('products.currencies.SAR') },
    { value: "AED", label: t('products.currencies.AED') },
  ];

  useSEO({
    title: t('products.createProduct') + " - Ordify Dashboard",
    description: t('products.createProductSeoDescription'),
  });

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto max-w-6xl py-8 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('products.createProduct')}</h1>
          <p className="text-muted-foreground">
            {t('products.createProductSubtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Essential Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                {t('products.essentialInformation')}
              </CardTitle>
              <CardDescription>
                {t('products.essentialInformationDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
               <FloatingLabelInput
                 label={t('products.productName')}
                 value={formik.values.name}
                 onChange={handleNameChange}
                 onBlur={formik.handleBlur}
                 name="name"
                 placeholder={""}
                 required
                 error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
               />
               <FloatingLabelInput
                 label={t('products.productSlug')}
                 value={formik.values.slug}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 name="slug"
                 placeholder={""}
                 error={formik.touched.slug && formik.errors.slug ? formik.errors.slug : undefined}
               />
             </div>

             <div className="grid gap-6 md:grid-cols-2">
               <FloatingLabelTextarea
                 label={t('products.shortDescription')}
                 value={formik.values.shortDescription}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 name="shortDescription"
                 placeholder={""}
                 rows={2}
                 className="resize-none"
                 error={formik.touched.shortDescription && formik.errors.shortDescription ? formik.errors.shortDescription : undefined}
               />
               
               <Select
                 value={formik.values.categoryId}
                 onValueChange={(value) => formik.setFieldValue('categoryId', value)}
                 disabled={categoriesLoading}
               >
                 <SelectTrigger className={formik.touched.categoryId && formik.errors.categoryId ? "border-destructive" : ""}>
                   <SelectValue placeholder={
                     categoriesLoading ? t('common.loading') :
                     categoriesError ? t('common.error') :
                     categoryOptions.length === 0 ? t('products.noCategories') :
                     t('products.selectCategory')
                   } />
                 </SelectTrigger>
                 <SelectContent>
                   {categoriesError ? (
                     <div className="px-2 py-1.5 text-sm text-muted-foreground">
                       {categoriesError}
                     </div>
                   ) : categoryOptions.length === 0 ? (
                     <div className="px-2 py-1.5 text-sm text-muted-foreground">
                       {t('products.noCategories')}
                     </div>
                   ) : (
                     categoryOptions.map(option => (
                       <SelectItem key={option.value} value={option.value}>
                         {option.label}
                       </SelectItem>
                     ))
                   )}
                 </SelectContent>
               </Select>
               {formik.touched.categoryId && formik.errors.categoryId && (
                 <p className="text-sm text-destructive mt-1">{formik.errors.categoryId}</p>
               )}
             </div>

             <div>
               <Label className="text-base font-medium mb-2 block">
                 {t('products.productDescription')}
               </Label>
               <RichTextEditor
                 value={formik.values.description}
                 onChange={(value) => formik.setFieldValue('description', value)}
                 placeholder={""}
               />
             </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                {t('products.pricing')}
              </CardTitle>
              <CardDescription>
                {t('products.pricingDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <FloatingLabelInput
                  label={t('products.price')}
                  value={formik.values.price || ''}
                  onChange={(e) => formik.setFieldValue('price', parseFloat(e.target.value) || 0)}
                  onBlur={formik.handleBlur}
                  name="price"
                  placeholder={"00"}
                  type="number"
                  step="0.01"
                  required
                  error={formik.touched.price && formik.errors.price ? formik.errors.price : undefined}
                />
                <FloatingLabelInput
                  label={t('products.comparePrice')}
                  value={formik.values.comparePrice || ''}
                  onChange={(e) => formik.setFieldValue('comparePrice', e.target.value ? parseFloat(e.target.value) : null)}
                  onBlur={formik.handleBlur}
                  name="comparePrice"
                  placeholder={"00"}
                  type="number"
                  step="0.01"
                  error={formik.touched.comparePrice && formik.errors.comparePrice ? formik.errors.comparePrice : undefined}
                />
                <FloatingLabelInput
                  label={t('products.costPrice')}
                  value={formik.values.costPrice || ''}
                  onChange={(e) => formik.setFieldValue('costPrice', e.target.value ? parseFloat(e.target.value) : null)}
                  onBlur={formik.handleBlur}
                  name="costPrice"
                  placeholder={"00"}
                  type="number"
                  step="0.01"
                  error={formik.touched.costPrice && formik.errors.costPrice ? formik.errors.costPrice : undefined}
                />
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                {t('products.inventory')}
              </CardTitle>
              <CardDescription>
                {t('products.inventoryDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FloatingLabelInput
                  label={t('products.sku')}
                  value={formik.values.sku}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="sku"
                  placeholder={""}
                  icon={Tag}
                  error={formik.touched.sku && formik.errors.sku ? formik.errors.sku : undefined}
                />
                <FloatingLabelInput
                  label={t('products.barcode')}
                  value={formik.values.barcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="barcode"
                  placeholder={""}
                  icon={Barcode}
                  error={formik.touched.barcode && formik.errors.barcode ? formik.errors.barcode : undefined}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="track-quantity" className="text-sm cursor-pointer">
                    {t('products.trackQuantity')}
                  </Label>
                  <Switch
                    id="track-quantity"
                    checked={formik.values.trackQuantity}
                    onCheckedChange={(checked) => formik.setFieldValue('trackQuantity', checked)}
                  />
                </div>
                
                {formik.values.trackQuantity && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <FloatingLabelInput
                      label={t('products.quantity')}
                      value={formik.values.quantity.toString()}
                      onChange={(e) => formik.setFieldValue('quantity', parseInt(e.target.value) || 0)}
                      onBlur={formik.handleBlur}
                      name="quantity"
                      placeholder={"0"}
                      type="number"
                    />
                    <FloatingLabelInput
                      label={t('products.lowStockAlert')}
                      value={formik.values.lowStockAlert.toString()}
                      onChange={(e) => formik.setFieldValue('lowStockAlert', parseInt(e.target.value) || 0)}
                      onBlur={formik.handleBlur}
                      name="lowStockAlert"
                      placeholder={"10"}
                      type="number"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Weight className="h-5 w-5 text-primary" />
                {t('products.productDetails')}
              </CardTitle>
              <CardDescription>
                {t('products.productDetailsDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FloatingLabelInput
                  label={t('products.weight')}
                  value={formik.values.weight || ''}
                  onChange={(e) => formik.setFieldValue('weight', e.target.value ? parseFloat(e.target.value) : null)}
                  onBlur={formik.handleBlur}
                  name="weight"
                  placeholder={""}
                  type="number"
                  step="0.01"
                />
                <Select value={formik.values.weightUnit} onValueChange={(value) => formik.setFieldValue('weightUnit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('products.selectWeightUnit')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">{t('products.kilograms')}</SelectItem>
                    <SelectItem value="g">{t('products.grams')}</SelectItem>
                    <SelectItem value="lb">{t('products.pounds')}</SelectItem>
                    <SelectItem value="oz">{t('products.ounces')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                {t('products.productImages')}
              </CardTitle>
              <CardDescription>
                {t('products.productImagesDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductImagesWithFiles
                mainImageFile={mainImageFile}
                setMainImageFile={setMainImageFile}
                subImageFiles={subImageFiles}
                setSubImageFiles={setSubImageFiles}
              />
            </CardContent>
          </Card>

          {/* Product Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                {t('products.productStatus')}
              </CardTitle>
              <CardDescription>
                {t('products.productStatusDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    {t('products.status')}
                  </Label>
                  <Select value={formik.values.status} onValueChange={(value: ProductStatus) => formik.setFieldValue('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('products.selectStatus')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">{t('products.draft')}</SelectItem>
                      <SelectItem value="PUBLISHED">{t('products.published')}</SelectItem>
                      <SelectItem value="ARCHIVED">{t('products.archived')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is-active" className="text-sm cursor-pointer">
                      {t('products.isActive')}
                    </Label>
                    <Switch
                      id="is-active"
                      checked={formik.values.isActive}
                      onCheckedChange={(checked) => formik.setFieldValue('isActive', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is-featured" className="text-sm cursor-pointer">
                      {t('products.isFeatured')}
                    </Label>
                    <Switch
                      id="is-featured"
                      checked={formik.values.isFeatured}
                      onCheckedChange={(checked) => formik.setFieldValue('isFeatured', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <CollapsibleSection
            title={t('products.seoSettings')}
            description={t('products.seoSettingsDesc')}
            icon={<Globe className="h-5 w-5" />}
          >
            <div className="space-y-4">
              <FloatingLabelInput
                label={t('products.metaTitle')}
                value={formik.values.metaTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="metaTitle"
                placeholder={""}
              />
              <FloatingLabelTextarea
                label={t('products.metaDescription')}
                value={formik.values.metaDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="metaDescription"
                placeholder={""}
                rows={3}
                className="resize-none"
              />
              <MultiSelect
                label={t('products.metaKeywords')}
                options={[]}
                value={formik.values.metaKeywords}
                onChange={(keywords) => formik.setFieldValue('metaKeywords', keywords)}
                placeholder={t('products.enterKeywords')}
              />
            </div>
          </CollapsibleSection>


          {/* Action Buttons */}
          <Card className="border-none bg-muted/50">
            <CardContent className="flex justify-end gap-4 pt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/dashboard/products')}
                disabled={createLoading}
              >
                {t('common.cancel')}
              </Button>
              <Button
                size="lg"
                onClick={() => formik.handleSubmit()}
                disabled={createLoading}
                className="min-w-[150px]"
              >
                <Save className="h-4 w-4 mr-2" />
                {createLoading ? t('common.saving') : t('common.save')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
