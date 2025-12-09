import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, Info } from "lucide-react";

interface AdvancedSettingsProps {
  skipCart: boolean;
  setSkipCart: (value: boolean) => void;
  buyNowButtonText: string;
  setBuyNowButtonText: (value: string) => void;
  fixedBuyButton: boolean;
  setFixedBuyButton: (value: boolean) => void;
  fixedBuyButtonText: string;
  setFixedBuyButtonText: (value: string) => void;
  checkoutBeforeDescription: boolean;
  setCheckoutBeforeDescription: (value: boolean) => void;
  activateReviews: boolean;
  setActivateReviews: (value: boolean) => void;
  displayFakeVisitor: boolean;
  setDisplayFakeVisitor: (value: boolean) => void;
  minVisitors: string;
  setMinVisitors: (value: string) => void;
  maxVisitors: string;
  setMaxVisitors: (value: string) => void;
  activateFakeStock: boolean;
  setActivateFakeStock: (value: boolean) => void;
  fakeStockItems: string;
  setFakeStockItems: (value: string) => void;
  fakeTimer: boolean;
  setFakeTimer: (value: boolean) => void;
  fakeTimerHours: string;
  setFakeTimerHours: (value: string) => void;
  hiddenProduct: boolean;
  setHiddenProduct: (value: boolean) => void;
  hideQuantityCounter: boolean;
  setHideQuantityCounter: (value: boolean) => void;
  hideHeader: boolean;
  setHideHeader: (value: boolean) => void;
  activateFreeShipping: boolean;
  setActivateFreeShipping: (value: boolean) => void;
  hideRelatedProducts: boolean;
  setHideRelatedProducts: (value: boolean) => void;
  pixelPrice: string;
  setPixelPrice: (value: string) => void;
  handleSave: () => void;
}

