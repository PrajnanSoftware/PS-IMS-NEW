import React, { useEffect, useState } from 'react';
import AddProductForm from './AddProductForm';
import { FaBox, FaHome, FaBoxes, FaCog, FaSignOutAlt, FaBell, FaUserCircle, FaEdit, FaDownload, FaSearch, FaChartLine, FaTruck, FaShoppingCart, FaStore } from 'react-icons/fa';

const InventoryDashboard = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [categories, setCategories] = useState(new Set());
  const [showForm, setShowForm] = useState(false);

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

  return (
    <div className="flex">
      <div className="w-1/5 bg-blue-900 text-white min-h-screen flex flex-col justify-between">
        {/* Sidebar */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaBox className="text-2xl" />
            <span className="ml-3 text-xl font-semibold">Inventory</span>
          </div>
          <nav>
            <ul>
              <li className="mb-4">
                <a className="flex items-center text-blue-300" href="#">
                  <FaHome className="mr-3" /> Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-white" href="#">
                  <FaBoxes className="mr-3" /> Inventory
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-blue-300" href="#">
                  <FaChartLine className="mr-3" /> Reports
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-blue-300" href="#">
                  <FaTruck className="mr-3" /> Suppliers
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-blue-300" href="#">
                  <FaShoppingCart className="mr-3" /> Orders
                </a>
              </li>
              <li className="mb-4">
                <a className="flex items-center text-blue-300" href="#">
                  <FaStore className="mr-3" /> Manage Store
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="p-6 mt-auto">
          <ul>
            <li className="mb-4">
              <a className="flex items-center text-blue-300" href="#">
                <FaCog className="mr-3" /> Settings
              </a>
            </li>
            <li className="mb-4">
              <a className="flex items-center text-blue-300" href="#">
                <FaSignOutAlt className="mr-3" /> Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-4/5 p-6">
        
      
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/2">
            <input className="w-full p-2 pl-10 border rounded-lg" placeholder="Search product, supplier, order" type="text" />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <div className="flex items-center">
            <button className="mr-6"><FaBell className="text-gray-400" /></button>
            <button><FaUserCircle className="text-gray-600" /></button>
          </div>
        </div>
        {/* Table Header Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
  <h2 className="text-xl font-semibold mb-4">Overall Inventory</h2>
  <div className="flex justify-between items-center">
    {/* Categories Section */}
    <div className="text-center flex-1">
      <p className="text-blue-600">Categories</p>
      <p className="text-xl font-medium">{categories.size}</p>
      <p className="text-gray-400">Last 7 days</p>
    </div>
    {/* Divider */}
    <div className="h-12 border-l border-gray-300"></div>
    {/* Total Products Section */}
    <div className="text-center flex-1">
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
    {/* Divider */}
    <div className="h-12 border-l border-gray-300"></div>
    {/* Top Selling Section */}
    <div className="text-center flex-1">
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
    {/* Divider */}
    <div className="h-12 border-l border-gray-300"></div>
    {/* Low Stocks Section */}
    <div className="text-center flex-1">
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
            {products.map((product, index) => (
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
        
        {showForm && <AddProductForm onSubmit={addProduct} onDiscard={() => setShowForm(false)} />}

      </div>
    </div>
  );
};

export default InventoryDashboard;
