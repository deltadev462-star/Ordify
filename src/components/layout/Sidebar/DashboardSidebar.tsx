import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Remove ScrollArea import since it doesn't exist
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { newSidebarData, type NavigationItem } from "@/data/new-sidebar-data";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  activeNavId?: string | null;
  side?: "left" | "right";
  isMobile?: boolean;
}

export function DashboardSidebar({ activeNavId, side = "right" }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { open, isMobile } = useSidebar();
  const { t } = useTranslation();
  const isOpen = open;
  const [expandedItems, setExpandedItems] = useState<string[]>([activeNavId || ""]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActiveRoute = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + "/");
  };

  const handleItemClick = (item: NavigationItem, e: React.MouseEvent) => {
    // When sidebar is collapsed and item has children, navigate to first child
    if (!isOpen && item.children && item.children.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      navigate(item.children[0].url);
    }
  };

  return (
    <Sidebar
      dir="ltr"
      collapsible={isMobile ? "offcanvas" : "icon"}
      side={side}
      data-sidebar
      data-sidebar-mobile={isMobile ? "true" : undefined}
    >
      {/* Sidebar Header - Store Info */}
      <SidebarHeader className="border-b border-gray-200 dark:border-gray-700">
        <div className={cn(
          "flex items-center gap-3 px-3 py-4",
          !isOpen && "justify-center"
        )}>
          <div className={cn(
            "flex items-center justify-center rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white transition-all duration-200 flex-shrink-0",
            isOpen ? "h-10 w-10" : "h-8 w-8"
          )}>
            <newSidebarData.currentStore.logo className={cn(
              "transition-all duration-200",
              isOpen ? "h-6 w-6" : "h-5 w-5"
            )} />
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{newSidebarData.currentStore.name}</span>
              <span className="text-xs text-muted-foreground">{newSidebarData.currentStore.plan}</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Sidebar Navigation */}
      <SidebarContent>
        <div className="h-[calc(100vh-8rem)] overflow-y-auto">
          <SidebarMenu className="px-2 py-2">
            {newSidebarData.navigation.map((item) => (
              <SidebarMenuItem key={item.id}>
                {item.children ? (
                  <Collapsible
                    open={expandedItems.includes(item.id)}
                    onOpenChange={() => toggleExpanded(item.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={(e) => handleItemClick(item, e)}
                        className={cn(
                          "w-full hover:bg-gray-100 dark:hover:bg-gray-800",
                          isOpen ? "justify-between" : "justify-center",
                          activeNavId === item.id && "bg-primary/10 text-primary dark:bg-gray-800 dark:text-blue-400"
                        )}
                      >
                        <div className={cn(
                          "flex items-center gap-2",
                          !isOpen && "justify-center"
                        )}>
                          <item.icon className={cn(
                            "transition-all duration-200 flex-shrink-0",
                            isOpen ? "h-4 w-4" : "h-6 w-6"
                          )} />
                          {isOpen && <span>{t(item.title)}</span>}
                        </div>
                        {isOpen && (
                          <div className="flex items-center gap-2">
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
                          {expandedItems.includes(item.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          </div>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.url}>
                            <SidebarMenuSubButton
                              asChild
                              className={cn(
                                isActiveRoute(subItem.url) &&
                                  "bg-primary/10 text-primary dark:bg-gray-800 dark:text-blue-400"
                              )}
                            >
                              <Link to={subItem.url}>
                                <span className="flex items-center gap-2 w-full">
                                  {subItem.icon && <subItem.icon className={cn(
                                    "transition-all duration-200 shrink-0 m-auto",
                                    isOpen ? "h-3.5 w-3.5" : "h-6 w-6"
                                  )} />}
                                  {isOpen && <span className="flex-1">{t(subItem.title)}</span>}
                                  {isOpen && subItem.badge && (
                                    <Badge
                                      variant={
                                        subItem.badge.variant === "warning"
                                          ? "secondary"
                                          : subItem.badge.variant === "danger"
                                          ? "destructive"
                                          : subItem.badge.variant === "info"
                                          ? "default"
                                          : "outline"
                                      }
                                      className="h-4 px-1 text-[10px]"
                                    >
                                      {subItem.badge.value}
                                    </Badge>
                                  )}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      isOpen ? "justify-start" : "justify-center",
                      isActiveRoute(item.url) &&
                        "bg-primary/10 text-primary dark:bg-gray-800 dark:text-blue-400"
                    )}
                  >
                    <Link to={item.url} className={cn(
                      "flex items-center gap-2",
                      !isOpen && "justify-center"
                    )}>
                      <item.icon className={cn(
                        "transition-all duration-200 flex-shrink-0",
                        isOpen ? "h-4 w-4" : "h-6 w-6"
                      )} />
                      {isOpen && <span>{t(item.title)}</span>}
                      {isOpen && item.badge && (
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
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          {/* Quick Actions */}
          {isOpen && (
            <div className="px-3 py-4">
              <h3 className="mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                {t('dashboard.quickActions')}
              </h3>
              <div className="space-y-1">
                {newSidebarData.quickActions.map((action) => (
                  <Button
                    key={action.url}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full",
                      isOpen ? "justify-start" : "justify-center p-2"
                    )}
                    asChild
                  >
                    <Link to={action.url}>
                      <action.icon className={cn(
                        "transition-all duration-200 flex-shrink-0",
                        isOpen ? "h-4 w-4 mr-2" : "h-5 w-5"
                      )} />
                      {isOpen && t(action.title)}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </SidebarContent>

      {/* Sidebar Footer - Help Links */}
      <SidebarFooter className="border-t border-gray-200 dark:border-gray-700">
        <div className={cn(
          "px-3 py-2",
          !isOpen && "px-1"
        )}>
          <div className="space-y-1">
            {newSidebarData.helpLinks.map((link) => (
              <Button
                key={link.url}
                variant="ghost"
                size="sm"
                className={cn(
                  "w-full text-xs",
                  isOpen ? "justify-start" : "justify-center p-2"
                )}
                asChild
              >
                <Link to={link.url}>
                  <link.icon className={cn(
                    "transition-all duration-200 flex-shrink-0",
                    isOpen ? "h-3.5 w-3.5 mr-2" : "h-4 w-4"
                  )} />
                  {isOpen && t(link.title)}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}