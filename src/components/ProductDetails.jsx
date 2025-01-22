// src/components/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaDownload } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams(); // product ID from the URL :id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/inventory/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="ml-[210px] mt-8">Loading product details...</p>;
  if (error) return <p className="ml-[210px] mt-8 text-red-500">{error}</p>;
  if (!product) return <p className="ml-[210px] mt-8">Product not found.</p>;

  // Now "product" is the single item from your DB
  // e.g. { _id, name, productId, category, buyingPrice, quantity, supplier, productImgUrl, ... }

  return (
    <div className="flex flex-col h-screen ml-[210px] xl:ml-[328px] p-1 bg-gray-50">
      <div className="bg-white p-3 rounded-lg shadow-lg mt-[5rem]">
        {/* Header */}
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

        <div className="grid grid-cols-3 gap-2">
          {/* Primary Details */}
          <div className="col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Primary Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600 w-1/3">Product ID</p>
                  <p className="pl-2 font-bold w-2/3">{product.productId}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 w-1/3">Category</p>
                  <p className="pl-2 font-bold w-2/3">{product.category}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 w-1/3">Buying Price</p>
                  <p className="pl-2 font-bold w-2/3">₹{product.buyingPrice}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 w-1/3">Quantity</p>
                  <p className="pl-2 font-bold w-2/3">{product.quantity} {product.unit}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 w-1/3">Expiry Date</p>
                  <p className="pl-2 font-bold w-2/3">
                    {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 w-1/3">Threshold Value</p>
                  <p className="pl-2 font-bold w-2/3">{product.thresholdValue}</p>
                </div>
              </div>
            </div>

            {/* Supplier Details (if you have a supplier doc) */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2">Supplier Details</h3>
              {product.supplier ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Supplier ID:</p>
                    <p className="font-bold w-2/3">{product.supplier._id}</p>
                  </div>
                  {/* If your supplier doc has name, email, etc. */}
                  <div className="flex justify-between">
                    <p className="text-gray-600 w-1/3">Supplier Name:</p>
                    <p className="font-bold w-2/3">{product.supplier.supplierName}</p>
                  </div>
                  {/* etc. */}
                </div>
              ) : (
                <p>No Supplier Assigned.</p>
              )}
            </div>

            {/* You can display store-based or location-based stock info here if you want */}
          </div>

          {/* Product Image */}
          <div className="col-span-1 w-44 ml-auto">
            <div className="bg-gray-100 p-3 rounded-lg">
              <img
                alt="Product Packaging"
                className="border-dashed border-2 border-gray-300 p-4"
                height="150"
                src={product.productImgUrl || 'https://via.placeholder.com/150?text=No+Image'}
                width="150"
              />
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Opening Stock</p>
                  <p className="font-bold">40</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Available Stock</p>
                  <p className="font-bold">{product.quantity}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p className="text-gray-500">Sold Quantity</p>
                  <p className="font-bold">25</p>
                </div>
              </div>
            </div>
          </div>
        </div> {/* end grid */}
      </div>
    </div>
  );
};

export default ProductDetails;
