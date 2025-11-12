import { File } from "lucide-react";
import { useTranslation } from "react-i18next";

function CardTotal() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="border   border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242]  mt-5 rounded-xl p-6">
        <h1 className="text-xl font-bold text-white">{t("Total Orders")}</h1>
        <File size={300} className="w-full text-gray-400 opacity-15" />
      </div>
    </div>
  );
}

export default CardTotal;
