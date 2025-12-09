// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import Empty from "@/components/Empty";
import { Button } from "@/components/ui/button";
import { SquarePlay } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

function Products() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useSEO({
    title: "Products - Ordify Dashboard",
    description:
      "Manage your products in Ordify. Add, edit, and organize products to increase purchase rates and conversions.",
    ogTitle: "Products Management - Ordify",
    ogDescription:
      "Advanced product management tools for e-commerce businesses.",
  });

  return (
    <div>
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <div className="flex justify-between items-center">
          <Title
            title={t('products.title')}
            Subtitle={t('products.pageSubtitle')}
            className="text-3xl"
            classNamee=""
          />
          <div className="  ">
            <Button className="bg-[#252525]   border-0  md:mb-0  rounded-2xl text-white/80 hover:text-white">
              {t('products.howToCreateSimple')} <SquarePlay size={16} />
            </Button>
            <br />
            <Button className="bg-[#252525] border-0   mt-5 md:mb-0  rounded-2xl text-white/80 hover:text-white">
              {t('products.howToCreateVariations')}
              <SquarePlay size={16} />
            </Button>
          </div>
        </div>
        <Empty
          className={" "}
          Name={t('products.title').toLowerCase()}
          onCreate={() => navigate("/dashboard/product/create")}
        />
      </div>
    </div>
  );
}

export default Products;
