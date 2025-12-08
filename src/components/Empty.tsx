import { MonitorCog } from "lucide-react";

import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

interface EmptyProps {
  Name: string;
  className?: string;
  onCreate?: () => void;
}

function Empty({ Name, className, onCreate }: EmptyProps) {
  const { t } = useTranslation();
  return (
    <div className="w-full  mt-5">
      <MonitorCog size={200} className="dark:text-white opacity-40 w-full " />
      <p className=" text-2xl text-center dark:text-white">{t("No {{name}} yet", { name: Name })}</p>
    
    
    </div>
  );
}

export default Empty;

