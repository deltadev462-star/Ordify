import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

interface PixelItem {
  id: string;
  pixelId: string;
  pixelType: string;
}

interface CustomPixelProps {
  pixelItems: PixelItem[];
  setPixelItems: (items: PixelItem[]) => void;
  handleSave: () => void;
}

function CustomPixel({
  pixelItems,
  setPixelItems,
  handleSave
}: CustomPixelProps) {
  const handleAddPixel = () => {
    setPixelItems([...pixelItems, { id: Date.now().toString(), pixelId: '', pixelType: '' }]);
  };

  const handleRemovePixel = (index: number) => {
    setPixelItems(pixelItems.filter((_, i) => i !== index));
  };

  const handlePixelIdChange = (index: number, value: string) => {
    const updated = [...pixelItems];
    updated[index].pixelId = value;
    setPixelItems(updated);
  };

  const handlePixelTypeChange = (index: number, value: string) => {
    const updated = [...pixelItems];
    updated[index].pixelType = value;
    setPixelItems(updated);
  };

  return (
    <div className="mt-4">
      <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-semibold mb-4">{"Product  Pixel"}</h2>
        
        {/* Listed Pixel IDs */}
        {pixelItems.length > 0 && (
          <div className="space-y-3 mb-6">
            {pixelItems.map((item, index) => (
              <div key={index} className="bg-white dark:bg-black rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-gray-500 dark:text-gray-400">{index + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePixel(index)}
                    className="text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 -mr-2"
                  >
                    <span className="flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      {"Remove"}
                    </span>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FloatingLabelInput
                    label={"Enter your pixel  I D *"}
                    value={item.pixelId}
                    onChange={(e) => handlePixelIdChange(index, e.target.value)}
                    placeholder={"Add only the  I D"}
                  />
                  
                  <div className="relative">
                    <select
                      value={item.pixelType}
                      onChange={(e) => handlePixelTypeChange(index, e.target.value)}
                      className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">{"Pixel type *"}</option>
                      <option value="facebook">{"Facebook  Pixel"}</option>
                      <option value="tiktok">{"Tik Tok  Pixel"}</option>
                      <option value="snapchat">{"Snapchat  Pixel"}</option>
                      <option value="google">{"Google  Analytics"}</option>
                    </select>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500">{"Add only the  I D"}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Add New Pixel Button */}
        <Button
          onClick={handleAddPixel}
          variant="outline"
          className="flex items-center justify-center gap-2 border-0"
        >
          <span className="text-xl">+</span>
          {"Add"}
        </Button>
        
        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {"Save"}
        </Button>
      </div>
    </div>
  );
}

export default CustomPixel;