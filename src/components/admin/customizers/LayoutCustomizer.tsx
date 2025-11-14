import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layout, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LayoutCustomizer: React.FC = () => {
  const { layout, themeConfig, updateLayout } = useTheme();

  if (!layout || !themeConfig) return null;

  const handleBorderRadiusChange = (size: string, value: string) => {
    updateLayout(`borderRadius.${size}`, value);
  };

  const handleSpacingChange = (size: string, value: string) => {
    updateLayout(`spacing.${size}`, value);
  };

  const handleResetLayout = () => {
    updateLayout("containerWidth", themeConfig.layout.containerWidth);
    updateLayout("sidebarWidth", themeConfig.layout.sidebarWidth);
    updateLayout("headerHeight", themeConfig.layout.headerHeight);
    
    Object.entries(themeConfig.layout.borderRadius).forEach(([key, value]) => {
      updateLayout(`borderRadius.${key}`, value);
    });
    
    Object.entries(themeConfig.layout.spacing).forEach(([key, value]) => {
      updateLayout(`spacing.${key}`, value);
    });
  };

  const parsePixels = (value: string): number => {
    return parseInt(value.replace('px', '')) || 0;
  };

  const parseRem = (value: string): number => {
    return parseFloat(value.replace('rem', '')) || 0;
  };

  return (
    <div className="space-y-6">
      {/* Container Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Container Settings
          </CardTitle>
          <CardDescription>
            Control the maximum width and layout of your store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="container-width">Container Width</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="container-width"
                min={768}
                max={1920}
                step={16}
                value={[parsePixels(layout.containerWidth)]}
                onValueChange={(values) => updateLayout("containerWidth", `${values[0]}px`)}
                className="flex-1"
              />
              <Input
                type="text"
                value={layout.containerWidth}
                onChange={(e) => updateLayout("containerWidth", e.target.value)}
                className="w-24 font-mono text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">Maximum width of content area</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sidebar-width">Sidebar Width</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="sidebar-width"
                min={200}
                max={400}
                step={10}
                value={[parsePixels(layout.sidebarWidth)]}
                onValueChange={(values) => updateLayout("sidebarWidth", `${values[0]}px`)}
                className="flex-1"
              />
              <Input
                type="text"
                value={layout.sidebarWidth}
                onChange={(e) => updateLayout("sidebarWidth", e.target.value)}
                className="w-24 font-mono text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">Width of navigation sidebar</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="header-height">Header Height</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="header-height"
                min={40}
                max={150}
                step={5}
                value={[parsePixels(layout.headerHeight)]}
                onValueChange={(values) => updateLayout("headerHeight", `${values[0]}px`)}
                className="flex-1"
              />
              <Input
                type="text"
                value={layout.headerHeight}
                onChange={(e) => updateLayout("headerHeight", e.target.value)}
                className="w-24 font-mono text-sm"
              />
            </div>
            <p className="text-xs text-gray-500">Height of the main header</p>
          </div>
        </CardContent>
      </Card>

      {/* Border Radius */}
      <Card>
        <CardHeader>
          <CardTitle>Border Radius</CardTitle>
          <CardDescription>
            Control the roundness of corners throughout your store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(layout.borderRadius).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`radius-${key}`} className="capitalize">
                  {key === "sm" ? "Small" : 
                   key === "base" ? "Base" :
                   key === "md" ? "Medium" :
                   key === "lg" ? "Large" :
                   key === "full" ? "Full (Circle)" : key}
                </Label>
                <span className="text-sm text-gray-600 font-mono">{value}</span>
              </div>
              {key !== "full" && key !== "none" && (
                <div className="flex items-center gap-2">
                  <Slider
                    id={`radius-${key}`}
                    min={0}
                    max={32}
                    step={1}
                    value={[parsePixels(value)]}
                    onValueChange={(values) => 
                      handleBorderRadiusChange(key, values[0] === 0 ? "0px" : `${values[0] / 16}rem`)
                    }
                    className="flex-1"
                  />
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => handleBorderRadiusChange(key, e.target.value)}
                    className="w-20 font-mono text-sm"
                  />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Spacing */}
      <Card>
        <CardHeader>
          <CardTitle>Spacing</CardTitle>
          <CardDescription>
            Adjust the spacing scale used for margins and padding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(layout.spacing).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`spacing-${key}`} className="capitalize">
                  {key === "xs" ? "Extra Small" :
                   key === "sm" ? "Small" :
                   key === "base" ? "Base" :
                   key === "lg" ? "Large" :
                   key === "xl" ? "Extra Large" : key}
                </Label>
                <span className="text-sm text-gray-600 font-mono">{value}</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id={`spacing-${key}`}
                  min={4}
                  max={96}
                  step={4}
                  value={[parseRem(value) * 16]}
                  onValueChange={(values) => 
                    handleSpacingChange(key, `${values[0] / 16}rem`)
                  }
                  className="flex-1"
                />
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => handleSpacingChange(key, e.target.value)}
                  className="w-20 font-mono text-sm"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Layout Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Layout Preview</CardTitle>
          <CardDescription className="text-sm">
            Visual representation of your layout settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Container Preview */}
            <div>
              <p className="mb-2 text-sm font-medium">Container Width</p>
              <div className="bg-gray-100 p-4 rounded">
                <div 
                  className="mx-auto bg-white border-2 border-dashed border-gray-300 p-4"
                  style={{ maxWidth: layout.containerWidth }}
                >
                  <div className="text-center text-sm text-gray-600">
                    Content Area ({layout.containerWidth})
                  </div>
                </div>
              </div>
            </div>

            {/* Border Radius Examples */}
            <div>
              <p className="mb-2 text-sm font-medium">Border Radius Examples</p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(layout.borderRadius).map(([key, value]) => (
                  key !== "none" && (
                    <div key={key} className="text-center">
                      <div 
                        className="w-16 h-16 bg-primary mb-1"
                        style={{ borderRadius: value }}
                      />
                      <span className="text-xs text-gray-600">{key}</span>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Spacing Examples */}
            <div>
              <p className="mb-2 text-sm font-medium">Spacing Scale</p>
              <div className="space-y-2">
                {Object.entries(layout.spacing).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-12">{key}:</span>
                    <div className="flex-1">
                      <div 
                        className="bg-primary h-3"
                        style={{ width: `${parseRem(value) * 16}px` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={handleResetLayout}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Layout
        </Button>
      </div>
    </div>
  );
};