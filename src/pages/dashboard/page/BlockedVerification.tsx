 
import NotActive from "@/components/NotActive";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";
import Empty from "@/components/Empty";

function BlockedVerification() {
  const { t } = useTranslation();

  return (
    <div dir="rtl">
      

          <div className="flex bg-white dark:bg-black/80 rounded-2xl m-1   flex-1 flex-col gap-4 p-4 pt-0">
            <NotActive />
            <Title
              title={t("Blocked OTP Numbers")}
              Subtitle={t("You can delete or add the blocked numbers from using the OTP verification code")}
              className="text-3xl"
              classNamee=""
            />
            <Empty className={"hidden"} Name={t("Blocked OTP Verification")}/>
          </div>
     
    </div>
  );
}

export default BlockedVerification;

