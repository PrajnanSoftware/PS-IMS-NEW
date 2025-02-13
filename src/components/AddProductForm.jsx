import React, { useState } from 'react';

const AddProductForm = ({ onSubmit, onDiscard }) => {
  const [name, setName] = useState('');
  const [productId, setProductId] = useState('');
  const [category, setCategory] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [thresholdValue, setThresholdValue] = useState('');
  const [productImg, setProductImg] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 250 * 1024) {
      alert('File size exceeds 250KB');
      setProductImg(null);
    } else {
      setProductImg(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('productId', productId);
    formData.append('category', category);
    formData.append('buyingPrice', parseFloat(buyingPrice));
    formData.append('quantity', parseInt(quantity));
    formData.append('unit', unit);
    formData.append('expiryDate', expiryDate);
    formData.append('thresholdValue', parseInt(thresholdValue));
    formData.append('productImg', productImg);

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-lg font-bold mb-4">Add Product</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Product Image</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              type="file"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Product Name</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              placeholder="Enter category"
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
              placeholder="Enter quantity"
              type="number"
              required
            />
          </div>
          <div className="mb-2 flex items-center">
            <label className="block text-gray-700 text-sm w-1/3">Unit</label>
            <input
              className="w-2/3 p-2 border border-gray-300 rounded text-sm"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Enter unit"
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
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 text-sm"
              type="button"
              onClick={onDiscard}
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