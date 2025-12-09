import { MonitorCog } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

interface EmptyProps {
  Name: string;
  className?: string;
  onCreate?: () => void;
}

function Empty({ Name, className = "", onCreate }: EmptyProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`w-full mt-5 ${className}`}>
      <MonitorCog size={200} className="dark:text-white opacity-40 w-full " />
      <p className="text-2xl text-center dark:text-white">
        {t('common.noDataYet', { name: Name })}
      </p>
      {onCreate && (
        <div className="mt-4 flex justify-center">
          <Button onClick={onCreate} className="rounded-2xl">
            {t('common.create')} {Name}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Empty;

