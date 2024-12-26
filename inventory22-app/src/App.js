import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryDashboard from './components/InventoryDashboard';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InventoryDashboard />} />
        <Route path="/product-details" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;