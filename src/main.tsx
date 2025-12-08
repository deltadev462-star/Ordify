import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n.tsx";
import StoreProvider from "./StoreProvide.tsx";

const savedLang = localStorage.getItem("i18nextLng") || "en";

// Set initial language and direction
document.documentElement.lang = savedLang;

if (savedLang === "ar") {
  document.documentElement.dir = "rtl";
  document.documentElement.classList.add('rtl');
  localStorage.setItem("documentDir", "rtl");
} else {
  document.documentElement.dir = "ltr";
  document.documentElement.classList.remove('rtl');
  localStorage.setItem("documentDir", "ltr");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>

    <App />
    </StoreProvider>
  </StrictMode>
);

