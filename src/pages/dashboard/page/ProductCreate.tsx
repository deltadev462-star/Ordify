import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSEO } from "@/hooks/useSEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/ui/floating-label-input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import ProductImages from "@/components/product/ProductImages";

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
  
  // Form state - Essential Information
  const [productName, setProductName] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState<string[]>([]);
  
  // Pricing
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  
  // Inventory
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [trackQuantity, setTrackQuantity] = useState(true);
  const [quantity, setQuantity] = useState("0");
  const [lowStockAlert, setLowStockAlert] = useState("10");
  
  // Product Details
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  
  // Images - Updated to match schema
  const [mainImage, setMainImage] = useState<{ path: string; public_id: string } | null>(null);
  const [subImages, setSubImages] = useState<{ path: string; public_id: string }[]>([]);
  
  // Status
  const [productStatus, setProductStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">("DRAFT");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // Digital Products
  const [enableDigitalProduct, setEnableDigitalProduct] = useState(false);
  const [digitalProductType, setDigitalProductType] = useState("");
  
  // External Platform Integration
  const [taagerIntegration, setTaagerIntegration] = useState(false);
  const [angaznyIntegration, setAngaznyIntegration] = useState(false);
  const [externalPlatformCode, setExternalPlatformCode] = useState("");
  const [externalPlatformLink, setExternalPlatformLink] = useState("");
  
  // Advanced Settings
  const [skipCart, setSkipCart] = useState(false);
  const [buyNowButtonText, setBuyNowButtonText] = useState("");
  const [fixedBuyButton, setFixedBuyButton] = useState(false);
  const [checkoutBeforeDescription, setCheckoutBeforeDescription] = useState(false);
  const [activateReviews, setActivateReviews] = useState(false);
  const [displayFakeVisitor, setDisplayFakeVisitor] = useState(false);
  const [minVisitors, setMinVisitors] = useState("20");
  const [maxVisitors, setMaxVisitors] = useState("70");
  const [activateFakeStock, setActivateFakeStock] = useState(false);
  const [fakeStockItems, setFakeStockItems] = useState("5");
  const [fakeTimer, setFakeTimer] = useState(false);
  const [fakeTimerHours, setFakeTimerHours] = useState("1");
  const [hiddenProduct, setHiddenProduct] = useState(false);
  const [activateFreeShipping, setActivateFreeShipping] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [priority, setPriority] = useState("");

  // Auto-generate product slug from product name
  const generateProductSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setProductName(name);
    setProductSlug(generateProductSlug(name));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log({
      // Essential Information
      name: productName,
      slug: productSlug,
      shortDescription,
      description: productDescription,
      categoryId: selectedCategory,
      
      // SEO
      metaTitle,
      metaDescription,
      metaKeywords,
      
      // Pricing
      price: parseFloat(price),
      comparePrice: comparePrice ? parseFloat(comparePrice) : undefined,
      costPrice: costPrice ? parseFloat(costPrice) : undefined,
      
      // Inventory
      sku,
      barcode,
      trackQuantity,
      quantity: parseInt(quantity),
      lowStockAlert: parseInt(lowStockAlert),
      
      // Product Details
      weight: weight ? parseFloat(weight) : undefined,
      weightUnit,
      
      // Images
      mainImage,
      subImages,
      
      // Status
      status: productStatus,
      isActive,
      isFeatured,
      
      // Other fields from advanced settings...
    });
  };

  // Temporary adapter functions for ProductImages component
  const handleMainImageChange = (imageString: string | null) => {
    if (imageString) {
      // For now, we'll use a placeholder public_id
      setMainImage({ path: imageString, public_id: `main_${Date.now()}` });
    } else {
      setMainImage(null);
    }
  };

  const handleSubImagesChange = (imageStrings: string[]) => {
    setSubImages(imageStrings.map((path, index) => ({
      path,
      public_id: `sub_${Date.now()}_${index}`
    })));
  };

  const categoryOptions = [
    { value: "electronics", label: t('products.categories.electronics') },
    { value: "clothing", label: t('products.categories.clothing') },
    { value: "home", label: t('products.categories.homeGarden') },
    { value: "beauty", label: t('products.categories.healthBeauty') },
    { value: "sports", label: t('products.categories.sports') },
    { value: "toys", label: t('products.categories.toysGames') },
    { value: "books", label: t('products.categories.books') },
    { value: "food", label: t('products.categories.foodBeverages') },
  ];

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
    description: "Create a new product in your Ordify store with comprehensive details and settings",
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
                 value={productName}
                 onChange={handleProductNameChange}
                 placeholder={""}
                 required
               />
               <FloatingLabelInput
                 label={t('products.productSlug')}
                 value={productSlug}
                 onChange={(e) => setProductSlug(e.target.value)}
                 placeholder={""}
               />
             </div>

             <div className="grid gap-6 md:grid-cols-2">
               <FloatingLabelTextarea
                 label={t('products.shortDescription')}
                 value={shortDescription}
                 onChange={(e) => setShortDescription(e.target.value)}
                 placeholder={""}
                 rows={2}
                 className="resize-none"
               />
               
               <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                 <SelectTrigger>
                   <SelectValue placeholder={t('products.selectCategory')} />
                 </SelectTrigger>
                 <SelectContent>
                   {categoryOptions.map(option => (
                     <SelectItem key={option.value} value={option.value}>
                       {option.label}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>

             <div>
               <Label className="text-base font-medium mb-2 block">
                 {t('products.productDescription')}
               </Label>
               <RichTextEditor
                 value={productDescription}
                 onChange={setProductDescription}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={"00"}
                  type="number"
                  step="0.01"
                  required
                />
                <FloatingLabelInput
                  label={t('products.comparePrice')}
                  value={comparePrice}
                  onChange={(e) => setComparePrice(e.target.value)}
                  placeholder={"00"}
                  type="number"
                  step="0.01"
                />
                <FloatingLabelInput
                  label={t('products.costPrice')}
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  placeholder={"00"}
                  type="number"
                  step="0.01"
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
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder={""}
                  icon={Tag}
                />
                <FloatingLabelInput
                  label={t('products.barcode')}
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder={""}
                  icon={Barcode}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="track-quantity" className="text-sm cursor-pointer">
                    {t('products.trackQuantity')}
                  </Label>
                  <Switch
                    id="track-quantity"
                    checked={trackQuantity}
                    onCheckedChange={setTrackQuantity}
                  />
                </div>
                
                {trackQuantity && (
                  <div className="grid gap-6 md:grid-cols-2">
                    <FloatingLabelInput
                      label={t('products.quantity')}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder={"0"}
                      type="number"
                    />
                    <FloatingLabelInput
                      label={t('products.lowStockAlert')}
                      value={lowStockAlert}
                      onChange={(e) => setLowStockAlert(e.target.value)}
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
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={""}
                  type="number"
                  step="0.01"
                />
                <Select value={weightUnit} onValueChange={setWeightUnit}>
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
              <ProductImages
                mainImage={mainImage?.path || null}
                setMainImage={handleMainImageChange}
                otherImages={subImages.map(img => img.path)}
                setOtherImages={handleSubImagesChange}
                handleSave={() => {}}
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
                  <Select value={productStatus} onValueChange={(value: any) => setProductStatus(value)}>
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
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is-featured" className="text-sm cursor-pointer">
                      {t('products.isFeatured')}
                    </Label>
                    <Switch
                      id="is-featured"
                      checked={isFeatured}
                      onCheckedChange={setIsFeatured}
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
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={""}
              />
              <FloatingLabelTextarea
                label={t('products.metaDescription')}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={""}
                rows={3}
                className="resize-none"
              />
              <MultiSelect
                label={t('products.metaKeywords')}
                options={[]}
                value={metaKeywords}
                onChange={setMetaKeywords}
                placeholder={t('products.enterKeywords')}
              />
            </div>
          </CollapsibleSection>


          {/* Action Buttons */}
          <Card className="border-none bg-muted/50">
            <CardContent className="flex justify-end gap-4 pt-6">
              <Button variant="outline" size="lg">
                {t('common.cancel')}
              </Button>
              <Button
                size="lg"
                onClick={handleSave}
                className="min-w-[150px]"
              >
                <Save className="h-4 w-4 mr-2" />
                {t('common.save')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
