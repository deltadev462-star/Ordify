import { ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function NotActive() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="border border-[#d32f2f] dark:border-[#d32f2f] space-x-3 mt-5 rounded-xl p-6 flex items-start justify-start">
      <ShieldAlert className="text-[#d32f2f] "/>
      <div className="">
        <h3 className="text-white text-xl capitalize">{t('messages.storeNotActive')}</h3>
        <p className="text-red-300 py-2 text-sm">
          {t('messages.topUpWalletMessage')}
        </p>
        <Button
          onClick={() => navigate('/dashboard/wallet')}
          className="text-black dark:text-white"
        >
          {t('messages.topUpWallet')}
        </Button>
      </div>
    </div>
  );
}

export default NotActive;

