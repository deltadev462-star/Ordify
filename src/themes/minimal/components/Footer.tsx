import { Newsletter } from "@/themes/shared/components/Newsletter";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface MinimalFooterProps {
  logo?: string | React.ReactNode;
  links?: FooterLink[];
  showNewsletter?: boolean;
  showSocial?: boolean;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  copyright?: string;
  className?: string;
}

const defaultLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const MinimalFooter = ({
  logo = "MINIMAL",
  links = defaultLinks,
  showNewsletter = true,
  showSocial = true,
  socialLinks = {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
  },
  copyright,
  className = "",
}: MinimalFooterProps) => {
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} ${typeof logo === "string" ? logo : "Minimal Store"}. All rights reserved.`;

  return (
    <footer className={`bg-white ${className}`}>
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-t">
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-md mx-auto text-center">
              <Newsletter
                variant="minimal"
                title="Stay Updated"
                description="Subscribe for new products and exclusive offers"
                buttonText="Subscribe"
                placeholder="Your email"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <a href="/">
              {typeof logo === "string" ? (
                <h2 className="text-lg font-light tracking-[0.3em] uppercase text-black">
                  {logo}
                </h2>
              ) : (
                logo
              )}
            </a>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-light tracking-wider uppercase text-black hover:opacity-60 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social Links */}
            {showSocial && (
              <div className="flex items-center space-x-4">
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    className="text-black hover:opacity-60 transition-opacity"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    className="text-black hover:opacity-60 transition-opacity"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    className="text-black hover:opacity-60 transition-opacity"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    className="text-black hover:opacity-60 transition-opacity"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}

            {/* Copyright */}
            <p className="text-xs text-gray-500 font-light">
              {copyright || defaultCopyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Alternative minimal footer - Two column layout
interface MinimalTwoColumnFooterProps {
  logo?: string | React.ReactNode;
  description?: string;
  sections?: {
    title: string;
    links: FooterLink[];
  }[];
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  copyright?: string;
  className?: string;
}

export const MinimalTwoColumnFooter = ({
  logo = "MINIMAL",
  description = "Curated collections for the modern lifestyle",
  sections = [
    {
      title: "Shop",
      links: [
        { label: "New Arrivals", href: "/shop/new" },
        { label: "Best Sellers", href: "/shop/best-sellers" },
        { label: "Sale", href: "/shop/sale" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Shipping", href: "/shipping" },
        { label: "Returns", href: "/returns" },
      ],
    },
  ],
  socialLinks = {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
  },
  copyright,
  className = "",
}: MinimalTwoColumnFooterProps) => {
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} ${typeof logo === "string" ? logo : "Minimal Store"}`;

  return (
    <footer className={`bg-white border-t ${className}`}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Brand */}
          <div>
            <a href="/" className="inline-block mb-6">
              {typeof logo === "string" ? (
                <h2 className="text-2xl font-light tracking-[0.2em] uppercase text-black">
                  {logo}
                </h2>
              ) : (
                logo
              )}
            </a>
            {description && (
              <p className="text-sm text-gray-600 font-light mb-6 max-w-sm">
                {description}
              </p>
            )}
            <div className="flex items-center space-x-4">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  className="text-gray-600 hover:text-black transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column - Links */}
          <div className="grid sm:grid-cols-2 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-light uppercase tracking-wider text-black mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-black transition-colors font-light"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-xs text-gray-500 font-light text-center md:text-left">
            {copyright || defaultCopyright}
          </p>
        </div>
      </div>
    </footer>
  );
};