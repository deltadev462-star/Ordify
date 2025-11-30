import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Title from "@/components/Title";

// Import the new components
import BasicProductData from "@/components/product/BasicProductData";
import ExternalPlatform from "@/components/product/ExternalPlatform";
import CustomPixel from "@/components/product/CustomPixel";
import ProductImages from "@/components/product/ProductImages";
import AdvancedSettings from "@/components/product/AdvancedSettings";
import CustomCurrency from "@/components/product/CustomCurrency";
import DigitalProducts from "@/components/product/DigitalProducts";
import CloakingFeature from "@/components/product/CloakingFeature";
import StockSettings from "@/components/product/StockSettings";

function ProductCreate() {
  const { t } = useTranslation();
  
  // Form state
  const [productName, setProductName] = useState("");
  const [productLink, setProductLink] = useState("");
  const [sku, setSku] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [productExpense, setProductExpense] = useState("");
  const [priority, setPriority] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [productDescription, setProductDescription] = useState("");
  
  // Image state
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [otherImages, setOtherImages] = useState<string[]>([]);

  // External Platform Integration state
  const [taagerIntegration, setTaagerIntegration] = useState(false);
  const [angaznyIntegration, setAngaznyIntegration] = useState(false);
  const [externalPlatformCode, setExternalPlatformCode] = useState("");
  const [externalPlatformLink, setExternalPlatformLink] = useState("");
  
  // Custom Pixel state
  const [pixelItems, setPixelItems] = useState<{id: string, pixelId: string, pixelType: string}[]>([]);
  
  // Advanced Settings state
  const [skipCart, setSkipCart] = useState(false);
  const [buyNowButtonText, setBuyNowButtonText] = useState("Click here to buy");
  const [fixedBuyButton, setFixedBuyButton] = useState(false);
  const [fixedBuyButtonText, setFixedBuyButtonText] = useState("Purchase the product from the same page");
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
  const [hideQuantityCounter, setHideQuantityCounter] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [activateFreeShipping, setActivateFreeShipping] = useState(false);
  const [hideRelatedProducts, setHideRelatedProducts] = useState(false);
  const [pixelPrice, setPixelPrice] = useState("");
  
  // Custom Currency state
  const [selectedCurrency, setSelectedCurrency] = useState("");
  
  // Digital Products state
  const [enableDigitalProduct, setEnableDigitalProduct] = useState(false);
  const [digitalProductType, setDigitalProductType] = useState("");
  
  // Stock Settings state
  const [stockQuantity, setStockQuantity] = useState("");
  const [trackStock, setTrackStock] = useState(false);
  const [disableWhenOutOfStock, setDisableWhenOutOfStock] = useState(false);

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
      // External Platform Integration
      externalPlatform: {
        taagerIntegration,
        angaznyIntegration,
        externalPlatformCode,
        externalPlatformLink
      },
      // Custom Pixel
      customPixel: {
        pixelItems
      }
    });
  };

  useSEO({
    title: "Create Product - Ordify Dashboard",
    description: "Create a new product in your Ordify store.",
  });

  return (
    <div dir="rtl" className="h-dvh overflow-hidden p-1 box-border">
      <div className="flex flex-col dark:bg-[#101010]  rounded-2xl flex-1 h-full overflow-hidden min-h-0 p-4 pt-0">
        <Title title={t("Create Product")} Subtitle="" className="text-3xl font-bold p-10" classNamee="" />

        <Tabs
          defaultValue="basic-product-data"
          className="md:max-w-6xl w-full mx-auto flex-1 min-h-0 flex flex-col overflow-hidden "
        >
          
          <div className="overflow-x-auto flex-shrink-0">
            <TabsList className="inline-flex h-auto p-1 flex-nowrap whitespace-nowrap flex-shrink-0 bg-transparent">
              <TabsTrigger
                value="basic-product-data"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("BASIC PRODUCT DATA")}
              </TabsTrigger>
              <TabsTrigger
                value="digital-products"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("digitalProductsNew")}
              </TabsTrigger>
              <TabsTrigger
                value="external-platform"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("linkToExternalPlatform")}
              </TabsTrigger>
              <TabsTrigger
                value="stock-settings"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("stockSettings")}
              </TabsTrigger>
              <TabsTrigger
                value="cloaking-feature"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("cloakingFeature")}
              </TabsTrigger>
              <TabsTrigger
                value="custom-currency"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("customCurrency")}
              </TabsTrigger>
              <TabsTrigger
                value="product-images"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("productImages")}
              </TabsTrigger>
              <TabsTrigger
                value="custom-pixel"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("Custom Pixel")}
              </TabsTrigger>
              <TabsTrigger
                value="landing-page"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("createLandingPage")}
              </TabsTrigger>
              <TabsTrigger
                value="multiple-properties"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("multipleProperties")}
              </TabsTrigger>
              <TabsTrigger
                value="advanced-settings"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("advancedSettings")}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <TabsContent value="basic-product-data">
              <BasicProductData
                productName={productName}
                productLink={productLink}
                setProductLink={setProductLink}
                sku={sku}
                setSku={setSku}
                metaDescription={metaDescription}
                setMetaDescription={setMetaDescription}
                price={price}
                setPrice={setPrice}
                salePrice={salePrice}
                setSalePrice={setSalePrice}
                productExpense={productExpense}
                setProductExpense={setProductExpense}
                priority={priority}
                setPriority={setPriority}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                productDescription={productDescription}
                setProductDescription={setProductDescription}
                handleProductNameChange={handleProductNameChange}
                handleSave={handleSave}
              />
            </TabsContent>

            {/* Other tab contents */}
            <TabsContent value="digital-products">
              <DigitalProducts
                enableDigitalProduct={enableDigitalProduct}
                setEnableDigitalProduct={setEnableDigitalProduct}
                digitalProductType={digitalProductType}
                setDigitalProductType={setDigitalProductType}
                handleSave={handleSave}
              />
            </TabsContent>

            <TabsContent value="external-platform">
              <ExternalPlatform
                taagerIntegration={taagerIntegration}
                setTaagerIntegration={setTaagerIntegration}
                angaznyIntegration={angaznyIntegration}
                setAngaznyIntegration={setAngaznyIntegration}
                externalPlatformCode={externalPlatformCode}
                setExternalPlatformCode={setExternalPlatformCode}
                externalPlatformLink={externalPlatformLink}
                setExternalPlatformLink={setExternalPlatformLink}
                handleSave={handleSave}
              />
            </TabsContent>

            <TabsContent value="stock-settings" className="mt-4">
              <StockSettings
                stockQuantity={stockQuantity}
                setStockQuantity={setStockQuantity}
                trackStock={trackStock}
                setTrackStock={setTrackStock}
                disableWhenOutOfStock={disableWhenOutOfStock}
                setDisableWhenOutOfStock={setDisableWhenOutOfStock}
                handleSave={handleSave}
              />
            </TabsContent>

            <TabsContent value="cloaking-feature">
              <CloakingFeature
                handleSave={handleSave}
              />
            </TabsContent>

            <TabsContent value="custom-currency">
              <CustomCurrency
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                handleSave={handleSave}
              />
            </TabsContent>

            <TabsContent value="custom-pixel">
              <CustomPixel
                pixelItems={pixelItems}
                setPixelItems={setPixelItems}
                handleSave={handleSave}
              />
            </TabsContent>

            <TabsContent value="product-images">
              <ProductImages
                mainImage={mainImage}
                setMainImage={setMainImage}
                otherImages={otherImages}
                setOtherImages={setOtherImages}
                handleSave={handleSave}
              />
            </TabsContent>

            <TabsContent value="landing-page" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("createLandingPage")}</h2>
                <p>{t("landingPageDesc")}</p>
              </div>
            </TabsContent>

            <TabsContent value="multiple-properties" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("multipleProperties")}</h2>
                <p>{t("multiplePropertiesDesc")}</p>
              </div>
            </TabsContent>

            <TabsContent value="advanced-settings">
              <AdvancedSettings
                skipCart={skipCart}
                setSkipCart={setSkipCart}
                buyNowButtonText={buyNowButtonText}
                setBuyNowButtonText={setBuyNowButtonText}
                fixedBuyButton={fixedBuyButton}
                setFixedBuyButton={setFixedBuyButton}
                fixedBuyButtonText={fixedBuyButtonText}
                setFixedBuyButtonText={setFixedBuyButtonText}
                checkoutBeforeDescription={checkoutBeforeDescription}
                setCheckoutBeforeDescription={setCheckoutBeforeDescription}
                activateReviews={activateReviews}
                setActivateReviews={setActivateReviews}
                displayFakeVisitor={displayFakeVisitor}
                setDisplayFakeVisitor={setDisplayFakeVisitor}
                minVisitors={minVisitors}
                setMinVisitors={setMinVisitors}
                maxVisitors={maxVisitors}
                setMaxVisitors={setMaxVisitors}
                activateFakeStock={activateFakeStock}
                setActivateFakeStock={setActivateFakeStock}
                fakeStockItems={fakeStockItems}
                setFakeStockItems={setFakeStockItems}
                fakeTimer={fakeTimer}
                setFakeTimer={setFakeTimer}
                fakeTimerHours={fakeTimerHours}
                setFakeTimerHours={setFakeTimerHours}
                hiddenProduct={hiddenProduct}
                setHiddenProduct={setHiddenProduct}
                hideQuantityCounter={hideQuantityCounter}
                setHideQuantityCounter={setHideQuantityCounter}
                hideHeader={hideHeader}
                setHideHeader={setHideHeader}
                activateFreeShipping={activateFreeShipping}
                setActivateFreeShipping={setActivateFreeShipping}
                hideRelatedProducts={hideRelatedProducts}
                setHideRelatedProducts={setHideRelatedProducts}
                pixelPrice={pixelPrice}
                setPixelPrice={setPixelPrice}
                handleSave={handleSave}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default ProductCreate;
