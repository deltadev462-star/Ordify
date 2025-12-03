import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { TooltipProvider } from "./components/ui/tooltip";
import { useDarkMode } from "./hooks/useDarkMode";
import DashboardLayout from "./layouts/DashboardLayout"; // New layout
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/signup/RegisterPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/profile/ProfilePage";

// Lazy load pages
const Home = lazy(() => import("./pages/Home/Home"));

// Dashboard Overview
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// Orders Management - using existing components
const AllOrders = lazy(() => import("./pages/dashboard/page/AllOrders"));
const Order = lazy(() => import("./pages/dashboard/page/Order"));
const MissedOrder = lazy(() => import("./pages/dashboard/page/MissedOrder"));
const BlockedNumber = lazy(() => import("./pages/dashboard/page/BlockedNumber"));
const BlockedVerification = lazy(() => import("./pages/dashboard/page/BlockedVerification"));

// Products & Catalog - using existing components
const Products = lazy(() => import("./pages/dashboard/page/Products"));
const ProductCreate = lazy(() => import("./pages/dashboard/page/ProductCreate"));
const Categories = lazy(() => import("./pages/dashboard/page/Categories"));
const Reviews = lazy(() => import("./pages/dashboard/page/Reviews"));
const ReviewCreate = lazy(() => import("./pages/dashboard/page/ReviewCreate"));
const ProductFeed = lazy(() => import("./pages/dashboard/page/ProductFeed"));
const EasyCatalog = lazy(() => import("./pages/dashboard/page/EasyCatalog"));

// Marketing Hub - using existing components
const MarketingPage = lazy(() => import("./pages/dashboard/marketing/MarketingPage"));
const Coupons = lazy(() => import("./pages/dashboard/page/Coupons"));
const CrossSelling = lazy(() => import("./pages/dashboard/page/CrossSelling"));
const Retargeting = lazy(() => import("./pages/dashboard/page/Retargeting"));
const WhatsappMarketing = lazy(() => import("./pages/dashboard/page/WhatsappMarketing"));
const AffiliateMarketing = lazy(() => import("./pages/dashboard/page/AffiliateMarketing"));
const ReferralLinks = lazy(() => import("./pages/dashboard/page/ReferralLinks"));
const PixelSettings = lazy(() => import("./pages/dashboard/page/PixelSettings"));
const ConversionAPI = lazy(() => import("./pages/dashboard/page/ConversionAPI"));
const GoogleTag = lazy(() => import("./pages/dashboard/page/GoogleTag"));
const VerifyOrders = lazy(() => import("./pages/dashboard/page/VerifyOrders"));
const TrackCampaign = lazy(() => import("./pages/dashboard/page/TrackCampaign"));
const GoogleMerchant = lazy(() => import("./pages/dashboard/page/GoogleMerchant"));
const SalesPopup = lazy(() => import("./pages/dashboard/page/SalesPopup"));
const MinOrder = lazy(() => import("./pages/dashboard/page/MinOrder"));
const Downsell = lazy(() => import("./pages/dashboard/page/Downsell"));

// Store Settings - using existing components
const Settings = lazy(() => import("./pages/dashboard/page/Settings"));

// Design & Content - using existing components
const Themes = lazy(() => import("./pages/dashboard/page/Themes"));
const EditTheme = lazy(() => import("./pages/dashboard/page/EditTheme"));
const Text = lazy(() => import("./pages/dashboard/page/Text"));

// Apps & Integrations - using existing components
const Applications = lazy(() => import("./pages/dashboard/page/Applications"));

// Financial Center - using existing components
const Wallet = lazy(() => import("./pages/dashboard/page/Wallet"));
const Transactions = lazy(() => import("./pages/dashboard/page/Transactions"));

// Other existing pages
const MarketingServices = lazy(() => import("./pages/dashboard/page/MarketingServices"));
const ServiceGallery = lazy(() => import("./pages/dashboard/page/ServiceGallery"));
const Shater = lazy(() => import("./pages/dashboard/page/Shater"));
const History = lazy(() => import("./pages/dashboard/page/History"));

