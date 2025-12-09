import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  productCount?: number;
  description?: string;
  onClick?: (id: string) => void;
  variant?: "default" | "overlay" | "minimal" | "luxe";
  className?: string;
}

export const CategoryCard = ({
  id,
  name,
  image,
  productCount,
  description,
  onClick,
  variant = "default",
  className = "",
}: CategoryCardProps) => {
  const handleClick = () => {
    onClick?.(id);
  };

  if (variant === "overlay") {
    return (
      <Card
        className={`group relative h-64 cursor-pointer overflow-hidden ${className}`}
        onClick={handleClick}
      >
        <div className="absolute inset-0">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        </div>
        <CardContent className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="mb-2 text-2xl font-bold">{name}</h3>
          {description && (
            <p className="mb-3 text-sm text-white/90">{description}</p>
          )}
          {productCount !== undefined && (
            <p className="mb-3 text-sm text-white/80">
              {"Products Count"}
            </p>
          )}
          <Button
            variant="secondary"
            size="sm"
            className="w-fit"
          >
            {"Shop Now"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (variant === "minimal") {
    return (
      <Card
        className={`group cursor-pointer overflow-hidden transition-all hover:shadow-lg ${className}`}
        onClick={handleClick}
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="mb-1 text-lg font-semibold">{name}</h3>
          {productCount !== undefined && (
            <p className="text-sm text-gray-500">{"Items Count"}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === "luxe") {
    return (
      <Card
        className={`group relative h-80 cursor-pointer overflow-hidden border-0 shadow-lg ${className}`}
        onClick={handleClick}
      >
        <div className="absolute inset-0">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
          />
          <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/60" />
        </div>
        <CardContent className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
          <h3 className="mb-3 font-serif text-3xl font-light tracking-wide">
            {name}
          </h3>
          {description && (
            <p className="mb-4 max-w-xs text-sm text-white/90">
              {description}
            </p>
          )}
          <div className="h-px w-16 bg-white/50 transition-all group-hover:w-24" />
          {productCount !== undefined && (
            <p className="mt-4 text-xs uppercase tracking-widest text-white/80">
              {"Exclusive Items"}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card
      className={`group cursor-pointer overflow-hidden transition-all hover:shadow-md ${className}`}
      onClick={handleClick}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mb-1 font-semibold text-gray-900">{name}</h3>
            {productCount !== undefined && (
              <p className="text-sm text-gray-500">
                {"Collection Products"}
              </p>
            )}
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
