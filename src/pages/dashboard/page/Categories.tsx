// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Empty from "@/components/Empty";
import { Plus, SquarePlay } from "lucide-react";
import { Button } from "@/components/ui/button";

function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div dir="rtl">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <div className="flex justify-between items-center">
          <Title
            title={t("Categories")}
            Subtitle={t("Manage and organize your product categories")}
            className="text-3xl"
            classNamee=""
          />
          <div className="flex gap-2">
            <Button
              onClick={() => navigate('/dashboard/products/categories/new')}
              className="bg-primary hover:bg-primary/90 border-0 rounded-2xl text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus size={16} className="ml-1" /> {t("Create Category")}
            </Button>
            <Button className="bg-[#252525] border-0 md:mb-0 rounded-2xl text-white/80 hover:text-white">
              {t("How to Create a Categories")} <SquarePlay size={16} />
            </Button>
          </div>
        </div>

        <Empty className={" "} Name={t("Categories").toLowerCase()} />
      </div>
    </div>
  );
}

export default Categories;
