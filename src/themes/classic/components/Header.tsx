
import { useState } from "react";
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
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface NavigationItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
  }[];
}

interface ClassicHeaderProps {
  logo?: string | React.ReactNode;
  navigation?: NavigationItem[];
  cartItemCount?: number;
  wishlistCount?: number;
  showTopBar?: boolean;
  showSearch?: boolean;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  onCartClick?: () => void;
  onAccountClick?: () => void;
  onWishlistClick?: () => void;
  onSearch?: (query: string) => void;
  className?: string;
}

const defaultNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    children: [
      { label: "All Products", href: "/shop" },
      { label: "New Arrivals", href: "/shop/new" },
      { label: "Best Sellers", href: "/shop/best-sellers" },
      { label: "Sale", href: "/shop/sale" },
    ],
  },
  {
    label: "Categories",
    children: [
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Fashion", href: "/categories/fashion" },
      { label: "Home & Garden", href: "/categories/home-garden" },
      { label: "Sports & Outdoors", href: "/categories/sports" },
      { label: "Beauty & Health", href: "/categories/beauty" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export const ClassicHeader = ({
  logo = "CLASSIC STORE",
  navigation = defaultNavigation,
  cartItemCount = 0,
  wishlistCount = 0,
  showTopBar = true,
  showSearch = true,
  contactInfo = {
    phone: "+1 (555) 123-4567",
    email: "support@classicstore.com",
  },
  onCartClick,
  onAccountClick,
  onWishlistClick,
  onSearch,
  className = "",
}: ClassicHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  return (
    <header className={`bg-white ${className}`}>
      {/* Top Bar */}
      {showTopBar && (
        <div className="border-b bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex h-10 items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                {contactInfo.phone && (
                  <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-1 text-gray-600 hover:text-primary">
                    <Phone className="h-3 w-3" />
                    {contactInfo.phone}
                  </a>
                )}
                {contactInfo.email && (
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-1 text-gray-600 hover:text-primary">
                    <Mail className="h-3 w-3" />
                    {contactInfo.email}
                  </a>
                )}
              </div>
              <div className="hidden items-center gap-4 md:flex">
                <a href="/track-order" className="text-gray-600 hover:text-primary">Track Order</a>
                <span className="text-gray-300">|</span>
                <a href="/help" className="text-gray-600 hover:text-primary">Help</a>
                <span className="text-gray-300">|</span>
                <a href="/account" className="text-gray-600 hover:text-primary">My Account</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="border-b">
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
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6">
                  <ul className="space-y-3">
                    {navigation.map((item) => (
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
                  <h1 className="font-serif text-2xl font-bold text-gray-900">{logo}</h1>
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
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className="h-4 w-4 text-gray-400" />
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
              <Button variant="ghost" size="icon" onClick={onWishlistClick} className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          {showSearch && (
            <div className="mt-3 lg:hidden">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-400" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <nav className="hidden border-b bg-gray-50 lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center">
            {navigation.map((item) => (
              <li key={item.label} className="group relative">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-4 py-3 font-medium text-gray-700 hover:bg-white hover:text-primary"
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {item.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div
                        className="absolute left-0 top-full z-10 w-48 border bg-white shadow-lg"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <ul className="py-2">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary"
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
                    className="block px-4 py-3 font-medium text-gray-700 hover:bg-white hover:text-primary"
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