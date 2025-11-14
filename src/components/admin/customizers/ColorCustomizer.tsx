import React from "react";
import { useTheme } from "@/hooks/useTheme";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label
} from "@/components/ui";
import { Palette, RotateCcw } from "lucide-react";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, description }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium">
        {label}
      </Label>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            type="color"
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-10 cursor-pointer overflow-hidden rounded-md border-2 p-0"
          />
        </div>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-mono text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  );
};

export const ColorCustomizer: React.FC = () => {
  const { colors, themeConfig, updateColor, resetCustomizations } = useTheme();

  if (!colors || !themeConfig) return null;

  const colorOptions = [
    {
      key: "primary",
      label: "Primary Color",
      description: "Main brand color used for buttons, links, and key UI elements",
    },
    {
      key: "secondary",
      label: "Secondary Color",
      description: "Supporting color for secondary actions and accents",
    },
    {
      key: "accent",
      label: "Accent Color",
      description: "Highlight color for special elements and notifications",
    },
    {
      key: "background",
      label: "Background",
      description: "Main background color for your store",
    },
    {
      key: "foreground",
      label: "Text Color",
      description: "Default text color throughout the store",
    },
    {
      key: "muted",
      label: "Muted Background",
      description: "Background for cards, sections, and subtle elements",
    },
    {
      key: "mutedForeground",
      label: "Muted Text",
      description: "Color for secondary text and labels",
    },
    {
      key: "border",
      label: "Border Color",
      description: "Default border color for inputs, cards, and dividers",
    },
  ];

  const handleResetColors = () => {
    colorOptions.forEach(({ key }) => {
      updateColor(key, themeConfig.colors[key as keyof typeof themeConfig.colors]);
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Palette
          </CardTitle>
          <CardDescription>
            Customize your store's color scheme to match your brand
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Colors */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Brand Colors</h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {colorOptions.slice(0, 3).map(({ key, label, description }) => (
                <ColorPicker
                  key={key}
                  label={label}
                  value={colors[key as keyof typeof colors]}
                  onChange={(value) => updateColor(key, value)}
                  description={description}
                />
              ))}
            </div>
          </div>

          {/* Base Colors */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-gray-900">Base Colors</h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {colorOptions.slice(3).map(({ key, label, description }) => (
                <ColorPicker
                  key={key}
                  label={label}
                  value={colors[key as keyof typeof colors]}
                  onChange={(value) => updateColor(key, value)}
                  description={description}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-between border-t pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetColors}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Colors
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Export Palette
              </Button>
              <Button variant="outline" size="sm">
                Import Palette
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Live Preview</CardTitle>
          <CardDescription className="text-sm">
            See how your color choices look in context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Button Preview */}
            <div>
              <p className="mb-2 text-sm font-medium">Buttons</p>
              <div className="flex flex-wrap gap-2">
                <button
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.background,
                  }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors"
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.background,
                  }}
                >
                  Secondary Button
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors border-2"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                >
                  Outline Button
                </button>
              </div>
            </div>

            {/* Text Preview */}
            <div>
              <p className="mb-2 text-sm font-medium">Typography</p>
              <div className="p-4 rounded-lg" style={{ backgroundColor: colors.muted }}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: colors.foreground }}>
                  Heading Example
                </h3>
                <p className="mb-2" style={{ color: colors.foreground }}>
                  This is regular body text using your foreground color.
                </p>
                <p className="text-sm" style={{ color: colors.mutedForeground }}>
                  This is secondary text using your muted foreground color.
                </p>
              </div>
            </div>

            {/* Card Preview */}
            <div>
              <p className="mb-2 text-sm font-medium">Card Example</p>
              <div 
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: colors.background,
                  borderColor: colors.border 
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold" style={{ color: colors.foreground }}>
                    Product Card
                  </h4>
                  <span 
                    className="px-2 py-1 text-xs font-medium rounded"
                    style={{ 
                      backgroundColor: colors.accent,
                      color: colors.background 
                    }}
                  >
                    New
                  </span>
                </div>
                <p className="text-sm" style={{ color: colors.mutedForeground }}>
                  Example product description
                </p>
                <div className="mt-3 pt-3 border-t" style={{ borderColor: colors.border }}>
                  <span className="text-lg font-semibold" style={{ color: colors.primary }}>
                    $99.99
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};