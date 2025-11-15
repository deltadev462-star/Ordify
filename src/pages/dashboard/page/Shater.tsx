import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, FileSearchCorner } from "lucide-react";

function Shater() {
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
              title={t("Shater Your Smart Shater")}
              Subtitle={t(
                "Design and optimize your sales funnels"
              )}
              className="text-3xl"
              classNamee=""
            />
            <div className="bg-[#101010] dark:text-white text-black py-10 px-15  max-w-7xl mx-auto mt-10 rounded-3xl ">
              <div className="flex item center justify-between">
                <div className="">
                  <img src="/fl (1).png" alt="" className="w-15" />
                </div>
                <div className="">
                  <img src="/fl (1).png" alt="" className="w-15" />
                </div>
              </div>
              <div className="text-center mb-3">
                <h2 className="font-bold text-2xl pb-1">
                  {t("Ordify platform is now in partnership with Top Media Buyers platform")}
                </h2>
                <p className="text-sm">
                  {t("You can now register an account on Top Media Buyers platform and link your account with your store in EasyOrders")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                <div className="flex flex-col text-center p-6   rounded-lg  not-[]: h-full">
                  <h3 className="">{t("Do you need marketers?")}</h3>
                  <p className="text-sm">
                    {t("Submit your request now and the best marketers will contact you")}
                  </p>
                  <p className="py-6 text-sm">
                    {t("You will find professional marketers and you can verify the number of orders they have achieved as we document and verify the number of orders achieved by each marketer. Just ask for their account on the Top Media Buyers platform and see the number of documented orders to confirm their experience")}
                  </p>
                  <p className="text-sm  mb-3">
                    {t("Send us the job details, target country, field of work, and your contact method, and the best marketers will contact you")}
                  </p>
                  <Button className="w-full bg-green-500 text-white mt-auto">
                    <BriefcaseBusiness className="mr-2" /> {t("Post a Job")}
                  </Button>
                </div>

                <div className="flex flex-col text-center p-6   rounded-lg   h-full">
                  <h3 className="">{t("Are you a marketer looking for projects?")}</h3>
                  <p className="text-sm">
                    {t("You can view all open projects and apply for them for free")}
                  </p>
                  <p className="py-6 text-sm">
                    {t("Create a free account on Top Media Buyers and link it with your stores on EasyOrders to prove to project owners the number of documented orders and your marketing experience")}
                  </p>
                  <p className="text-sm mb-3">
                    {t("The service is free and there are no commissions or expenses")}
                  </p>
                  <Button className="w-full bg-green-500 text-white mt-auto">
                    <FileSearchCorner className="mr-2" /> {t("View Jobs")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Shater;
