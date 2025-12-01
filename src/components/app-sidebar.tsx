"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData, navItems } from "@/data/sidebar-data";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  type: "link";
  title: string;
  url: string;
  icon?: LucideIcon;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      side="right"
      collapsible="icon"
      className="glass-card bg-sidebar-background/80 dark:bg-sidebar-background/80 z-999 border-sidebar-border/50 dark:border-sidebar-border/50 dark:text-sidebar-foreground backdrop-blur-xl"
      {...props}
    >
      <SidebarHeader>
        {/* <TeamSwitcher teams={[...sidebarData.teams]} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems as NavItem[]} />
        {/* <NavProjects projects={sidebarData.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <div className="text-center text-[10px]">v2.3.66</div>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

