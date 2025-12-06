import { useTranslation } from "react-i18next";
import { useState } from "react";
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
  Tag,
  Globe,
  Zap,
  Shield,
  Eye,
  Clock,
  Truck,
  Star,
  Users
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
  const [sku, setSku] = useState("");
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
  
  // Custom Pixel
  const [pixelItems, setPixelItems] = useState<{id: string, pixelId: string, pixelType: string}[]>([]);
  
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
      sku,
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
    { value: "electronics", label: t("Electronics") },
    { value: "clothing", label: t("Clothing") },
    { value: "home", label: t("Home & Garden") },
    { value: "beauty", label: t("Health & Beauty") },
    { value: "sports", label: t("Sports") },
    { value: "toys", label: t("Toys & Games") },
    { value: "books", label: t("Books") },
    { value: "food", label: t("Food & Beverages") },
  ];

  const currencyOptions = [
    { value: "USD", label: t("USD - US Dollar") },
    { value: "EUR", label: t("EUR - Euro") },
    { value: "GBP", label: t("GBP - British Pound") },
    { value: "EGP", label: t("EGP - Egyptian Pound") },
    { value: "SAR", label: "SAR - Saudi Riyal" },
    { value: "AED", label: "AED - UAE Dirham" },
  ];

  useSEO({
    title: t("Create Product") + " - Ordify Dashboard",
    description: t("Create a new product in your Ordify store with comprehensive details and settings"),
  });

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto max-w-6xl py-8 px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("Create Product")}</h1>
          <p className="text-muted-foreground">
            {t("Add a new product to your store with all necessary details")}
          </p>
        </div>

        <div className="space-y-6">
          {/* Essential Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                {t("Essential Information")}
              </CardTitle>
              <CardDescription>
                {t("Basic product details that customers will see")}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FloatingLabelInput
                  label={t("Product Name *")}
                  value={productName}
                  onChange={handleProductNameChange}
                  placeholder={t("e.g., Premium Leather Bag")}
                  required
                />
            
              </div>

              <div className="grid gap-6 md:grid-cols-2">
              
                <MultiSelect
                  label={t("Product Categories")}
                  options={categoryOptions}
                  value={selectedCategories}
                  onChange={setSelectedCategories}
                  placeholder={t("Select categories...")}
                />
              </div>

              <FloatingLabelTextarea
                label={t("Meta Description")}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={t("Brief description for search engines...")}
                rows={3}
                className="resize-none"
              />

              <div>
                <Label className="text-base font-medium mb-2 block">
                  {t("Product Description")}
                </Label>
                <RichTextEditor
                  value={productDescription}
                  onChange={setProductDescription}
                  placeholder={t("Enter product description...")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                {t("Pricing & Inventory")}
              </CardTitle>
              <CardDescription>
                {t("Set your product pricing and stock levels")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <FloatingLabelInput
                  label={t("Price *")}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={t("0.00")}
                  type="number"
                  step="0.01"
                  required
                />
                <FloatingLabelInput
                  label={t("Sale Price (Leave blank for no discount)")}
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  placeholder={t("0.00")}
                  type="number"
                  step="0.01"
                />
                <FloatingLabelInput
                  label={t("Product Expense")}
                  value={productExpense}
                  onChange={(e) => setProductExpense(e.target.value)}
                  placeholder={t("0.00")}
                  type="number"
                  step="0.01"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">{t("Stock Management")}</h4>
                <div className="grid gap-6 md:grid-cols-2">
                  <FloatingLabelInput
                    label={t("Stock Quantity")}
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder={t("0")}
                    type="number"
                    disabled={!trackStock}
                  />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="track-stock" className="text-sm cursor-pointer">
                        {t("Track Stock")}
                      </Label>
                      <Switch
                        id="track-stock"
                        checked={trackStock}
                        onCheckedChange={setTrackStock}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="disable-out-of-stock" className="text-sm cursor-pointer">
                        {t("Disable When Out of Stock")}
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
                {t("productImages")}
              </CardTitle>
              <CardDescription>
                {t("Upload high-quality images to showcase your product")}
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
              title={t("digitalProductsNew")}
              description={t("digitalProductsDesc")}
              icon={<Zap className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="digital-product" className="text-sm cursor-pointer">
                    {t("Enable Digital Product")}
                  </Label>
                  <Switch
                    id="digital-product"
                    checked={enableDigitalProduct}
                    onCheckedChange={setEnableDigitalProduct}
                  />
                </div>
                {enableDigitalProduct && (
                  <FloatingLabelInput
                    label={t("Digital Product Type")}
                    value={digitalProductType}
                    onChange={(e) => setDigitalProductType(e.target.value)}
                    placeholder={t("e.g., PDF, Video, Software")}
                  />
                )}
              </div>
            </CollapsibleSection>

            {/* External Platform Integration */}
            <CollapsibleSection
              title={t("linkToExternalPlatform")}
              description={t("externalPlatformDesc")}
              icon={<Globe className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="taager" className="text-sm cursor-pointer">
                      {t("Activate the integration with Taager company")}
                    </Label>
                    <Switch
                      id="taager"
                      checked={taagerIntegration}
                      onCheckedChange={setTaagerIntegration}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="angazny" className="text-sm cursor-pointer">
                      {t("Activate the integration with Angazny company")}
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
                      label={t("Product code in the external platform")}
                      value={externalPlatformCode}
                      onChange={(e) => setExternalPlatformCode(e.target.value)}
                      placeholder={t("Enter product code...")}
                    />
                    <FloatingLabelInput
                      label={t("Link the product to an external platform")}
                      value={externalPlatformLink}
                      onChange={(e) => setExternalPlatformLink(e.target.value)}
                      placeholder={t("Enter external platform link...")}
                      icon={Globe}
                    />
                  </div>
                )}
              </div>
            </CollapsibleSection>

            {/* Marketing Features */}
            <CollapsibleSection
              title={t("Marketing Features")}
              description={t("Boost conversions with marketing tools")}
              icon={<Star className="h-5 w-5" />}
            >
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reviews" className="text-sm cursor-pointer">
                        {t("Activate Reviews?")}
                      </Label>
                      <Switch
                        id="reviews"
                        checked={activateReviews}
                        onCheckedChange={setActivateReviews}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="free-shipping" className="text-sm cursor-pointer">
                        {t("Activate free shipping for the product")}
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
                        {t("Display fake visitor counter?")}
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
                          label={t("Minimum number of visitors currently viewing the page")}
                          value={minVisitors}
                          onChange={(e) => setMinVisitors(e.target.value)}
                          placeholder="20"
                          type="number"
                        />
                        <FloatingLabelInput
                          label={t("Maximum number of visitors currently viewing the page")}
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
                      {t("Activate the fake stock feature")}
                    </Label>
                    <Switch
                      id="fake-stock"
                      checked={activateFakeStock}
                      onCheckedChange={setActivateFakeStock}
                    />
                  </div>
                  {activateFakeStock && (
                    <FloatingLabelInput
                      label={t("Number of fake stock items")}
                      value={fakeStockItems}
                      onChange={(e) => setFakeStockItems(e.target.value)}
                      placeholder="5"
                      type="number"
                    />
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="timer" className="text-sm cursor-pointer">
                      {t("Fake Timer")}
                    </Label>
                    <Switch
                      id="timer"
                      checked={fakeTimer}
                      onCheckedChange={setFakeTimer}
                    />
                  </div>
                  {fakeTimer && (
                    <FloatingLabelInput
                      label={t("Number of hours in the fake timer")}
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
              title={t("Purchase Settings")}
              description={t("Customize the buying experience")}
              icon={<Truck className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="skip-cart" className="text-sm cursor-pointer">
                    {t("Skip Cart")}
                  </Label>
                  <Switch
                    id="skip-cart"
                    checked={skipCart}
                    onCheckedChange={setSkipCart}
                  />
                </div>
                {skipCart && (
                  <FloatingLabelInput
                    label={t("Text written on the Buy Now button")}
                    value={buyNowButtonText}
                    onChange={(e) => setBuyNowButtonText(e.target.value)}
                    placeholder={t("Click here to buy")}
                  />
                )}
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="fixed-buy" className="text-sm cursor-pointer">
                    {t("Activate the Fixed Buy Button at the Bottom of the Page")}
                  </Label>
                  <Switch
                    id="fixed-buy"
                    checked={fixedBuyButton}
                    onCheckedChange={setFixedBuyButton}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="checkout-first" className="text-sm cursor-pointer">
                    {t("Make checkout form before product description")}
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
              title={t("advancedSettings")}
              description={t("advancedSettingsDesc")}
              icon={<Settings className="h-5 w-5" />}
            >
              <div className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <MultiSelect
                    label={t("customCurrency")}
                    options={currencyOptions}
                    value={selectedCurrency ? [selectedCurrency] : []}
                    onChange={(values) => setSelectedCurrency(values[0] || "")}
                    placeholder={t("Select a currency")}
                  />
                  <FloatingLabelInput
                    label={t("Priority in appearance")}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    placeholder="0"
                    type="number"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="hidden" className="text-sm cursor-pointer">
                    {t("Hidden Product")}
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
                {t("Cancel")}
              </Button>
              <Button 
                size="lg"
                onClick={handleSave}
                className="min-w-[150px]"
              >
                <Save className="h-4 w-4 mr-2" />
                {t("SAVE")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
