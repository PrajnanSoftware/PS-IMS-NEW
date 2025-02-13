// PS-IMS-NEW-FE/src/components/ManageStore.jsx
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const ManageStore = () => {
  // State for store info
  const [store, setStore] = useState({
    storeName: '',
    location: '',
    phone: '',
    email: '',
    operatingHours: '',
  });

  // Inventory summary: { totalItems: 0 }
  const [inventorySummary, setInventorySummary] = useState({ totalItems: 0 });

  // Inventory overview: array of items
  const [inventoryOverview, setInventoryOverview] = useState([]);

  // For searching/filtering inventory items
  const [searchTerm, setSearchTerm] = useState('');

  // For toggling edit mode
  const [editMode, setEditMode] = useState(false);

  // For loading/error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch store info + inventory data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/manage-store');
        if (!res.ok) {
          throw new Error('Failed to fetch store data');
        }
        const data = await res.json();
        // data = { store, inventorySummary, inventoryOverview }
        if (data.store) {
          setStore(data.store);
        }
        if (data.inventorySummary) {
          setInventorySummary(data.inventorySummary);
        }
        if (data.inventoryOverview) {
          setInventoryOverview(data.inventoryOverview);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handler to toggle edit mode
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Handler to cancel editing
  const handleCancelEdit = () => {
    setEditMode(false);
  };

  // Handler to update store info in local state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
  };

  // Submit updated store info
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/manage-store', {
        method: 'POST', // or PUT if you prefer
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      });
      if (!res.ok) {
        throw new Error('Failed to update store info');
      }
      const result = await res.json();
      alert(result.message || 'Store info updated');
      // Update local store state if needed
      if (result.store) {
        setStore(result.store);
      }
      setEditMode(false);
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  // Filter inventory items by search term
  const filteredInventory = inventoryOverview.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="ml-[210px] mt-20">Loading Store Info...</div>;
  }
  if (error) {
    return <div className="ml-[210px] mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen ml-[210px] xl:ml-[328px] p-4 bg-gray-50 mt-16">
      {/* Store Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">Store Information</h2>
          {!editMode && (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={handleEditClick}
            >
              Edit Store Info
            </button>
          )}
        </div>

        {editMode ? (
          // Editing form
          <form onSubmit={handleSave}>
            <div className="mb-2 flex items-center">
              <label className="w-1/4 text-gray-700">Store Name</label>
              <input
                className="w-3/4 p-2 border rounded"
                name="storeName"
                value={store.storeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2 flex items-center">
              <label className="w-1/4 text-gray-700">Location</label>
              <input
                className="w-3/4 p-2 border rounded"
                name="location"
                value={store.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2 flex items-center">
              <label className="w-1/4 text-gray-700">Phone</label>
              <input
                className="w-3/4 p-2 border rounded"
                name="phone"
                value={store.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2 flex items-center">
              <label className="w-1/4 text-gray-700">Email</label>
              <input
                className="w-3/4 p-2 border rounded"
                name="email"
                type="email"
                value={store.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2 flex items-center">
              <label className="w-1/4 text-gray-700">Operating Hours</label>
              <input
                className="w-3/4 p-2 border rounded"
                name="operatingHours"
                value={store.operatingHours}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          // Viewing mode
          <div>
            <p className="mb-1"><strong>Store Name:</strong> {store.storeName}</p>
            <p className="mb-1"><strong>Location:</strong> {store.location}</p>
            <p className="mb-1"><strong>Phone:</strong> {store.phone}</p>
            <p className="mb-1"><strong>Email:</strong> {store.email}</p>
            <p className="mb-1"><strong>Operating Hours:</strong> {store.operatingHours}</p>
          </div>
        )}
      </div>

      {/* Inventory Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Inventory Summary</h2>
        <p>Total Items: {inventorySummary.totalItems}</p>
      </div>

      {/* Inventory Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Inventory Overview</h2>
          <div className="flex items-center space-x-2">
            <div className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg flex items-center">
              <FaSearch className="mr-2" />
              <input
                className="outline-none"
                type="text"
                placeholder="Search items"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* You can add other filters here if needed */}
          </div>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-4 text-center border-b border-gray-300">Item Name</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Quantity</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Location</th>
              <th className="py-3 px-4 text-center border-b border-gray-300">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item._id}>
                <td className="py-3 px-4 text-center border-b border-gray-300">{item.name}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{item.quantity}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">Main Store</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {new Date(item.lastUpdated).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStore;
