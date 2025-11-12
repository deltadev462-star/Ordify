import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  lazy } from "react";

const Dashboard = lazy(() => import("./pages/dashbord/Dashbord"));
const History = lazy(() => import("./pages/dashbord/page/History"));
const Home = lazy(() => import("./pages/Home/Home"));
const Order = lazy(() => import("./pages/dashbord/page/Order"));
const MissedOrder = lazy(() => import("./pages/dashbord/page/MissedOrder"));
const BlockedNumber = lazy(() => import("./pages/dashbord/page/BlockedNumber"));
const BlockedVerification = lazy(() => import("./pages/dashbord/page/BlockedVerification"));

function App() {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/order" element={<Order />} />
          <Route path="/dashboard/missed-order" element={<MissedOrder />} />
          <Route path="/dashboard/blocked-number" element={<BlockedNumber />} />
          <Route path="/dashboard/blocked-otp-numbers" element={<BlockedVerification />} />
          <Route path="/dashboard/history" element={<History />} />
        </Routes>
      </Router>
    // </Suspense>
  );
}

export default App;
