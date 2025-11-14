import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Type, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const fontFamilies = [
  { value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", label: "System Default" },
  { value: "'Inter', sans-serif", label: "Inter" },
  { value: "'Roboto', sans-serif", label: "Roboto" },
  { value: "'Open Sans', sans-serif", label: "Open Sans" },
  { value: "'Lato', sans-serif", label: "Lato" },
  { value: "'Montserrat', sans-serif", label: "Montserrat" },
  { value: "'Poppins', sans-serif", label: "Poppins" },
  { value: "'Playfair Display', serif", label: "Playfair Display" },
  { value: "'Georgia', serif", label: "Georgia" },
  { value: "'Times New Roman', serif", label: "Times New Roman" },
];

export const TypographyCustomizer: React.FC = () => {
  const { typography, themeConfig, updateTypography } = useTheme();

  if (!typography || !themeConfig) return null;

  const handleFontSizeChange = (size: keyof typeof typography.fontSize, value: string) => {
    updateTypography(`fontSize.${size}`, value);
  };

  const handleFontWeightChange = (weight: keyof typeof typography.fontWeight, value: number) => {
    updateTypography(`fontWeight.${weight}`, value);
  };

  const handleResetTypography = () => {
    updateTypography("fontFamily", themeConfig.typography.fontFamily);
    updateTypography("headingFontFamily", themeConfig.typography.headingFontFamily);
    Object.entries(themeConfig.typography.fontSize).forEach(([key, value]) => {
      updateTypography(`fontSize.${key}`, value);
    });
    Object.entries(themeConfig.typography.fontWeight).forEach(([key, value]) => {
      updateTypography(`fontWeight.${key}`, value);
    });
  };

  return (
    <div className="space-y-6">
      {/* Font Families */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Font Families
          </CardTitle>
          <CardDescription>
            Choose fonts that reflect your brand personality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="body-font">Body Font</Label>
            <Select
              value={typography.fontFamily}
              onValueChange={(value) => updateTypography("fontFamily", value)}
            >
              <SelectTrigger id="body-font">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    <span style={{ fontFamily: value }}>{label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Used for paragraphs, buttons, and general text</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="heading-font">Heading Font</Label>
            <Select
              value={typography.headingFontFamily}
              onValueChange={(value) => updateTypography("headingFontFamily", value)}
            >
              <SelectTrigger id="heading-font">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    <span style={{ fontFamily: value }}>{label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Used for titles and headings</p>
          </div>
        </CardContent>
      </Card>

      {/* Font Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>Font Sizes</CardTitle>
          <CardDescription>
            Adjust the scale of text sizes throughout your store
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(typography.fontSize).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`size-${key}`} className="capitalize">
                  {key === "xs" ? "Extra Small" : 
                   key === "sm" ? "Small" :
                   key === "base" ? "Base" :
                   key === "lg" ? "Large" :
                   key === "xl" ? "Extra Large" :
                   key === "2xl" ? "2X Large" :
                   key === "3xl" ? "3X Large" : key}
                </Label>
                <span className="text-sm text-gray-600 font-mono">{value}</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id={`size-${key}`}
                  min={8}
                  max={48}
                  step={1}
                  value={[parseFloat(value) * 16]}
                  onValueChange={(values) => 
                    handleFontSizeChange(key as keyof typeof typography.fontSize, `${values[0] / 16}rem`)
                  }
                  className="flex-1"
                />
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => handleFontSizeChange(key as keyof typeof typography.fontSize, e.target.value)}
                  className="w-20 font-mono text-sm"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Font Weights */}
      <Card>
        <CardHeader>
          <CardTitle>Font Weights</CardTitle>
          <CardDescription>
            Define the thickness of fonts for different text elements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(typography.fontWeight).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`weight-${key}`} className="capitalize">
                  {key}
                </Label>
                <span className="text-sm text-gray-600 font-mono">{value}</span>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id={`weight-${key}`}
                  min={100}
                  max={900}
                  step={100}
                  value={[value]}
                  onValueChange={(values) => 
                    handleFontWeightChange(key as keyof typeof typography.fontWeight, values[0])
                  }
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => handleFontWeightChange(key as keyof typeof typography.fontWeight, parseInt(e.target.value))}
                  className="w-20 font-mono text-sm"
                  min={100}
                  max={900}
                  step={100}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Typography Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Typography Preview</CardTitle>
          <CardDescription className="text-sm">
            See your typography settings in action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h1 
                className="mb-2"
                style={{ 
                  fontFamily: typography.headingFontFamily,
                  fontSize: typography.fontSize["3xl"],
                  fontWeight: typography.fontWeight.bold 
                }}
              >
                Heading 1 Example
              </h1>
              <h2 
                className="mb-2"
                style={{ 
                  fontFamily: typography.headingFontFamily,
                  fontSize: typography.fontSize["2xl"],
                  fontWeight: typography.fontWeight.semibold 
                }}
              >
                Heading 2 Example
              </h2>
              <h3 
                className="mb-3"
                style={{ 
                  fontFamily: typography.headingFontFamily,
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.semibold 
                }}
              >
                Heading 3 Example
              </h3>
            </div>

            <div className="space-y-2">
              <p 
                style={{ 
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.normal 
                }}
              >
                This is a paragraph example using your body font. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p 
                style={{ 
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.normal 
                }}
                className="text-gray-600"
              >
                This is smaller text, often used for descriptions and secondary content.
              </p>
              <p 
                style={{ 
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSize.xs,
                  fontWeight: typography.fontWeight.normal 
                }}
                className="text-gray-500"
              >
                This is extra small text, used for captions and fine print.
              </p>
            </div>

            <div className="pt-4">
              <button 
                className="px-6 py-2 bg-primary text-white rounded-md"
                style={{ 
                  fontFamily: typography.fontFamily,
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.medium 
                }}
              >
                Button Text Example
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={handleResetTypography}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Typography
        </Button>
      </div>
    </div>
  );
};