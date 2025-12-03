import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/Sidebar/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/Header/DashboardHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { findActiveNavItem, getBreadcrumbs } from "@/data/new-sidebar-data";
import { newSidebarData } from "@/data/new-sidebar-data";
import { cn } from "@/lib/utils";

function DashboardContent() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { open, setOpen, openMobile, setOpenMobile, isMobile } = useSidebar();
  const [activeNavId, setActiveNavId] = useState<string | null>(null);

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
    <div 
      className={cn(
        "min-h-screen bg-gray-50 dark:bg-gray-900",
        i18n.language === 'ar' ? 'rtl' : 'ltr'
      )}
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Sidebar - shown on both desktop and mobile */}
      <DashboardSidebar
        activeNavId={activeNavId}
        side={'right'}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-col transition-all duration-300",
          // Desktop margins based on actual sidebar state
          !isMobile && open && i18n.language !== 'ar' && "lg:ml-[18rem]",
          !isMobile && !open && i18n.language !== 'ar' && "lg:ml-[4.5rem]",
          !isMobile && open && i18n.language === 'ar' && "lg:mr-[18rem]",
          !isMobile && !open && i18n.language === 'ar' && "lg:mr-[4.5rem]",
          // No margins on mobile since sidebar will overlay
        )}
      >
        {/* Header */}
        <DashboardHeader
          breadcrumbs={breadcrumbs}
          onMenuClick={handleMenuClick}
          showMenuButton={true}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto ">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay background */}
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
  const location = useLocation();
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <DashboardContent />
    </SidebarProvider>
  );
}