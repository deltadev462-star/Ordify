import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProduct } from "@/store/slices/product/actions";
import { productSelectors, clearSelectedProduct } from "@/store/slices/product/productSlice";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import type { Product } from "@/types/product.types";
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  DollarSign, 
  BarChart3, 
  Eye,
  ShoppingCart,
  AlertTriangle,
  Image as ImageIcon,
  Info,
  Search,
  Copy,
  ExternalLink
} from "lucide-react";

function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const product = useAppSelector(productSelectors.selectSelectedProduct);
  const loading = useAppSelector(productSelectors.selectProductLoading);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useSEO({
    title: product ? `${product.name} - Product Detail` : "Product Detail",
    description: product?.metaDescription || product?.shortDescription || "View and manage product details",
  });

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  const handleGoBack = () => {
    navigate("/dashboard/products");
  };

  const handleEdit = () => {
    navigate(`/dashboard/products/${productId}/edit`);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      PUBLISHED: "default",
      DRAFT: "secondary",
      ARCHIVED: "outline"
    };
    
    const statusKey = status.toLowerCase();
    return <Badge variant={variants[status] || "outline"}>
      {t(`products.detail.statuses.${statusKey}`) || status}
    </Badge>;
  };

  const getStockStatus = (product: Product) => {
    if (!product.trackQuantity) return { label: t('products.detail.inStock'), color: "text-success" };
    if (product.quantity === 0) return { label: t('products.detail.outOfStock'), color: "text-destructive" };
    if (product.quantity <= product.lowStockAlert) return { label: t('products.detail.lowStock'), color: "text-amber-600" };
    return { label: t('products.detail.inStock'), color: "text-success" };
  };

  const renderProductImages = () => {
    const allImages = [
      product?.mainImage,
      ...(product?.subImages || [])
    ].filter(Boolean);

    if (allImages.length === 0) {
      return (
        <div className="w-full h-96 bg-muted rounded-xl flex items-center justify-center">
          <ImageIcon className="h-24 w-24 text-muted-foreground opacity-50" />
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Main Image Display */}
        <div className="relative h-96 bg-muted rounded-xl overflow-hidden">
          <img
            src={allImages[selectedImageIndex]?.path}
            alt={product?.name}
            className="w-full h-full object-contain"
          />
          {product?.isFeatured && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {t('products.detail.featured')}
            </Badge>
          )}
        </div>
        
        {/* Thumbnail Images */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index 
                    ? "border-primary ring-2 ring-primary/20" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={image?.path}
                  alt={`${product?.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{t('products.detail.productNotFound')}</p>
        <Button onClick={handleGoBack} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('products.detail.backToProducts')}
        </Button>
      </div>
    );
  }

  const stockStatus = getStockStatus(product);

  return (
    <div className="flex flex-col gap-4">
      <NotActive />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{t('products.detail.sku')}: {product.sku || t('products.detail.notAvailable')}</p>
          </div>
        </div>
        <Button onClick={handleEdit} className="rounded-xl">
          <Edit className="h-4 w-4 mr-2" />
          {t('products.detail.editProduct')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Images */}
        <div>{renderProductImages()}</div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Status and Stock */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t('products.detail.status')}:</span>
                  {getStatusBadge(product.status)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t('products.detail.active')}:</span>
                  <Badge variant={product.isActive ? "default" : "secondary"}>
                    {product.isActive ? t('products.detail.yes') : t('products.detail.no')}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className={`font-medium ${stockStatus.color}`}>
                    {stockStatus.label}
                  </span>
                </div>
                {product.trackQuantity && (
                  <span className="text-sm text-muted-foreground">
                    {product.quantity} {t('products.detail.unitsAvailable')}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{t('products.detail.pricing')}</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t('products.detail.sellingPrice')}</span>
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                </div>
                
                {product.comparePrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('products.detail.comparePrice')}</span>
                    <span className="text-lg line-through text-muted-foreground">
                      ${product.comparePrice.toFixed(2)}
                    </span>
                  </div>
                )}
                
                {product.costPrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('products.detail.costPrice')}</span>
                    <span>${product.costPrice.toFixed(2)}</span>
                  </div>
                )}
                
                {product.comparePrice && product.comparePrice > product.price && (
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-success font-medium">{t('products.detail.discount')}</span>
                      <span className="text-sm text-success font-medium">
                        {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% {t('products.detail.off')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{t('products.detail.performance')}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{t('products.detail.views')}</span>
                  </div>
                  <p className="text-2xl font-semibold">{product.viewCount}</p>
                </div>
                
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm">{t('products.detail.sold')}</span>
                  </div>
                  <p className="text-2xl font-semibold">{product.soldCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="details" dir={isRTL ? "rtl" : "ltr"} className="mt-6">
        <TabsList className="grid grid-cols-3 lg:grid-cols-5 w-full lg:w-auto">
          <TabsTrigger value="details">{t('products.detail.tabs.details')}</TabsTrigger>
          <TabsTrigger value="inventory">{t('products.detail.tabs.inventory')}</TabsTrigger>
          <TabsTrigger value="seo">{t('products.detail.tabs.seo')}</TabsTrigger>
          <TabsTrigger value="shipping" className="hidden lg:block">{t('products.detail.tabs.shipping')}</TabsTrigger>
          <TabsTrigger value="raw" className="hidden lg:block">{t('products.detail.tabs.rawData')}</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{t('products.detail.shortDescription')}</h3>
                  <p className="text-muted-foreground">
                    {product.shortDescription || t('products.detail.noShortDescription')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">{t('products.detail.fullDescription')}</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.description || t('products.detail.noDescription')}
                  </p>
                </div>
                
                {product.category && (
                  <div>
                    <h3 className="font-semibold mb-2">{t('products.detail.category')}</h3>
                    <Badge variant="secondary">{product.category.name}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{t('products.detail.sku')}:</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {product.sku || t('products.detail.notSet')}
                    </code>
                    {product.sku && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopyToClipboard(product.sku!)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{t('products.detail.barcode')}:</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {product.barcode || t('products.detail.notSet')}
                    </code>
                    {product.barcode && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopyToClipboard(product.barcode!)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{t('products.detail.trackQuantity')}:</span>
                    <Badge variant={product.trackQuantity ? "default" : "secondary"}>
                      {product.trackQuantity ? t('products.detail.enabled') : t('products.detail.disabled')}
                    </Badge>
                  </div>
                  
                  {product.trackQuantity && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{t('products.detail.currentStock')}:</span>
                        <span className="font-semibold">{product.quantity} {t('products.detail.units')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium">{t('products.detail.lowStockAlert')}:</span>
                        <span>{product.lowStockAlert} {t('products.detail.units')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    {t('products.detail.seoTitle')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.metaTitle || product.name}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">{t('products.detail.metaDescription')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.metaDescription || t('products.detail.noMetaDescription')}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">{t('products.detail.keywords')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.metaKeywords.length > 0 ? (
                      product.metaKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary">
                          {keyword}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">{t('products.detail.noKeywords')}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">{t('products.detail.urlSlug')}</h3>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded flex-1">
                      /products/{product.slug}
                    </code>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">{t('products.detail.weight')}</h3>
                    <p className="text-muted-foreground">
                      {product.weight ? `${product.weight} ${product.weightUnit}` : t('products.detail.notSpecified')}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">{t('products.detail.weightUnit')}</h3>
                    <p className="text-muted-foreground">{product.weightUnit}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">
                    <Info className="h-4 w-4 inline mr-1" />
                    {t('products.detail.shippingNote')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="raw" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                {JSON.stringify(product, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductDetail;