"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { sidebarData, navItems } from "@/data/sidebar-data"
import type { LucideIcon } from "lucide-react"

type NavItem = {
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
     <Sidebar
       side="right"
       collapsible="icon"
       className="bg-gray-50 dark:bg-[#101010] z-[999] border-gray-200  dark:border-gray-800 dark:text-gray-100"
       {...props}
     >
       <SidebarHeader>
         {/* <div className="flex justify-center gap-5 items-center">
           <LogOut />
           <Buttongr
             variant="outline"
             size="sm"
             className="cursor-pointer "
           >
             <HatGlasses /> Watch
           </Buttongr>
         </div> */}
         
       </SidebarHeader>
       <SidebarContent>
         <NavMain items={navItems as NavItem[]} />
         {/* <NavProjects projects={sidebarData.projects as any} /> */}
       </SidebarContent>
       <SidebarFooter>
        <div className="text-center text-[10px]">v2.3.66
</div>
         <NavUser user={sidebarData.user} />
       </SidebarFooter>
       <SidebarRail />
     </Sidebar>
   );
}
