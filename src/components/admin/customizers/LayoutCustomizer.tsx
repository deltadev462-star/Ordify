
import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Layout, RotateCcw, Monitor, Tablet, Smartphone, Grid, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LayoutPreset {
  name: string;
  description: string;
  icon: React.ReactNode;
  settings: {
    containerWidth: string;
    spacing: {
      base: string;
      lg: string;
    };
    borderRadius: {
      base: string;
      lg: string;
    };
  };
}

const layoutPresets: LayoutPreset[] = [
  {
    name: "Compact",
    description: "Tight spacing for content-rich layouts",
    icon: <Grid className="h-4 w-4" />,
    settings: {
      containerWidth: "1024px",
      spacing: {
        base: "1rem",
        lg: "1.5rem",
      },
      borderRadius: {
        base: "0.25rem",
        lg: "0.5rem",
      },
    },
  },
  {
    name: "Comfortable",
    description: "Balanced spacing for most use cases",
    icon: <Monitor className="h-4 w-4" />,
    settings: {
      containerWidth: "1280px",
      spacing: {
        base: "1.5rem",
        lg: "2rem",
      },
      borderRadius: {
        base: "0.375rem",
        lg: "0.75rem",
      },
    },
  },
  {
    name: "Spacious",
    description: "Generous spacing for luxury feel",
    icon: <Maximize2 className="h-4 w-4" />,
    settings: {
      containerWidth: "1440px",
      spacing: {
        base: "2rem",
        lg: "3rem",
      },
      borderRadius: {
        base: "0.5rem",
        lg: "1rem",
      },
    },
  },
];

export const LayoutCustomizer: React.FC = () => {
  const { layout, themeConfig, updateLayout, updateCustomizations, customizations } = useTheme();
  const [activeTab, setActiveTab] = useState("container");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  if (!layout || !themeConfig) return null;

  const handleBorderRadiusChange = (size: string, value: string) => {
    updateLayout(`borderRadius.${size}`, value);
  };

  const handleSpacingChange = (size: string, value: string) => {
    updateLayout(`spacing.${size}`, value);
  };

  const handleResetLayout = () => {
    updateCustomizations({
      ...customizations,
      layout: {}
    });
  };

  const applyPreset = (preset: LayoutPreset) => {
    updateCustomizations({
      ...customizations,
      layout: {
        ...customizations.layout,
        containerWidth: preset.settings.containerWidth,
        spacing: {
          ...layout.spacing,
          ...preset.settings.spacing,
        },
        borderRadius: {
          ...layout.borderRadius,
          ...preset.settings.borderRadius,
        },
      },
    });
  };

  const parsePixels = (value: string): number => {
    return parseInt(value.replace('px', '')) || 0;
  };

  const parseRem = (value: string): number => {
    return parseFloat(value.replace('rem', '')) || 0;
  };

  const devicePreviewWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="space-y-6">
      {/* Layout Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Layout Templates
          </CardTitle>
          <CardDescription>
            Quick presets for common layout configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {layoutPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="group relative rounded-lg border-2 p-4 text-left transition-all hover:shadow-md hover:border-primary"
              >
                <div className="mb-2 flex items-center gap-2">
                  {preset.icon}
                  <span className="font-medium">{preset.name}</span>
                </div>
                <p className="text-sm text-gray-600">{preset.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Settings</CardTitle>
          <CardDescription>
            Fine-tune your store's layout and spacing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="container">Container</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
              <TabsTrigger value="corners">Corners</TabsTrigger>
            </TabsList>

            {/* Container Settings */}
            <TabsContent value="container" className="space-y-6 mt-6">
              <div className="space-y-4">
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
              </div>
            </TabsContent>

            {/* Spacing Settings */}
            <TabsContent value="spacing" className="space-y-4 mt-6">
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
            </TabsContent>

            {/* Border Radius Settings */}
            <TabsContent value="corners" className="space-y-4 mt-6">
              {Object.entries(layout.borderRadius).map(([key, value]) => (
                key !== "full" && key !== "none" && (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`radius-${key}`} className="capitalize">
                        {key === "sm" ? "Small" : 
                         key === "base" ? "Base" :
                         key === "md" ? "Medium" :
                         key === "lg" ? "Large" :
                         key === "xl" ? "Extra Large" :
                         key === "2xl" ? "2X Large" : key}
                      </Label>
                      <span className="text-sm text-gray-600 font-mono">{value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Slider
                        id={`radius-${key}`}
                        min={0}
                        max={32}
                        step={1}
                        value={[parsePixels(value || "0px")]}
                        onValueChange={(values) => 
                          handleBorderRadiusChange(key, values[0] === 0 ? "0px" : `${values[0] / 16}rem`)
                        }
                        className="flex-1"
                      />
                      <Input
                        type="text"
                        value={value || "0px"}
                        onChange={(e) => handleBorderRadiusChange(key, e.target.value)}
                        className="w-20 font-mono text-sm"
                      />
                    </div>
                  </div>
                )
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Visual Layout Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Layout Preview</CardTitle>
          <CardDescription className="text-sm">
            Visual representation of your layout settings
          </CardDescription>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant={previewDevice === "desktop" ? "default" : "outline"}
              onClick={() => setPreviewDevice("desktop")}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={previewDevice === "tablet" ? "default" : "outline"}
              onClick={() => setPreviewDevice("tablet")}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={previewDevice === "mobile" ? "default" : "outline"}
              onClick={() => setPreviewDevice("mobile")}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Container Preview */}
            <div>
              <p className="mb-2 text-sm font-medium">Container Layout</p>
              <div 
                className="bg-gray-100 p-4 rounded overflow-auto"
                style={{ maxWidth: devicePreviewWidths[previewDevice] }}
              >
                <div 
                  className="mx-auto bg-white border-2 border-dashed border-gray-300"
                  style={{ 
                    maxWidth: previewDevice === "desktop" ? layout.containerWidth : "100%",
                    height: "200px",
                    padding: layout.spacing.base
                  }}
                >
                  <div 
                    className="bg-gray-50 border border-gray-200 h-full flex items-center justify-center text-sm text-gray-600"
                    style={{ borderRadius: layout.borderRadius.lg }}
                  >
                    Content Area ({previewDevice})
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing Visualization */}
            <div>
              <p className="mb-2 text-sm font-medium">Spacing Scale</p>
              <div className="space-y-2 bg-gray-50 p-4 rounded">
                {Object.entries(layout.spacing).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-12">{key}:</span>
                    <div className="flex-1 bg-gray-200 rounded" style={{ height: "20px" }}>
                      <div 
                        className="bg-primary h-full rounded transition-all"
                        style={{ width: `${Math.min(parseRem(value) * 16, 100)}px` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Radius Examples */}
            <div>
              <p className="mb-2 text-sm font-medium">Corner Radius</p>
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