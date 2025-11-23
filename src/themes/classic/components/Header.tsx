
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Heart,
  Phone,
  Mail,
  ChevronDown,
  Minus,
  Plus,
  Trash2
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
}

interface ClassicHeaderProps {
  logo?: string | React.ReactNode;
  navigation?: NavigationItem[];
  cartItemCount?: number;
  cartItems?: CartItem[];
  wishlistCount?: number;
  wishlistItems?: WishlistItem[];
  showTopBar?: boolean;
  showSearch?: boolean;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  onCartClick?: () => void;
  onAccountClick?: () => void;
  onWishlistClick?: () => void;
  onAddToWishlist?: (item: WishlistItem) => void;
  onRemoveFromWishlist?: (itemId: string) => void;
  onMoveToCart?: (item: WishlistItem) => void;
  onSearch?: (query: string) => void;
  onQuantityChange?: (itemId: string, newQuantity: number) => void;
  onRemoveFromCart?: (itemId: string) => void;
  onCheckout?: () => void;
  className?: string;
}

export const ClassicHeader = ({
  logo = "CLASSIC STORE",
  navigation,
  cartItemCount = 0,
  cartItems = [],
  wishlistCount = 0,
  wishlistItems = [],
  showTopBar = true,
  showSearch = true,
  contactInfo = {
    phone: "+1 (555) 123-4567",
    email: "support@classicstore.com",
  },
  onCartClick,
  onAccountClick,
  onWishlistClick,
  onRemoveFromWishlist,
  onMoveToCart,
  onSearch,
  onQuantityChange,
  onRemoveFromCart,
  onCheckout,
  className = "",
}: ClassicHeaderProps) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const defaultNavigation: NavigationItem[] = [
    { label: t("Home"), href: "/" },
    {
      label: t("Shop"),
      children: [
        { label: t("All Products"), href: "/shop" },
        { label: t("New Arrivals"), href: "/shop/new" },
        { label: t("Best Sellers"), href: "/shop/best-sellers" },
        { label: t("Sale"), href: "/shop/sale" },
      ],
    },
    {
      label: t("Categories"),
      children: [
        { label: t("Electronics"), href: "/categories/electronics" },
        { label: t("Fashion"), href: "/categories/fashion" },
        { label: t("Home & Garden"), href: "/categories/home-garden" },
        { label: t("Sports & Outdoors"), href: "/categories/sports" },
        { label: t("Beauty & Health"), href: "/categories/beauty" },
      ],
    },
    { label: t("About Us"), href: "/about" },
    { label: t("Contact"), href: "/contact" },
    { label: t("Blog"), href: "/blog" },
  ];

  const navigationToUse = navigation && navigation.length > 0 ? navigation : defaultNavigation;

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  return (
    <header className={`bg-white dark:bg-[#1a1a1a] ${className}`}>
      {/* Top Bar */}
      {showTopBar && (
        <div className="border-b border-[#e0e0e0] dark:border-[#3a3a3a] bg-gray-50 dark:bg-[#2e2e2e]">
          <div className="container mx-auto px-4">
            <div className="flex h-10 items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                {contactInfo.phone && (
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-[#8b7355]">
                    <Phone className="h-3 w-3" />
                    {contactInfo.phone}
                  </a>
                )}
                {contactInfo.email && (
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-[#8b7355]">
                    <Mail className="h-3 w-3" />
                    {contactInfo.email}
                  </a>
                )}
              </div>
              <div className="hidden items-center gap-4 md:flex">
                <a href="/track-order" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-[#8b7355]">{t("Track Order")}</a>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-[#8b7355]">{t("Help")}</a>
                <span className="text-gray-300 dark:text-gray-600">|</span>
                <a href="/account" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-[#8b7355]">{t("My Account")}</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="border-b border-[#e0e0e0] dark:border-[#3a3a3a] bg-white dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                  <ul className="space-y-3">
                    {navigationToUse.map((item) => (
                      <li key={item.label}>
                        {item.children ? (
                          <div className="border-b pb-2">
                            <button
                              className="flex w-full items-center justify-between py-2 font-medium"
                              onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                            >
                              {item.label}
                              <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                            </button>
                            {openDropdown === item.label && (
                              <ul className="ml-4 mt-2 space-y-2">
                                {item.children.map((child) => (
                                  <li key={child.label}>
                                    <a href={child.href} className="block py-1 text-gray-600 hover:text-primary">
                                      {child.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <a href={item.href} className="block border-b py-2 font-medium">
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
            <div className="shrink-0">
              <a href="/">
                {typeof logo === "string" ? (
                  <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">{logo}</h1>
                ) : (
                  logo
                )}
              </a>
            </div>

            {/* Search Bar - Desktop */}
            {showSearch && (
              <div className="mx-8 hidden flex-1 lg:block">
                <form onSubmit={handleSearch} className="relative">
                  <Input
                    type="search"
                    placeholder={t("Search for products...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 border border-[#e0e0e0] dark:border-[#3a3a3a] dark:bg-[#242424] dark:text-gray-100 w-150 mx-auto"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </button>
                </form>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Account */}
              <Button variant="ghost" size="icon" onClick={onAccountClick}>
                <User className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <DropdownMenu open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className={`h-5 w-5 ${wishlistItems.length > 0 ? 'fill-red-600 text-red-600' : ''}`} />
                    {wishlistCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 bg-white dark:bg-[#242424] border border-[#e0e0e0] dark:border-[#3a3a3a]">
                  <DropdownMenuLabel className="font-medium text-gray-900 dark:text-gray-100">{t("My Wishlist")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {wishlistItems.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                      {t("Your wishlist is empty")}
                    </div>
                  ) : (
                    <>
                      <div className="max-h-[300px] overflow-y-auto">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-[#2e2e2e]">
                            <div className="flex gap-3 w-full">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.name}</h4>
                                {item.variant && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.variant}</p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                  <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                    ${item.price.toFixed(2)}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-[#34495e] dark:text-[#8b7355] hover:bg-[#34495e] dark:hover:bg-[#8b7355] hover:text-white"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onMoveToCart?.(item);
                                        onRemoveFromWishlist?.(item.id);
                                      }}
                                    >
                                      {t("Add to Cart")}
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-gray-400 hover:text-red-600"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveFromWishlist?.(item.id);
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <DropdownMenuSeparator />
                      <div className="p-4">
                        <Button
                          variant="outline"
                          className="w-full dark:bg-[#2e2e2e] dark:hover:bg-[#3a3a3a] dark:text-gray-100 dark:border-[#3a3a3a]"
                          onClick={() => {
                            setIsWishlistOpen(false);
                            onWishlistClick?.();
                          }}
                        >
                          {t("View All Wishlist Items")}
                        </Button>
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <DropdownMenu open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-96 bg-white dark:bg-[#242424] border border-[#e0e0e0] dark:border-[#3a3a3a]">
                  <DropdownMenuLabel className="font-medium text-gray-900 dark:text-gray-100">{t("Shopping Cart")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {cartItems.length === 0 ? (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                      {t("Your cart is empty")}
                    </div>
                  ) : (
                    <>
                      <div className="max-h-[300px] overflow-y-auto">
                        {cartItems.map((item) => (
                          <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-[#2e2e2e]">
                            <div className="flex gap-3 w-full">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.name}</h4>
                                {item.variant && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.variant}</p>
                                )}
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onQuantityChange?.(item.id, Math.max(1, item.quantity - 1));
                                      }}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="px-2 text-sm">{item.quantity}</span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onQuantityChange?.(item.id, item.quantity + 1);
                                      }}
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                                      ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 text-gray-400 hover:text-red-600"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveFromCart?.(item.id);
                                      }}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <DropdownMenuSeparator />
                      <div className="p-4">
                        <div className="flex justify-between mb-3">
                          <span className="font-medium text-gray-900 dark:text-gray-100">{t("Subtotal")}</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100">${calculateSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="space-y-2">
                          <Button
                            className="w-full"
                            onClick={() => {
                              setIsCartOpen(false);
                              onCheckout?.();
                            }}
                          >
                            {t("Checkout")}
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full dark:bg-[#2e2e2e] dark:hover:bg-[#3a3a3a] dark:text-gray-100 dark:border-[#3a3a3a]"
                            onClick={() => {
                              setIsCartOpen(false);
                              onCartClick?.();
                            }}
                          >
                            {t("View Cart")}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          {showSearch && (
            <div className="mt-3 lg:hidden">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder={t("Search...")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 dark:bg-[#242424] dark:border-[#3a3a3a] dark:text-gray-100"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <nav className="hidden border-b border-[#e0e0e0] dark:border-[#3a3a3a] bg-gray-50 dark:bg-[#2e2e2e] lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center">
            {navigationToUse.map((item) => (
              <li key={item.label} className="group relative">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#1a1a1a] hover:text-[#34495e] dark:hover:text-[#8b7355]"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div
                        className="absolute left-0 top-full z-10 w-48 border border-[#e0e0e0] dark:border-[#3a3a3a] bg-white dark:bg-[#242424] shadow-lg"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <ul className="py-2">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2e2e2e] hover:text-[#34495e] dark:hover:text-[#8b7355]"
                              >
                                {child.label}
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
                    className="block px-4 py-3 font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-[#1a1a1a] hover:text-[#34495e] dark:hover:text-[#8b7355]"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
