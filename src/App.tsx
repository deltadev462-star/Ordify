import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashbord/Dashbord";
import History from "./pages/dashbord/page/History";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
