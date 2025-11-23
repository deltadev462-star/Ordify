import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Type, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const TypographyCustomizer: React.FC = () => {
  const { t } = useTranslation();
  const { typography, themeConfig, updateTypography } = useTheme();

  const fontFamilies = [
    {
      value:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      label: t("fontFamilies.systemDefault"),
    },
    { value: "'Inter', sans-serif", label: t("fontFamilies.inter") },
    { value: "'Roboto', sans-serif", label: t("fontFamilies.roboto") },
    { value: "'Open Sans', sans-serif", label: t("fontFamilies.openSans") },
    { value: "'Lato', sans-serif", label: t("fontFamilies.lato") },
    { value: "'Montserrat', sans-serif", label: t("fontFamilies.montserrat") },
    { value: "'Poppins', sans-serif", label: t("fontFamilies.poppins") },
    { value: "'Playfair Display', serif", label: t("fontFamilies.playfair") },
    { value: "'Georgia', serif", label: t("fontFamilies.georgia") },
    {
      value: "'Times New Roman', serif",
      label: t("fontFamilies.timesNewRoman"),
    },
  ];

  if (!typography || !themeConfig) return null;

  const handleFontSizeChange = (
    size: keyof typeof typography.fontSize,
    value: string
  ) => {
    updateTypography(`fontSize.${size}`, value);
  };

  const handleFontWeightChange = (
    weight: keyof typeof typography.fontWeight,
    value: number
  ) => {
    updateTypography(`fontWeight.${weight}`, value);
  };

  const handleResetTypography = () => {
    updateTypography("fontFamily", themeConfig.typography.fontFamily);
    updateTypography(
      "headingFontFamily",
      themeConfig.typography.headingFontFamily
    );
    Object.entries(themeConfig.typography.fontSize).forEach(([key, value]) => {
      updateTypography(`fontSize.${key}`, value);
    });
    Object.entries(themeConfig.typography.fontWeight).forEach(
      ([key, value]) => {
        updateTypography(`fontWeight.${key}`, value);
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Font Families */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            {t("titles.fontFamilies")}
          </CardTitle>
          <CardDescription>
            {t("descriptions.chooseFontsBrand")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Body Font */}
          <div className="space-y-2">
            <Label htmlFor="body-font">{t("labels.bodyFont")}</Label>

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

            <p className="text-xs text-gray-500">
              {t("descriptions.bodyFontUsage")}
            </p>
          </div>

          {/* Heading Font */}
          <div className="space-y-2">
            <Label htmlFor="heading-font">{t("labels.headingFont")}</Label>

            <Select
              value={typography.headingFontFamily}
              onValueChange={(value) =>
                updateTypography("headingFontFamily", value)
              }
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

            <p className="text-xs text-gray-500">
              {t("descriptions.headingFontUsage")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Font Sizes */}
      <Card>
        <CardHeader>
          <CardTitle>{t("titles.fontSizes")}</CardTitle>
          <CardDescription>{t("descriptions.fontSizesDesc")}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {Object.entries(typography.fontSize).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`size-${key}`} className="capitalize">
                  {t(`sizes.${key}`, key)}
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
                    handleFontSizeChange(
                      key as keyof typeof typography.fontSize,
                      `${values[0] / 16}rem`
                    )
                  }
                  className="flex-1"
                />

                <Input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleFontSizeChange(
                      key as keyof typeof typography.fontSize,
                      e.target.value
                    )
                  }
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
          <CardTitle>{t("titles.fontWeights")}</CardTitle>
          <CardDescription>{t("descriptions.fontWeightsDesc")}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {Object.entries(typography.fontWeight).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={`weight-${key}`} className="capitalize">
                  {t(`weights.${key}`, key)}
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
                    handleFontWeightChange(
                      key as keyof typeof typography.fontWeight,
                      values[0]
                    )
                  }
                  className="flex-1"
                />

                <Input
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleFontWeightChange(
                      key as keyof typeof typography.fontWeight,
                      parseInt(e.target.value)
                    )
                  }
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

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t("titles.typographyPreview")}
          </CardTitle>
          <CardDescription className="text-sm">
            {t("descriptions.previewDesc")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <h1>{t("preview.heading1")}</h1>
          <h2>{t("preview.heading2")}</h2>
          <h3>{t("preview.heading3")}</h3>

          <p>{t("preview.paragraph")}</p>
          <p>{t("preview.smallText")}</p>
          <p>{t("preview.extraSmallText")}</p>

          <button>{t("preview.buttonText")}</button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleResetTypography}
        >
          <RotateCcw className="h-4 w-4" />
          {t("actions.resetTypography")}
        </Button>
      </div>
    </div>
  );
};

