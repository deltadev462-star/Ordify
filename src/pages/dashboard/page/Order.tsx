// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import Empty from "@/components/Empty";

function Order() {
  const { t } = useTranslation();
  return (
    <div dir="rtl">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        {/* <h1 className="text-white">order</h1> */}
        <NotActive />
        <Title
          title={t("Orders")}
          Subtitle={t(
            "You can manage your orders, filter them by status, and view/edit any order by clicking on it."
          )}
          className="text-3xl"
          classNamee=""
        />
        <Empty className={"hidden"} Name={t("Orders").toLowerCase()} />
      </div>
    </div>
  );
}

export default Order;
