import { useState } from "react";
import { Languages } from "lucide-react";
import i18n from "i18next";

export default function LangSwitcher() {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!open);

  const handleChangeLang = (newLang:any) => {
    console.log("handleChangeLang called with:", newLang);
    console.log("Current document dir before change:", document.documentElement.dir);
    console.log("Changing language to:", newLang);
    i18n.changeLanguage(newLang);
    console.log("i18n language after change:", i18n.language);
    const newDir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = newDir;
    localStorage.setItem("documentDir", newDir);
    console.log("Document dir set to:", document.documentElement.dir);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        // className="flex items-center gap-2 px-3 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 transition"
      >
        <Languages className="w-5 h-5 text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-15 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          <button
            onClick={() => handleChangeLang("en")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <img src="/fl (2).png" alt="" className=""  />
          </button>

          <button
            onClick={() => handleChangeLang("ar")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <img src="/fl (1).png"  alt="" className=""  />
          </button>
        </div>
      )}
    </div>
  );
}
