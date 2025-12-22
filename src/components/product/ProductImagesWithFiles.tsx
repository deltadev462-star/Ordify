import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProductImagesWithFilesProps {
  mainImageFile: File | null;
  setMainImageFile: (file: File | null) => void;
  subImageFiles: File[];
  setSubImageFiles: (files: File[]) => void;
  maxSubImages?: number;
  maxFileSize?: number;
}

const ProductImagesWithFiles: React.FC<ProductImagesWithFilesProps> = ({
  mainImageFile,
  setMainImageFile,
  subImageFiles,
  setSubImageFiles,
  maxSubImages = 10,
  maxFileSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const { t } = useTranslation();
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const subImagesInputRef = useRef<HTMLInputElement>(null);
  
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [subImagesPreview, setSubImagesPreview] = useState<string[]>([]);

  const validateImageFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    if (!validTypes.includes(file.type)) {
      toast({
        title: t('common.error'),
        description: t('products.invalidImageType'),
        variant: "destructive",
      });
      return false;
    }
    
    if (file.size > maxFileSize) {
      toast({
        title: t('common.error'),
        description: t('products.imageTooLarge', { size: `${maxFileSize / 1024 / 1024}MB` }),
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateImageFile(file)) {
      setMainImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => validateImageFile(file));
    
    if (subImageFiles.length + validFiles.length > maxSubImages) {
      toast({
        title: t('common.error'),
        description: t('products.tooManyImages', { max: maxSubImages }),
        variant: "destructive",
      });
      return;
    }
    
    const newFiles = [...subImageFiles, ...validFiles];
    setSubImageFiles(newFiles);
    
    // Create previews for new files
    const newPreviews = [...subImagesPreview];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        setSubImagesPreview([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview(null);
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
  };

  const removeSubImage = (index: number) => {
    const newFiles = subImageFiles.filter((_, i) => i !== index);
    const newPreviews = subImagesPreview.filter((_, i) => i !== index);
    setSubImageFiles(newFiles);
    setSubImagesPreview(newPreviews);
  };

  const setAsMainImage = (index: number) => {
    const newMainFile = subImageFiles[index];
    const newMainPreview = subImagesPreview[index];
    
    // Remove from sub images
    const newSubFiles = subImageFiles.filter((_, i) => i !== index);
    const newSubPreviews = subImagesPreview.filter((_, i) => i !== index);
    
    // If there was a main image, add it to sub images
    if (mainImageFile && mainImagePreview) {
      newSubFiles.push(mainImageFile);
      newSubPreviews.push(mainImagePreview);
    }
    
    // Set new main image
    setMainImageFile(newMainFile);
    setMainImagePreview(newMainPreview);
    setSubImageFiles(newSubFiles);
    setSubImagesPreview(newSubPreviews);
  };

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div>
        <h4 className="text-sm font-medium mb-3">{t('products.mainImage')}</h4>
        {mainImagePreview ? (
          <div className="relative group">
            <img
              src={mainImagePreview}
              alt={t('products.mainImage')}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={removeMainImage}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                {t('common.remove')}
              </Button>
            </div>
            <div className="absolute top-2 left-2">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs flex items-center gap-1">
                <Star className="h-3 w-3" />
                {t('products.main')}
              </span>
            </div>
          </div>
        ) : (
          <Card
            className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => mainImageInputRef.current?.click()}
          >
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <Upload className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-1">
                {t('products.dragDropOrClick')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('products.supportedFormats')}
              </p>
            </div>
          </Card>
        )}
        <input
          ref={mainImageInputRef}
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          className="hidden"
        />
      </div>

      {/* Sub Images */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium">{t('products.additionalImages')}</h4>
          <span className="text-xs text-muted-foreground">
            {subImageFiles.length}/{maxSubImages}
          </span>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {subImagesPreview.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`${t('products.additionalImage')} ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setAsMainImage(index)}
                  className="h-8 w-8"
                  title={t('products.setAsMain')}
                >
                  <Star className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSubImage(index)}
                  className="h-8 w-8"
                  title={t('common.remove')}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {subImageFiles.length < maxSubImages && (
            <Card
              className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer h-32"
              onClick={() => subImagesInputRef.current?.click()}
            >
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">
                  {t('products.addImages')}
                </p>
              </div>
            </Card>
          )}
        </div>
        
        <input
          ref={subImagesInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleSubImagesChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProductImagesWithFiles;