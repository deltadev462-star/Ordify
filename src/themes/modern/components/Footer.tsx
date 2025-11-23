import { Newsletter } from "@/themes/shared/components/Newsletter";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface ModernFooterProps {
  logo?: string | React.ReactNode;
  description?: string;
  sections?: FooterSection[];
  showNewsletter?: boolean;
  showPaymentIcons?: boolean;
  showSocialLinks?: boolean;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  className?: string;
}

export const ModernFooter = ({
  logo = "ORDIFY",
  description,
  sections,
  showNewsletter = true,
  showPaymentIcons = true,
  showSocialLinks = true,
  socialLinks = {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    youtube: "#",
  },
  contactInfo = {
    email: "support@ordify.com",
    phone: "+1 (555) 123-4567",
    address: "123 Commerce St, Suite 100, New York, NY 10001",
  },
  className = "",
}: ModernFooterProps) => {
  const { t } = useTranslation();

  const defaultSections: FooterSection[] = [
    {
      title: t("Shop"),
      links: [
        { label: t("New Arrivals"), href: "/shop/new" },
        { label: t("Best Sellers"), href: "/shop/best-sellers" },
        { label: t("Sale"), href: "/shop/sale" },
        { label: t("All Products"), href: "/shop" },
      ],
    },
    {
      title: t("Customer Care"),
      links: [
        { label: t("Contact Us"), href: "/contact" },
        { label: t("Shipping Info"), href: "/shipping" },
        { label: t("Returns & Exchanges"), href: "/returns" },
        { label: t("Size Guide"), href: "/size-guide" },
        { label: t("FAQs"), href: "/faqs" },
      ],
    },
    {
      title: t("Company"),
      links: [
        { label: t("About Us"), href: "/about" },
        { label: t("Careers"), href: "/careers" },
        { label: t("Press"), href: "/press" },
        { label: t("Sustainability"), href: "/sustainability" },
      ],
    },
    {
      title: t("Legal"),
      links: [
        { label: t("Terms of Service"), href: "/terms" },
        { label: t("Privacy Policy"), href: "/privacy" },
        { label: t("Cookie Policy"), href: "/cookies" },
        { label: t("Accessibility"), href: "/accessibility" },
      ],
    },
  ];

  const navSections = sections || defaultSections;

  const features = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: t("Free Shipping"),
      description: t("On orders over $50"),
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: t("Easy Returns"),
      description: t("30-day return policy"),
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: t("Secure Payment"),
      description: t("100% secure checkout"),
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: t("Multiple Payment"),
      description: t("Various payment methods"),
    },
  ];

  const paymentMethods = [
    { name: "Visa", icon: "💳" },
    { name: "Mastercard", icon: "💳" },
    { name: "PayPal", icon: "💰" },
    { name: "Apple Pay", icon: "🍎" },
    { name: "Google Pay", icon: "🔍" },
  ];

  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/* Features Bar */}
      <div className="border-b border-gray-800 bg-gray-950/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-primary">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      {showNewsletter && (
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <Newsletter
              variant="modern"
              title={t("Stay in the Loop")}
              description={t(
                "Subscribe to get special offers, free giveaways, and new arrivals updates."
              )}
              className="mx-auto max-w-2xl"
            />
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {typeof logo === "string" ? (
                <h3 className="text-2xl font-bold">{logo}</h3>
              ) : (
                logo
              )}
            </div>
            <p className="mb-6 text-sm text-gray-400">
              {description ||
                t(
                  "Your trusted partner in ecommerce. Providing quality products and exceptional service since 2024."
                )}
            </p>

            {/* Social Links */}
            {showSocialLinks && socialLinks && (
              <div className="flex gap-2">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-primary"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-primary"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-primary"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-primary"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Links Sections */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4">
            {navSections.map((section) => (
              <div key={section.title}>
                <h4 className="mb-4 font-semibold">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 font-semibold">{t("Get in Touch")}</h4>
            <ul className="space-y-3">
              {contactInfo.email && (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-gray-400" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.phone && (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {contactInfo.address}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950/50">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()}{" "}
            {typeof logo === "string" ? logo : "Ordify"}.{" "}
            {t("All rights reserved.")}
          </p>

          {/* Payment Methods */}
          {showPaymentIcons && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{t("We accept:")}</span>
              <div className="flex gap-2">
                {paymentMethods.map((method) => (
                  <span
                    key={method.name}
                    className="flex h-8 w-12 items-center justify-center rounded bg-gray-800 text-sm"
                    title={method.name}
                  >
                    {method.icon}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