function AdvancedSettings(props: AdvancedSettingsProps) {
  return (
    <div className="mt-4 space-y-6">
      {/* Warning message */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-300">
          {"Some marketers love these features and believe they increase sales, and they do increase your sales, but we do not recommend some of these features, such as the fake visitors and fake discount counter, because the customer will confuse you with other marketers he has dealt with before and had bad experiences with. Imagine with me that a customer bought a product from another marketer who uses these features on his site, and the product arrived to the customer with problems and didn't work, and the marketer didn't refund the money or return the product. When he sees any store with these same distinctive marks, he will think it is the same person, so be careful when using these features. They may benefit you in the short term and increase sales, but in the long run, they will damage your reputation."}
        </p>
      </div>

      {/* Skip Cart */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Skip  Cart"}</label>
            <p className="text-sm text-gray-500 mt-1">{""}</p>
          </div>
          <Switch
            checked={props.skipCart}
            onCheckedChange={props.setSkipCart}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        {props.skipCart && (
          <FloatingLabelInput
            label={"Text written on the  Buy  Now button"}
            value={props.buyNowButtonText}
            onChange={(e) => props.setBuyNowButtonText(e.target.value)}
            placeholder={"Click here to buy"}
          />
        )}
      </div>

      {/* Activate Fixed Buy Button */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Activate the  Fixed  Buy  Button at the  Bottom of the  Page"}</label>
            <p className="text-sm text-gray-500 mt-1">{""}</p>
          </div>
          <Switch
            checked={props.fixedBuyButton}
            onCheckedChange={props.setFixedBuyButton}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        {props.fixedBuyButton && (
          <FloatingLabelInput
            label={"Purchase the product from the same page"}
            value={props.fixedBuyButtonText}
            onChange={(e) => props.setFixedBuyButtonText(e.target.value)}
            placeholder={"Purchase the product from the same page"}
          />
        )}
      </div>

      {/* Make checkout form before product description */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-base font-medium">{"Make checkout form before product description"}</label>
            <Badge className="bg-yellow-400 text-black hover:bg-yellow-400">{"New"}</Badge>
          </div>
          <Switch
            checked={props.checkoutBeforeDescription}
            onCheckedChange={props.setCheckoutBeforeDescription}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">{"The checkout form will appear before the product description"}</p>
      </div>

      {/* Activate Reviews */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Activate  Reviews?"}</label>
            <p className="text-sm text-gray-500 mt-1">{"This option makes reviews appear on the product page"}</p>
          </div>
          <Switch
            checked={props.activateReviews}
            onCheckedChange={props.setActivateReviews}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>

      {/* Display fake visitor counter */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Display fake visitor counter?"}</label>
            <p className="text-sm text-gray-500 mt-1">{"Enable this option to show the customer a fake number, such as 'Now 20 visitors' or 'Now 60 visitors'."}</p>
          </div>
          <Switch
            checked={props.displayFakeVisitor}
            onCheckedChange={props.setDisplayFakeVisitor}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        {props.displayFakeVisitor && (
          <div className="grid grid-cols-2 gap-4">
            <FloatingLabelInput
              label={"Minimum number of visitors currently viewing the page"}
              type="number"
              value={props.minVisitors}
              onChange={(e) => props.setMinVisitors(e.target.value)}
              placeholder="20"
            />
            <FloatingLabelInput
              label={"Maximum number of visitors currently viewing the page"}
              type="number"
              value={props.maxVisitors}
              onChange={(e) => props.setMaxVisitors(e.target.value)}
              placeholder="70"
            />
          </div>
        )}
      </div>

      {/* Activate fake stock feature */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Activate the fake stock feature"}</label>
            <p className="text-sm text-gray-500 mt-1">{"This feature displays a fake low stock, such as 'Only 5 pieces left'."}</p>
          </div>
          <Switch
            checked={props.activateFakeStock}
            onCheckedChange={props.setActivateFakeStock}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        {props.activateFakeStock && (
          <div>
            <FloatingLabelInput
              label={"Number of fake stock items"}
              type="number"
              value={props.fakeStockItems}
              onChange={(e) => props.setFakeStockItems(e.target.value)}
              placeholder="5"
            />
            <p className="text-sm text-gray-500 mt-1">
              {"This is the fake number that will be displayed to the customer, and don't worry if the customer makes a purchase, this number will decrease in front of him."}
            </p>
          </div>
        )}
      </div>

      {/* Fake Timer */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Fake  Timer"}</label>
            <p className="text-sm text-gray-500 mt-1">{""}</p>
          </div>
          <Switch
            checked={props.fakeTimer}
            onCheckedChange={props.setFakeTimer}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        {props.fakeTimer && (
          <FloatingLabelInput
            label={"Number of hours in the fake timer"}
            type="number"
            value={props.fakeTimerHours}
            onChange={(e) => props.setFakeTimerHours(e.target.value)}
            placeholder="1"
          />
        )}
      </div>

      {/* Hidden Product */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Hidden  Product"}</label>
            <p className="text-sm text-gray-500 mt-1">{""}</p>
          </div>
          <Switch
            checked={props.hiddenProduct}
            onCheckedChange={props.setHiddenProduct}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>

      {/* Hide the quantity counter */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Hide the quantity counter"}</label>
            <p className="text-sm text-gray-500 mt-1">{""}</p>
          </div>
          <Switch
            checked={props.hideQuantityCounter}
            onCheckedChange={props.setHideQuantityCounter}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>

      {/* Hide the header */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Hide the header"}</label>
            <p className="text-sm text-gray-500 mt-1">{""}</p>
          </div>
          <Switch
            checked={props.hideHeader}
            onCheckedChange={props.setHideHeader}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>

      {/* Activate free shipping */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-base font-medium">{"Activate free shipping for the product"}</label>
            <p className="text-sm text-gray-500 mt-1">{"Make shipping free for this product only"}</p>
          </div>
          <Switch
            checked={props.activateFreeShipping}
            onCheckedChange={props.setActivateFreeShipping}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </div>

      {/* Make related products hidden */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-base font-medium">{"Make related products hidden"}</label>
            <Badge className="bg-yellow-400 text-black hover:bg-yellow-400">{"New"}</Badge>
          </div>
          <Switch
            checked={props.hideRelatedProducts}
            onCheckedChange={props.setHideRelatedProducts}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">{"The related products will be hidden on this product's page"}</p>
      </div>

      {/* Price to send to the pixel */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-4">
        <label className="text-base font-medium">{"Price to send to the pixel"}</label>
        <p className="text-sm text-gray-500">{"The price that will be sent to the pixel"}</p>
        <FloatingLabelInput
          label={"Pixel  Price"}
          type="number"
          value={props.pixelPrice}
          onChange={(e) => props.setPixelPrice(e.target.value)}
          placeholder={""}
        />
        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            {"This option will work in single product checkout and add to cart"}
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-6">
        <Button
          onClick={props.handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {"Save"}
        </Button>
      </div>
    </div>
  );
}

export default AdvancedSettings;