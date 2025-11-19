import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterSection {
  title: string;
  type: "checkbox" | "price" | "rating" | "size" | "color";
  options?: FilterOption[];
  min?: number;
  max?: number;
}

interface ClassicSidebarProps {
  categories?: FilterOption[];
  filters?: FilterSection[];
  selectedFilters?: {
    categories: string[];
    price: [number, number];
    [key: string]: any;
  };
  onFilterChange?: (filters: any) => void;
  showNewsletter?: boolean;
  showBestSellers?: boolean;
  className?: string;
}

export const ClassicSidebar = ({
  categories = [],
  filters = [],
  selectedFilters = {
    categories: [],
    price: [0, 1000],
  },
  onFilterChange,
  showNewsletter = true,
  showBestSellers = true,
  className = "",
}: ClassicSidebarProps) => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [localFilters, setLocalFilters] = useState(selectedFilters);

  const defaultFilters: FilterSection[] = [
    {
      title: t("Price"),
      type: "price",
      min: 0,
      max: 1000,
    },
    {
      title: t("Brand"),
      type: "checkbox",
      options: [
        { label: "Nike", value: "nike", count: 125 },
        { label: "Adidas", value: "adidas", count: 98 },
        { label: "Puma", value: "puma", count: 76 },
        { label: "New Balance", value: "new-balance", count: 54 },
        { label: "Under Armour", value: "under-armour", count: 43 },
      ],
    },
    {
      title: t("Size"),
      type: "size",
      options: [
        { label: "XS", value: "xs" },
        { label: "S", value: "s" },
        { label: "M", value: "m" },
        { label: "L", value: "l" },
        { label: "XL", value: "xl" },
        { label: "XXL", value: "xxl" },
      ],
    },
    {
      title: t("Color"),
      type: "color",
      options: [
        { label: t("Black"), value: "black" },
        { label: t("White"), value: "white" },
        { label: t("Red"), value: "red" },
        { label: t("Blue"), value: "blue" },
        { label: t("Green"), value: "green" },
        { label: t("Yellow"), value: "yellow" },
      ],
    },
  ];

  const filtersToUse = filters.length > 0 ? filters : defaultFilters;

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleCheckboxChange = (section: string, value: string, checked: boolean) => {
    const newFilters = { ...localFilters };
    if (!newFilters[section]) newFilters[section] = [];
    
    if (checked) {
      newFilters[section] = [...newFilters[section], value];
    } else {
      newFilters[section] = newFilters[section].filter((v: string) => v !== value);
    }
    
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceChange = (value: [number, number]) => {
    const newFilters = { ...localFilters, price: value };
    setLocalFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      price: [0, 1000] as [number, number],
    };
    setLocalFilters(clearedFilters);
    onFilterChange?.(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      localFilters.categories.length > 0 ||
      localFilters.price[0] > 0 ||
      localFilters.price[1] < 1000 ||
      Object.keys(localFilters).some(
        (key) =>
          key !== "categories" &&
          key !== "price" &&
          Array.isArray(localFilters[key]) &&
          localFilters[key].length > 0
      )
    );
  };

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Categories */}
      {categories.length > 0 && (
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-3 font-serif text-lg font-semibold">{t("Categories")}</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.value}>
                <label className="flex cursor-pointer items-center justify-between py-1 text-sm hover:text-primary">
                  <span className="flex items-center">
                    <Checkbox
                      checked={localFilters.categories.includes(category.value)}
                      onCheckedChange={(checked: boolean) =>
                        handleCheckboxChange("categories", category.value, checked)
                      }
                      className="mr-2"
                    />
                    {category.label}
                  </span>
                  {category.count && (
                    <span className="text-xs text-gray-500">({category.count})</span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-lg border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-serif text-lg font-semibold">{t("Filters")}</h3>
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-primary hover:underline"
            >
              {t("Clear All")}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filtersToUse.map((filter) => (
            <div key={filter.title} className="border-b pb-4 last:border-b-0">
              <button
                onClick={() => toggleSection(filter.title)}
                className="flex w-full items-center justify-between py-2 text-sm font-medium"
              >
                {filter.title}
                {expandedSections.includes(filter.title) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {expandedSections.includes(filter.title) && (
                <div className="mt-3">
                  {filter.type === "checkbox" && filter.options && (
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label
                          key={option.value}
                          className="flex cursor-pointer items-center justify-between text-sm"
                        >
                          <span className="flex items-center">
                            <Checkbox
                              checked={
                                localFilters[filter.title.toLowerCase()]?.includes(
                                  option.value
                                ) || false
                              }
                              onCheckedChange={(checked: boolean) =>
                                handleCheckboxChange(
                                  filter.title.toLowerCase(),
                                  option.value,
                                  checked
                                )
                              }
                              className="mr-2"
                            />
                            {option.label}
                          </span>
                          {option.count && (
                            <span className="text-xs text-gray-500">
                              ({option.count})
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}

                  {filter.type === "price" && (
                    <div className="space-y-3">
                      <Slider
                        value={localFilters.price}
                        onValueChange={handlePriceChange}
                        min={filter.min || 0}
                        max={filter.max || 1000}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>${localFilters.price[0]}</span>
                        <span>${localFilters.price[1]}</span>
                      </div>
                    </div>
                  )}

                  {filter.type === "size" && filter.options && (
                    <div className="grid grid-cols-3 gap-2">
                      {filter.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            const isSelected =
                              localFilters.size?.includes(option.value) || false;
                            handleCheckboxChange(
                              "size",
                              option.value,
                              !isSelected
                            );
                          }}
                          className={`rounded border px-3 py-1 text-sm transition-colors ${
                            localFilters.size?.includes(option.value)
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300 hover:border-primary"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {filter.type === "color" && filter.options && (
                    <div className="grid grid-cols-4 gap-2">
                      {filter.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            const isSelected =
                              localFilters.color?.includes(option.value) || false;
                            handleCheckboxChange(
                              "color",
                              option.value,
                              !isSelected
                            );
                          }}
                          className={`group relative h-8 w-8 rounded-full border-2 ${
                            localFilters.color?.includes(option.value)
                              ? "border-primary"
                              : "border-gray-300"
                          }`}
                          style={{
                            backgroundColor:
                              option.value === "white"
                                ? "#ffffff"
                                : option.value === "black"
                                ? "#000000"
                                : option.value,
                          }}
                          title={option.label}
                        >
                          {localFilters.color?.includes(option.value) && (
                            <X className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white mix-blend-difference" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      {showBestSellers && (
        <div className="rounded-lg border bg-white p-4">
          <h3 className="mb-3 font-serif text-lg font-semibold">{t("Best Sellers")}</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <img
                  src={`https://via.placeholder.com/60x60?text=Product${item}`}
                  alt={`Best Seller ${item}`}
                  className="h-16 w-16 object-cover"
                />
                <div>
                  <h4 className="text-sm font-medium">Product Name {item}</h4>
                  <p className="text-sm text-gray-600">$49.99</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter */}
      {showNewsletter && (
        <div className="rounded-lg border bg-primary p-4 text-white">
          <h3 className="mb-2 font-serif text-lg font-semibold">
            {t("Newsletter Sign Up")}
          </h3>
          <p className="mb-3 text-sm">
            {t("Get exclusive offers and updates delivered to your inbox")}
          </p>
          <input
            type="email"
            placeholder={t("Enter your email")}
            className="mb-3 w-full rounded px-3 py-2 text-gray-900"
          />
          <Button variant="secondary" className="w-full">
            {t("Subscribe")}
          </Button>
        </div>
      )}
    </aside>
  );
};