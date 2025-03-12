import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

// Auth pages
import GetStarted from "./pages/GetStartedPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected area pages
import DashBoard from "./components/DashBoard";
import OrdersPage from "./pages/OrdersPage";
import ReportsPage from "./pages/ReportsPage";
import ManageStore from "./components/ManageStore";
import InventoryDashboard from "./components/InventoryDashboard";
import ProductDetails from "./components/ProductDetails";
import Suppliers from "./components/Suppliers";
import NotFoundPage from "./components/NotFoundPage";
import Billing from "./components/Billing";
import StoresList from "./components/StoresList";
import ManageStock from "./components/ManageStock";
import SalesTable from "./components/Sales";

const router = createBrowserRouter([
  // If someone goes to "/", redirect to "/get-started"
  {
    path: "/",
    element: <Navigate to="/get-started" replace />,
  },

  // Auth routes
  { path: "/get-started", element: <GetStarted /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  // Main Layout under /app
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashBoard /> },
      { path: "inventory-dashboard", element: <InventoryDashboard /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "suppliers", element: <Suppliers /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "stores", element: <StoresList /> },
      { path: "manage-store/:id", element: <ManageStore /> },
      { path: "product-details/:id", element: <ProductDetails /> },
      { path: "billing", element: <Billing /> },
      { path: "sales", element: <SalesTable /> },

      {
        path: "/app/manage-stock",
        element: <ManageStock />
      }
      // add additional child routes here
    ],
  },

  // 404
  { path: "*", element: <NotFoundPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
