import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import SortPopup from './SortPopup';

const InventoryDashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [categories, setCategories] = useState(new Set());
  const [showForm, setShowForm] = useState(false);

  const [isSortVisible, setIsSortVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('ascending');
  const [sortField, setSortField] = useState('buyingPrice');

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/inventory');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      updateInventoryStats(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const updateInventoryStats = (data) => {
    setTotalProducts(data.length);
    const revenue = data.reduce(
      (acc, p) => acc + p.quantity * p.buyingPrice,
      0
    );
    setTotalRevenue(revenue);
    setLowStockCount(data.filter(p => p.quantity > 0 && p.quantity <= p.thresholdValue).length);
    setCategories(new Set(data.map(p => p.category)));
  };

  // **NEW**: addProduct function that calls POST /api/inventory
  const addProduct = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/api/inventory', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const newProduct = await response.json();
      // Update local state
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      // Update stats
      updateInventoryStats(updatedProducts);
      // Close form
      setShowForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Sorting function
  const handleSort = (order) => {
    setSortOrder(order);
    setIsSortVisible(false);
  };

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a[sortField] - b[sortField];
    } else {
      return b[sortField] - a[sortField];
    }
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (quantity, thresholdValue) => {
    if (quantity === 0) return 'text-red-600';
    if (quantity <= thresholdValue) return 'text-yellow-400';
    return 'text-blue-500';
  };

  const getStockStatus = (quantity, thresholdValue) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= thresholdValue) return 'Low Stock';
    return 'In Stock';
  };

  // Download Inventory CSV
  const downloadCSV = (data) => {
    if (data.length === 0) {
      alert("No data available for download.");
      return;
    }
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    for (const row of data) {
      const values = headers.map(header => JSON.stringify(row[header] || ''));
      csvRows.push(values.join(','));
    }
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'inventory.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/inventory');
      if (!response.ok) {
        throw new Error("Failed to fetch inventory data");
      }
      const data = await response.json();
      downloadCSV(data);
    } catch (error) {
      console.error("Error downloading inventory data:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen ml-[210px] xl:ml-[328px] p-1 bg-gray-50">
      {/* Overall Inventory Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-20">
        <h2 className="text-xl font-semibold mb-4">Overall Inventory</h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-blue-600">Categories</p>
            <p className="text-xl font-medium">{categories.size}</p>
          </div>
          <div className="text-center">
            <p className="text-orange-500">Total Products</p>
            <p className="text-xl font-medium">{totalProducts}</p>
          </div>
          <div className="text-center">
            <p className="text-green-500">Total Revenue</p>
            <p className="text-xl font-medium">₹{totalRevenue.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-red-500">Low Stocks</p>
            <p className="text-xl font-medium">{lowStockCount}</p>
          </div>
        </div>
      </div>

      {/* Products Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-3 overflow-x-scroll">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="flex space-x-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowForm(true)}
            >
              Add Product
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              onClick={() => setIsSortVisible(true)}
            >
              Filters
            </button>
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
              onClick={handleDownload}
            >
              Download All
            </button>
          </div>
        </div>

        {/* Sort Popup */}
        <SortPopup
          isVisible={isSortVisible}
          onClose={() => setIsSortVisible(false)}
          onSort={handleSort}
        />

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-center border-b border-gray-300">Product Name</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Product ID</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Buying Price</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Quantity</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Expiry Date</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  <Link to={`/app/product-details/${product._id}`} className="text-blue-600 underline">
                    {product.name}
                  </Link>
                </td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{product.productId}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">₹{product.buyingPrice}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{product.quantity}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {product.expiryDate
                    ? new Date(product.expiryDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td
                  className={`py-3 px-4 text-center border-b border-gray-300 ${getStatusColor(
                    product.quantity,
                    product.thresholdValue
                  )}`}
                >
                  {getStockStatus(product.quantity, product.thresholdValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showForm && (
        <AddProductForm
          onSubmit={addProduct}    // Pass our real addProduct function
          onDiscard={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default InventoryDashboard;
