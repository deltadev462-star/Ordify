/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { CategoryCard } from "../components/CategoryCard";
import { Newsletter } from "../components/Newsletter";

interface ThemeComponentsConfig {
  variant?: "default" | "minimal" | "modern" | "luxe";
}

export const useThemeComponents = (config: ThemeComponentsConfig = {}) => {
  const { variant = "default" } = config;

  const components = useMemo(() => {
    return {
      ProductCard: (props: any) => <ProductCard {...props} variant={variant} />,
      CategoryCard: (props: any) => (
        <CategoryCard {...props} variant={variant} />
      ),
      Newsletter: (props: any) => <Newsletter {...props} variant={variant} />,
    };
  }, [variant]);

  return components;
};

// Hook for getting component variants based on theme
export const useComponentVariant = (themeName: string) => {
  const variantMap: Record<string, "default" | "minimal" | "modern" | "luxe"> =
    {
      modern: "modern",
      classic: "default",
      minimal: "minimal",
      luxe: "luxe",
    };

  return variantMap[themeName] || "default";
};
