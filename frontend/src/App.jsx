import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import AppLayout from "./components/AppLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SuppliersPage from "./pages/SuppliersPage.jsx";
import ShipmentsPage from "./pages/ShipmentsPage.jsx";
import DeliveriesPage from "./pages/DeliveriesPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
        <Route index element={<SuppliersPage />} />
        <Route path="shipments" element={<ShipmentsPage />} />
        <Route path="deliveries" element={<DeliveriesPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
