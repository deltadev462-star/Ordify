import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";

export default function History() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />

        <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
          <h1>History Content</h1>
          {/* Add your history page content here */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
