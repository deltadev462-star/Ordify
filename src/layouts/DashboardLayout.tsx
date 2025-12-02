import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/layout/Sidebar/DashboardSidebar";
import { DashboardHeader } from "@/components/layout/Header/DashboardHeader";
import { MobileBottomNav } from "@/components/layout/MobileNav/MobileBottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { findActiveNavItem, getBreadcrumbs } from "@/data/new-sidebar-data";
import { newSidebarData } from "@/data/new-sidebar-data";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeNavId, setActiveNavId] = useState<string | null>(null);

  // Update active navigation item when route changes
  useEffect(() => {
    const activeId = findActiveNavItem(location.pathname, newSidebarData.navigation);
    setActiveNavId(activeId);
  }, [location.pathname]);

  // Handle mobile sidebar state
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  // Get breadcrumbs for current route
  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div 
        className={cn(
          "min-h-screen bg-gray-50 dark:bg-gray-900",
          i18n.language === 'ar' ? 'rtl' : 'ltr'
        )}
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      >
        {/* Desktop Sidebar */}
        {!isMobile && (
          <DashboardSidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            activeNavId={activeNavId}
          />
        )}

        {/* Main Content Area */}
        <div 
          className={cn(
            "flex flex-col transition-all duration-300",
            !isMobile && sidebarOpen ? "lg:ml-64" : "lg:ml-16"
          )}
        >
          {/* Header */}
          <DashboardHeader
            breadcrumbs={breadcrumbs}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            showMenuButton={!isMobile}
          />

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <MobileBottomNav activeNavId={activeNavId} />
        )}
      </div>
    </SidebarProvider>
  );
}