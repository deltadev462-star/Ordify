import { useState, useRef, useEffect } from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function LangSwitcher() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setOpen(!open);

  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleChangeLang = (newLang: string) => {
   
    i18n.changeLanguage(newLang);
    
    const newDir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = newDir;
    localStorage.setItem("documentDir", newDir);
   
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleDropdown}
          >
            <Languages className="" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {t('Change language')}
        </TooltipContent>
      </Tooltip>

      {open && (
        <div className="absolute right-0 mt-2 w-15 overflow-hidden bg-white dark:bg-[#101010] border border-[#d6d6d6] dark:border-[#424242] dark:border-gray-800 rounded-md shadow-lg z-20">
          <button
            onClick={() => handleChangeLang("en")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-[#333]"
          >
            <img src="/fl (2).png" alt="English" className="" />
          </button>

          <button
            onClick={() => handleChangeLang("ar")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700  hover:bg-gray-200 dark:hover:bg-[#333]"
          >
            <img src="/fl (1).png" alt="العربية" className="" />
          </button>
        </div>
      )}
    </div>
  );
}

