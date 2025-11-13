 
import { useTranslation } from "react-i18next";
import { statsData } from "@/data/dashboard-data";

function StatsCard() {
  const { t } = useTranslation();

  return (
     
      <div className=" ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsData.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className=" cursor-pointer  rounded-2xl flex justify-start items-center gap-3  p-6 border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242]   hover:border-gray-700 transition-all duration-200"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bgColor}`}
                >
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>

            <div className="">    <p className="text-gray-400 text-sm font-medium">
                  {t(stat.title)}
                </p>
                <h3 className="dark:text-white text-black text-2xl font-bold">{t(stat.value)}</h3></div>
              </div>
            );
          })}
        </div>
      </div>
   
  );
}

export default StatsCard;
