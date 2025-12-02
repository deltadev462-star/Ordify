import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Package,
  Tag,
  Megaphone,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DashboardSidebar } from "../Sidebar/DashboardSidebar";
import { Badge } from "@/components/ui/badge";

interface MobileBottomNavProps {
  activeNavId?: string | null;
}

interface BottomNavItem {
  id: string;
  title: string;
  url: string;
  icon: any;
  badge?: {
    value: string;
    variant: 'default' | 'success' | 'warning' | 'danger' | 'info';
  };
}

const bottomNavItems: BottomNavItem[] = [
  {
    id: 'overview',
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'orders',
    title: 'Orders',
    url: '/dashboard/orders',
    icon: Package,
    badge: { value: '12', variant: 'warning' },
  },
  {
    id: 'products',
    title: 'Products',
    url: '/dashboard/products',
    icon: Tag,
  },
  {
    id: 'marketing',
    title: 'Marketing',
    url: '/dashboard/marketing',
    icon: Megaphone,
  },
];

export function MobileBottomNav({ activeNavId }: MobileBottomNavProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const isActiveRoute = (url: string, id: string) => {
    if (location.pathname === url) return true;
    if (location.pathname.startsWith(url + '/') && url !== '/dashboard') return true;
    return activeNavId === id;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 lg:hidden">
      <nav className="flex h-16 items-center justify-around px-2">
        {bottomNavItems.map((item) => {
          const isActive = isActiveRoute(item.url, item.id);
          return (
            <Link
              key={item.id}
              to={item.url}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-3 text-xs transition-colors relative",
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              )}
            >
              <div className="relative">
                <item.icon className={cn("h-5 w-5", isActive && "animate-in zoom-in-50")} />
                {item.badge && (
                  <Badge 
                    variant={
                      item.badge.variant === "warning"
                        ? "secondary"
                        : item.badge.variant === "danger"
                        ? "destructive"
                        : "default"
                    }
                    className="absolute -top-2 -right-2 h-4 min-w-[16px] p-0 px-1 text-[10px] flex items-center justify-center"
                  >
                    {item.badge.value}
                  </Badge>
                )}
              </div>
              <span className={cn("font-medium", isActive && "font-semibold")}>
                {t(item.title)}
              </span>
              {isActive && (
                <div className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-blue-600 dark:bg-blue-400" />
              )}
            </Link>
          );
        })}

        {/* More Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 px-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs font-medium">{t("More")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="px-6 py-4 border-b">
              <SheetTitle>{t("Navigation Menu")}</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-[calc(100vh-5rem)]">
              <DashboardSidebar activeNavId={activeNavId} />
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}