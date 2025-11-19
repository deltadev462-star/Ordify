import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { getAllThemes } from "@/themes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import type { ThemeMetadata } from "@/types/theme.types";


export const ThemeSelector: React.FC = () => {
  const { t } = useTranslation();
  const { currentTheme, setTheme } = useTheme();
  const themes = getAllThemes();

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
  };

  return (
    <div className="space-y-4  ">
      <div>
        <h3 className="text-lg font-semibold mb-2">{t("Choose Theme")}</h3>
        <p className="text-sm text-gray-600 dark:text-white/75 mb-4">
          {t("Select a theme that best fits your brand and target audience")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {themes.map((theme: ThemeMetadata) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all hover:shadow-md border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] ${
              currentTheme === theme.id
                ? "ring-2 ring-primary border-primary"
                : "border-gray-200"
            }`}
            onClick={() => handleThemeSelect(theme.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-300">{t(theme.name)}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-500 mt-1">
                    {t(theme.description)}
                  </p>
                </div>
                {currentTheme === theme.id && (
                  <div className="shrink-0 rounded-full bg-primary p-1">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              {/* Theme Preview */}
              {/* <div className="mb-3 aspect-video rounded-lg bg-gray-100 overflow-hidden">
                <img
                  src={getImageSrc(theme)}
                  alt={`${theme.name} ${t("preview")}`}
                  className="h-full w-full object-cover"
                  onError={() => handleImageError(theme.id)}
                />
              </div> */}

              {/* Color Palette */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-gray-700">{t("Colors:")}</span>
                  <div className="flex gap-1">
                    <div
                      className="h-4 w-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: theme.colors.primary }}
                      title={`${t("Primary Color")}: ${theme.colors.primary}`}
                    />
                    <div
                      className="h-4 w-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: theme.colors.secondary }}
                      title={`${t("Secondary Color")}: ${theme.colors.secondary}`}
                    />
                    <div
                      className="h-4 w-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: theme.colors.accent }}
                      title={`${t("Accent Color")}: ${theme.colors.accent}`}
                    />
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="mb-3">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-500">{t("Font:")}</span>
                <span className="ml-2 text-xs text-gray-600">
                  {theme.typography.fontFamily.split(',')[0].replace(/['"]/g, '')}
                </span>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {Array.isArray(theme.features) && theme.features.length > 0 ? (
                  <>
                    {theme.features.slice(0, 3).map((feature: string) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="text-xs"
                      >
                        {t(feature)}
                      </Badge>
                    ))}
                    {theme.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{theme.features.length - 3} {t("more")}
                      </Badge>
                    )}
                  </>
                ) : (
                  Object.entries(theme.config?.features || {})
                    .filter(([, value]) => value === true)
                    .slice(0, 3)
                    .map(([feature]) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="text-xs"
                      >
                        {t(feature)}
                      </Badge>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Selection Info */}
      <div className="rounded-lg bg-blue-50 dark:bg-[#353434] p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
          {t("Selected:")} {t(themes.find((theme: ThemeMetadata) => theme.id === currentTheme)?.name || "")}
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          {t(themes.find((theme: ThemeMetadata) => theme.id === currentTheme)?.description || "")}
        </p>
      </div>
    </div>
  );
};