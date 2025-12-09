import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import ChatWidget from "@/components/ChatWidget";

const DashBoardLayout = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <Outlet/>
        </SidebarInset>
      </SidebarProvider>
      <ChatWidget />
    </div>
  )
}

export default DashBoardLayout