// Existing main navigation pages that might exist
const OrdersPage = lazy(() => import("./pages/dashboard/orders/OrdersPage"));
const ListingPage = lazy(() => import("./pages/dashboard/listing/ListingPage"));
const WalletPage = lazy(() => import("./pages/dashboard/wallet/WalletPage"));
const WebsitePage = lazy(() => import("./pages/dashboard/website/WebsitePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      
      // Orders Management Routes
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <AllOrders />,
          },
          {
            path: "pending",
            element: <AllOrders />, // Temporary: will create PendingOrders component
          },
          {
            path: "processing",
            element: <Order />, // Temporary: will create ProcessingOrders component
          },
          {
            path: "completed",
            element: <Order />, // Temporary: will create CompletedOrders component
          },
          {
            path: "issues",
            element: <MissedOrder />, // Temporary: will create OrderIssues component
          },
          {
            path: "blocked-numbers",
            element: <BlockedNumber />,
          },
          {
            path: "blocked-otp",
            element: <BlockedVerification />,
          },
        ],
      },
      
      // Products & Catalog Routes
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: "new",
            element: <ProductCreate />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "collections",
            element: <Categories />, // Temporary: will create Collections component
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
          {
            path: "feed",
            element: <ProductFeed />,
          },
          {
            path: "catalog",
            element: <EasyCatalog />,
          },
        ],
      },
      
      // Customers Routes
      {
        path: "customers",
        children: [
          {
            index: true,
            element: <Dashboard />, // Temporary: will create Customers component
          },
          {
            path: "segments",
            element: <Dashboard />, // Temporary: will create CustomerSegments component
          },
          {
            path: "messages",
            element: <Dashboard />, // Temporary: will create CustomerMessages component
          },
          {
            path: "loyalty",
            element: <Dashboard />, // Temporary: will create LoyaltyProgram component
          },
        ],
      },
      
      // Marketing Hub Routes
      {
        path: "marketing",
        children: [
          {
            index: true,
            element: <MarketingPage />,
          },
          {
            path: "promotions",
            element: <MarketingPage />, // Temporary: will create Promotions component
          },
          {
            path: "coupons",
            element: <Coupons />,
          },
          {
            path: "cross-selling",
            element: <CrossSelling />,
          },
          {
            path: "retargeting",
            element: <Retargeting />,
          },
          {
            path: "integrations",
            children: [
              {
                index: true,
                element: <MarketingPage />, // Temporary
              },
              {
                path: "pixel",
                element: <PixelSettings />,
              },
              {
                path: "conversion-api",
                element: <ConversionAPI />,
              },
              {
                path: "google-tag",
                element: <GoogleTag />,
              },
              {
                path: "google-merchant",
                element: <GoogleMerchant />,
              },
            ],
          },
          {
            path: "whatsapp",
            element: <WhatsappMarketing />,
          },
          {
            path: "affiliate",
            element: <AffiliateMarketing />,
          },
          {
            path: "referrals",
            element: <ReferralLinks />,
          },
          {
            path: "sales-popup",
            element: <SalesPopup />,
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
            path: "min-order",
            element: <MinOrder />,
          },
          {
            path: "downsell",
            element: <Downsell />,
          },
        ],
      },
      
      // Analytics & Reports Routes
      {
        path: "analytics",
        children: [
          {
            index: true,
            element: <Dashboard />, // Temporary: will create Analytics component
          },
          {
            path: "sales",
            element: <Dashboard />, // Temporary: will create SalesAnalytics component
          },
          {
            path: "customers",
            element: <Dashboard />, // Temporary: will create CustomerAnalytics component
          },
          {
            path: "products",
            element: <Dashboard />, // Temporary: will create ProductAnalytics component
          },
          {
            path: "marketing",
            element: <Dashboard />, // Temporary: will create MarketingAnalytics component
          },
          {
            path: "custom",
            element: <Dashboard />, // Temporary: will create CustomReports component
          },
        ],
      },
      
      // Store Settings Routes
      {
        path: "settings",
        children: [
          {
            index: true,
            element: <Settings />,
          },
          {
            path: "shipping",
            element: <Settings />, // Temporary: will create ShippingSettings component
          },
          {
            path: "payments",
            element: <Settings />, // Temporary: will create PaymentSettings component
          },
          {
            path: "policies",
            element: <Settings />, // Temporary: will create StorePolicies component
          },
          {
            path: "staff",
            element: <Settings />, // Temporary: will create StaffSettings component
          },
          {
            path: "tax",
            element: <Settings />, // Temporary: will create TaxSettings component
          },
        ],
      },
      
      // Design & Content Routes
      {
        path: "design",
        children: [
          {
            index: true,
            element: <Themes />,
          },
          {
            path: "customize",
            element: <EditTheme />, // Using existing EditTheme component
          },
          {
            path: "pages",
            element: <Text />, // Temporary: will create Pages component
          },
          {
            path: "media",
            element: <Themes />, // Temporary: will create MediaLibrary component
          },
          {
            path: "seo",
            element: <Text />, // Temporary: will create SEOSettings component
          },
        ],
      },
      
      // Apps & Integrations Routes
      {
        path: "apps",
        children: [
          {
            index: true,
            element: <Applications />,
          },
          {
            path: "marketplace",
            element: <Applications />, // Temporary: will create AppMarketplace component
          },
          {
            path: "api",
            element: <Applications />, // Temporary: will create APIAccess component
          },
          {
            path: "webhooks",
            element: <Applications />, // Temporary: will create Webhooks component
          },
        ],
      },
      
      // Financial Center Routes
      {
        path: "finance",
        children: [
          {
            index: true,
            element: <Wallet />,
          },
          {
            path: "transactions",
            element: <Transactions />,
          },
          {
            path: "billing",
            element: <Wallet />, // Temporary: will create Billing component
          },
          {
            path: "payouts",
            element: <Wallet />, // Temporary: will create Payouts component
          },
          {
            path: "reports",
            element: <Transactions />, // Temporary: will create FinancialReports component
          },
        ],
      },
      
      // Legacy routes for backward compatibility
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
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  // Initialize dark mode
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      document.documentElement.classList.add("dark");
    } else if (savedMode === null) {
      // Check system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="modern">
      <TooltipProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
