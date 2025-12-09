import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  Package,
  TrendingDown,
  Save,
  BarChart3,
  PackageX
} from "lucide-react";

interface StockSettingsProps {
  stockQuantity: string;
  setStockQuantity: (value: string) => void;
  trackStock: boolean;
  setTrackStock: (value: boolean) => void;
  disableWhenOutOfStock: boolean;
  setDisableWhenOutOfStock: (value: boolean) => void;
  handleSave: () => void;
}

function StockSettings({
  stockQuantity,
  setStockQuantity,
  trackStock,
  setTrackStock,
  disableWhenOutOfStock,
  setDisableWhenOutOfStock,
  handleSave,
}: StockSettingsProps) {
  return (
    <div className=" ">
      <div className="space-y-8 p-8 bg-white dark:bg-[#080808] rounded-2xl shadow-sm">
        {/* Header with icon */}
        <div className="flex items-center gap-3 pb-2 ">
          <Package className="h-7 w-7 text-gray-700 dark:text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {"Stock  Settings"}
          </h2>
        </div>

        {/* Stock Quantity Section */}
        <div className="space-y-5">
          <div>
            <Label 
              htmlFor="stock-quantity" 
              className="flex items-center gap-2 text-base font-semibold mb-3 text-gray-800 dark:text-gray-200"
            >
              <BarChart3 className="h-5 w-5" />
              {"Stock  Quantity"}
            </Label>
            <Input
              id="stock-quantity"
              type="number"
              min="0"
              placeholder={"Stock  Quantity"}
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="mt-2 h-12 text-base bg-gray-50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-700 
                         text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400
                         focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
              {"If the quantity is 0"}
            </p>
          </div>

          {/* Warning Alert with improved styling */}
          <Alert className="border-orange-200 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-500/10">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5 flex-shrink-0" />
              <AlertDescription className="text-orange-700 dark:text-orange-300 text-sm leading-relaxed">
                {"If the product has multiple properties such as colors and sizes"}
              </AlertDescription>
            </div>
          </Alert>
        </div>

        {/* Track Stock Toggle with improved spacing */}
        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-5">
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <TrendingDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1 space-y-1">
              <Label 
                htmlFor="track-stock" 
                className="text-base font-medium text-gray-900 dark:text-gray-200 cursor-pointer block"
              >
                {"Track  Stock"}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {"If you activate this option"}
              </p>
            </div>
            <Switch
              id="track-stock"
              checked={trackStock}
              onCheckedChange={setTrackStock}
              className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-400"
            />
          </div>
        </div>

        {/* Disable When Out of Stock Toggle */}
        <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-5">
          <div className="flex items-start gap-4">
            <div className="pt-1">
              <PackageX className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="flex-1 space-y-1">
              <Label 
                htmlFor="disable-out-of-stock" 
                className="text-base font-medium text-gray-900 dark:text-gray-200 cursor-pointer block"
              >
                {"Disable  When  Out of  Stock"}
              </Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {"If you activate this option"}
              </p>
            </div>
            <Switch
              id="disable-out-of-stock"
              checked={disableWhenOutOfStock}
              onCheckedChange={setDisableWhenOutOfStock}
              className="data-[state=checked]:bg-green-500 dark:data-[state=checked]:bg-green-400"
            />
          </div>
        </div>

        {/* Save Button with icon */}
        <div className="flex justify-end pt-6  ">
          <Button 
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 
                     text-white font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2
                     transition-colors duration-200 shadow-sm"
          >
            <Save className="h-4 w-4" />
            {"Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StockSettings;