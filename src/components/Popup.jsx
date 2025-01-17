import React from 'react';

const Popup = ({ isVisible, onClose, onSubmit, newProduct, handleInputChange }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h3 className="text-lg font-bold mb-4">New Order</h3>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Product Name:</label>
                        <input
                            type="text"
                            name="productName"
                            value={newProduct.productName}
                            onChange={handleInputChange}
                            placeholder="Enter product name"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Product ID:</label>
                        <input
                            type="text"
                            name="productId"
                            value={newProduct.productId}
                            onChange={handleInputChange}
                            placeholder="Enter product ID"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Category:</label>
                        <select
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        >
                            <option value="">Select product category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Order Value:</label>
                        <input
                            type="number"
                            name="orderValue"
                            value={newProduct.orderValue}
                            onChange={handleInputChange}
                            placeholder="Enter order value"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={newProduct.quantity}
                            onChange={handleInputChange}
                            placeholder="Enter product quantity"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Unit:</label>
                        <input
                            type="text"
                            name="unit"
                            value={newProduct.unit}
                            onChange={handleInputChange}
                            placeholder="Enter product unit"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Buying Price:</label>
                        <input
                            type="number"
                            name="buyingPrice"
                            value={newProduct.buyingPrice}
                            onChange={handleInputChange}
                            placeholder="Enter buying price"
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Date of Delivery:</label>
                        <input
                            type="date"
                            name="deliveryDate"
                            value={newProduct.deliveryDate}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="notifyOnDelivery"
                                checked={newProduct.notifyOnDelivery}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Notify on the date of delivery
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-3xl mr-2"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-3xl"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Popup;