import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
 

function ServiceGallery() {
  const { t } = useTranslation();

  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
            <NotActive />
            <Title
              title={t("Service Gallery")}
              Subtitle={t("Design and optimize your sales Service Gallery")}
              className="text-3xl"
              classNamee=""
            />
            
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default ServiceGallery;
