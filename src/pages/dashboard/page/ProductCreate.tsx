import { useTranslation } from "react-i18next";

import { useSEO } from "@/hooks/useSEO";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Title from "@/components/Title";

function ProductCreate() {
  const { t } = useTranslation();

  useSEO({
    title: "Create Product - Ordify Dashboard",
    description: "Create a new product in your Ordify store.",
  });

  return (
    <div dir="rtl" className="h-dvh overflow-hidden p-1 box-border">
      <div className="flex flex-col bg-white dark:bg-black/80 rounded-2xl flex-1 h-full overflow-hidden min-h-0 p-4 pt-0">
        <Title title={t("Create Product")} Subtitle="" className="text-3xl font-bold p-10" classNamee="" />

        <Tabs
          defaultValue="digital-products"
          className="md:max-w-6xl w-full mx-auto flex-1 min-h-0 flex flex-col overflow-hidden"
        >
          
          <div className="overflow-x-auto flex-shrink-0">
            <TabsList className="inline-flex h-auto p-1   flex-nowrap whitespace-nowrap flex-shrink-0">
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
                value="basic-product-data"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("basicProductData")}
              </TabsTrigger>
              <TabsTrigger
                value="product-images"
                className="flex-shrink-0 px-4 py-4 rounded-full data-[state=active]:bg-green-500 data-[state=active]:text-black dark:data-[state=active]:bg-green-400 dark:data-[state=active]:text-white"
              >
                {t("productImages")}
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

          {/* هذه المنطقة فقط هي اللي تعمل سكرول عمودي */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <TabsContent value="digital-products" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("digitalProductsNew")}</h2>
                <p>{t("digitalProductsDesc")}</p>
              </div>
            </TabsContent>

            <TabsContent value="external-platform" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("linkToExternalPlatform")}</h2>
                <p>{t("externalPlatformDesc")}</p>
              </div>
            </TabsContent>

            <TabsContent value="stock-settings" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("stockSettings")}</h2>
                <p>{t("stockSettingsDesc")}</p>
              </div>
            </TabsContent>

            <TabsContent value="cloaking-feature" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("cloakingFeature")}</h2>
                <p>{t("cloakingFeatureDesc")}</p>
              </div>
            </TabsContent>

            <TabsContent value="custom-currency" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("customCurrency")}</h2>
                <p>{t("customCurrencyDesc")}</p>
              </div>
            </TabsContent>

            <TabsContent value="basic-product-data" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("basicProductData")}</h2>
                <p>{t("basicProductDataDesc")}</p>
              </div>
            </TabsContent>

            <TabsContent value="product-images" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("productImages")}</h2>
                <p>{t("productImagesDesc")}</p>
              </div>
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

            <TabsContent value="advanced-settings" className="mt-4">
              <div className="p-4 bg-gray-100 dark:bg-[#080808] rounded-lg">
                <h2 className="text-xl font-semibold">{t("advancedSettings")}</h2>
                <p>{t("advancedSettingsDesc")}</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

export default ProductCreate;
