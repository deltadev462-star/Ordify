import { Newsletter } from "@/themes/shared/components/Newsletter";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface LuxeFooterProps {
  logo?: string | React.ReactNode;
  tagline?: string;
  sections?: FooterSection[];
  showNewsletter?: boolean;
  showConcierge?: boolean;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  copyright?: string;
  className?: string;
}

const defaultSections: FooterSection[] = [
  {
    title: "Collections",
    links: [
      { label: "New Arrivals", href: "/collections/new" },
      { label: "Signature Collection", href: "/collections/signature" },
      { label: "Limited Edition", href: "/collections/limited" },
      { label: "Heritage", href: "/collections/heritage" },
      { label: "Gift Guide", href: "/collections/gifts" },
    ],
  },
  {
    title: "Client Services",
    links: [
      { label: "Personal Shopping", href: "/services/personal-shopping" },
      { label: "Virtual Appointments", href: "/services/appointments" },
      { label: "Size Guide", href: "/services/size-guide" },
      { label: "Care Instructions", href: "/services/care" },
      { label: "Shipping & Returns", href: "/services/shipping" },
    ],
  },
  {
    title: "The Maison",
    links: [
      { label: "Our Story", href: "/maison/story" },
      { label: "Craftsmanship", href: "/maison/craftsmanship" },
      { label: "Sustainability", href: "/maison/sustainability" },
      { label: "Press", href: "/maison/press" },
      { label: "Careers", href: "/maison/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Accessibility", href: "/legal/accessibility" },
    ],
  },
];

export const LuxeFooter = ({
  logo = "LUXE",
  tagline = "Crafted for Excellence",
  sections = defaultSections,
  showNewsletter = true,
  showConcierge = true,
  socialLinks = {
    instagram: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
  },
  contactInfo = {
    phone: "+1 (800) LUXE-SHOP",
    email: "concierge@luxe.com",
    address: "1 Avenue Montaigne, 75008 Paris, France",
  },
  copyright,
  className = "",
}: LuxeFooterProps) => {
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} ${typeof logo === "string" ? logo : "Luxe"}. All rights reserved.`;

  return (
    <footer className={`bg-gray-900 text-gray-300 ${className}`}>
      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-6 py-16">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="mb-2 font-heading text-2xl font-light text-white">
                Join Our Exclusive Circle
              </h3>
              <p className="mb-8 font-light text-gray-400">
                Be the first to discover new collections and receive invitations to private events
              </p>
              <Newsletter
                variant="luxe"
                placeholder="Enter your email address"
                buttonText="Subscribe"
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Concierge Section */}
      {showConcierge && (
        <div className="border-b border-gray-800 bg-gray-800/30">
          <div className="container mx-auto px-6 py-12">
            <div className="grid gap-8 text-center md:grid-cols-3 md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <Phone className="mb-3 h-6 w-6 text-primary" />
                <h4 className="mb-2 font-heading text-lg font-light text-white">
                  Personal Shopping
                </h4>
                <p className="mb-2 text-sm font-light">{contactInfo.phone}</p>
                <p className="text-xs text-gray-500">Available 24/7</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <Mail className="mb-3 h-6 w-6 text-primary" />
                <h4 className="mb-2 font-heading text-lg font-light text-white">
                  Concierge Service
                </h4>
                <a href={`mailto:${contactInfo.email}`} className="mb-2 text-sm font-light hover:text-primary">
                  {contactInfo.email}
                </a>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <MapPin className="mb-3 h-6 w-6 text-primary" />
                <h4 className="mb-2 font-heading text-lg font-light text-white">
                  Flagship Store
                </h4>
                <p className="mb-2 text-sm font-light">{contactInfo.address}</p>
                <Button variant="link" className="h-auto p-0 text-xs text-gray-400 hover:text-primary">
                  Book an Appointment
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block">
              {typeof logo === "string" ? (
                <h2 className="font-heading text-3xl font-light tracking-wider text-white">
                  {logo}
                </h2>
              ) : (
                logo
              )}
            </a>
            {tagline && (
              <p className="mt-2 font-serif text-sm italic text-gray-500">
                {tagline}
              </p>
            )}
            
            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-primary hover:text-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-primary hover:text-primary"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-primary hover:text-primary"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all hover:border-primary hover:text-primary"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-4">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="mb-4 text-xs font-light uppercase tracking-wider text-white">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm font-light transition-colors hover:text-primary"
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

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs font-light text-gray-500">
              {copyright || defaultCopyright}
            </p>
            <div className="flex items-center gap-6">
              <a href="/legal/terms" className="text-xs font-light text-gray-500 hover:text-primary">
                Terms
              </a>
              <a href="/legal/privacy" className="text-xs font-light text-gray-500 hover:text-primary">
                Privacy
              </a>
              <a href="/sitemap" className="text-xs font-light text-gray-500 hover:text-primary">
                Sitemap
              </a>
              <div className="flex items-center gap-2">
                <img 
                  src="https://via.placeholder.com/30x20?text=USA" 
                  alt="USA" 
                  className="h-4"
                />
                <button className="text-xs font-light text-gray-500 hover:text-primary">
                  United States | English
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
    </footer>
  );
};