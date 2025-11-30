import { MoveRight, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ThemeCardProps {
  title: string;
  description: string;
  image: string;
  tryLink: string;
  editLink: string;
  selected?: boolean;
  onSelectChange?: (newValue: boolean) => void;
}
function TemplateCard({
  title,
  description,
  image,
  tryLink,
  editLink,
  selected = true,
  onSelectChange,
}: ThemeCardProps) {
  const { t } = useTranslation();
  return (
    <div className="group relative rounded-2xl  border border-[#d6d6d6]   dark:border-[#424242] transition-all duration-200">
      <img
        src={image}
        className="w-full h-52 object-cover object-top rounded-t-lg transition-all duration-200 group-hover:blur-[2px]"
        alt={title}
      />
      <div className="absolute top-2 right-2 z-10">
        <input
  type="checkbox"
  checked={selected}
  onChange={e => onSelectChange?.(e.target.checked)}
  className="w-5 h-5 accent-blue-500"
/>
      </div>
      <div className="p-6">
        <h2 className="font-bold text-lg text-black dark:text-white">
          {title}
        </h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>

      <Link
        to={tryLink}
        className="
  absolute top-1/3  left-1/2
  -translate-x-1/2 -translate-y-1/2
  px-4 py-2 rounded-lg
  bg-black/70 backdrop-blur-2xl text-white font-bold
  opacity-0 transition-all duration-200
  group-hover:opacity-100 group-hover:scale-110
"
      >
        <span className="flex items-center space-x-2">
          
          <span className="">{t("Try")}</span> <MoveRight size={20} />
        </span>
      </Link>
      <Link
        to={`${editLink}`}
        className="
  absolute top-1/2  left-1/2
  -translate-x-1/2 -translate-y-1/2
  px-4 py-2 rounded-lg
  bg-black/70 backdrop-blur-2xl text-white font-bold
  opacity-0 transition-all duration-200
  group-hover:opacity-100 group-hover:scale-110
"
      >
        <span className="flex items-center space-x-2">
          
          <PenLine size={20} /> <span className="">{t("Edit")}</span>{" "}
        </span>
      </Link>
    </div>
  );
}

export default TemplateCard;

