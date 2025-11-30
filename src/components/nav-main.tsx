"use client";

import * as React from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    type: "link" | "collapsible";
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      icons?: LucideIcon;
      url: string;
    }[];
  }[];
}) {
  const { t } = useTranslation();
  const [activeItem, setActiveItem] = React.useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeSidebarItem');
    }
    return null;
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeSidebarItem', activeItem || '');
    }
  }, [activeItem]);

  React.useEffect(() => {
    // Only set active item based on path if no active item is persisted
    if (!activeItem) {
      const currentPath = window.location.pathname;

      const mainItem = items.find(item => item.url === currentPath);
      if (mainItem) {
        setActiveItem(mainItem.title);
        return;
      }

      for (const item of items) {
        if (item.items) {
          const subItem = item.items.find(sub => sub.url === currentPath);
          if (subItem) {
            setActiveItem(subItem.title);
            return;
          }
        }
      }
    }
  }, [items, activeItem]);

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <div className="mt-15"></div>
      <SidebarMenu>
        {items.map((item) =>
          item.type === "collapsible" ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || item.items?.some(subItem => activeItem === subItem.title)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={activeItem === item.title}
                    style={{
                      ...(activeItem === item.title ? {
                        backgroundColor: 'hsl(var(--primary))',
                        color: 'white',
                        boxShadow: '0 10px 15px -3px hsl(var(--primary) / 0.25)',
                      } : {})
                    }}
                    className="sidebar-link-hover cursor-pointer text-lg py-2 transition-all duration-200 rounded-md"
                    tooltip={item.title}
                    onClick={() => setActiveItem(item.title)}
                  >
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                    <ChevronRight className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className="sidebar-link-hover text-[15px] py-1 cursor-pointer rounded-md transition-all duration-200"
                      >
                        <SidebarMenuSubButton
                          asChild
                          isActive={activeItem === subItem.title}
                          style={{
                            ...(activeItem === subItem.title ? {
                              backgroundColor: 'hsl(var(--primary))',
                              color: 'white',
                              boxShadow: '0 4px 6px -1px hsl(var(--primary) / 0.20)',
                            } : {})
                          }}
                          className="text-[15px] transition-all duration-200 rounded-md"
                        >
                          <Link
                            to={subItem.url}
                            onClick={() => setActiveItem(subItem.title)}
                          >
                            {subItem.icons && <subItem.icons />}
                            <span>{t(subItem.title)}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={activeItem === item.title} tooltip={item.title}>
                <Link
                  to={item.url}
                  style={{
                    ...(activeItem === item.title ? {
                      backgroundColor: 'hsl(var(--primary))',
                      color: 'white',
                      boxShadow: '0 10px 15px -3px hsl(var(--primary) / 0.25)',
                    } : {})
                  }}
                  className="sidebar-link-hover cursor-pointer rounded-md transition-all duration-200 py-2 block px-3"
                  onClick={() => setActiveItem(item.title)}
                >
                  {item.icon && <item.icon />}
                <span className="text-[15px]  py-5">{t(item.title)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

