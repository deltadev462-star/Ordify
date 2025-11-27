import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ThemePreviewProps {
  device?: "desktop" | "tablet" | "mobile";
  className?: string;
}


export const ThemePreview: React.FC<ThemePreviewProps> = ({
  className = "",
}) => {
  const { t } = useTranslation();
  const { currentTheme } = useTheme();

  // Simplified preview - just show a static image
  return (
    <Card
      className={`overflow-hidden relative ${className} border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] dark:text-white`}
    >
      <CardHeader>
        <CardTitle>
          {t("themePreview")} - {currentTheme}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
            alt={`${currentTheme} theme preview`}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-2">{currentTheme} Theme</h3>
              <p className="text-lg">{t("Live Preview")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

