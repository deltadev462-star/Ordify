import { useState } from "react";
import { Languages } from "lucide-react";
import i18n from "i18next";

export default function LangSwitcher() {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!open);

  const handleChangeLang = (newLang: string) => {
   
    i18n.changeLanguage(newLang);
    
    const newDir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = newDir;
    localStorage.setItem("documentDir", newDir);
   
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        // className="flex items-center gap-2 px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 transition"
      >
        <Languages className="" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-15 overflow-hidden bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-20">
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
