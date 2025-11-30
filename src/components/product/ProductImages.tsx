import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Upload, RefreshCw, Trash2, Image } from "lucide-react";

interface ProductImagesProps {
  mainImage: string | null;
  setMainImage: (image: string | null) => void;
  otherImages: string[];
  setOtherImages: (images: string[]) => void;
  handleSave: () => void;
}

function ProductImages({
  mainImage,
  setMainImage,
  otherImages,
  setOtherImages,
  handleSave
}: ProductImagesProps) {
  const { t } = useTranslation();
  
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const otherImagesInputRef = useRef<HTMLInputElement>(null);

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOtherImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setOtherImages([...otherImages, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setOtherImages(otherImages.filter((_, i) => i !== index));
  };

  const handleChangeOtherImage = (index: number, newImage: string) => {
    const newImages = [...otherImages];
    newImages[index] = newImage;
    setOtherImages(newImages);
  };

  return (
    <div className="mt-4">
      <Tabs defaultValue="main-image" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger
            value="main-image"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            {t("Main Product Image")}
          </TabsTrigger>
          <TabsTrigger
            value="other-images"
            className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
          >
            {t("Other Product Images")}
          </TabsTrigger>
        </TabsList>

        {/* Main Product Image Tab */}
        <TabsContent value="main-image" className="space-y-6">
          <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t("Main Product Image")}</h2>
            
            <div className="space-y-4">
              {/* Upload Button */}
              <Button
                variant="outline"
                onClick={() => mainImageInputRef.current?.click()}
                className="w-full md:w-auto flex items-center gap-2 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 border-2 border-dashed"
              >
                <Upload className="w-5 h-5" />
                {t("Upload images")}
              </Button>
              
              {/* Hidden file input */}
              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="hidden"
              />
              
              {/* Main Image Preview */}
              {mainImage && (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 p-2">
                    <img
                      src={mainImage}
                      alt="Main product"
                      className="w-full max-w-sm mx-auto rounded-lg object-cover aspect-square"
                    />
                  </div>
                  
                  {/* Change Image Button */}
                  <Button
                    variant="outline"
                    onClick={() => mainImageInputRef.current?.click()}
                    className="w-full md:w-auto flex items-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    {t("Change Image")}
                  </Button>
                </div>
              )}
              
              {/* Placeholder if no image */}
              {!mainImage && (
                <div className="flex items-center justify-center w-full max-w-sm mx-auto aspect-square bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <div className="text-center">
                    <Image className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">{t("No image uploaded")}</p>
                  </div>
                </div>
              )}
            </div>
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
        </TabsContent>

        {/* Other Product Images Tab */}
        <TabsContent value="other-images" className="space-y-6">
          <div className="bg-gray-100 dark:bg-[#080808] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t("Other Product Images")}</h2>
            
            <div className="space-y-4">
              {/* Upload Button */}
              <Button
                variant="outline"
                onClick={() => otherImagesInputRef.current?.click()}
                className="w-full md:w-auto flex items-center gap-2 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 border-2 border-dashed"
              >
                <Upload className="w-5 h-5" />
                {t("Upload images")}
              </Button>
              
              {/* Hidden file input */}
              <input
                ref={otherImagesInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleOtherImagesUpload}
                className="hidden"
              />
              
              {/* Images Grid */}
              {otherImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {otherImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="relative rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 p-2">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="mt-2 flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  handleChangeOtherImage(index, reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            };
                            input.click();
                          }}
                          className="flex-1 flex items-center justify-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          {t("Change Image")}
                        </Button>
                        
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteImage(index)}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t("Delete Image")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Placeholder if no images */}
              {otherImages.length === 0 && (
                <div className="flex items-center justify-center w-full h-48 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <div className="text-center">
                    <Image className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">{t("No additional images uploaded")}</p>
                  </div>
                </div>
              )}
            </div>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductImages;