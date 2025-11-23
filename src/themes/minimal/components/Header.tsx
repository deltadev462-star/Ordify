import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X
} from "lucide-react";

interface NavigationItem {
  label: string;
  href: string;
}

interface MinimalHeaderProps {
  logo?: string | React.ReactNode;
  navigation?: NavigationItem[];
  cartItemCount?: number;
  transparent?: boolean;
  fixed?: boolean;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  className?: string;
}

const defaultNavigation: NavigationItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const MinimalHeader = ({
  logo = "MINIMAL",
  navigation = defaultNavigation,
  cartItemCount = 0,
  transparent = true,
  fixed = true,
  onCartClick,
  onSearchClick,
  className = "",
}: MinimalHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = `
    ${fixed ? "fixed top-0 left-0 right-0 z-50" : "relative"}
    ${transparent && !isScrolled ? "bg-transparent" : "bg-white shadow-sm"}
    transition-all duration-300 ease-in-out
    ${className}
  `;

  const textColor = transparent && !isScrolled ? "text-white" : "text-black";
  const borderColor = transparent && !isScrolled ? "border-white/20" : "border-black/10";

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between py-4 ${borderColor} ${!transparent || isScrolled ? 'border-b' : ''}`}>
            {/* Logo */}
            <div className="flex-1 md:flex-none">
              <a href="/" className="inline-block">
                {typeof logo === "string" ? (
                  <h1 className={`text-lg font-light tracking-[0.3em] uppercase ${textColor}`}>
                    {logo}
                  </h1>
                ) : (
                  logo
                )}
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-light tracking-wider uppercase ${textColor} hover:opacity-60 transition-opacity`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={onSearchClick}
                className={`${textColor} hover:opacity-60 transition-opacity`}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className={`relative ${textColor} hover:opacity-60 transition-opacity`}
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden ${textColor} hover:opacity-60 transition-opacity`}
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <nav className="container mx-auto px-6 py-4">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-sm font-light tracking-wider uppercase text-black hover:opacity-60 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      {fixed && <div className="h-16" />}
    </>
  );
};

// Alternative minimal header with centered logo
interface MinimalCenteredHeaderProps {
  logo?: string | React.ReactNode;
  navigation?: NavigationItem[];
  cartItemCount?: number;
  onCartClick?: () => void;
  onSearchClick?: () => void;
  className?: string;
}

export const MinimalCenteredHeader = ({
  logo = "MINIMAL",
  navigation = defaultNavigation,
  cartItemCount = 0,
  onCartClick,
  onSearchClick,
  className = "",
}: MinimalCenteredHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const leftNavigation = navigation.slice(0, Math.ceil(navigation.length / 2));
  const rightNavigation = navigation.slice(Math.ceil(navigation.length / 2));

  return (
    <header className={`bg-white ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-6 border-b">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop Navigation - Left Side */}
          <nav className="hidden md:flex items-center space-x-8 flex-1">
            {leftNavigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-light tracking-wider uppercase text-black hover:opacity-60 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Logo - Center */}
          <div className="flex-shrink-0 mx-8">
            <a href="/">
              {typeof logo === "string" ? (
                <h1 className="text-2xl font-light tracking-[0.3em] uppercase text-black">
                  {logo}
                </h1>
              ) : (
                logo
              )}
            </a>
          </div>

          {/* Desktop Navigation - Right Side */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-end">
            {rightNavigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-light tracking-wider uppercase text-black hover:opacity-60 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4 md:ml-8">
            <button
              onClick={onSearchClick}
              className="hover:opacity-60 transition-opacity"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={onCartClick}
              className="relative hover:opacity-60 transition-opacity"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-sm font-light tracking-wider uppercase text-black hover:opacity-60 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
