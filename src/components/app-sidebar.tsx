"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { sidebarData, navItems } from "@/data/sidebar-data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   return (
     <Sidebar
       side="right"
       collapsible="icon"
       className="bg-white dark:bg-[#101010] z-[999]   border-gray-800 dark:text-gray-100"
       {...props}
     >
       <SidebarHeader>
         {/* <TeamSwitcher teams={data.teams} /> */}
       </SidebarHeader>
       <SidebarContent>
         <NavMain items={navItems as any} />
         <NavProjects projects={sidebarData.projects as any} />
       </SidebarContent>
       <SidebarFooter>
         <NavUser user={sidebarData.user} />
       </SidebarFooter>
       <SidebarRail />
     </Sidebar>
   );
}
