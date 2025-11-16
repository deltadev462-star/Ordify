import { AppSidebar } from "@/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "@/components/Header";
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import NavbarSetting from "@/components/NavbarSetting";
import { useState } from "react";

function Settings() {
  const { t } = useTranslation();

  const [active, setActive] = useState("Store Settings");

  return (
    <div dir="rtl">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />

          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1 flex-1 flex-col gap-4 p-4 pt-0">
            <NotActive />

            <Title
              title={t("Settings")}
              Subtitle={t("Design and optimize your sales Settings")}
              className="text-3xl"
              classNamee=""
            />

            <div className="text-white flex gap-4 items-start">
              <NavbarSetting active={active} setActive={setActive} />

              <div className="flex-1 p-10 rounded-2xl pt-4 border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242] transition-all duration-200">
                <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
                  {t(active)}
                </h1>

                {active === "Store Settings" && (
                  <>
                    <p className="text-gray-300 mb-8">
                      {t(
                        "You can easily change the store's color, name, connect a domain to the website, and change the currency."
                      )}
                    </p>

                    <div className="space-y-6 max-w-2xl">
                      <div className="flex flex-col">
                        <label className="mb-2 text-gray-300 ">
                          {t("Store Language")}
                        </label>

                        <select className="dark:bg-[#1a1a1a] bg-gray-300 text-black dark:text-white border border-gray-700 p-3 rounded-lg">
                          <option>العربية</option>
                          <option>English</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="mb-2 text-gray-300">
                          {t("Site Main Title")}
                        </label>
                        <input
                          type="text"
                          defaultValue="myshoping"
                          className="dark:bg-[#1a1a1a] bg-gray-300 text-black dark:text-white border border-gray-700 p-3 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="  mt-5">
                      <div className="">
                        <label
                          dir="ltr"
                          className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white gap-3"
                        >
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-16 h-8 bg-gray-500 dark:bg-black rounded-full peer peer-checked:bg-slate-300 transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
                          {t("Disable Auto Selection of Cities")}{" "}
                        </label>
                      </div>
                      <div className="">
                        <label
                          dir="ltr"
                          className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white gap-3"
                        >
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-16 h-8 bg-gray-500 dark:bg-black rounded-full peer peer-checked:bg-slate-300 transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
                          {t("Disable Auto Selection of Variants")}
                        </label>
                      </div>
                      <div className="">
                        <label
                          dir="ltr"
                          className="relative inline-flex items-center cursor-pointer text-gray-900 dark:text-white gap-3"
                        >
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-16 h-8 bg-gray-500 dark:bg-black rounded-full peer peer-checked:bg-slate-300 transition-colors duration-200"></div>
                          <span className="dot absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-8"></span>
                          {t("Disable Bot Protection")}
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {active === "Order Notifications" && (
                  <p className="text-gray-300">
                    {t("Here you control notification settings.")}
                  </p>
                )}

                {active === "Pages" && (
                  <p className="text-gray-300">
                    {t("Manage your pages here.")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Settings;
