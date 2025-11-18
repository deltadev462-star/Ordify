import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ThemeSelector,
  ColorCustomizer,
  TypographyCustomizer,
  LayoutCustomizer
} from "./customizers";
import { Palette, Type, Layout, Eye, RotateCcw } from "lucide-react";

interface ThemeCustomizerProps {
  onPreview?: () => void;
  onSave?: () => void;
  onReset?: () => void;
  className?: string;
}

export const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  onPreview,
  onSave,
  onReset,
  className = "",
}) => {
  const {
    themeConfig,
    customizations,
    resetCustomizations,
    isLoading
  } = useTheme();
  
  const [activeTab, setActiveTab] = useState("theme");

  const handleReset = () => {
    resetCustomizations();
    onReset?.();
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    onSave?.();
  };

  const handlePreview = () => {
    onPreview?.();
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-sm text-gray-600">Loading theme customizer...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Customizer
        </CardTitle>
        <p className="text-sm text-gray-600">
          Customize your store's appearance and branding
        </p>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="theme" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="theme" className="space-y-4">
              <ThemeSelector />
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <ColorCustomizer />
            </TabsContent>

            <TabsContent value="typography" className="space-y-4">
              <TypographyCustomizer />
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <LayoutCustomizer />
            </TabsContent>
          </div>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button onClick={handlePreview} variant="outline" className="flex-1">
            <Eye className="mr-2 h-4 w-4" />
            Preview Changes
          </Button>
          
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
          
          <Button 
            onClick={handleReset} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Current Theme Info */}
        {themeConfig && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <h4 className="mb-2 font-semibold text-gray-900">Current Theme</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{themeConfig.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Primary Color:</span>
                <div className="ml-2 inline-flex items-center gap-2">
                  <div 
                    className="h-4 w-4 rounded border"
                    style={{ backgroundColor: themeConfig.colors.primary }}
                  />
                  <span className="font-mono text-xs">
                    {themeConfig.colors.primary}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-gray-600">Font Family:</span>
                <span className="ml-2 font-medium">
                  {themeConfig.typography.fontFamily.split(',')[0].replace(/['"]/g, '')}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Customizations:</span>
                <span className="ml-2 font-medium">
                  {Object.keys(customizations).length} active
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};