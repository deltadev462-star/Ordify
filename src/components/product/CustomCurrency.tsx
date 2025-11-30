import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Save, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomCurrencyProps {
  selectedCurrency: string;
  setSelectedCurrency: (value: string) => void;
  handleSave: () => void;
}

function CustomCurrency({
  selectedCurrency,
  setSelectedCurrency,
  handleSave
}: CustomCurrencyProps) {
  const { t } = useTranslation();

  // List of available currencies
  const currencies = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "EGP", label: "EGP - Egyptian Pound" },
    { value: "SAR", label: "SAR - Saudi Riyal" },
    { value: "AED", label: "AED - UAE Dirham" },
    { value: "KWD", label: "KWD - Kuwaiti Dinar" },
    { value: "BHD", label: "BHD - Bahraini Dinar" },
    { value: "OMR", label: "OMR - Omani Rial" },
    { value: "QAR", label: "QAR - Qatari Riyal" },
    { value: "JOD", label: "JOD - Jordanian Dinar" },
    { value: "LBP", label: "LBP - Lebanese Pound" },
    { value: "MAD", label: "MAD - Moroccan Dirham" },
    { value: "TND", label: "TND - Tunisian Dinar" },
    { value: "DZD", label: "DZD - Algerian Dinar" },
  ];

  return (
    <div className="mt-4 space-y-6">
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">{t("Custom Currency")}</h2>
        
        {/* Currency Selection */}
        <div className="space-y-4">
          <div>
            <label className="text-base font-medium mb-2 block">{t("Currency")}</label>
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-full bg-white dark:bg-black border-gray-300 dark:border-gray-700">
                <SelectValue placeholder={t("Select a currency")} />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Warning Message */}
          {selectedCurrency && (
            <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                {t("When you select a custom currency for this product, you must activate the Skip Cart option from the product's advanced settings to prevent the customer from adding multiple products with different currencies.")}
              </p>
            </div>
          )}
        </div>
        
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

export default CustomCurrency;