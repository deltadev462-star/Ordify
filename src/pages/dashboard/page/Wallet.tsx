import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import PaymentCard from "@/components/PaymentCard";
import { useState } from "react";
import { GamepadDirectional, Telescope } from "lucide-react";
// Removed unused imports: AppSidebar, SidebarInset/SidebarProvider, Header

function Wallet() {
  const { t } = useTranslation();
  const features = [
    t("Lifetime Balance"),
    t("Only 4 cents deducted per order"),
    t("Your store will remain activated for life"),
    t("No expiration date for the balance"),
  ];
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
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <Title
          title={t("Wallet")}
          Subtitle={t(
            "This page displays your balance, due amount, and allows you to top up your wallet."
          )}
          className="text-3xl"
          classNamee=""
        />
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div className="border border-[#d6d6d6] dark:border-[#424242] dark:bg-[#101010]  mt-5 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className=" ">
                <h2 className="text-lg font-medium dark:text-white">
                  {t("Your Current Balance")}
                </h2>
                <p className="text-3xl font-semibold text-green-500 mt-2">
                  0.000 $
                </p>
              </div>
              <div className="border-r-2 border-white h-10">.</div>
              <div className="  ">
                <h2 className="text-lg font-medium dark:text-white">
                  {t("Due Amount")}
                </h2>
                <p className="text-3xl font-semibold text-yellow-500 mt-2">
                  0.00 $
                </p>
              </div>
            </div>
          </div>
          <div className="border border-[#d6d6d6] dark:border-[#424242]  mt-5 rounded-xl p-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t(
                "Your current balance is the available amount in your account, and $0.04 is deducted for each order. If the balance runs out, the outstanding amount (debt) increases with each new order..."
              )}
            </p>
          </div>
        </div>
        <h3 className="mt-3 text-2xl mb-2 text-black dark:text-white">
          {t("Select Payment Method")}
        </h3>
        <div className="w-full">
          <div className="border-b border-b-gray-100">
            <ul className="-mb-px flex items-center gap-4 text-sm font-medium">
              {tabs.map((tab, index) => (
                <li key={index}>
                  <button
                    onClick={() => setActiveTab(index)}
                    className={`inline-flex items-center gap-2 px-1 py-3 cursor-pointer text-lg text-white/80 hover:text-primary-700 relative
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
              <div className="animate-fadeIn space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <PaymentCard
                  amount={20}
                  bonusText={t("Charge Now and Get 20$")}
                  features={features}
                  buttonText={t("Charge Your Wallet")}
                  onButtonClick={() => {}}
                />
                <PaymentCard
                  amount={50}
                  bonusText={t("Charge Now and Get 50$")}
                  features={features}
                  buttonText={t("Charge Your Wallet")}
                  onButtonClick={() => {}}
                />
                <PaymentCard
                  amount={100}
                  bonusText={t("Charge Now and Get 100$")}
                  features={features}
                  buttonText={t("Charge Your Wallet")}
                  onButtonClick={() => {}}
                />
              </div>
            )}

            {activeTab === 1 && (
              <div className="animate-fadeIn space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <PaymentCard
                  amount={2}
                  bonusText={t("Charge Now and Get 20$")}
                  features={features}
                  buttonText={t("Charge Your Wallet")}
                  onButtonClick={() => {}}
                />
                <PaymentCard
                  amount={500}
                  bonusText={t("Charge Now and Get 50$")}
                  features={features}
                  buttonText={t("Charge Your Wallet")}
                  onButtonClick={() => {}}
                />
                <PaymentCard
                  amount={10}
                  bonusText={t("Charge Now and Get 100$")}
                  features={features}
                  buttonText={t("Charge Your Wallet")}
                  onButtonClick={() => {}}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
