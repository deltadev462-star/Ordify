import { ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

function NotActive() {
  const { t } = useTranslation();
  return (
    <div className="border border-[#d32f2f]   dark:border-[#d32f2f] space-x-3 mt-5 rounded-xl p-6 flex items-start justify-start">
      <ShieldAlert className="text-[#d32f2f] "/>
      <div className="">
        <h3 className="text-white text-xl capitalize">{t("Your store is not active")}</h3>
        <p className="text-red-300 py-2  text-sm">
          {t("You must top up your wallet on the site to activate your store")}
        </p>
        <Button className="text-black dark:text-white">{t("Top Up Your Wallet")}</Button>
        <p className="text-red-300 py-2 text-sm">
          {t("Your store link: myshoping.myeasyorders.com")}
        </p>
      </div>
    </div>
  );
}

export default NotActive;
