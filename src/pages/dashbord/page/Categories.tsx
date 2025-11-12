import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import Empty from "@/components/Empty";
import { SquarePlay } from "lucide-react";
import { Button } from "@/components/ui/button";

function Categories() {
  const { t } = useTranslation();

  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
            <NotActive />
            <div className="flex justify-between items-center">
              <Title
              title={t("Categories")}
              Subtitle={t("Manage and organize your product categories")}
              className="text-3xl"
              classNamee=""
            />
              <div className="  ">
                <Button className="bg-[#252525]   border-0  md:mb-0  rounded-2xl text-white/80 hover:text-white">
                  {t("How to Create a Categories")} <SquarePlay size={16} />
                </Button>
               
              </div>
            </div>
           
            <Empty className={" "} Name={t("Categories").toLowerCase()}/>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Categories;