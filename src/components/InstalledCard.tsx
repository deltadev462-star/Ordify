 import { Settings } from "lucide-react";

interface InstalledCardProps {
 icon: React.ReactNode;
 title: string;
 plan: string;
 description: string;
 onAction: () => void;
}

function InstalledCard({ icon, title, plan, description, onAction }: InstalledCardProps) {
  return (
    <div className="border border-[#d6d6d6] dark:border-[#424242] mt-5 rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="text-primary-700">{icon}</div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{plan}</p>
          </div>
        </div>
        <button
          onClick={onAction}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Description */}
      <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </div>
    </div>
  );
}

export default InstalledCard;
