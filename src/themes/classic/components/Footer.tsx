import { Newsletter } from "@/themes/shared/components/Newsletter";
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

const defaultSections: FooterSection[] = [
  {
    title: "Customer Service",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Order Status", href: "/order-status" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Store Locator", href: "/stores" },
      { label: "Corporate Info", href: "/corporate" },
    ],
  },
  {
    title: "Popular Categories",
    links: [
      { label: "Electronics", href: "/categories/electronics" },
      { label: "Fashion", href: "/categories/fashion" },
      { label: "Home & Garden", href: "/categories/home-garden" },
      { label: "Sports", href: "/categories/sports" },
      { label: "Beauty", href: "/categories/beauty" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Security", href: "/security" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export const ClassicFooter = ({
  logo = "CLASSIC STORE",
  description = "Your trusted online shopping destination since 1999. Quality products, competitive prices, and exceptional customer service.",
  sections = defaultSections,
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
  const features = [
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Free Shipping",
      description: "Orders over $50",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "30-Day Returns",
      description: "Easy returns policy",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Secure Shopping",
      description: "SSL encryption",
    },
    {
      icon: <HeadphonesIcon className="h-5 w-5" />,
      title: "24/7 Support",
      description: "Always here to help",
    },
  ];

  return (
    <footer className={`bg-gray-50 ${className}`}>
      {/* Features */}
      {showFeatures && (
        <div className="border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter */}
      {showNewsletter && (
        <div className="bg-primary text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-4xl">
              <Newsletter
                variant="default"
                title="Subscribe to Our Newsletter"
                description="Get exclusive deals, new product alerts, and shopping tips delivered to your inbox"
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
              <h3 className="mb-4 font-serif text-xl font-bold text-gray-900">{logo}</h3>
            ) : (
              logo
            )}
            <p className="mb-6 text-sm text-gray-600">{description}</p>
            
            {/* Contact Info */}
            <ul className="space-y-2 text-sm">
              {contactInfo.phone && (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-gray-400" />
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-primary">
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.email && (
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-gray-400" />
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-primary">
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{contactInfo.address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Footer Links */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-semibold text-gray-900">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-primary"
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
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Follow Us:</span>
              <div className="flex gap-2">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-primary hover:text-white"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-primary hover:text-white"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-primary hover:text-white"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    className="rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-primary hover:text-white"
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
                <span className="text-sm text-gray-600">We Accept:</span>
                <div className="flex gap-2">
                  <CreditCard className="h-8 w-12 text-gray-400" />
                  <span className="text-sm text-gray-400">and more</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} {typeof logo === "string" ? logo : "Classic Store"}. 
            All Rights Reserved. | 
            <a href="/sitemap" className="ml-1 hover:text-primary">Sitemap</a>
          </p>
        </div>
      </div>
    </footer>
  );
};