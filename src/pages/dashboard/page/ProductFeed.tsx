 
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

 

function ProductFeed() {
  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0"></div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default ProductFeed;
