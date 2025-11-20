import { useState, useEffect } from "react";
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
  ShoppingBag,
  User,
  Menu,
  Heart,
  X,
  ChevronDown,
} from "lucide-react";

interface NavigationItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

interface LuxeHeaderProps {
  logo?: string | React.ReactNode;
  navigation?: NavigationItem[];
  cartItemCount?: number;
  wishlistCount?: number;
  transparent?: boolean;
  showSearch?: boolean;
  showAccount?: boolean;
  showWishlist?: boolean;
  onCartClick?: () => void;
  onAccountClick?: () => void;
  onWishlistClick?: () => void;
  onSearch?: (query: string) => void;
  className?: string;
}

const defaultNavigation: NavigationItem[] = [
  {
    label: "Collections",
    children: [
      {
        label: "New Arrivals",
        href: "/collections/new",
        description: "Discover the latest",
      },
      {
        label: "Signature Collection",
        href: "/collections/signature",
        description: "Timeless pieces",
      },
      {
        label: "Limited Edition",
        href: "/collections/limited",
        description: "Exclusive designs",
      },
      {
        label: "Heritage",
        href: "/collections/heritage",
        description: "Classic elegance",
      },
    ],
  },
  {
    label: "Boutique",
    children: [
      {
        label: "Women",
        href: "/boutique/women",
        description: "Sophisticated style",
      },
      { label: "Men", href: "/boutique/men", description: "Refined elegance" },
      {
        label: "Accessories",
        href: "/boutique/accessories",
        description: "Perfect details",
      },
      {
        label: "Jewelry",
        href: "/boutique/jewelry",
        description: "Exquisite pieces",
      },
    ],
  },
  { label: "Maison", href: "/maison" },
  { label: "Concierge", href: "/concierge" },
];

export const LuxeHeader = ({
  logo = "LUXE",
  navigation = defaultNavigation,
  cartItemCount = 0,
  wishlistCount = 0,
  transparent = true,
  showSearch = true,
  showAccount = true,
  showWishlist = true,
  onCartClick,
  onAccountClick,
  onWishlistClick,
  onSearch,
  className = "",
}: LuxeHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-500
    ${
      transparent && !isScrolled
        ? "bg-transparent text-white"
        : "bg-white text-gray-900 shadow-sm"
    }
    ${isScrolled ? "py-4" : "py-6"}
    ${className}
  `;

  const linkColor = transparent && !isScrolled ? "text-white" : "text-gray-900";
  const iconColor = transparent && !isScrolled ? "text-white" : "text-gray-900";

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className={`h-5 w-5 ${iconColor}`} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white">
                <SheetHeader>
                  <SheetTitle className="font-heading text-2xl font-light">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8">
                  <ul className="space-y-4">
                    {navigation.map((item) => (
                      <li key={item.label}>
                        {item.children ? (
                          <div>
                            <button
                              className="flex w-full items-center justify-between py-2 font-light text-sm uppercase tracking-wider"
                              onClick={() =>
                                setOpenDropdown(
                                  openDropdown === item.label
                                    ? null
                                    : item.label
                                )
                              }
                            >
                              {item.label}
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  openDropdown === item.label
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                            {openDropdown === item.label && (
                              <ul className="ml-4 mt-2 space-y-2">
                                {item.children.map((child) => (
                                  <li key={child.label}>
                                    <a
                                      href={child.href}
                                      className="block py-1.5 text-sm text-gray-600 hover:text-primary"
                                    >
                                      {child.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <a
                            href={item.href}
                            className="block py-2 font-light text-sm uppercase tracking-wider"
                          >
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
                  <h1
                    className={`font-heading text-2xl font-light tracking-[0.3em] uppercase ${linkColor}`}
                  >
                    {logo}
                  </h1>
                ) : (
                  logo
                )}
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
              <ul className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <li key={item.label} className="group relative">
                    {item.children ? (
                      <>
                        <button
                          className={`flex items-center space-x-1 py-2 font-light text-sm uppercase tracking-wider ${linkColor} transition-opacity hover:opacity-70`}
                          onMouseEnter={() => setOpenDropdown(item.label)}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="h-3 w-3" />
                        </button>
                        {openDropdown === item.label && (
                          <div
                            className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 transform bg-white shadow-xl"
                            onMouseEnter={() => setOpenDropdown(item.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                          >
                            <ul className="py-4">
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <a
                                    href={child.href}
                                    className="block px-6 py-3 hover:bg-gray-50"
                                  >
                                    <div className="font-light text-sm uppercase tracking-wider text-gray-900">
                                      {child.label}
                                    </div>
                                    {child.description && (
                                      <p className="mt-1 text-xs text-gray-500 font-light">
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
                        className={`py-2 font-light text-sm uppercase tracking-wider ${linkColor} transition-opacity hover:opacity-70`}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              {showSearch && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className={`h-5 w-5 ${iconColor}`} />
                  </Button>

                  {/* Search Modal */}
                  {isSearchOpen && (
                    <div
                      className="fixed inset-0 z-50 bg-black/80"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <div
                        className="bg-white p-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="container mx-auto max-w-4xl">
                          <form onSubmit={handleSearch} className="relative">
                            <Input
                              type="search"
                              placeholder="Search our collection..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="h-16 border-0 border-b-2 border-gray-300 pl-0 pr-12 text-xl font-light focus:border-primary focus:outline-none"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => setIsSearchOpen(false)}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                            </button>
                          </form>
                          <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500 font-light uppercase tracking-wider">
                              Popular Searches
                            </p>
                            <div className="mt-4 flex flex-wrap justify-center gap-4">
                              {[
                                "New Arrivals",
                                "Handbags",
                                "Jewelry",
                                "Watches",
                              ].map((term) => (
                                <button
                                  key={term}
                                  onClick={() => {
                                    setSearchQuery(term);
                                    handleSearch({
                                      preventDefault: () => {},
                                    } as React.FormEvent);
                                  }}
                                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                                >
                                  {term}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Account */}
              {showAccount && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onAccountClick}
                  className="hidden lg:flex"
                >
                  <User className={`h-5 w-5 ${iconColor}`} />
                </Button>
              )}

              {/* Wishlist */}
              {showWishlist && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onWishlistClick}
                  className="relative"
                >
                  <Heart className={`h-5 w-5 ${iconColor}`} />
                  {wishlistCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              )}

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onCartClick}
                className="relative"
              >
                <ShoppingBag className={`h-5 w-5 ${iconColor}`} />
                {cartItemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div
        className={`transition-all duration-500 ${
          isScrolled ? "h-20" : "h-28"
        }`}
      />
    </>
  );
};
