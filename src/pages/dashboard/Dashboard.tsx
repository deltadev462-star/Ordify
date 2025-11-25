 import { Send, ShieldX, SquarePlay } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Progress } from "@/components/ui/progress";
import CardSetup from "@/components/CardSetup";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import CardTotal from "@/components/CardTotal";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div dir="rtl">
      <div className="flex   bg-white dark:bg-black/90  flex-1 flex-col gap-4 p-4 pt-0">
        <div className="text-white text-4xl">
          <div className="border border-[#d6d6d6] dark:border-[#424242]  mt-5 rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div className="">
                <Title
                  classNamee=""
                  className=""
                  title={t("Store Setup Guide")}
                  Subtitle={t(
                    "Follow these simple steps to set up your store and start selling"
                  )}
                />
              </div>
              <ShieldX className="text-black dark:text-white" />
            </div>
            <div className="border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242]  mt-5 rounded-xl p-6 flex items-center justify-between">
              <p className="text-sm text-black dark:text-white">
                {t("You have completed")}
                <span className="text-[#0abb45]"> 30%</span>
              </p>
              <Progress value={53} className="w-2/3  " />
            </div>
            <CardSetup />
          </div>
        </div>
        <NotActive />
        <Title
          title={t("Statistics")}
          Subtitle={t("Know more about your store's performance and more.")}
          className="text-3xl"
          classNamee=""
        />
        <div className="border border-[#d6d6d6] dark:border-[#424242]  mt-5 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div className="">
              <Title
                className="md:text-3xl text-lg capitalize"
                title={t("Your guide to getting started")}
                Subtitle={t(
                  "Learn how to use the platform and increase your earnings through a series of educational videos, and stay updated with the latest updates and developments via our Telegram channel."
                )}
                classNamee="md:text-sm text-[10px]"
              />
            </div>
            <ShieldX size={40} className=" text-black dark:text-white" />
          </div>
          <div className="mt-6 space-x-3 ">
            <Button className="bg-[#252525] border-0 mb-3 md:mb-0  rounded-2xl text-white/80 hover:text-white">
              {t("Join Our Telegram channel")} <Send size={16} />{" "}
            </Button>
            <Button className="bg-[#d32f2f] rounded-2xl text-white/80 hover:text-white hover:bg-[#ee7575] cursor-pointer ">
              {t("Watch the tutorials")}
              <SquarePlay size={16} className="  " />
            </Button>
          </div>
        </div>
        <StatsCard />

        <div className="md:flex flex-wrap justify-between items-center">
          <CardTotal />
          <CardTotal />
        </div>
        <div className="flex justify-between items-center">
          <CardTotal />
        </div>
        <div className="md:flex flex-wrap   justify-between items-center">
          <CardTotal />
          <CardTotal />
        </div>
        <CardTotal />
        <CardTotal />
      </div>
    </div>
  );
}
