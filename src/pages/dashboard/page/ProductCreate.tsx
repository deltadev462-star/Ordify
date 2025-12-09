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
  Star
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
  const [productLink, setProductLink] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productDescription, setProductDescription] = useState("");
  
  // Pricing & Inventory
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [productExpense, setProductExpense] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [trackStock, setTrackStock] = useState(false);
  const [disableWhenOutOfStock, setDisableWhenOutOfStock] = useState(false);
  
  // Images
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [otherImages, setOtherImages] = useState<string[]>([]);

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

  // Auto-generate product link from product name
  const generateProductLink = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setProductName(name);
    setProductLink(generateProductLink(name));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log({
      productName,
      productLink,
      metaDescription,
      price,
      salePrice,
      productExpense,
      priority,
      selectedCategories,
      productDescription,
      stockQuantity,
      trackStock,
      disableWhenOutOfStock,
      mainImage,
      otherImages,
      // Other fields...
    });
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
            
              </div>

              <div className="grid gap-6 md:grid-cols-2">
               
                <MultiSelect
                  label={t('products.productCategories')}
                  options={categoryOptions}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  placeholder={""}
                />
              </div>

              <FloatingLabelTextarea
                label={t('products.metaDescription')}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={""}
                rows={3}
                className="resize-none"
              />

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

          {/* Pricing & Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                {t('products.pricingInventory')}
              </CardTitle>
              <CardDescription>
                {t('products.pricingInventoryDesc')}
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
                  label={t('products.salePrice')}
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  placeholder={"00"}
                  type="number"
                  step="0.01"
                />
                <FloatingLabelInput
                  label={t('products.productExpense')}
                  value={productExpense}
                  onChange={(e) => setProductExpense(e.target.value)}
                  placeholder={"00"}
                  type="number"
                  step="0.01"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">{t('products.stockManagement')}</h4>
                <div className="grid gap-6 md:grid-cols-2">
                  <FloatingLabelInput
                    label={t('products.stockQuantity')}
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder={"0"}
                    type="number"
                    disabled={!trackStock}
                  />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="track-stock" className="text-sm cursor-pointer">
                        {t('products.trackStock')}
                      </Label>
                      <Switch
                        id="track-stock"
                        checked={trackStock}
                        onCheckedChange={setTrackStock}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="disable-out-of-stock" className="text-sm cursor-pointer">
                        {t('products.disableWhenOutOfStock')}
                      </Label>
                      <Switch
                        id="disable-out-of-stock"
                        checked={disableWhenOutOfStock}
                        onCheckedChange={setDisableWhenOutOfStock}
                        disabled={!trackStock}
                      />
                    </div>
                  </div>
                </div>
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
                mainImage={mainImage}
                setMainImage={setMainImage}
                otherImages={otherImages}
                setOtherImages={setOtherImages}
                handleSave={() => {}}
              />
            </CardContent>
          </Card>

          {/* Advanced Options - Collapsible Sections */}
          <div className="space-y-4">
            {/* Digital Product Settings */}
            <CollapsibleSection
              title={t('products.digitalProducts')}
              description={t('products.digitalProductsDesc')}
              icon={<Zap className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="digital-product" className="text-sm cursor-pointer">
                    {t('products.enableDigitalProduct')}
                  </Label>
                  <Switch
                    id="digital-product"
                    checked={enableDigitalProduct}
                    onCheckedChange={setEnableDigitalProduct}
                  />
                </div>
                {enableDigitalProduct && (
                  <FloatingLabelInput
                    label={t('products.digitalProductType')}
                    value={digitalProductType}
                    onChange={(e) => setDigitalProductType(e.target.value)}
                    placeholder={""}
                  />
                )}
              </div>
            </CollapsibleSection>

            {/* External Platform Integration */}
            <CollapsibleSection
              title={t('products.linkToExternalPlatform')}
              description={t('products.externalPlatformDesc')}
              icon={<Globe className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="taager" className="text-sm cursor-pointer">
                      {t('products.activateTaagerIntegration')}
                    </Label>
                    <Switch
                      id="taager"
                      checked={taagerIntegration}
                      onCheckedChange={setTaagerIntegration}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="angazny" className="text-sm cursor-pointer">
                      {t('products.activateAngaznyIntegration')}
                    </Label>
                    <Switch
                      id="angazny"
                      checked={angaznyIntegration}
                      onCheckedChange={setAngaznyIntegration}
                    />
                  </div>
                </div>
                {(taagerIntegration || angaznyIntegration) && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <FloatingLabelInput
                      label={t('products.externalProductCode')}
                      value={externalPlatformCode}
                      onChange={(e) => setExternalPlatformCode(e.target.value)}
                      placeholder={""}
                    />
                    <FloatingLabelInput
                      label={t('products.externalProductLink')}
                      value={externalPlatformLink}
                      onChange={(e) => setExternalPlatformLink(e.target.value)}
                      placeholder={""}
                      icon={Globe}
                    />
                  </div>
                )}
              </div>
            </CollapsibleSection>

            {/* Marketing Features */}
            <CollapsibleSection
              title={t('products.marketingFeatures')}
              description={t('products.marketingFeaturesDesc')}
              icon={<Star className="h-5 w-5" />}
            >
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reviews" className="text-sm cursor-pointer">
                        {t('products.activateReviews')}
                      </Label>
                      <Switch
                        id="reviews"
                        checked={activateReviews}
                        onCheckedChange={setActivateReviews}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="free-shipping" className="text-sm cursor-pointer">
                        {t('products.activateFreeShipping')}
                      </Label>
                      <Switch
                        id="free-shipping"
                        checked={activateFreeShipping}
                        onCheckedChange={setActivateFreeShipping}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="fake-visitors" className="text-sm cursor-pointer">
                        {t('products.displayFakeVisitorCounter')}
                      </Label>
                      <Switch
                        id="fake-visitors"
                        checked={displayFakeVisitor}
                        onCheckedChange={setDisplayFakeVisitor}
                      />
                    </div>
                    {displayFakeVisitor && (
                      <div className="grid grid-cols-2 gap-4">
                        <FloatingLabelInput
                          label={t('products.minVisitors')}
                          value={minVisitors}
                          onChange={(e) => setMinVisitors(e.target.value)}
                          placeholder="20"
                          type="number"
                        />
                        <FloatingLabelInput
                          label={t('products.maxVisitors')}
                          value={maxVisitors}
                          onChange={(e) => setMaxVisitors(e.target.value)}
                          placeholder="70"
                          type="number"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fake-stock" className="text-sm cursor-pointer">
                      {t('products.activateFakeStock')}
                    </Label>
                    <Switch
                      id="fake-stock"
                      checked={activateFakeStock}
                      onCheckedChange={setActivateFakeStock}
                    />
                  </div>
                  {activateFakeStock && (
                    <FloatingLabelInput
                      label={t('products.fakeStockItems')}
                      value={fakeStockItems}
                      onChange={(e) => setFakeStockItems(e.target.value)}
                      placeholder="5"
                      type="number"
                    />
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="timer" className="text-sm cursor-pointer">
                      {t('products.fakeTimer')}
                    </Label>
                    <Switch
                      id="timer"
                      checked={fakeTimer}
                      onCheckedChange={setFakeTimer}
                    />
                  </div>
                  {fakeTimer && (
                    <FloatingLabelInput
                      label={t('products.fakeTimerHours')}
                      value={fakeTimerHours}
                      onChange={(e) => setFakeTimerHours(e.target.value)}
                      placeholder="1"
                      type="number"
                    />
                  )}
                </div>
              </div>
            </CollapsibleSection>

            {/* Purchase Settings */}
            <CollapsibleSection
              title={t('products.purchaseSettings')}
              description={t('products.purchaseSettingsDesc')}
              icon={<Truck className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="skip-cart" className="text-sm cursor-pointer">
                    {t('products.skipCart')}
                  </Label>
                  <Switch
                    id="skip-cart"
                    checked={skipCart}
                    onCheckedChange={setSkipCart}
                  />
                </div>
                {skipCart && (
                  <FloatingLabelInput
                    label={t('products.buyNowButtonText')}
                    value={buyNowButtonText}
                    onChange={(e) => setBuyNowButtonText(e.target.value)}
                    placeholder={t('products.buyNowButtonPlaceholder')}
                  />
                )}
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="fixed-buy" className="text-sm cursor-pointer">
                    {t('products.fixedBuyButton')}
                  </Label>
                  <Switch
                    id="fixed-buy"
                    checked={fixedBuyButton}
                    onCheckedChange={setFixedBuyButton}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="checkout-first" className="text-sm cursor-pointer">
                    {t('products.checkoutBeforeDescription')}
                  </Label>
                  <Switch
                    id="checkout-first"
                    checked={checkoutBeforeDescription}
                    onCheckedChange={setCheckoutBeforeDescription}
                  />
                </div>
              </div>
            </CollapsibleSection>

            {/* Additional Settings */}
            <CollapsibleSection
              title={t('products.advancedSettings')}
              description={t('products.advancedSettingsDesc')}
              icon={<Settings className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <MultiSelect
                    label={t('products.customCurrency')}
                    options={currencyOptions}
                    value={selectedCurrency ? [selectedCurrency] : []}
                    onChange={(values) => setSelectedCurrency(values[0] || "")}
                    placeholder={t('products.selectCurrency')}
                  />
                  <FloatingLabelInput
                    label={t('products.priorityInAppearance')}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    placeholder="0"
                    type="number"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="hidden" className="text-sm cursor-pointer">
                    {t('products.hiddenProduct')}
                  </Label>
                  <Switch
                    id="hidden"
                    checked={hiddenProduct}
                    onCheckedChange={setHiddenProduct}
                  />
                </div>
              </div>
            </CollapsibleSection>
          </div>

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
