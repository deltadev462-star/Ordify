import   { useState } from "react";
import { Check, Square, SquarePlay } from "lucide-react";
import { settingsData } from "@/data/dashboard-data";
function CardSetup() {
  const [completedTasks, setCompletedTasks] = useState([1, 2, 3]);

  const toggleTask = (id: number) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter((taskId) => taskId !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4   mt-5  ">
      {settingsData.map((item) => {
        const Icon = item.icon;
        const isCompleted = completedTasks.includes(item.id);

        return (
          <div
            key={item.id}
            className="  rounded-2xl p-2 pt-4 border border-[#d6d6d6] dark:bg-[#101010] dark:border-[#424242]    transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? "bg-[#bce0c8]" : "bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-black dark:text-white font-medium  text-[13px] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-[11px]">
                    {item.description}
                  </p>
                </div>
              </div>
              <button onClick={() => toggleTask(item.id)} className="ml-3">
                {isCompleted ? (
                  <div className="w-4 h-4 rounded bg-[#0abb45] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <Square className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between pe-3 px-2">
              <a href="#" className="text-[#0abb45] text-[10px]  underline">
                {item.link}
              </a>
              <button>
                <SquarePlay size={16} className="text-gray-400 " />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardSetup;

