
import { useTranslation } from "react-i18next";
import { useSEO } from "../../hooks/useSEO";

function Home() {
  const { t } = useTranslation();

  useSEO({
    title: "Ordify - Advanced Order Management Platform",
    description: "Streamline your e-commerce operations with Ordify's advanced order management and business platform. Manage products, orders, and customers efficiently.",
    ogTitle: "Ordify - Advanced Order Management Platform",
    ogDescription: "Streamline your e-commerce operations with Ordify's advanced order management and business platform.",
    ogImage: "/fl (1).png" // Assuming logo
  });

  return (
    <div>{t("Home")}</div>
  )
}

export default Home