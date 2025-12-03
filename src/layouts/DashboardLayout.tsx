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
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content Area - takes full width with right margin for sidebar */}
      <div
        className={cn(
          "w-full flex flex-col transition-all duration-300",
          // Desktop margins - sidebar is always on the right
          !isMobile && open && "lg:pr-[18rem]",
          !isMobile && !open && "lg:pr-[4rem]",
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
        
            <Outlet />
         
        </main>
      </div>

      {/* Sidebar - positioned absolutely on the right */}
      <DashboardSidebar
        activeNavId={activeNavId}
        side={'right'}
      />

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