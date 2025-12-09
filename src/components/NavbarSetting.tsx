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
function NavbarSetting({
  active,
  setActive,
}: {
  active: string;
  setActive: (s: string) => void;
}) {
  const menu = [
    { title: "Store  Settings", icon: Settings, key: "Store Settings" },
    { title: "Domain  Settings", icon: Globe, key: "Domain Settings" },
    { title: "Store  Info and  Policies", icon: FileText, key: "Store Info and Policies" },
    { title: "Add  Header  Code", icon: Code, key: "Add Header Code" },
    { title: "S E O  Settings", icon: Search, key: "SEO Settings" },
    { title: "Payment  Gateways", icon: CreditCard, key: "Payment Gateways" },
    { title: "Pixel  Settings", icon: Camera, key: "Pixel Settings" },
    { title: "Google  Tag  Settings", icon: Tags, key: "Google Tag Settings" },
    {
      title: "Digital products delivery settings",
      icon: Package,
      badge: "New",
      key: "Digital products delivery settings",
    },
    { title: "Notifications", icon: Bell, key: "Order Notifications" },
    { title: "Pages", icon: FileText, key: "Pages" },
    { title: "Theme  Settings", icon: Paintbrush, key: "Theme Settings" },
    { title: "Edit  Main  Page", icon: Home, key: "Edit Main Page" },
    { title: "Purchase  Form", icon: ClipboardList, key: "Purchase Form" },
    { title: "Shipping  Settings", icon: Truck, key: "Shipping Settings" },
    { title: "Edit  Thank  You  Page", icon: NotebookPen, key: "Edit Thank You Page" },
    { title: "Social  Links", icon: Instagram, key: "Social Links" },
    { title: "Store  Link", icon: Link, key: "Store Link" },
    { title: "Manage  Moderators", icon: Users, key: "Manage Moderators" },
    { title: "Public  A P I", icon: Code2, key: "Public API" },
    { title: "Login  Sessions", icon: LogIn, key: "Login Sessions" },
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

