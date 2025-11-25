import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";

function ReferralLinks() {
  const { t } = useTranslation();

  return (
    <div dir="rtl">
      <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
        <NotActive />
        <Title
          title={t("Create Referral Links")}
          Subtitle={t("Generate and manage referral links")}
          className="text-3xl"
          classNamee=""
        />
      </div>
    </div>
  );
}

export default ReferralLinks;