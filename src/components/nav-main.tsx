"use client";

import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    type: "link";
    title: string;
    url: string;
    icon?: LucideIcon;
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
    // Set active item based on current path
    if (!activeItem) {
      const currentPath = window.location.pathname;
      
      // Find the item that best matches the current path
      const matchingItem = items.find(item => currentPath.startsWith(item.url));
      if (matchingItem) {
        setActiveItem(matchingItem.title);
      }
    }
  }, [items, activeItem]);

  return (
    <SidebarGroup>
      <div className="mt-15"></div>
      <SidebarMenu>
        {items.map((item) => (
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
                <span className="text-[15px] py-5">{t(item.title)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

