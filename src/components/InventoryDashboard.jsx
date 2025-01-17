import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    calculateStats(storedProducts);
  }, []);

  const calculateStats = (products) => {
    let total = 0;
    let revenue = 0;
    let lowStock = 0;
    const categorySet = new Set();

    products.forEach(product => {
      total += product.quantity;
      revenue += product.buyingPrice * product.quantity;
      categorySet.add(product.category);
      if (product.quantity <= product.thresholdValue) lowStock++;
    });

    setTotalProducts(total);
    setTotalRevenue(revenue);
    setLowStockCount(lowStock);
    setCategories(categorySet);
  };

  const addProduct = (product) => {
    if (product) {
      const updatedProducts = [...products, product];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      calculateStats(updatedProducts);
    }
    setShowForm(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic to get the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination logic
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col h-screen ml-[210px] xl:ml-[328px] p-1 bg-gray-50">
      {/* Overall Inventory Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-20"> {/* Added `mt-20` to move it lower */}
        <h2 className="text-xl font-semibold mb-4">Overall Inventory</h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Categories Section */}
          <div className="text-center">
            <p className="text-blue-600">Categories</p>
            <p className="text-xl font-medium">{categories.size}</p>
            <p className="text-gray-400">Last 7 days</p>
          </div>
          {/* Total Products Section */}
          <div className="text-center">
            <p className="text-orange-500">Total Products</p>
            <div className="flex justify-center items-center">
              <p className="text-xl font-medium mr-8">{totalProducts}</p>
              <p className="text-black text-xl font-medium">₹{totalRevenue}</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-gray-400 mr-8">Last 7 days</p>
              <p className="text-gray-400">Revenue</p>
            </div>
          </div>
          {/* Top Selling Section */}
          <div className="text-center">
            <p className="text-purple-500">Top Selling</p>
            <div className="flex justify-center items-center">
              <p className="text-xl font-medium mr-8">{/* Replace with top-selling count logic */}0</p>
              <p className="text-black text-xl font-medium">₹{/* Replace with top-selling revenue logic */}0</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-gray-400 mr-8">Last 7 days</p>
              <p className="text-gray-400">Cost</p>
            </div>
          </div>
          {/* Low Stocks Section */}
          <div className="text-center">
            <p className="text-red-500">Low Stocks</p>
            <div className="flex justify-center items-center">
              <p className="text-xl font-medium mr-12">{lowStockCount}</p>
              <p className="text-black text-xl font-medium">0</p>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-gray-400 mr-12">Ordered</p>
              <p className="text-gray-400">Not in stock</p>
            </div>
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
            <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg flex items-center">
              <FaSearch className="mr-2" /> Filters
            </button>
            <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg">
              Download All
            </button>
          </div>
        </div>
        <table className="w-full table-auto border-collapse ">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left border-b border-gray-300">Product Name</th>
              <th className="py-3 px-4 text-left border-b border-gray-300">Buying Price</th>
              <th className="py-3 px-4 text-left border-b border-gray-300">Quantity</th>
              <th className="py-3 px-4 text-left border-b border-gray-300">Quality</th>
              <th className="py-3 px-4 text-left border-b border-gray-300">Threshold Value</th>
              <th className="py-3 px-4 text-left border-b border-gray-300">Expiry Date</th>
              <th className="py-3 px-4 text-left border-b border-gray-300">Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  <a
                    href={`/product-details?name=${encodeURIComponent(product.productName)}&id=${encodeURIComponent(product.productId)}&category=${encodeURIComponent(product.category)}&price=${encodeURIComponent(product.buyingPrice)}&quantity=${encodeURIComponent(product.quantity)}&quality=${encodeURIComponent(product.quality)}&unit=${encodeURIComponent(product.unit)}&expiry=${encodeURIComponent(product.expiryDate)}&threshold=${encodeURIComponent(product.thresholdValue)}`}
                    className="text-blue-500 hover:underline"
                  >
                    {product.productName}
                  </a>
                </td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{product.buyingPrice}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{product.quantity}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{product.quality}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{product.thresholdValue}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{product.expiryDate}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {product.quantity <= product.thresholdValue ? (
                    <span className="text-red-500">Low Stock</span>
                  ) : (
                    <span className="text-green-500">In Stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>Page {currentPage} of {pageNumbers.length}</p>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Product Form */}
      {showForm && <AddProductForm onSubmit={addProduct} onDiscard={() => setShowForm(false)} />}
    </div>
  );
};

export default InventoryDashboard;
