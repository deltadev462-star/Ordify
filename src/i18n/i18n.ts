import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi) // Load translations using http
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Default language
    debug: false, // Set to true for debugging
    supportedLngs: ['en', 'ar'], // Only support English and Arabic
    
    // Language detection options
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'navigator'],
      caches: ['localStorage', 'cookie']
    },
    
    interpolation: {
      escapeValue: false // React already does escaping
    },
    
    // Backend options to load from public folder
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    
    // React options
    react: {
      useSuspense: false // Disable suspense mode
    }
  });

// Set RTL direction for Arabic
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.setAttribute('lang', lng);
});

export default i18n;