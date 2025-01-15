import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import GetStarted from './pages/GetStartedPage';
import Register from './pages/Register';
import Login from './pages/Login';
import CustomerForm from './components/CustomerForm';
import MainLayout from './layouts/MainLayout';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './components/NotFoundPage';
import ReportsPage from './pages/ReportsPage';
import DashBoard from './components/DashBoard';
import InventoryDashboard from './components/InventoryDashboard';
import ProductDetails from './components/ProductDetails';
import Suppliers from './components/Suppliers'; // Import Suppliers component


const App = () => {
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const fetchCustomers = async () => {
    // Your fetch logic here
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: "/orders", element: <OrdersPage /> },
        { path: "/reports", element: <ReportsPage /> },
        { path: "/get-started", element: <GetStarted /> },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/customers", element: <CustomerForm fetchCustomers={fetchCustomers} /> },
        { path: "/inventory-dashboard", element: <InventoryDashboard /> }, // Inventory dashboard route
        { path: "/product-details", element: <ProductDetails /> }, // Product details route
        { path: "/suppliers", element: <Suppliers /> }, // Suppliers page route
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
