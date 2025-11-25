import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Settings from "./pages/dashboard/page/Settings";
import MarketingServices from "./pages/dashboard/page/MarketingServices";
import ServiceGallery from "./pages/dashboard/page/ServiceGallery";
import Shater from "./pages/dashboard/page/Shater";
import DashBoardLayout from "./pages/dashboard/DashBoardLayout";
import LoginPage from "./pages/login/LoginPage";

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
const PixelSettings = lazy(() => import("./pages/dashboard/page/PixelSettings"));
const ConversionAPI = lazy(() => import("./pages/dashboard/page/ConversionAPI"));
const CrossSelling = lazy(() => import("./pages/dashboard/page/CrossSelling"));
const Coupons = lazy(() => import("./pages/dashboard/page/Coupons"));
const Retargeting = lazy(() => import("./pages/dashboard/page/Retargeting"));
const GoogleTag = lazy(() => import("./pages/dashboard/page/GoogleTag"));
const WhatsappMarketing = lazy(() => import("./pages/dashboard/page/WhatsappMarketing"));
const VerifyOrders = lazy(() => import("./pages/dashboard/page/VerifyOrders"));
const TrackCampaign = lazy(() => import("./pages/dashboard/page/TrackCampaign"));
const GoogleMerchant = lazy(() => import("./pages/dashboard/page/GoogleMerchant"));
const SalesPopup = lazy(() => import("./pages/dashboard/page/SalesPopup"));
const ReferralLinks = lazy(() => import("./pages/dashboard/page/ReferralLinks"));
const MinOrder = lazy(() => import("./pages/dashboard/page/MinOrder"));
const Downsell = lazy(() => import("./pages/dashboard/page/Downsell"));

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
  {
    path: "/marketing",
    element: <DashBoardLayout />,
    children: [
      {
        path: "pixel",
        element: <PixelSettings />,
      },
      {
        path: "conversion",
        element: <ConversionAPI />,
      },
      {
        path: "cross",
        element: <CrossSelling />,
      },
      {
        path: "coupons",
        element: <Coupons />,
      },
      {
        path: "retargeting",
        element: <Retargeting />,
      },
      {
        path: "google-tag",
        element: <GoogleTag />,
      },
      {
        path: "whatsapp",
        element: <WhatsappMarketing />,
      },
      {
        path: "verify-orders",
        element: <VerifyOrders />,
      },
      {
        path: "track-campaign",
        element: <TrackCampaign />,
      },
      {
        path: "google-merchant",
        element: <GoogleMerchant />,
      },
      {
        path: "sales-popup",
        element: <SalesPopup />,
      },
      {
        path: "referral-links",
        element: <ReferralLinks />,
      },
      {
        path: "min-order",
        element: <MinOrder />,
      },
      {
        path: "downsell",
        element: <Downsell />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
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
