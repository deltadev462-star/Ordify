import { useTranslation } from "react-i18next";
import { FloatingLabelInput, FloatingLabelTextarea } from "@/components/ui/floating-label-input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Save, AlertCircle, DollarSign, Package, Link2, Hash, Tag } from "lucide-react";

interface BasicProductDataProps {
  productName: string;
  productLink: string;
  setProductLink: (value: string) => void;
  sku: string;
  setSku: (value: string) => void;
  metaDescription: string;
  setMetaDescription: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  salePrice: string;
  setSalePrice: (value: string) => void;
  productExpense: string;
  setProductExpense: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  productDescription: string;
  setProductDescription: (value: string) => void;
  handleProductNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
}

function BasicProductData({
  productName,
  productLink,
  setProductLink,
  sku,
  setSku,
  metaDescription,
  setMetaDescription,
  price,
  setPrice,
  salePrice,
  setSalePrice,
  productExpense,
  setProductExpense,
  priority,
  setPriority,
  selectedCategories,
  setSelectedCategories,
  productDescription,
  setProductDescription,
  handleProductNameChange,
  handleSave
}: BasicProductDataProps) {
  const { t } = useTranslation();

  // Sample categories - replace with actual data from API
  const categories = [
    { value: "website", label: t("Website") }
  ];

  return (
    <div className="mt-4 space-y-6">
      {/* Product Data Section */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">{t("Product Data")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            label={t("Product Name *")}
            value={productName}
            onChange={handleProductNameChange}
            icon={Package}
            required
          />
          
          <FloatingLabelInput
            label={t("Product Link (SEO) *")}
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            icon={Link2}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            label={t("SKU (Leave blank if not needed)")}
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            icon={Hash}
          />
          
          <FloatingLabelTextarea
            label={t("Meta Description")}
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Price and Discount Section */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">{t("Price and Discount")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingLabelInput
            label={t("Price *")}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            icon={DollarSign}
            required
          />
          
          <FloatingLabelInput
            label={t("Sale Price (Leave blank for no discount)")}
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
            icon={Tag}
          />
        </div>

        {/* Warning Message */}
        <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            {t("If the product has multiple properties such as colors and sizes, the price for the variations must be changed because this price will not be effective.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FloatingLabelInput
              label={t("Product Expense")}
              type="number"
              value={productExpense}
              onChange={(e) => setProductExpense(e.target.value)}
              icon={DollarSign}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t("The net profit gets calculated through this field")}
            </p>
          </div>
          
          <div>
            <FloatingLabelInput
              label={t("Priority in appearance")}
              type="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t("Controls the appearance of the section at the beginning, the higher the number, the more it appears before other products. For example, if this section has a priority of 9 and a section has a priority of 7, 9 will appear before 7.")}
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t("Categories")}</h2>
        <MultiSelect
          options={categories}
          value={selectedCategories}
          onChange={setSelectedCategories}
          placeholder={t("Select categories...")}
          label={t("Product Categories")}
        />
      </div>

      {/* Product Description Section */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{t("Product Description")}</h2>
        <RichTextEditor
          value={productDescription}
          onChange={setProductDescription}
          placeholder={t("Enter product description...")}
          className="mb-4"
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-6">
        <Button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {t("SAVE")}
        </Button>
      </div>
    </div>
  );
}

export default BasicProductData;