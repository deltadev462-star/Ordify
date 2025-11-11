import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Dashboard from "./pages/dashbord/Dashbord";
import History from "./pages/dashbord/page/History";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/history" element={<History />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
