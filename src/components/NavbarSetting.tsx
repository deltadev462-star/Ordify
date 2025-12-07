import {
  Settings,
  Globe,
  FileText,
  Code,
  Search,
  CreditCard,
  Camera,
  Tags,
  
  Package,
  Bell,
  Paintbrush,
  Home,
  ClipboardList,
  Truck,
  NotebookPen,
  Instagram,
  Link,
  Users,
  Code2,
  LogIn,
} from "lucide-react";
import { useTranslation } from "react-i18next";
function NavbarSetting({
  active,
  setActive,
}: {
  active: string;
  setActive: (s: string) => void;
}) {
  const { t } = useTranslation();
  const menu = [
    { title: t("Store Settings"), icon: Settings, key: "Store Settings" },
    { title: t("Domain Settings"), icon: Globe, key: "Domain Settings" },
    { title: t("Store Info and Policies"), icon: FileText, key: "Store Info and Policies" },
    { title: t("Add Header Code"), icon: Code, key: "Add Header Code" },
    { title: t("SEO Settings"), icon: Search, key: "SEO Settings" },
    { title: t("Payment Gateways"), icon: CreditCard, key: "Payment Gateways" },
    { title: t("Pixel Settings"), icon: Camera, key: "Pixel Settings" },
    { title: t("Google Tag Settings"), icon: Tags, key: "Google Tag Settings" },
    {
      title: t("Digital products delivery settings"),
      icon: Package,
      badge: t("New"),
      key: "Digital products delivery settings",
    },
    { title: t("Notifications"), icon: Bell, key: "Order Notifications" },
    { title: t("Pages"), icon: FileText, key: "Pages" },
    { title: t("Theme Settings"), icon: Paintbrush, key: "Theme Settings" },
    { title: t("Edit Main Page"), icon: Home, key: "Edit Main Page" },
    { title: t("Purchase Form"), icon: ClipboardList, key: "Purchase Form" },
    { title: t("Shipping Settings"), icon: Truck, key: "Shipping Settings" },
    { title: t("Edit Thank You Page"), icon: NotebookPen, key: "Edit Thank You Page" },
    { title: t("Social Links"), icon: Instagram, key: "Social Links" },
    { title: t("Store Link"), icon: Link, key: "Store Link" },
    { title: t("Manage Moderators"), icon: Users, key: "Manage Moderators" },
    { title: t("Public API"), icon: Code2, key: "Public API" },
    { title: t("Login Sessions"), icon: LogIn, key: "Login Sessions" },
  ];

  return (
    <div className="w-84 py-5 px-1 rounded-2xl pt-4 border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] transition-all duration-200">
      <ul className="space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.key;

          return (
            <li
              key={i}
              onClick={() => setActive(item.key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-black dark:text-white
                ${
                  isActive
                    ? "bg-green-600  text-white"
                    : "hover:bg-gray-800"
                }
              `}
            >
              <Icon size={18} />
              {item.title}
              {item.badge && (
                <span className="ml-auto text-xs bg-green-600 text-black dark:text-white rounded-full px-2 py-1">
                  {item.badge}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavbarSetting;

