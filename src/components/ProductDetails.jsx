import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaEdit, FaDownload } from 'react-icons/fa';

const ProductDetails = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const product = {
    name: query.get("name"),
    id: query.get("id"),
    category: query.get("category"),
    price: query.get("price"),
    quantity: query.get("quantity"),
    quality: query.get("quality"),
    unit: query.get("unit"),
    expiry: query.get("expiry"),
    threshold: query.get("threshold"),
  };

  return (
    <div className="flex flex-col h-screen ml-[250px] xl:ml-[320px] p-6 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow m-4 mt-20"> {/* Removed extra card */}
     
        {/* Product Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg">
                <FaEdit className="mr-2" /> Edit
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg">
                <FaDownload className="mr-2" /> Download
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Primary Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Product ID</p>
                    <p className="font-bold w-2/3">{product.id}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Category</p>
                    <p className="font-bold w-2/3">{product.category}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Price</p>
                    <p className="font-bold w-2/3">₹{product.price}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Quantity</p>
                    <p className="font-bold w-2/3">{product.quantity} {product.unit}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Quality</p>
                    <p className="font-bold w-2/3">{product.quality}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Expiry Date</p>
                    <p className="font-bold w-2/3">{product.expiry}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Threshold Value</p>
                    <p className="font-bold w-2/3">{product.threshold}</p>
                  </div>
                </div>
              </div>

              {/* Supplier Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Supplier Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Supplier Name:</p>
                    <p className="font-bold w-2/3">Ronald Martin</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Contact Number:</p>
                    <p className="font-bold w-2/3">98789 86757</p>
                  </div>
                </div>
              </div>

              {/* Stock Locations */}
              <div>
                <h3 className="text-lg font-bold mb-2">Stock Locations</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">Store Name</th>
                      <th className="p-2">Stock in Hand</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2">Sulur Branch</td>
                      <td className="p-2">15</td>
                    </tr>
                    <tr>
                      <td className="p-2">Singanallur Branch</td>
                      <td className="p-2">30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Image and Stock Info */}
            <div className="col-span-1">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img alt="Product Packaging" className="border-dashed border-2 border-gray-300 p-4" height="150" src="https://5.imimg.com/data5/SELLER/Default/2023/12/368418927/SY/LT/VJ/24513724/product-packaging-box-500x500.jpg" width="150" />
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-500">Opening Stock</p>
                    <p className="font-bold">40</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-500">Available Stock</p>
                    <p className="font-bold">15</p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-500">Sold Quantity</p>
                    <p className="font-bold">25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
