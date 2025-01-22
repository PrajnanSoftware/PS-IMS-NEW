import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AddProductForm from './AddProductForm';
import { FaSearch } from 'react-icons/fa';

const InventoryDashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [categories, setCategories] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [noStockCount, setNOStockCount] = useState(0);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/inventory');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/inventory/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setTotalProducts(data.totalProducts);
        setTotalRevenue(data.totalRevenue);
        setLowStockCount(data.lowStockCount);
        setNOStockCount(data.noStockCount);
        setCategories(new Set(data.categories));
      } catch (error) {
        console.error('Error fetching inventory stats:', error);
      }
    };
    fetchStats();
  }, []);

  // Add product (using FormData)
  const addProduct = async (formData) => {
    try {
      const response = await fetch('http://localhost:8080/api/inventory', {
        method: 'POST',
        body: formData, // Do not JSON.stringify
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }
      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
    } catch (error) {
      alert(error.message); // <-- Alert the user
      console.error('Error adding product:', error);
    }
    setShowForm(false);
  };

  // Pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col h-screen ml-[210px] xl:ml-[328px] p-1 bg-gray-50">
      {/* Overall Inventory Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-20">
        <h2 className="text-xl font-semibold mb-4">Overall Inventory</h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Categories */}
          <div className="text-center">
            <p className="text-blue-600">Categories</p>
            <p className="text-xl font-medium">{categories.size}</p>
          </div>
          {/* Total Products */}
          <div className="text-center">
            <p className="text-orange-500">Total Products</p>
            <p className="text-xl font-medium">{totalProducts}</p>
          </div>
          {/* Total Revenue */}
          <div className="text-center">
            <p className="text-green-500">Total Revenue</p>
            <p className="text-xl font-medium">₹{totalRevenue}</p>
          </div>
          {/* Low Stocks */}
          <div className="text-center">
            <p className="text-red-500">Low Stocks</p>
            <p className="text-xl font-medium">{lowStockCount}</p>
          </div>
        </div>
      </div>

      {/* Products Table */}
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
            <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg flex items-center">
              <FaSearch className="mr-2" /> Filters
            </button>
            <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg">
              Download All
            </button>
          </div>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-center border-b border-gray-300">Product Name</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Buying Price</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Quantity</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Unit</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Expiry Date</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {/* LINK to product details page with the product _id */}
                  <Link
                    to={`/app/product-details/${product._id}`}
                    className="text-blue-600 underline"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {product.buyingPrice}
                </td>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {product.quantity}
                </td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{product.unit}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {product.expiryDate
                    ? new Date(product.expiryDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {product.quantity === 0 ? (
                    <span className="text-red-600">Out of Stock</span>
                  ) : product.quantity <= product.thresholdValue ? (
                    <span className="text-yellow-400">Low Stock</span>
                  ) : (
                    <span className="text-green-500">In Stock</span>
                  )}
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
            Page {currentPage} of {pageNumbers.length}
          </p>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Product Form Modal */}
      {showForm && <AddProductForm onSubmit={addProduct} onDiscard={() => setShowForm(false)} />}
    </div>
  );
};

export default InventoryDashboard;
