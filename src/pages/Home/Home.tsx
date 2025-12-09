
import { useSEO } from "../../hooks/useSEO";

function Home() {
  useSEO({
    title: "Ordify - Advanced Order Management Platform",
    description: "Streamline your e-commerce operations with Ordify's advanced order management and business platform. Manage products, orders, and customers efficiently.",
    ogTitle: "Ordify - Advanced Order Management Platform",
    ogDescription: "Streamline your e-commerce operations with Ordify's advanced order management and business platform.",
    ogImage: "/fl (1).png" // Assuming logo
  });

  return (
    <div>{"Home"}</div>
  )
}

export default Home
