import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import Empty from "@/components/Empty";
import { Button } from "@/components/ui/button";
import {   SquarePlay } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

function Products() {
  const { t } = useTranslation();

  useSEO({
    title: "Products - Ordify Dashboard",
    description: "Manage your products in Ordify. Add, edit, and organize products to increase purchase rates and conversions.",
    ogTitle: "Products Management - Ordify",
    ogDescription: "Advanced product management tools for e-commerce businesses."
  });

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
                title={t("Products")}
                Subtitle={t("The most important part of our platform where you can add products in a way that increases the purchase and conversion rate.  When creating or editing a product, look at the advanced settings that will increase your sales.")}
                className="text-3xl"
                classNamee=""
              />
              <div className="  ">
                <Button className="bg-[#252525]   border-0  md:mb-0  rounded-2xl text-white/80 hover:text-white">
                  {t("How to Create a simple product")} <SquarePlay size={16} />
                </Button>
                <br />
                <Button className="bg-[#252525] border-0   mt-5 md:mb-0  rounded-2xl text-white/80 hover:text-white">
                  {t("How to Create a product with variations")}
                  <SquarePlay size={16} />
                </Button>
              </div>
            </div>
            <Empty className={" "} Name={t("Products").toLowerCase()} />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Products;

