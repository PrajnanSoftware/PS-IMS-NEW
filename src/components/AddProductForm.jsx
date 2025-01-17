import React, { useState } from 'react';

const AddProductForm = ({ onSubmit, onDiscard }) => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [category, setCategory] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quality, setQuality] = useState('');
  const [unit, setUnit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [thresholdValue, setThresholdValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newProduct = {
      productName,
      productId,
      category,
      buyingPrice: parseFloat(buyingPrice),
      quantity: parseInt(quantity),
      quality,
      unit,
      expiryDate,
      thresholdValue: parseInt(thresholdValue),
    };
    onSubmit(newProduct); // Call the parent handler with the new product
    resetForm();
  };

  const resetForm = () => {
    setProductName('');
    setProductId('');
    setCategory('');
    setBuyingPrice('');
    setQuantity('');
    setQuality('');
    setUnit('');
    setExpiryDate('');
    setThresholdValue('');
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-xl w-1/2 max-w-lg">
        <h2 className="text-lg font-bold mb-4">New Product</h2>
        <div className="flex items-center mb-4">
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-gray-400">Drag image here</span>
          </div>
          <div className="ml-4 text-blue-500">
            <a href="#">Browse image</a>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Product Name</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Product ID</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Category</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Buying Price</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={buyingPrice}
              onChange={(e) => setBuyingPrice(e.target.value)}
              placeholder="Enter buying price"
              type="number"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Quantity</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter product quantity"
              type="number"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Quality</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              placeholder="Enter product quality"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Unit</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Enter product unit"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Expiry Date</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              type="date"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Threshold Value</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={thresholdValue}
              onChange={(e) => setThresholdValue(e.target.value)}
              placeholder="Enter threshold value"
              type="number"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm"
              type="button"
              onClick={() => {
                resetForm(); // Clear the form fields
                if (onDiscard) onDiscard(); // Call onDiscard if provided
              }}
            >
              Discard
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
