import React, { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { Palette, RotateCcw, Check, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  description,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={label} className="text-sm font-medium">
        {label}
      </Label>
      {description && <p className="text-xs text-gray-500">{description}</p>}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Input
            type="color"
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsPickerOpen(true)}
            onBlur={() => setIsPickerOpen(false)}
            className="h-10 w-10 cursor-pointer overflow-hidden rounded-md border-2 p-0 transition-all hover:scale-110"
            style={{
              borderColor: isPickerOpen ? value : "transparent",
              boxShadow: isPickerOpen ? `0 0 0 3px ${value}20` : "none",
            }}
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

interface ColorPresetProps {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onApply: () => void;
  isActive?: boolean;
}

interface ColorScheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const ColorPreset: React.FC<ColorPresetProps> = ({
  name,
  colors,
  onApply,
  isActive,
}) => {
  return (
    <button
      onClick={onApply}
      className={`group relative w-full rounded-lg border-2 p-4 text-left transition-all hover:shadow-md ${
        isActive
          ? "border-primary shadow-md"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {isActive && (
        <div className="absolute -top-2 -right-2 rounded-full bg-primary p-1">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium text-sm">{name}</span>
        <Sparkles className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
      </div>
      <div className="flex gap-2">
        <div
          className="h-8 w-8 rounded-full border border-gray-200"
          style={{ backgroundColor: colors.primary }}
          title="Primary"
        />
        <div
          className="h-8 w-8 rounded-full border border-gray-200"
          style={{ backgroundColor: colors.secondary }}
          title="Secondary"
        />
        <div
          className="h-8 w-8 rounded-full border border-gray-200"
          style={{ backgroundColor: colors.accent }}
          title="Accent"
        />
      </div>
    </button>
  );
};

export const ColorCustomizer: React.FC = () => {
  const { t } = useTranslation();
  const {
    colors,
    themeConfig,
    updateColor,
    updateCustomizations,
    customizations,
  } = useTheme();
  const [activeTab, setActiveTab] = useState("light");

  if (!colors || !themeConfig) return null;

  const lightColorOptions = [
    {
      key: "primary",
      label: t("Primary Color"),
      description: t(
        "Main brand color used for buttons, links, and key UI elements"
      ),
    },
    {
      key: "secondary",
      label: t("Secondary Color"),
      description: t("Supporting color for secondary actions and accents"),
    },
    {
      key: "accent",
      label: t("Accent Color"),
      description: t("Highlight color for special elements and notifications"),
    },
    {
      key: "background",
      label: t("Background"),
      description: t("Main background color for your store"),
    },
    {
      key: "foreground",
      label: t("Text Color"),
      description: t("Default text color throughout the store"),
    },
    {
      key: "muted",
      label: t("Muted Background"),
      description: t("Background for cards, sections, and subtle elements"),
    },
    {
      key: "mutedForeground",
      label: t("Muted Text"),
      description: t("Color for secondary text and labels"),
    },
    {
      key: "border",
      label: t("Border Color"),
      description: t("Default border color for inputs, cards, and dividers"),
    },
  ];

  const darkColorOptions = [
    {
      key: "darkPrimary",
      label: t("Dark Primary Color"),
      description: t("Main brand color for dark mode buttons and key elements"),
    },
    {
      key: "darkSecondary",
      label: t("Dark Secondary Color"),
      description: t("Supporting color for dark mode secondary actions"),
    },
    {
      key: "darkAccent",
      label: t("Dark Accent Color"),
      description: t("Highlight color for dark mode special elements"),
    },
    {
      key: "darkBackground",
      label: t("Dark Background"),
      description: t("Main background color for dark mode"),
    },
    {
      key: "darkForeground",
      label: t("Dark Text Color"),
      description: t("Default text color in dark mode"),
    },
    {
      key: "darkMuted",
      label: t("Dark Muted Background"),
      description: t("Background for cards and sections in dark mode"),
    },
    {
      key: "darkMutedForeground",
      label: t("Dark Muted Text"),
      description: t("Secondary text color in dark mode"),
    },
    {
      key: "darkBorder",
      label: t("Dark Border Color"),
      description: t("Border color for inputs and cards in dark mode"),
    },
  ];

  const handleResetColors = () => {
    updateCustomizations({
      ...customizations,
      colors: {},
    });
  };

  const applyPreset = (preset: ColorScheme) => {
    updateCustomizations({
      ...customizations,
      colors: {
        ...customizations.colors,
        ...preset.colors,
      },
    });
  };

  const isPresetActive = (preset: ColorScheme): boolean => {
    return (
      preset.colors.primary === colors.primary &&
      preset.colors.secondary === colors.secondary &&
      preset.colors.accent === colors.accent
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t("Color Palette")}
          </CardTitle>
          <CardDescription>
            {t("Customize your store's color scheme to match your brand")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="presets">{t("Presets")}</TabsTrigger>
              <TabsTrigger value="light">{t("Light Mode")}</TabsTrigger>
              <TabsTrigger value="dark">{t("Dark Mode")}</TabsTrigger>
            </TabsList>

            <TabsContent value="presets" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {themeConfig.presets?.colorSchemes?.map((preset, index) => (
                  <ColorPreset
                    key={index}
                    name={preset.name}
                    colors={preset.colors}
                    onApply={() => applyPreset(preset)}
                    isActive={isPresetActive(preset)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* Light mode */}
            <TabsContent value="light" className="mt-6 space-y-6">
              <div>
                <h4 className="mb-4 text-sm font-semibold text-gray-900">
                  {t("Brand Colors")}
                </h4>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {lightColorOptions
                    .slice(0, 3)
                    .map(({ key, label, description }) => (
                      <ColorPicker
                        key={key}
                        label={t(label)}
                        value={colors[key as keyof typeof colors] || "#000000"}
                        onChange={(value) => updateColor(key, value)}
                        description={t(description)}
                      />
                    ))}
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold text-gray-900">
                  {t("Base Colors")}
                </h4>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {lightColorOptions
                    .slice(3)
                    .map(({ key, label, description }) => (
                      <ColorPicker
                        key={key}
                        label={t(label)}
                        value={colors[key as keyof typeof colors] || "#000000"}
                        onChange={(value) => updateColor(key, value)}
                        description={t(description)}
                      />
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* Dark mode */}
            <TabsContent value="dark" className="mt-6 space-y-6">
              <div>
                <h4 className="mb-4 text-sm font-semibold text-gray-900">
                  {t("Dark Brand Colors")}
                </h4>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {darkColorOptions
                    .slice(0, 3)
                    .map(({ key, label, description }) => (
                      <ColorPicker
                        key={key}
                        label={t(label)}
                        value={colors[key as keyof typeof colors] || "#000000"}
                        onChange={(value) => updateColor(key, value)}
                        description={t(description)}
                      />
                    ))}
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold text-gray-900">
                  {t("Dark Base Colors")}
                </h4>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {darkColorOptions
                    .slice(3)
                    .map(({ key, label, description }) => (
                      <ColorPicker
                        key={key}
                        label={t(label)}
                        value={colors[key as keyof typeof colors] || "#000000"}
                        onChange={(value) => updateColor(key, value)}
                        description={t(description)}
                      />
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer Actions */}
          <div className="flex justify-between border-t pt-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetColors}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              {t("Reset Colors")}
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                {t("Export Palette")}
              </Button>
              <Button variant="outline" size="sm">
                {t("Import Palette")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("Live Preview")}</CardTitle>
          <CardDescription className="text-sm">
            {t("See how your color choices look in context")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Buttons */}
            <div>
              <p className="mb-2 text-sm font-medium">{t("Buttons")}</p>

              <div className="flex flex-wrap gap-2">
                <button
                  className="px-4 py-2 text-sm font-medium rounded-md transition-all hover:scale-105"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.background,
                  }}
                >
                  {t("Primary Button")}
                </button>

                <button
                  className="px-4 py-2 text-sm font-medium rounded-md transition-all hover:scale-105"
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.background,
                  }}
                >
                  {t("Secondary Button")}
                </button>

                <button
                  className="px-4 py-2 text-sm font-medium rounded-md transition-all hover:scale-105 border-2"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    backgroundColor: "transparent",
                  }}
                >
                  {t("Outline Button")}
                </button>
              </div>
            </div>

            {/* Typography */}
            <div>
              <p className="mb-2 text-sm font-medium">{t("Typography")}</p>

              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors.muted }}
              >
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: colors.foreground }}
                >
                  {t("Heading Example")}
                </h3>

                <p className="mb-2" style={{ color: colors.foreground }}>
                  {t("This is regular body text using your foreground color.")}
                </p>

                <p
                  className="text-sm"
                  style={{ color: colors.mutedForeground }}
                >
                  {t(
                    "This is secondary text using your muted foreground color."
                  )}
                </p>
              </div>
            </div>

            {/* Card Example */}
            <div>
              <p className="mb-2 text-sm font-medium">{t("Card Example")}</p>

              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className="font-semibold"
                    style={{ color: colors.foreground }}
                  >
                    {t("Product Card")}
                  </h4>

                  <span
                    className="px-2 py-1 text-xs font-medium rounded"
                    style={{
                      backgroundColor: colors.accent,
                      color: colors.background,
                    }}
                  >
                    {t("New")}
                  </span>
                </div>

                <p
                  className="text-sm"
                  style={{ color: colors.mutedForeground }}
                >
                  {t("Example product description")}
                </p>

                <div
                  className="mt-3 pt-3 border-t"
                  style={{ borderColor: colors.border }}
                >
                  <span
                    className="text-lg font-semibold"
                    style={{ color: colors.primary }}
                  >
                    $99.99
                  </span>
                </div>
              </div>
            </div>

            {/* Swatches */}
            <div>
              <p className="mb-2 text-sm font-medium">{t("Color Palette")}</p>

              <div className="grid grid-cols-4 gap-2">
                {Object.entries(colors)
                  .filter(([, value]) => value)
                  .map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div
                        className="h-12 w-full rounded-md border border-gray-200 mb-1 hover:scale-105 transition-transform"
                        style={{ backgroundColor: value }}
                      />
                      <span className="text-xs text-gray-600 capitalize">
                        {t(key.replace(/([A-Z])/g, " $1").trim())}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
