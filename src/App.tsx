import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Settings from "./pages/dashboard/page/Settings";
import MarketingServices from "./pages/dashboard/page/MarketingServices";
import ServiceGallery from "./pages/dashboard/page/ServiceGallery";
import Shater from "./pages/dashboard/page/Shater";
import DashBoardLayout from "./pages/dashboard/DashBoardLayout";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Products = lazy(() => import("./pages/dashboard/page/Products"));
const History = lazy(() => import("./pages/dashboard/page/History"));
const Home = lazy(() => import("./pages/Home/Home"));
const Order = lazy(() => import("./pages/dashboard/page/Order"));
const MissedOrder = lazy(() => import("./pages/dashboard/page/MissedOrder"));
const BlockedNumber = lazy(
  () => import("./pages/dashboard/page/BlockedNumber")
);
const BlockedVerification = lazy(
  () => import("./pages/dashboard/page/BlockedVerification")
);
const Categories = lazy(() => import("./pages/dashboard/page/Categories"));
const Reviews = lazy(() => import("./pages/dashboard/page/Reviews"));
const ProductFeed = lazy(() => import("./pages/dashboard/page/ProductFeed"));
const EasyCatalog = lazy(() => import("./pages/dashboard/page/EasyCatalog"));
const Funnels = lazy(() => import("./pages/dashboard/page/Funnels"));
const Applications = lazy(() => import("./pages/dashboard/page/Applications"));
const AffiliateMarketing = lazy(
  () => import("./pages/dashboard/page/AffiliateMarketing")
);
const Transactions = lazy(() => import("./pages/dashboard/page/Transactions"));
const Wallet = lazy(() => import("./pages/dashboard/page/Wallet"));
// const Template = lazy(() => import("./pages/dashboard/page/Template"));
const EditTheme = lazy(() => import("./pages/dashboard/page/EditTheme"));
const Themes = lazy(() => import("./pages/dashboard/page/Themes"));
const Text = lazy(() => import("./pages/dashboard/page/Text"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:"/dashboard",
    element:<DashBoardLayout/>,
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
       {
    path: "order",
    element: <Order />,
  },
  {
    path: "missed-order",
    element: <MissedOrder />,
  },
  {
    path: "blocked-number",
    element: <BlockedNumber />,
  },
  {
    path: "blocked-otp-numbers",
    element: <BlockedVerification />,
  },
  {
    path: "product",
    element: <Products />,
  },
  {
    path: "categories",
    element: <Categories />,
  },
  {
    path: "reviews",
    element: <Reviews />,
  },
  {
    path: "product-feed",
    element: <ProductFeed />,
  },
  {
    path: "easy-catalog",
    element: <EasyCatalog />,
  },
  {
    path: "funnels",
    element: <Funnels />,
  },
  {
    path: "applications",
    element: <Applications />,
  },
  {
    path: "themes",
    element: <Themes />,
  },
  {
    path: "text",
    element: <Text />,
  },
  {
    path: "affiliate-marketing",
    element: <AffiliateMarketing />,
  },
  {
    path: "wallet",
    element: <Wallet />,
  },
  {
    path: "transactions",
    element: <Transactions />,
  },
  {
    path: "shater",
    element: <Shater />,
  },
  {
    path: "service-gallery",
    element: <ServiceGallery />,
  },
  {
    path: "marketing-services",
    element: <MarketingServices />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
  {
    path: "template/:id",
    element: <EditTheme />,
  },
  {
    path: "history",
    element: <History />,
  },
    ]
  },

 
]);

function App() {
  return (
    <ThemeProvider defaultTheme="modern">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
