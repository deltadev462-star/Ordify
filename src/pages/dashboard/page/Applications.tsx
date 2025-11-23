import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { GamepadDirectional, Globe, Telescope } from "lucide-react";
import InstalledCard from "@/components/InstalledCard";

function Applications() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      title: t("INSTALLED APPS"),
      icon: <GamepadDirectional />,
    },
    {
      title: t("DISCOVER MORE APPS"),
      icon: <Telescope />,
    },
  ];
  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
            <NotActive />
            <Title
              title={t("Apps")}
              Subtitle={t(
                "Here you will find apps that you may need to improve your store, increase sales, or perform specific functions that your store needs."
              )}
              className="text-3xl"
              classNamee=""
            />
            <div className="w-full">
              <div className="border-b border-b-gray-100">
                <ul className="-mb-px flex items-center gap-4 text-sm font-medium">
                  {tabs.map((tab, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setActiveTab(index)}
                        className={`inline-flex items-center gap-2 px-1 py-3 cursor-pointer text-lg text-gray-700 dark:text-white/80 hover:text-primary-700 relative
                  ${
                    activeTab === index
                      ? "text-primary-700 after:absolute after:left-0 border-b border-[#0abb45] after:bottom-0 after:h-0.5 after:w-full after:bg-primary-700"
                      : ""
                  }
                `}
                      >
                        {tab.icon}
                        {tab.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="py-3 transition-all duration-500">
                {activeTab === 0 && (
                  <div className="animate-fadeIn space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InstalledCard
                      icon={
                        <svg
                          className="w-6 h-6 text-blue-500"  
                        />
                      }
                      title={t("Google Analytics")}
                      plan={t("Free Plan")}
                      description={t("Monitor your traffic sources and analyze visitor behavior in real time.")}
                      onAction={() => {}}
                    />

                    <InstalledCard
                      icon={
                          <Globe className="w-6 h-6 text-blue-500" />
                      }
                      title={t("Meta Pixel")}
                      plan={t("Pro Plan")}
                      description={t("Integrate Meta Pixel to track conversions from your Facebook Ads.")}
                      onAction={() => {}}
                    />
                    <InstalledCard
                      icon={
                          <Globe className="w-6 h-6 text-blue-500" />
                      }
                      title={t("Meta Pixel")}
                      plan={t("Pro Plan")}
                      description={t("Integrate Meta Pixel to track conversions from your Facebook Ads.")}
                      onAction={() => {}}
                    />
                    <InstalledCard
                      icon={
                          <Globe className="w-6 h-6 text-blue-500" />
                      }
                      title={t("Meta Pixel")}
                      plan={t("Pro Plan")}
                      description={t("Integrate Meta Pixel to track conversions from your Facebook Ads.")}
                      onAction={() => {}}
                    />
                  </div>
                )}

                {activeTab === 1 && (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">{t("Preferences")}</h2>
                    <p className=" dark:text-white">{t("Change your account settings here.")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Applications;

