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
      <p
        className={`${className} text-center text-sm opacity-35 py-3 dark:text-white`}
      >
        {t("? Do you want to add one")}
      </p>
      <div className="mx-auto w-fit  ">
        <Button
          onClick={onCreate}
          className={`${className} bg-[#0abb45]  text-white `}
        >
          {" "}
          {t("+ Create")}
        </Button>{" "}
      </div>
    </div>
  );
}

export default Empty;

