import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import Settings from "./pages/dashboard/page/Settings";
import MarketingServices from "./pages/dashboard/page/MarketingServices";
import ServiceGallery from "./pages/dashboard/page/ServiceGallery";
import Shater from "./pages/dashboard/page/Shater";
 
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Products = lazy(() => import("./pages/dashboard/page/Products"));
const History = lazy(() => import("./pages/dashboard/page/History"));
const Home = lazy(() => import("./pages/Home/Home"));
const Order = lazy(() => import("./pages/dashboard/page/Order"));
const MissedOrder = lazy(() => import("./pages/dashboard/page/MissedOrder"));
const BlockedNumber = lazy(() => import("./pages/dashboard/page/BlockedNumber"));
const BlockedVerification = lazy(
  () => import("./pages/dashboard/page/BlockedVerification")
);
const Categories = lazy(() => import("./pages/dashboard/page/Categories"));
const Reviews = lazy(() => import("./pages/dashboard/page/Reviews"));
const ProductFeed = lazy(() => import("./pages/dashboard/page/ProductFeed"));
const EasyCatalog = lazy(() => import("./pages/dashboard/page/EasyCatalog"));
const Funnels = lazy(() => import("./pages/dashboard/page/Funnels"));
 const Applications = lazy(() => import("./pages/dashboard/page/Applications"));
const AffiliateMarketing = lazy(() => import("./pages/dashboard/page/AffiliateMarketing"));
const Transactions = lazy(() => import("./pages/dashboard/page/Transactions"));
const Wallet = lazy(() => import("./pages/dashboard/page/Wallet"));
const Template = lazy(() => import("./pages/dashboard/page/Template"));
const EditTheme = lazy(() => import("./pages/dashboard/page/EditTheme"));


 

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/order" element={<Order />} />
      <Route path="/dashboard/missed-order" element={<MissedOrder />} />
      <Route path="/dashboard/blocked-number" element={<BlockedNumber />} />
      <Route
        path="/dashboard/blocked-otp-numbers"
        element={<BlockedVerification />}
      />
      <Route path="/dashboard/product" element={<Products />} />
      <Route path="/dashboard/categories" element={<Categories />} />
      <Route path="/dashboard/reviews" element={<Reviews />} />
      <Route path="/dashboard/product-feed" element={<ProductFeed />} />
      <Route path="/dashboard/easy-catalog" element={<EasyCatalog />} />
      <Route path="/dashboard/funnels" element={<Funnels />} />
      <Route path="/dashboard/applications" element={<Applications />} />
      <Route
        path="/dashboard/affiliate-marketing"
        element={<AffiliateMarketing />}
      />
      <Route path="/dashboard/wallet" element={<Wallet />} />
      <Route path="/dashboard/transactions" element={<Transactions />} />
      <Route path="/dashboard/template" element={<Template />} />

      <Route path="/dashboard/shater" element={<Shater />} />
      <Route path="/dashboard/service-gallery" element={<ServiceGallery />} />
      <Route path="/dashboard/marketing-services" element={<MarketingServices />} />
      <Route path="/dashboard/settings" element={<Settings />} />

      <Route path="/dashboard/template/:id" element={<EditTheme />} />

      <Route path="/dashboard/history" element={<History />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
