import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { lazy   } from "react";

const Dashboard = lazy(() => import("./pages/dashbord/Dashbord"));
const Products = lazy(() => import("./pages/dashbord/page/Products"));
const History = lazy(() => import("./pages/dashbord/page/History"));
const Home = lazy(() => import("./pages/Home/Home"));
const Order = lazy(() => import("./pages/dashbord/page/Order"));
const MissedOrder = lazy(() => import("./pages/dashbord/page/MissedOrder"));
const BlockedNumber = lazy(() => import("./pages/dashbord/page/BlockedNumber"));
const BlockedVerification = lazy(
  () => import("./pages/dashbord/page/BlockedVerification")
);
const Categories = lazy(() => import("./pages/dashbord/page/Categories"));
const Reviews = lazy(() => import("./pages/dashbord/page/Reviews"));
const ProductFeed = lazy(() => import("./pages/dashbord/page/ProductFeed"));
const EasyCatalog = lazy(() => import("./pages/dashbord/page/EasyCatalog"));
const Funnels = lazy(() => import("./pages/dashbord/page/Funnels"));

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
