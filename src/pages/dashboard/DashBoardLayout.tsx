import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";

import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  return (
   <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
        
         <Outlet/>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default DashBoardLayout