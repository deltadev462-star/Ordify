import { Newsletter } from "@/themes/shared/components/Newsletter";
import { useTranslation } from "react-i18next";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  RefreshCw,
  HeadphonesIcon
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface ClassicFooterProps {
  logo?: string | React.ReactNode;
  description?: string;
  sections?: FooterSection[];
  showNewsletter?: boolean;
  showFeatures?: boolean;
  showPaymentMethods?: boolean;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  className?: string;
}

export const ClassicFooter = ({
  logo = "CLASSIC STORE",
  description,
  sections = [],
  showNewsletter = true,
  showFeatures = true,
  showPaymentMethods = true,
  socialLinks = {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    youtube: "#",
  },
  contactInfo = {
    phone: "+1 (555) 123-4567",
    email: "support@classicstore.com",
    address: "123 Commerce St, Suite 100, New York, NY 10001",
  },
  className = "",
}: ClassicFooterProps) => {
  const { t } = useTranslation();

  const defaultSections: FooterSection[] = [
    {
      title: t("Customer Service"),
      links: [
        { label: t("Help Center"), href: "/help" },
        { label: t("Contact Us"), href: "/contact" },
        { label: t("Order Status"), href: "/order-status" },
        { label: t("Shipping Info"), href: "/shipping" },
        { label: t("Returns"), href: "/returns" },
        { label: t("FAQs"), href: "/faqs" },
      ],
    },
    {
      title: t("About Us"),
      links: [
        { label: t("Our Story"), href: "/about" },
        { label: t("Careers"), href: "/careers" },
        { label: t("Press"), href: "/press" },
        { label: t("Store Locator"), href: "/stores" },
        { label: t("Corporate Info"), href: "/corporate" },
      ],
    },
    {
      title: t("Popular Categories"),
      links: [
        { label: t("Electronics"), href: "/categories/electronics" },
        { label: t("Fashion"), href: "/categories/fashion" },
        { label: t("Home & Garden"), href: "/categories/home-garden" },
        { label: t("Sports"), href: "/categories/sports" },
        { label: t("Beauty"), href: "/categories/beauty" },
      ],
    },
    {
      title: t("Policies"),
      links: [
        { label: t("Privacy Policy"), href: "/privacy" },
        { label: t("Terms of Use"), href: "/terms" },
        { label: t("Cookie Policy"), href: "/cookies" },
        { label: t("Security"), href: "/security" },
        { label: t("Accessibility"), href: "/accessibility" },
      ],
    },
  ];

  const sectionsToUse = sections.length > 0 ? sections : defaultSections;

  const features = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: t("Free Shipping"),
      description: t("Orders over $50"),
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: t("30-Day Returns"),
      description: t("Easy returns policy"),
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: t("Secure Shopping"),
      description: t("SSL encryption"),
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5" />,
      title: t("24/7 Support"),
      description: t("Always here to help"),
    },
  ];

  return (
    <footer className={`bg-gray-50 dark:bg-[#1a1a1a] ${className}`}>
      {/* Features */}
      {showFeatures && (
        <div className="border-b border-[#d6d6d6] dark:border-[#424242] dark:border-[#3a3a3a]">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-full bg-[#34495e]/10 dark:bg-[#8b7355]/10 p-2 text-[#34495e] dark:text-[#8b7355]">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter */}
      {showNewsletter && (
        <div className="bg-[#34495e] dark:bg-[#2e2e2e] text-white border-y border-[#d6d6d6] dark:border-[#424242] dark:border-[#3a3a3a]">
          <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-4xl">
              <Newsletter
                variant="default"
                title={t("Subscribe to Our Newsletter")}
                description={t("Get exclusive deals, new product alerts, and shopping tips delivered to your inbox")}
                className="bg-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {typeof logo === "string" ? (
              <h3 className="mb-4 font-serif text-xl font-bold text-gray-900 dark:text-gray-100">{logo}</h3>
            ) : (
              logo
            )}
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">{description || t("Your trusted online shopping destination since 1999. Quality products, competitive prices, and exceptional customer service.")}</p>
            
            {/* Contact Info */}
            <ul className="space-y-2 text-sm">
              {contactInfo.phone && (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-600 dark:text-gray-400 hover:text-[#34495e] dark:hover:text-[#8b7355]">
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.email && (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 dark:text-gray-400 hover:text-[#34495e] dark:hover:text-[#8b7355]">
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{contactInfo.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Footer Links */}
          {sectionsToUse.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#34495e] dark:hover:text-[#8b7355]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-8 border-t border-[#d6d6d6] dark:border-[#424242] dark:border-[#3a3a3a] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t("Follow Us:")}</span>
              <div className="flex gap-2">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    className="rounded-full bg-gray-200 dark:bg-[#2e2e2e] p-2 text-gray-600 dark:text-gray-400 hover:bg-[#34495e] dark:hover:bg-[#8b7355] hover:text-white"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    className="rounded-full bg-gray-200 dark:bg-[#2e2e2e] p-2 text-gray-600 dark:text-gray-400 hover:bg-[#34495e] dark:hover:bg-[#8b7355] hover:text-white"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    className="rounded-full bg-gray-200 dark:bg-[#2e2e2e] p-2 text-gray-600 dark:text-gray-400 hover:bg-[#34495e] dark:hover:bg-[#8b7355] hover:text-white"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    className="rounded-full bg-gray-200 dark:bg-[#2e2e2e] p-2 text-gray-600 dark:text-gray-400 hover:bg-[#34495e] dark:hover:bg-[#8b7355] hover:text-white"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            {showPaymentMethods && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t("We Accept:")}</span>
                <div className="flex gap-2">
                  <CreditCard className="h-8 w-12 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm text-gray-400 dark:text-gray-500">{t("and more")}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-[#d6d6d6] dark:border-[#424242] dark:border-[#3a3a3a] pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} {typeof logo === "string" ? logo : "Classic Store"}. {t("All Rights Reserved.")} |
            <a href="/sitemap" className="ml-1 hover:text-[#34495e] dark:hover:text-[#8b7355]">{t("Sitemap")}</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
