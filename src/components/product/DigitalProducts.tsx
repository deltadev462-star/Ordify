import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Save, Instagram } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DigitalProductsProps {
  enableDigitalProduct: boolean;
  setEnableDigitalProduct: (value: boolean) => void;
  digitalProductType: string;
  setDigitalProductType: (value: string) => void;
  handleSave: () => void;
}

function DigitalProducts({
  enableDigitalProduct,
  setEnableDigitalProduct,
  digitalProductType,
  setDigitalProductType,
  handleSave
}: DigitalProductsProps) {
  const { t } = useTranslation();

  // Digital product types
  const productTypes = [
    { value: "code", label: t("Digital Code") },
    { value: "link", label: t("Download Link") },
    { value: "file", label: t("Digital File") },
    { value: "license", label: t("License Key") },
    { value: "subscription", label: t("Subscription") },
  ];

  return (
    <div className="mt-4 space-y-6">
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t("Digital Products")}</h2>
          
          {/* Sell Digital Products link */}
          <Button
            variant="link"
            className="text-blue-500 hover:text-blue-600 p-0 h-auto font-normal"
            onClick={() => window.open('#', '_blank')}
          >
            <Instagram className="w-4 h-4 mr-2" />
            {t("Sell Digital Products")}
          </Button>
        </div>
        
        {/* Info message */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t("You cannot convert a digital product to a regular product or change its type after creating it.")}
        </p>
        
        {/* Enable Digital Product Toggle */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-black rounded-lg">
          <label htmlFor="enable-digital" className="text-base font-medium">
            {t("Enable Digital Product")}
          </label>
          <Switch
            id="enable-digital"
            checked={enableDigitalProduct}
            onCheckedChange={setEnableDigitalProduct}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t("This option makes the product purchased digitally and sends the product code or link to the customer after purchase.")}
        </p>
        
        {/* Digital Product Type Selection - Only show when enabled */}
        {enableDigitalProduct && (
          <div className="space-y-4">
            <div>
              <label className="text-base font-medium mb-2 block">
                {t("Digital Product Type")} *
              </label>
              <Select value={digitalProductType} onValueChange={setDigitalProductType}>
                <SelectTrigger className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700">
                  <SelectValue placeholder={t("Select product type")} />
                </SelectTrigger>
                <SelectContent>
                  {productTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Additional info based on selection */}
            <p className="text-sm text-gray-500">
              {t("When choosing code, a new code will be sent to the customer with each purchase. When choosing link, the same link will be used for all customers.")}
            </p>
          </div>
        )}
        
        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {t("Save")}
        </Button>
      </div>
    </div>
  );
}

export default DigitalProducts;