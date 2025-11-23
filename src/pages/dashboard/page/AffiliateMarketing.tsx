import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { SquarePlay, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";

function AffiliateMarketing() {
  const { t } = useTranslation();

  return (
    <div dir="rtl">
      

          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
            <NotActive />
            <div className="md:flex flex-1 justify-between items-center">
              <Title
                title={t("Earn with Affiliate Marketing")}
                Subtitle={t(
                  "When you share our platform's link with others, you will earn a 20% commission on any amount they top up. You will receive your commission in cash, not wallet balance."
                )}
                className="text-3xl"
                classNamee=""
              />
              <div className="  ">
                <Button className="bg-[#252525] mt-5 md:mt-0  border-0  md:mb-0  rounded-2xl text-white/80 hover:text-white">
                  {t("Explanation of Earning from Easy Orders Marketing")}

                  <SquarePlay size={16} />
                </Button>
              </div>
            </div>
            <div className="border border-[#d6d6d6] bg-gray-50 dark:bg-[#101010] dark:border-[#424242]  mt-5 rounded-xl p-6 relative overflow-hidden">
              {/* <div className="absolute top-0 right-0 bg-amber-300 p-10 rounded-full  "></div> */}
              <div className="flex items-center justify-between dark:text-white ">
                <div className="">
                  <p className="text-2xl">{t("Your Commission")}</p>
                  <p className="text-xl mt-2">35433.310 $</p>
                </div>
                <Wallet className="text-red-500" size={30} />
              </div>
            </div>
            <div className="border border-[#d6d6d6] bg-gray-50 dark:bg-[#101010] dark:border-[#424242]  mt-5 rounded-xl p-6 relative overflow-hidden">
              <Title
                title={t(
                  "Share the platform's link with your referral code, and you will receive a lifetime 20% commission on any amount charged by the users you shared the platform with."
                )}
                Subtitle={t(
                  "You can withdraw your commission to a bank account or Vodafone Cash by contacting support."
                )}
                className=""
                classNamee=""
              />
              <Input
                type="text"
                value={
                  "https://www.easy-orders.net?view=019da17f-b736-4e4c-8b34-463114a99045"
                }
                className="outline-0 mt-4 rounded-4xl"
                placeholder={t("Your Referral Code")}
              />
            </div>
          </div>
       
    </div>
  );
}

export default AffiliateMarketing;

