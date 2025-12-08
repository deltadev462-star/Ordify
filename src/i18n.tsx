import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from 'i18next-http-backend';

// Get saved language or default to 'en'
const savedLanguage = localStorage.getItem("i18nextLng") || "en";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // Enable debug to see what's happening
    lng: savedLanguage, // Set initial language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
      crossDomain: true,
    },
  });

// Set initial direction
if (savedLanguage === "ar") {
  document.documentElement.dir = "rtl";
  document.documentElement.lang = "ar";
} else {
  document.documentElement.dir = "ltr";
  document.documentElement.lang = "en";
}

export default i18n;
