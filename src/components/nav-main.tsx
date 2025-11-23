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
                    className="hover:bg-white/20 cursor-pointer text-lg data-[active=true]:py-5 data-[active=true]:text-white  data-[active=true]:bg-green-500"
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
                        className="hover:bg-white/20 text-[15px] py-1 cursor-pointer rounded-md"
                      >
                        <SidebarMenuSubButton
                          asChild
                          isActive={activeItem === subItem.title}
                          className="data-[active=true]:bg-green-500   data-[active=true]:text-white text-[15px]"
                        >
                          <a
                            href={subItem.url}
                            onClick={() => setActiveItem(subItem.title)}
                          >
                            {subItem.icons && <subItem.icons />}
                            <span>{t(subItem.title)}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={activeItem === item.title}>
                <a
                  href={item.url}
                  className="hover:bg-white/20 cursor-pointer  rounded-md data-[active=true]:bg-green-500 data-[active=true]:text-white"
                  onClick={() => setActiveItem(item.title)}
                >
                  {item.icon && <item.icon />}
                <span className="text-[15px]  py-5">{t(item.title)}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

