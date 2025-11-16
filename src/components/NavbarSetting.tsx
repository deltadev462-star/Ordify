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
    { title: "Store Settings", icon: Settings },
    { title: "Domain Settings", icon: Globe },
    { title: "Store Info and Policies", icon: FileText },
    { title: "Add Header Code", icon: Code },
    { title: "SEO Settings", icon: Search },
    { title: "Payment Gateways", icon: CreditCard },
    { title: "Pixel Settings", icon: Camera },
    { title: "Google Tag Settings", icon: Tags },
    {
      title: "Digital products delivery settings",
      icon: Package,
      badge: "New",
    },
    { title: "Order Notifications", icon: Bell },
    { title: "Pages", icon: FileText },
    { title: "Theme Settings", icon: Paintbrush },
    { title: "Edit Main Page", icon: Home },
    { title: "Purchase Form", icon: ClipboardList },
    { title: "Shipping Settings", icon: Truck },
    { title: "Edit Thank You Page", icon: NotebookPen },
    { title: "Social Links", icon: Instagram },
    { title: "Store Link", icon: Link },
    { title: "Manage Moderators", icon: Users },
    { title: "Public API", icon: Code2 },
    { title: "Login Sessions", icon: LogIn },
  ];

  return (
    <div className="w-84 py-5 px-1 rounded-2xl pt-4 border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] transition-all duration-200">
      <ul className="space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === item.title;

          return (
            <li
              key={i}
              onClick={() => setActive(item.title)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                ${isActive ? "bg-green-600 text-white" : "hover:bg-gray-800"}
              `}
            >
              <Icon size={18} />
              {t(item.title)}
              {item.badge && (
                <span className="ml-auto text-xs bg-green-600 rounded-full px-2 py-1">
                  {t(item.badge)}
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
