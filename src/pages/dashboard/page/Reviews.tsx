// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import Empty from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { SquarePlay } from "lucide-react";

function Reviews() {
  const { t } = useTranslation();

  return (
    <div dir="rtl">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <div className="flex justify-between items-center">
          <Title
            title={t("Reviews")}
            Subtitle={t("View and manage customer reviews for your products")}
            className="text-3xl"
            classNamee=""
          />
          <div className="  ">
            <Button className="bg-[#252525]   border-0  md:mb-0  rounded-2xl text-white/80 hover:text-white">
              {t("How to Create a Reviews")} <SquarePlay size={16} />
            </Button>
          </div>
        </div>

        <Empty className={" "} Name={t("Reviews").toLowerCase()} />
      </div>
    </div>
  );
}

export default Reviews;
