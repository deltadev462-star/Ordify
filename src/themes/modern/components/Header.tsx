import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  ChevronDown,
  X,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

interface NavigationItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

interface ModernHeaderProps {
  logo?: string | React.ReactNode;
  navigation?: NavigationItem[];
  cartItemCount?: number;
  wishlistCount?: number;
  showSearch?: boolean;
  showAccount?: boolean;
  showWishlist?: boolean;
  onCartClick?: () => void;
  onAccountClick?: () => void;
  onWishlistClick?: () => void;
  onSearch?: (query: string) => void;
  className?: string;
}

export const ModernHeader = ({
  logo = "ORDIFY",
  navigation,
  cartItemCount = 0,
  wishlistCount = 0,
  showSearch = true,
  showAccount = true,
  showWishlist = true,
  onCartClick,
  onAccountClick,
  onWishlistClick,
  onSearch,
  className = "",
}: ModernHeaderProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const defaultNavigation: NavigationItem[] = [
    {
      label: t("Shop"),
      children: [
        {
          label: t("New Arrivals"),
          href: "/shop/new",
          description: t("Check out the latest products"),
        },
        {
          label: t("Best Sellers"),
          href: "/shop/best-sellers",
          description: t("Our most popular items"),
        },
        {
          label: t("Sale"),
          href: "/shop/sale",
          description: t("Great deals and discounts"),
        },
      ],
    },
    {
      label: t("Collections"),
      children: [
        { label: t("Summer Collection"), href: "/collections/summer" },
        { label: t("Winter Collection"), href: "/collections/winter" },
        { label: t("Limited Edition"), href: "/collections/limited" },
      ],
    },
    { label: t("About"), href: "/about" },
    { label: t("Contact"), href: "/contact" },
  ];

  const nav = navigation || defaultNavigation;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${className}`}
      style={{
        background: colors
          ? `linear-gradient(to bottom, ${colors.background}ee, ${colors.background}dd)`
          : "white",
        borderBottom: `1px solid ${colors?.border || "#e5e7eb"}`,
        boxShadow: colors ? `0 2px 10px ${colors.primary}10` : undefined,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>{t("Menu")}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-4">
                  {nav.map((item) => (
                    <li key={item.label}>
                      {item.children ? (
                        <div>
                          <button
                            className="flex w-full items-center justify-between py-2 font-medium"
                            onClick={() => handleDropdownToggle(item.label)}
                          >
                            {item.label}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                openDropdown === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openDropdown === item.label && (
                            <ul className="ml-4 mt-2 space-y-2">
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <a
                                    href={child.href}
                                    className="block py-1.5 text-sm text-gray-600 hover:text-gray-900"
                                  >
                                    <div className="font-medium">
                                      {child.label}
                                    </div>
                                    {child.description && (
                                      <p className="text-xs text-gray-500">
                                        {child.description}
                                      </p>
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <a href={item.href} className="block py-2 font-medium">
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-1 lg:flex-none">
            <a href="/" className="inline-flex items-center">
              {typeof logo === "string" ? (
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: colors
                      ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                      : undefined,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {logo}
                </span>
              ) : (
                logo
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
            <ul className="flex items-center space-x-8">
              {nav.map((item) => (
                <li key={item.label} className="group relative">
                  {item.children ? (
                    <>
                      <button
                        className="relative flex items-center space-x-1 py-5 font-medium transition-all duration-300 group"
                        style={{ color: colors?.foreground || "#374151" }}
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                        <span
                          className="absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                          style={{
                            background: colors
                              ? `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                              : undefined,
                          }}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div
                          className="absolute left-0 top-full w-64 rounded-lg border bg-white shadow-lg"
                          onMouseEnter={() => setOpenDropdown(item.label)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          <ul className="p-4">
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  className="block rounded px-3 py-2 hover:bg-gray-50"
                                >
                                  <div className="font-medium">
                                    {child.label}
                                  </div>
                                  {child.description && (
                                    <p className="text-sm text-gray-500">
                                      {child.description}
                                    </p>
                                  )}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="relative py-5 font-medium transition-all duration-300 group"
                      style={{ color: colors?.foreground || "#374151" }}
                    >
                      {item.label}
                      <span
                        className="absolute -bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                        style={{
                          background: colors
                            ? `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                            : undefined,
                        }}
                      />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {showSearch && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden lg:flex"
                >
                  <Search className="h-5 w-5" />
                </Button>
                {isSearchOpen && (
                  <div
                    className="fixed inset-0 z-50 bg-black/50"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <div
                      className="bg-white p-4 shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="container mx-auto">
                        <form onSubmit={handleSearch} className="relative">
                          <Input
                            type="search"
                            placeholder={t("Search products...")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-14 pr-12 text-lg"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                          >
                            <X className="h-6 w-6" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {showAccount && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onAccountClick}
                className="hidden lg:flex"
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            {showWishlist && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onWishlistClick}
                className="relative"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white shadow-lg"
                    style={{
                      background: colors
                        ? `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`
                        : "#ef4444",
                      boxShadow: colors
                        ? `0 2px 8px ${colors.accent}40`
                        : undefined,
                    }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-white shadow-lg"
                  style={{
                    background: colors
                      ? `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`
                      : undefined,
                    boxShadow: colors
                      ? `0 2px 8px ${colors.accent}40`
                      : undefined,
                  }}
                >
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
