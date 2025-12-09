import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Save, Hash, Link2 } from "lucide-react";

interface ExternalPlatformProps {
  taagerIntegration: boolean;
  setTaagerIntegration: (value: boolean) => void;
  angaznyIntegration: boolean;
  setAngaznyIntegration: (value: boolean) => void;
  externalPlatformCode: string;
  setExternalPlatformCode: (value: string) => void;
  externalPlatformLink: string;
  setExternalPlatformLink: (value: string) => void;
  handleSave: () => void;
}

function ExternalPlatform({
  taagerIntegration,
  setTaagerIntegration,
  angaznyIntegration,
  setAngaznyIntegration,
  externalPlatformCode,
  setExternalPlatformCode,
  externalPlatformLink,
  setExternalPlatformLink,
  handleSave
}: ExternalPlatformProps) {
  return (
    <div className="mt-4 space-y-6">
      {/* External Platform Integration Section */}
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">{"Link To External Platform"}</h2>
        
        {/* Platform Integrations */}
        <div className="space-y-4">
          {/* Taager Integration */}
          <div className="flex items-center space-x-3 p-4 bg-white dark:bg-black rounded-lg">
            <Checkbox
              id="taager-integration"
              checked={taagerIntegration}
              onCheckedChange={(checked) => setTaagerIntegration(checked as boolean)}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:text-white border-gray-300"
            />
            <label
              htmlFor="taager-integration"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {"Activate the integration with  Taager company"}
            </label>
          </div>
          
          {/* Angazny Integration */}
          <div className="flex items-center space-x-3 p-4 bg-white dark:bg-black rounded-lg">
            <Checkbox
              id="angazny-integration"
              checked={angaznyIntegration}
              onCheckedChange={(checked) => setAngaznyIntegration(checked as boolean)}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:text-white border-gray-300"
            />
            <label
              htmlFor="angazny-integration"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {"Activate the integration with  Angazny company"}
            </label>
          </div>
        </div>
        
        {/* Product Code Input */}
        <div className="space-y-4">
          <FloatingLabelInput
            label={"Product code in the external platform"}
            value={externalPlatformCode}
            onChange={(e) => setExternalPlatformCode(e.target.value)}
            placeholder={""}
            icon={Hash}
          />
          
          {/* External Platform Link */}
          <FloatingLabelInput
            label={"Link the product to an external platform"}
            value={externalPlatformLink}
            onChange={(e) => setExternalPlatformLink(e.target.value)}
            placeholder={""}
            icon={Link2}
          />
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end pb-6">
        <Button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          {"Save"}
        </Button>
      </div>
    </div>
  );
}

export default ExternalPlatform;