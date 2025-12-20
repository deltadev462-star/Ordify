import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProduct, updateProduct } from "@/store/slices/product/actions";
import { productSelectors, clearSelectedProduct } from "@/store/slices/product/productSlice";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import NotActive from "@/components/NotActive";
import type { ProductFormData, ProductStatus as ProductStatusType, ProductImage, ImageUploadData } from "@/types/product.types";
import {
  ArrowLeft,
  Save,
  Loader2,
  DollarSign,
  Package,
  Search,
  Image as ImageIcon,
  AlertCircle,
  Upload,
  X,
  Trash2,
  Plus,
  Star,
  CloudUpload,
  Eye,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

// Type for displaying images in the UI (normalizes both existing and new images)
type DisplayImage = {
  path: string;
  public_id?: string;
  isNew?: boolean;
  uploading?: boolean;
  error?: string;
};

// Validation schema using Yup
const productValidationSchema = Yup.object({
  name: Yup.string()
    .required('products.edit.basic.nameRequired')
    .trim(),
  price: Yup.number()
    .required('products.edit.pricing.priceRequired')
    .positive('products.edit.pricing.priceMin')
    .typeError('products.edit.pricing.priceInvalid'),
  comparePrice: Yup.number()
    .nullable()
    .when('price', {
      is: (price: number) => price > 0,
      then: (schema) => schema.moreThan(Yup.ref('price'), 'products.edit.pricing.comparePriceMin'),
      otherwise: (schema) => schema
    }),
  quantity: Yup.number()
    .when('trackQuantity', {
      is: true,
      then: (schema) => schema.min(0, 'products.edit.pricing.quantityMin').required('products.edit.pricing.quantityRequired'),
      otherwise: (schema) => schema.nullable()
    }),
  description: Yup.string().nullable(),
  shortDescription: Yup.string().nullable(),
  costPrice: Yup.number().nullable().positive('products.edit.pricing.costPriceMin'),
  sku: Yup.string().nullable(),
  barcode: Yup.string().nullable(),
  trackQuantity: Yup.boolean(),
  lowStockAlert: Yup.number().min(0),
  weight: Yup.number().nullable().positive(),
  weightUnit: Yup.string().oneOf(['kg', 'g', 'lb', 'oz']),
  metaTitle: Yup.string().nullable(),
  metaDescription: Yup.string().nullable(),
  metaKeywords: Yup.array().of(Yup.string()),
  status: Yup.string().oneOf(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
  isActive: Yup.boolean(),
  isFeatured: Yup.boolean(),
  categoryId: Yup.string().nullable()
});

// Modern Image item component
const ImageItem = ({ 
  image,
  index,
  onRemove,
  onView,
  isMain,
  isDragging
}: {
  image: DisplayImage;
  index: number;
  onRemove: (index: number) => void;
  onView: (image: DisplayImage) => void;
  isMain: boolean;
  isDragging?: boolean;
}) => {
  const { t } = useTranslation();
  const imagePath = image.path;
  
  return (
    <div 
      className={cn(
        "relative group cursor-pointer transition-all duration-200",
        isDragging && "opacity-50 scale-95",
        image.error && "opacity-50"
      )}
    >
      <div className={cn(
        "relative overflow-hidden rounded-xl border-2 transition-all duration-200",
        isMain ? "border-primary shadow-lg" : "border-muted hover:border-muted-foreground/50",
        image.uploading && "animate-pulse"
      )}>
        <img
          src={imagePath}
          alt={t('products.edit.images.productImageAlt', { number: index + 1 })}
          className="w-full h-48 object-cover"
          onClick={() => onView(image)}
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                onView(image);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isMain && (
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-1.5">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            </div>
          )}
          {image.isNew && (
            <Badge variant="secondary" className="bg-green-500/90 text-white">
              {t('products.edit.images.new')}
            </Badge>
          )}
          {image.uploading && (
            <Badge variant="secondary" className="bg-blue-500/90 text-white">
              {t('products.edit.images.uploading')}
            </Badge>
          )}
          {image.error && (
            <Badge variant="destructive">
              {t('products.edit.images.error')}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

function ProductEdit() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const product = useAppSelector(productSelectors.selectSelectedProduct);
  const loading = useAppSelector(productSelectors.selectProductLoading);
  const updateLoading = useAppSelector(productSelectors.selectProductUpdateLoading);
  
  // State for image handling
  const [keywordInput, setKeywordInput] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [mainImage, setMainImage] = useState<DisplayImage | null>(null);
  const [subImages, setSubImages] = useState<DisplayImage[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<DisplayImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize formik with validation schema
  const formik = useFormik<ProductFormData>({
    initialValues: {
      name: "",
      description: "",
      shortDescription: "",
      price: 0,
      comparePrice: null,
      costPrice: null,
      sku: "",
      barcode: "",
      trackQuantity: true,
      quantity: 0,
      lowStockAlert: 5,
      weight: null,
      weightUnit: "kg",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: [],
      status: "DRAFT",
      isActive: true,
      isFeatured: false,
      categoryId: null
    },
    validationSchema: productValidationSchema,
    onSubmit: async (values) => {
      if (!productId) return;
      
      try {
        // Prepare form data with all values
        const updateData = {
          ...values,
          // Add removed images if any
          ...(removedImages.length > 0 && { removedImages: JSON.stringify(removedImages) }),
        };

        // Prepare image upload data
        const imageUploadData: ImageUploadData = {
          removeSubImageIds: removedImages.filter(id => id !== mainImage?.public_id)
        };
        
        // Handle main image update
        const mainImageFile = newImages.find((_, index) => {
          // Check if this new image is meant to be the main image
          return mainImage?.isNew && !mainImage?.public_id;
        });
        
        if (mainImageFile) {
          imageUploadData.mainImage = mainImageFile;
          // Remove main image file from new images array
          const mainImageIndex = newImages.indexOf(mainImageFile);
          if (mainImageIndex > -1) {
            newImages.splice(mainImageIndex, 1);
          }
        }
        
        // Check if main image was removed
        if (mainImage === null && product?.mainImage) {
          imageUploadData.removeMainImage = true;
        }
        
        // All remaining new images are sub images
        if (newImages.length > 0) {
          imageUploadData.subImages = newImages;
        }
        
        // Remove removedImages from updateData as it will be handled by imageUploadData
        const { removedImages: _, ...cleanUpdateData } = updateData;
        
        await dispatch(updateProduct({
          productId,
          data: cleanUpdateData,
          images: imageUploadData
        })).unwrap();
        
        // Navigate back to product detail page on success
        navigate(`/dashboard/products/${productId}`);
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    }
  });

  useSEO({
    title: product ? `${t('products.edit.editProduct')} - ${product.name}` : t('products.edit.editProduct'),
    description: t('products.edit.editProductSubtitle'),
  });

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name,
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        price: product.price,
        comparePrice: product.comparePrice,
        costPrice: product.costPrice,
        sku: product.sku || "",
        barcode: product.barcode || "",
        trackQuantity: product.trackQuantity,
        quantity: product.quantity,
        lowStockAlert: product.lowStockAlert,
        weight: product.weight,
        weightUnit: product.weightUnit,
        metaTitle: product.metaTitle || "",
        metaDescription: product.metaDescription || "",
        metaKeywords: product.metaKeywords || [],
        status: product.status,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        categoryId: product.categoryId
      });
      
      // Setup existing images
      if (product.mainImage) {
        setMainImage({
          path: product.mainImage.path,
          public_id: product.mainImage.public_id
        });
      }
      if (product.subImages && product.subImages.length > 0) {
        setSubImages(product.subImages.map(img => ({
          path: img.path,
          public_id: img.public_id
        })));
      }
    }
  }, [product]);

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const currentKeywords = formik.values.metaKeywords || [];
      formik.setFieldValue('metaKeywords', [...currentKeywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const currentKeywords = formik.values.metaKeywords || [];
    formik.setFieldValue('metaKeywords', currentKeywords.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImages([...newImages, ...files]);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      setNewImages([...newImages, ...files]);
    }
  };

  const handleRemoveImage = (type: 'main' | 'sub' | 'new', index: number) => {
    if (type === 'main' && mainImage) {
      if (mainImage.public_id) {
        setRemovedImages([...removedImages, mainImage.public_id]);
      }
      setMainImage(null);
    } else if (type === 'sub') {
      const image = subImages[index];
      if (image.public_id) {
        setRemovedImages([...removedImages, image.public_id]);
      }
      setSubImages(subImages.filter((_, i) => i !== index));
    } else if (type === 'new') {
      setNewImages(newImages.filter((_, i) => i !== index));
    }
  };

  const handleViewImage = (image: DisplayImage) => {
    setSelectedImage(image);
  };

  const handleGoBack = () => {
    navigate(`/dashboard/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t('products.productNotFound', 'Product not found')}</p>
        <Button onClick={() => navigate("/dashboard/products")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('products.backToProducts', 'Back to Products')}
        </Button>
      </div>
    );
  }

  // Prepare new images for display
  const displayNewImages: DisplayImage[] = newImages.map((file) => ({
    path: URL.createObjectURL(file),
    public_id: '',
    isNew: true
  }));

  return (
    <div className="flex flex-col gap-4 max-w-5xl mx-auto">
      <NotActive />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="rounded-lg"
            disabled={updateLoading}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">{t('products.edit.editProduct')}</h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            disabled={updateLoading}
          >
            {t('products.edit.cancel')}
          </Button>
          <Button 
            onClick={() => formik.handleSubmit()}
            disabled={updateLoading || !formik.isValid}
            className="min-w-[100px]"
          >
            {updateLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('products.edit.saving')}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {t('products.edit.saveChanges')}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <Tabs defaultValue="basic" dir={isRTL ? "rtl" : "ltr"} className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full bg-gray-100 dark:bg-gray-800/50">
          <TabsTrigger
            value="basic"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700 transition-all"
          >
            {t('products.edit.tabs.basic')}
          </TabsTrigger>
          <TabsTrigger
            value="images"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700 transition-all"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            {t('products.edit.tabs.images')}
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700 transition-all"
          >
            {t('products.edit.tabs.pricing')}
          </TabsTrigger>
          <TabsTrigger
            value="inventory"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700 transition-all"
          >
            {t('products.inventory')}
          </TabsTrigger>
          <TabsTrigger
            value="seo"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700 transition-all"
          >
            {t('products.edit.tabs.seo')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('products.edit.basic.productDetails')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  {t('products.edit.basic.productName')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={cn(formik.touched.name && formik.errors.name && "border-destructive")}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {t(formik.errors.name)}
                  </p>
                )}
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <Label htmlFor="shortDescription">{t('products.edit.basic.shortDescription')}</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formik.values.shortDescription || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={2}
                  className="resize-none"
                  placeholder={t('products.edit.basic.shortDescriptionPlaceholder')}
                />
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t('products.edit.basic.description')}</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formik.values.description || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={6}
                  className="resize-none"
                  placeholder={t('products.edit.basic.descriptionPlaceholder')}
                />
              </div>

              {/* Status and Visibility */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">{t('products.edit.basic.status')}</Label>
                  <Select
                    value={formik.values.status}
                    onValueChange={(value: ProductStatusType) => formik.setFieldValue('status', value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">{t('products.edit.basic.draft')}</SelectItem>
                      <SelectItem value="PUBLISHED">{t('products.edit.basic.published')}</SelectItem>
                      <SelectItem value="ARCHIVED">{t('products.edit.basic.archived')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label htmlFor="active">{t('products.edit.basic.active')}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t('products.edit.basic.activeDescription')}
                    </p>
                  </div>
                  <Switch
                    id="active"
                    checked={formik.values.isActive}
                    onCheckedChange={(checked) => formik.setFieldValue('isActive', checked)}
                    className={cn(
                      "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200",
                      "data-[state=checked]:border-green-500 data-[state=unchecked]:border-gray-200"
                    )}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">{t('products.edit.basic.featured')}</Label>
                    <p className="text-xs text-muted-foreground">
                      {t('products.edit.basic.featuredDescription')}
                    </p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formik.values.isFeatured}
                    onCheckedChange={(checked) => formik.setFieldValue('isFeatured', checked)}
                    className={cn(
                      "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200",
                      "data-[state=checked]:border-green-500 data-[state=unchecked]:border-gray-200"
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          {/* Main Image Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  {t('products.edit.images.mainImage')}
                </span>
                {mainImage && (
                  <Badge variant="outline" className="ml-auto">
                    <Check className="mr-1 h-3 w-3" />
                    {t('common.saved')}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mainImage ? (
                <div className="space-y-4">
                  <div className="relative group w-full max-w-sm mx-auto">
                    <ImageItem
                      image={mainImage}
                      index={0}
                      onRemove={() => handleRemoveImage('main', 0)}
                      onView={handleViewImage}
                      isMain={true}
                    />
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            // Handle main image replacement
                            setNewImages([file]);
                            if (mainImage.public_id) {
                              setRemovedImages([...removedImages, mainImage.public_id]);
                            }
                            setMainImage({
                              path: URL.createObjectURL(file),
                              public_id: '',
                              isNew: true
                            });
                          }
                        };
                        input.click();
                      }}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {t('products.edit.images.changeImage')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {t('products.edit.images.noMainImage', 'No main image set')}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('products.edit.images.mainImageDescription', 'The main image is the primary product photo')}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          setNewImages([file]);
                          setMainImage({
                            path: URL.createObjectURL(file),
                            public_id: '',
                            isNew: true
                          });
                        }
                      };
                      input.click();
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {t('products.edit.images.uploadMainImage', 'Upload Main Image')}
                  </Button>
                </div>
              )}
              <p className="text-sm text-muted-foreground mt-4">
                {t('products.edit.images.mainImageHelp', 'The main image is displayed as the primary product photo in listings and detail pages.')}
              </p>
            </CardContent>
          </Card>

          {/* Additional Images Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  {t('products.edit.images.subImages', 'Additional Images')}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {subImages.length + displayNewImages.length} {t('products.edit.images.images', 'images')}
                  </Badge>
                  {(removedImages.length > 0 || displayNewImages.length > 0) && (
                    <Badge variant="outline">
                      <Check className="mr-1 h-3 w-3" />
                      {t('products.edit.images.changesNotSaved')}
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Section */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200",
                  isDragging ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/50"
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <CloudUpload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-base font-medium mb-1">
                  {t('products.edit.images.dragDropTitle')}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('products.edit.images.dragDropDescription')}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {t('products.edit.images.selectFiles')}
                </Button>
              </div>

              {/* Additional Images Display */}
              {(subImages.length > 0 || displayNewImages.length > 0) ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Existing sub images */}
                    {subImages.map((image, index) => (
                      <ImageItem
                        key={`sub-${index}`}
                        image={image}
                        index={index}
                        onRemove={() => handleRemoveImage('sub', index)}
                        onView={handleViewImage}
                        isMain={false}
                      />
                    ))}
                    
                    {/* New images */}
                    {displayNewImages.map((image, index) => (
                      <ImageItem
                        key={`new-${index}`}
                        image={image}
                        index={subImages.length + index}
                        onRemove={() => handleRemoveImage('new', index)}
                        onView={handleViewImage}
                        isMain={false}
                      />
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {t('products.edit.images.additionalImagesHelp', 'Additional images are shown in the product gallery and can be viewed by customers.')}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium mb-1">
                    {t('products.edit.images.noAdditionalImages', 'No additional images')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('products.edit.images.additionalImagesDescription', 'Add more photos to show different angles or details')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Image Guidelines */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">{t('products.edit.images.guidelines', 'Image Guidelines')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('products.edit.images.guideline1', 'Use high-quality images with good lighting')}</li>
                    <li>• {t('products.edit.images.guideline2', 'Recommended size: 1000x1000px or larger')}</li>
                    <li>• {t('products.edit.images.guideline3', 'Supported formats: PNG, JPG, JPEG, WebP')}</li>
                    <li>• {t('products.edit.images.guideline4', 'Maximum file size: 5MB per image')}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('products.edit.pricing.pricingDetails')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Selling Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">
                    {t('products.edit.pricing.price')} <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn("pl-9", formik.touched.price && formik.errors.price && "border-destructive")}
                    />
                  </div>
                  {formik.touched.price && formik.errors.price && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {t(formik.errors.price)}
                    </p>
                  )}
                </div>

                {/* Compare Price */}
                <div className="space-y-2">
                  <Label htmlFor="comparePrice">{t('products.edit.pricing.comparePrice')}</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="comparePrice"
                      name="comparePrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formik.values.comparePrice || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn("pl-9", formik.touched.comparePrice && formik.errors.comparePrice && "border-destructive")}
                      placeholder="0.00"
                    />
                  </div>
                  {formik.touched.comparePrice && formik.errors.comparePrice && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {t(formik.errors.comparePrice)}
                    </p>
                  )}
                </div>

                {/* Cost Price */}
                <div className="space-y-2">
                  <Label htmlFor="costPrice">{t('products.edit.pricing.costPrice')}</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="costPrice"
                      name="costPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formik.values.costPrice || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="pl-9"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('products.edit.pricing.costPriceDescription', 'Customers won\'t see this price')}
                  </p>
                </div>

                {/* Profit Margin */}
                {formik.values.costPrice && (
                  <div className="space-y-2">
                    <Label>{t('products.margin')}</Label>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-semibold text-success">
                        {((formik.values.price - formik.values.costPrice) / formik.values.price * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${(formik.values.price - formik.values.costPrice).toFixed(2)} {t('products.profitPerItem', 'profit per item')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('products.edit.pricing.inventoryManagement')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SKU */}
                <div className="space-y-2">
                  <Label htmlFor="sku">{t('products.edit.pricing.sku')}</Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formik.values.sku || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t('products.edit.pricing.skuPlaceholder')}
                  />
                </div>

                {/* Barcode */}
                <div className="space-y-2">
                  <Label htmlFor="barcode">{t('products.edit.pricing.barcode')}</Label>
                  <Input
                    id="barcode"
                    name="barcode"
                    value={formik.values.barcode || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t('products.edit.pricing.barcodePlaceholder')}
                  />
                </div>
              </div>

              {/* Track Quantity */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-0.5">
                    <Label htmlFor="trackQuantity">{t('products.edit.pricing.trackQuantity')}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t('products.edit.pricing.trackQuantityDescription')}
                    </p>
                  </div>
                  <Switch
                    id="trackQuantity"
                    checked={formik.values.trackQuantity}
                    onCheckedChange={(checked) => formik.setFieldValue('trackQuantity', checked)}
                    className={cn(
                      "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200",
                      "data-[state=checked]:border-green-500 data-[state=unchecked]:border-gray-200"
                    )}
                  />
                </div>

                {formik.values.trackQuantity && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Quantity */}
                    <div className="space-y-2">
                      <Label htmlFor="quantity">{t('products.edit.pricing.quantity')}</Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="0"
                          value={formik.values.quantity}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={cn("pl-9", formik.touched.quantity && formik.errors.quantity && "border-destructive")}
                        />
                      </div>
                      {formik.touched.quantity && formik.errors.quantity && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {t(formik.errors.quantity)}
                        </p>
                      )}
                    </div>

                    {/* Low Stock Alert */}
                    <div className="space-y-2">
                      <Label htmlFor="lowStockAlert">{t('products.edit.pricing.lowStockAlert')}</Label>
                      <Input
                        id="lowStockAlert"
                        name="lowStockAlert"
                        type="number"
                        min="0"
                        value={formik.values.lowStockAlert}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <p className="text-xs text-muted-foreground">
                        {t('products.edit.pricing.lowStockAlertDescription', 'Get notified when stock falls below this level')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping */}
              <div className="space-y-4">
                <h3 className="font-medium">{t('products.shipping')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">{t('products.edit.pricing.weight')}</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formik.values.weight || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="0.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weightUnit">{t('products.edit.pricing.weightUnit')}</Label>
                    <Select
                      value={formik.values.weightUnit}
                      onValueChange={(value) => formik.setFieldValue('weightUnit', value)}
                    >
                      <SelectTrigger id="weightUnit">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">{t('products.edit.pricing.kg')}</SelectItem>
                        <SelectItem value="g">{t('products.edit.pricing.g')}</SelectItem>
                        <SelectItem value="lb">{t('products.edit.pricing.lb')}</SelectItem>
                        <SelectItem value="oz">{t('products.edit.pricing.oz')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('products.edit.seo.seoSettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SEO Title */}
              <div className="space-y-2">
                <Label htmlFor="metaTitle">{t('products.edit.seo.metaTitle')}</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={formik.values.metaTitle || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={formik.values.name || t('products.edit.seo.metaTitlePlaceholder')}
                />
                <p className="text-xs text-muted-foreground">
                  {formik.values.metaTitle?.length || 0} {t('products.edit.seo.of60Characters', 'of 60 characters used')}
                </p>
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <Label htmlFor="metaDescription">{t('products.edit.seo.metaDescription')}</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formik.values.metaDescription || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows={3}
                  className="resize-none"
                  placeholder={t('products.edit.seo.metaDescriptionPlaceholder')}
                />
                <p className="text-xs text-muted-foreground">
                  {formik.values.metaDescription?.length || 0} {t('products.edit.seo.of160Characters', 'of 160 characters used')}
                </p>
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <Label>{t('products.edit.seo.metaKeywords')}</Label>
                <div className="flex gap-2">
                  <Input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddKeyword())}
                    placeholder={t('products.edit.seo.keywordPlaceholder')}
                  />
                  <Button
                    type="button"
                    onClick={handleAddKeyword}
                    disabled={!keywordInput.trim()}
                  >
                    {t('products.edit.seo.addKeyword')}
                  </Button>
                </div>
                {formik.values.metaKeywords && formik.values.metaKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formik.values.metaKeywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                      >
                        <span>{keyword}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(index)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Image Preview Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{t('products.edit.images.imagePreview')}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="p-6 pt-0">
              <img
                src={selectedImage.path}
                alt="Product preview"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductEdit;