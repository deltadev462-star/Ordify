import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";

export default function Dashboard() {
  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="flex bg-white dark:bg-black/90  flex-1 flex-col gap-4 p-4 pt-0">
            {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
            <div className="text-white text-4xl">hi</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
