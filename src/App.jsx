import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AdminSidebar from "./Components/SideBar";
import CrackersPage from "./Pages/Crackers/Crackers";
import OrdersPage from "./Pages/Orders";
import ReportPage from "./Pages/Report";
import AddCracker from "./Pages/Crackers/addCrackers";
import UpdateCracker from "./Pages/Crackers/updateCracker";
import AdminLogin from "./Pages/AdminLogin";

function AppContent() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/"; // Hide sidebar on login page

  return (
    <div className="flex">
      {!hideSidebar && <AdminSidebar />}
      <div className={`flex-1 ${!hideSidebar ? "pl-[260px]" : ""}`}>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin/crackers" element={<CrackersPage />} />
          <Route path="/add-cracker" element={<AddCracker />} />
          <Route path="/update-cracker/:id" element={<UpdateCracker />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/report" element={<ReportPage />} />
        </Routes>
      </div>
    </div>
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
