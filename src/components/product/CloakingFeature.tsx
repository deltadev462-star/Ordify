import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
 
import { Save, AlertTriangle  } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CloakingFeatureProps {
  handleSave: () => void;
}

function CloakingFeature({ handleSave }: CloakingFeatureProps) {
  const { t } = useTranslation();
  const [isSubscribed] = useState(false);

  const handleViewApps = () => {
    // Navigate to apps page or open modal
    console.log("View Apps clicked");
  };

  return (
    <div className="mt-4 space-y-6">
      {/* Main Content Container */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-6">
        
        {/* Product Preview Card */}
        <div className="flex justify-center mb-6">
          
        </div>

        {/* Feature Title and Description */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{t("Cloaking Feature")}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("Use AI and data analysis to hide product from bots and show facebook, tiktok and snapchat another landing page to escape from ban for some forbidden products")}
          </p>
        </div>

        {/* Subscription Alert */}
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950/20">
          <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-gray-800 dark:text-gray-200">
              {t("You must subscribe to the cloaking app")}
            </span>
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto font-normal underline"
              onClick={handleViewApps}
            >
              {t("View Apps")}
            </Button>
          </AlertDescription>
        </Alert>

        {/* Additional Settings (when subscribed) */}
        {isSubscribed && (
          <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-lg">{t("Cloaking Settings")}</h3>
            {/* Add more cloaking configuration options here when subscribed */}
            <p className="text-sm text-gray-500">
              {t("Configure your cloaking settings to protect your products from detection.")}
            </p>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pb-6">
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

export default CloakingFeature;