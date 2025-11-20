import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
// Input not required in layout customizer
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Slider removed (not used) to avoid unused import errors
import {
  Layout,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  Grid,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

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

export const LayoutCustomizer: React.FC = () => {
  const { t } = useTranslation();
  const { layout, themeConfig, updateCustomizations, customizations } =
    useTheme();
  const [activeTab, setActiveTab] = useState("container");
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  if (!layout || !themeConfig) return null;
  const layoutPresets: LayoutPreset[] = [
    {
      name: t("Compact"),
      description: t("Tight spacing for content-rich layouts"),
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
      name: t("Comfortable"),
      description: t("Balanced spacing for most use cases"),
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
      name: t("Spacious"),
      description: t("Generous spacing for luxury feel"),
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
  const handleResetLayout = () => {
    updateCustomizations({
      ...customizations,
      layout: {},
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

  // devicePreviewWidths inlined via state; parsing helpers removed to avoid unused-vars

  return (
    <div className="space-y-6">
      {/* Layout Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="h-5 w-5" />
            {t("Layout Templates")}
          </CardTitle>
          <CardDescription>
            {t("Quick presets for common layout configurations")}
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
                  <span className="font-medium">{t(preset.name)}</span>
                </div>
                <p className="text-sm text-gray-600">{t(preset.description)}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Layout Settings")}</CardTitle>
          <CardDescription>
            {t("Fine-tune your store's layout and spacing")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="container">{t("Container")}</TabsTrigger>
              <TabsTrigger value="spacing">{t("Spacing")}</TabsTrigger>
              <TabsTrigger value="corners">{t("Corners")}</TabsTrigger>
            </TabsList>

            {/* Container Settings */}
            <TabsContent value="container" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="container-width">
                    {t("Container Width")}
                  </Label>
                  <p className="text-xs text-gray-500">
                    {t("Maximum width of content area")}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sidebar-width">{t("Sidebar Width")}</Label>
                  <p className="text-xs text-gray-500">
                    {t("Width of navigation sidebar")}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="header-height">{t("Header Height")}</Label>
                  <p className="text-xs text-gray-500">
                    {t("Height of the main header")}
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Spacing Settings */}
            <TabsContent value="spacing" className="space-y-4 mt-6">
              {Object.entries(layout.spacing).map(([key]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={`spacing-${key}`} className="capitalize">
                    {key === "xs"
                      ? t("Extra Small")
                      : key === "sm"
                      ? t("Small")
                      : key === "base"
                      ? t("Base")
                      : key === "lg"
                      ? t("Large")
                      : key === "xl"
                      ? t("Extra Large")
                      : t(key)}
                  </Label>
                </div>
              ))}
            </TabsContent>

            {/* Border Radius Settings */}
            <TabsContent value="corners" className="space-y-4 mt-6">
              {Object.entries(layout.borderRadius).map(
                ([key]) =>
                  key !== "full" &&
                  key !== "none" && (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={`radius-${key}`} className="capitalize">
                        {key === "sm"
                          ? t("Small")
                          : key === "base"
                          ? t("Base")
                          : key === "md"
                          ? t("Medium")
                          : key === "lg"
                          ? t("Large")
                          : key === "xl"
                          ? t("Extra Large")
                          : key === "2xl"
                          ? t("2X Large")
                          : t(key)}
                      </Label>
                    </div>
                  )
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Visual Layout Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("Layout Preview")}</CardTitle>
          <CardDescription className="text-sm">
            {t("Visual representation of your layout settings")}
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
            <p className="mb-2 text-sm font-medium">{t("Container Layout")}</p>
            <p className="mb-2 text-sm font-medium">{t("Spacing Scale")}</p>
            <p className="mb-2 text-sm font-medium">{t("Corner Radius")}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleResetLayout}
        >
          <RotateCcw className="h-4 w-4" />
          {t("Reset Layout")}
        </Button>
      </div>
    </div>
  );
};
