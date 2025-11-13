import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import Empty from "@/components/Empty";

function Transactions() {
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
              title={t("Transactions")}
              Subtitle={t("You will find the latest transactions you have made, such as top-ups or discounts.")}
              className="text-3xl"
              classNamee=""
            />
            <Empty className={"hidden"} Name={t("Transactions").toLowerCase()} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Transactions;
