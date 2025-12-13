import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/Sidebar/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/Header/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { findActiveNavItem, getBreadcrumbs } from "@/data/new-sidebar-data";
import { newSidebarData } from "@/data/new-sidebar-data";
import { useTranslation } from "react-i18next";

function DashboardContent() {
  const location = useLocation();
  const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar();
  const [activeNavId, setActiveNavId] = useState<string | null>(null);
  const { i18n } = useTranslation();

  // Update active navigation item when route changes
  useEffect(() => {
    const activeId = findActiveNavItem(location.pathname, newSidebarData.navigation);
    setActiveNavId(activeId);
  }, [location.pathname]);

  // Get breadcrumbs for current route
  const breadcrumbs = getBreadcrumbs(location.pathname);

  // Handle menu button click
  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="flex flex-row w-full relative min-h-screen dark:bg-gray-900" dir="ltr">
      <div className="flex-1 order-1">
      
         {/* Header */}
        <DashboardHeader
           breadcrumbs={breadcrumbs}
           onMenuClick={handleMenuClick}
           showMenuButton={true}
        />
        {/* Page Content */}
        <main dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    
      <div className="order-2">
        <DashboardSidebar
          activeNavId={activeNavId}
          side={'right'}
        />
      </div>
           {isMobile && openMobile && (
         <div
           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
           onClick={() => setOpenMobile(false)}
           aria-hidden="true"
         />
       )}
    </div>
  );
}

export default function DashboardLayout() {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <DashboardContent />
    </SidebarProvider>
  );
}