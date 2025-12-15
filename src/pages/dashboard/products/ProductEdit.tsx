import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import NotActive from "@/components/NotActive";
import type { ProductFormData, ProductStatus as ProductStatusType } from "@/types/product.types";
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
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

function ProductEdit() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const product = useAppSelector(productSelectors.selectSelectedProduct);
  const loading = useAppSelector(productSelectors.selectProductLoading);
  const updateLoading = useAppSelector(productSelectors.selectProductUpdateLoading);
  
  // Form state
  const [formData, setFormData] = useState<ProductFormData>({
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
  });
  
  const [keywordInput, setKeywordInput] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

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
      setFormData({
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
    }
  }, [product]);

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      setFormData(prev => ({
        ...prev,
        metaKeywords: [...(prev.metaKeywords || []), keywordInput.trim()]
      }));
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metaKeywords: prev.metaKeywords?.filter((_, i) => i !== index) || []
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('products.edit.basic.nameRequired');
    }
    
    if (formData.price <= 0) {
      newErrors.price = t('products.edit.pricing.priceMin');
    }
    
    if (formData.comparePrice && formData.comparePrice <= formData.price) {
      newErrors.comparePrice = t('products.edit.pricing.comparePriceMin');
    }
    
    if (formData.trackQuantity && (formData.quantity ?? 0) < 0) {
      newErrors.quantity = t('products.edit.pricing.quantityMin');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log({errors} )
    if (!validateForm() || !productId) return;
    
    try {
      await dispatch(updateProduct({
        productId,
        data: formData,
        images: undefined // Handle image updates separately
      })).unwrap();
      
      // Navigate back to product detail page on success
      navigate(`/dashboard/products/${productId}`);
    } catch (error) {
      console.error("Failed to update product:", error);
    }
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
            onClick={handleSubmit}
            disabled={updateLoading}
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
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full bg-gray-100 dark:bg-gray-800/50">
          <TabsTrigger
            value="basic"
            className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-gray-200 dark:data-[state=active]:border-gray-700 transition-all"
          >
            {t('products.edit.tabs.basic')}
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
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={cn(errors.name && "border-destructive")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <Label htmlFor="shortDescription">{t('products.edit.basic.shortDescription')}</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription || ""}
                  onChange={(e) => handleInputChange("shortDescription", e.target.value)}
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
                  value={formData.description || ""}
                  onChange={(e) => handleInputChange("description", e.target.value)}
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
                    value={formData.status}
                    onValueChange={(value: ProductStatusType) => handleInputChange("status", value)}
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
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleInputChange("isActive", checked)}
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
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
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
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                      className={cn("pl-9", errors.price && "border-destructive")}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.price}
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
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.comparePrice || ""}
                      onChange={(e) => handleInputChange("comparePrice", parseFloat(e.target.value) || null)}
                      className={cn("pl-9", errors.comparePrice && "border-destructive")}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.comparePrice && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.comparePrice}
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
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.costPrice || ""}
                      onChange={(e) => handleInputChange("costPrice", parseFloat(e.target.value) || null)}
                      className="pl-9"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('products.edit.pricing.costPriceDescription', 'Customers won\'t see this price')}
                  </p>
                </div>

                {/* Profit Margin */}
                {formData.costPrice && (
                  <div className="space-y-2">
                    <Label>{t('products.margin')}</Label>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-semibold text-success">
                        {((formData.price - formData.costPrice) / formData.price * 100).toFixed(1)}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${(formData.price - formData.costPrice).toFixed(2)} {t('products.profitPerItem', 'profit per item')}
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
                    value={formData.sku || ""}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    placeholder={t('products.edit.pricing.skuPlaceholder')}
                  />
                </div>

                {/* Barcode */}
                <div className="space-y-2">
                  <Label htmlFor="barcode">{t('products.edit.pricing.barcode')}</Label>
                  <Input
                    id="barcode"
                    value={formData.barcode || ""}
                    onChange={(e) => handleInputChange("barcode", e.target.value)}
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
                    checked={formData.trackQuantity}
                    onCheckedChange={(checked) => handleInputChange("trackQuantity", checked)}
                    className={cn(
                      "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200",
                      "data-[state=checked]:border-green-500 data-[state=unchecked]:border-gray-200"
                    )}
                  />
                </div>

                {formData.trackQuantity && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Quantity */}
                    <div className="space-y-2">
                      <Label htmlFor="quantity">{t('products.edit.pricing.quantity')}</Label>
                      <div className="relative">
                        <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="quantity"
                          type="number"
                          min="0"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 0)}
                          className={cn("pl-9", errors.quantity && "border-destructive")}
                        />
                      </div>
                      {errors.quantity && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.quantity}
                        </p>
                      )}
                    </div>

                    {/* Low Stock Alert */}
                    <div className="space-y-2">
                      <Label htmlFor="lowStockAlert">{t('products.edit.pricing.lowStockAlert')}</Label>
                      <Input
                        id="lowStockAlert"
                        type="number"
                        min="0"
                        value={formData.lowStockAlert}
                        onChange={(e) => handleInputChange("lowStockAlert", parseInt(e.target.value) || 0)}
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
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.weight || ""}
                      onChange={(e) => handleInputChange("weight", parseFloat(e.target.value) || null)}
                      placeholder="0.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weightUnit">{t('products.edit.pricing.weightUnit')}</Label>
                    <Select
                      value={formData.weightUnit}
                      onValueChange={(value) => handleInputChange("weightUnit", value)}
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
                  value={formData.metaTitle || ""}
                  onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                  placeholder={formData.name || t('products.edit.seo.metaTitlePlaceholder')}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.metaTitle?.length || 0} {t('products.edit.seo.of60Characters', 'of 60 characters used')}
                </p>
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <Label htmlFor="metaDescription">{t('products.edit.seo.metaDescription')}</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.metaDescription || ""}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  rows={3}
                  className="resize-none"
                  placeholder={t('products.edit.seo.metaDescriptionPlaceholder')}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.metaDescription?.length || 0} {t('products.edit.seo.of160Characters', 'of 160 characters used')}
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
                {formData.metaKeywords && formData.metaKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.metaKeywords.map((keyword, index) => (
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
    </div>
  );
}

export default ProductEdit;