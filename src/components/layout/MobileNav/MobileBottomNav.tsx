import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Package,
  Tag,
  Megaphone,
  Menu,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { newSidebarData, type NavigationItem } from "@/data/new-sidebar-data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import React, { useState } from "react";

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
                  ? "text-primary dark:text-blue-400"
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
                <div className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-primary dark:bg-blue-400" />
              )}
            </Link>
          );
        })}

        {/* More Menu */}
        <MoreMenu activeNavId={activeNavId} />
      </nav>
    </div>
  );
}

// More Menu Component
function MoreMenu({ activeNavId }: { activeNavId?: string | null }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // Filter out items that are already in the bottom nav
  const bottomNavIds = bottomNavItems.map(item => item.id);
  const overflowItems = newSidebarData.navigation.filter(
    item => !bottomNavIds.includes(item.id)
  );

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActiveRoute = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  return (
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
      <SheetContent side="bottom" className="h-[70vh] p-0">
        <SheetHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <SheetTitle>{t("All Navigation")}</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto h-[calc(70vh-5rem)] px-4 py-4">
          <div className="space-y-2">
            {overflowItems.map((item) => (
              <div key={item.id}>
                {item.children ? (
                  <Collapsible
                    open={expandedItems.includes(item.id)}
                    onOpenChange={() => toggleExpanded(item.id)}
                  >
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <span className="font-medium">{t(item.title)}</span>
                        {item.badge && (
                          <Badge
                            variant={
                              item.badge.variant === "warning"
                                ? "secondary"
                                : item.badge.variant === "danger"
                                ? "destructive"
                                : item.badge.variant === "success"
                                ? "default"
                                : "outline"
                            }
                            className="h-5 px-1.5 text-xs"
                          >
                            {item.badge.value}
                          </Badge>
                        )}
                      </div>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedItems.includes(item.id) && "rotate-90"
                        )}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="ml-8 space-y-1 py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.url}
                            to={child.url}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm",
                              isActiveRoute(child.url)
                                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            )}
                          >
                            {child.icon && <child.icon className="h-4 w-4" />}
                            <span>{t(child.title)}</span>
                            {child.badge && (
                              <Badge
                                variant={
                                  child.badge.variant === "warning"
                                    ? "secondary"
                                    : child.badge.variant === "danger"
                                    ? "destructive"
                                    : "default"
                                }
                                className="ml-auto h-4 px-1 text-[10px]"
                              >
                                {child.badge.value}
                              </Badge>
                            )}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3",
                      isActiveRoute(item.url)
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{t(item.title)}</span>
                    {item.badge && (
                      <Badge
                        variant={
                          item.badge.variant === "warning"
                            ? "secondary"
                            : item.badge.variant === "success"
                            ? "default"
                            : "outline"
                        }
                        className="ml-auto h-5 px-1.5 text-xs"
                      >
                        {item.badge.value}
                      </Badge>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}