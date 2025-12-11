import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { TooltipProvider } from "./components/ui/tooltip";
 
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/signup/RegisterPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/profile/ProfilePage";
import DashboardLayout from "./layouts/DashboardLayout";

// Lazy load pages
const Home = lazy(() => import("./pages/Home/Home"));

// Dashboard Overview
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// Analytics Pages
const AnalyticsPage = lazy(() => import("./pages/dashboard/analytics/AnalyticsPage"));
const SalesReportsPage = lazy(() => import("./pages/dashboard/analytics/SalesReportsPage"));
const CustomerAnalyticsPage = lazy(() => import("./pages/dashboard/analytics/CustomerAnalyticsPage"));
const ProductPerformancePage = lazy(() => import("./pages/dashboard/analytics/ProductPerformancePage"));
const MarketingAnalyticsPage = lazy(() => import("./pages/dashboard/analytics/MarketingAnalyticsPage"));
const CustomReportsPage = lazy(() => import("./pages/dashboard/analytics/CustomReportsPage"));

// Orders Management - using existing components
const AllOrders = lazy(() => import("./pages/dashboard/page/AllOrders"));
 
const ProcessingOrdersPage = lazy(() => import("./pages/dashboard/orders/ProcessingOrdersPage"));
const CompletedOrdersPage = lazy(() => import("./pages/dashboard/orders/CompletedOrdersPage"));
const MissedOrder = lazy(() => import("./pages/dashboard/page/MissedOrder"));
const BlockedNumber = lazy(() => import("./pages/dashboard/page/BlockedNumber"));
const BlockedVerification = lazy(() => import("./pages/dashboard/page/BlockedVerification"));

// Products & Catalog - using existing components
const Products = lazy(() => import("./pages/dashboard/page/Products"));
const ProductCreate = lazy(() => import("./pages/dashboard/page/ProductCreate"));
const Categories = lazy(() => import("./pages/dashboard/page/Categories"));
const CategoryCreate = lazy(() => import("./pages/dashboard/page/CategoryCreate"));
const Reviews = lazy(() => import("./pages/dashboard/page/Reviews"));
const ProductFeed = lazy(() => import("./pages/dashboard/page/ProductFeed"));
const EasyCatalog = lazy(() => import("./pages/dashboard/page/EasyCatalog"));

// Marketing Hub - using existing components
const MarketingPage = lazy(() => import("./pages/dashboard/marketing/MarketingPage"));
const SmartCRMPage = lazy(() => import("./pages/dashboard/marketing/SmartCRMPage"));
const SitemapAgentPage = lazy(() => import("./pages/dashboard/marketing/SitemapAgentPage"));
 const SpyCompetitor = lazy(() => import("./pages/dashboard/marketing/SpyCompetitor"));
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

// Agent Store pages
const AgentStorePage = lazy(() => import("./pages/dashboard/agent-store/AgentStorePage"));
const AgentChatPage = lazy(() => import("./pages/dashboard/agent-chat/AgentChatPage"));

// Import customer related pages
const CustomersPage = lazy(() => import("./pages/dashboard/customers/CustomersPage"));
const CustomerSegmentsPage = lazy(() => import("./pages/dashboard/customers/CustomerSegmentsPage"));
const CustomerCommunicationPage = lazy(() => import("./pages/dashboard/customers/CustomerCommunicationPage"));
const LoyaltyProgramPage = lazy(() => import("./pages/dashboard/customers/LoyaltyProgramPage"));

// Support page
const SupportPage = lazy(() => import("./pages/dashboard/support/SupportPage"));

// Docs page
const DocsPage = lazy(() => import("./pages/help/docs/DocsPage"));

// Tutorials page
const TutorialsPage = lazy(() => import("./pages/help/tutorials/TutorialsPage"));

// Existing main navigation pages that might exist

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
            element: <ProcessingOrdersPage />,
          },
          {
            path: "completed",
            element: <CompletedOrdersPage />,
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
            path: "categories/new",
            element: <CategoryCreate />,
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
            element: <CustomersPage />,
          },
          {
            path: "segments",
            element: <CustomerSegmentsPage />,
          },
          {
            path: "messages",
            element: <CustomerCommunicationPage />,
          },
          {
            path: "loyalty",
            element: <LoyaltyProgramPage />,
          },
        ],
      },
      
      // Marketing Hub Routes
      {
        path: "marketing",
        children: [
          {
            index: true,
            element: <SmartCRMPage />,
          },
          {
            path: "smart-crm",
            element: <SmartCRMPage />, // Smart CRM for managing social media channels
          },
          {
            path: "sitemap-xml",
            element: <SitemapAgentPage />, // Sitemap XML generator
          },
          {
            path: "spy-competitors",
            element: <SpyCompetitor />, // Spy competitors by analyzing their links
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
            element: <AnalyticsPage />,
          },
          {
            path: "sales",
            element: <SalesReportsPage />,
          },
          {
            path: "customers",
            element: <CustomerAnalyticsPage />,
          },
          {
            path: "products",
            element: <ProductPerformancePage />,
          },
          {
            path: "marketing",
            element: <MarketingAnalyticsPage />,
          },
          {
            path: "custom",
            element: <CustomReportsPage />,
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
      
      // Agent Store Routes
      {
        path: "agent-store",
        element: <AgentStorePage />,
      },
      {
        path: "agent-chat/:agentId",
        element: <AgentChatPage />,
      },
      
      // Support Route
      
      
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
  // Help routes (outside dashboard)
  {
    path: "/help",
    children: [
      {
        path: "support",
        element: <SupportPage />,
      },
      {
        path: "docs",
        element: <DocsPage />,
      },
      {
        path: "tutorials",
        element: <TutorialsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
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
