import React, { useEffect, useState } from 'react';

export default function ManageStock() {
  const [users, setUsers] = useState([]);
  const [stocks, setStocks] = useState([]);

  // To track which user is currently selected
  const [selectedUser, setSelectedUser] = useState(null);

  // For editing a particular stock entry
  const [editingStockId, setEditingStockId] = useState(null);
  const [editingQty, setEditingQty] = useState('');

  // 1) Fetch all users on mount
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/users/getAlluser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchAllUsers();
  }, []);

  // 2) Fetch all stocks on mount
  useEffect(() => {
    const fetchAllStock = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/stock', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch stock');
        const data = await res.json();
        setStocks(data);
      } catch (err) {
        console.error('Error fetching stock:', err);
      }
    };
    fetchAllStock();
  }, []);

  // Filter user’s stock if a user is selected
  const filteredStock = selectedUser
    ? stocks.filter((s) => {
      // Depending on how your backend sends `s.user`, it might be just an ID string or an object
      if (typeof s.user === 'string') {
        return s.user === selectedUser._id;
      }
      return s.user?._id === selectedUser._id;
    })
    : [];

  // Handlers
  const handleUserClick = (user) => {
    // Select a user and reset any editing
    setSelectedUser(user);
    setEditingStockId(null);
    setEditingQty('');
  };

  const handleDeselectUser = () => {
    // Deselect user (show all stocks) and reset editing
    setSelectedUser(null);
    setEditingStockId(null);
    setEditingQty('');
  };

  const handleEditClick = (stockItem) => {
    // Begin editing a specific stock entry
    setEditingStockId(stockItem._id);
    setEditingQty(stockItem.qty);
  };

  const handleQtyChange = (e) => {
    setEditingQty(e.target.value);
  };

  const handleSaveClick = async (stockItem) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/stock/${stockItem._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // The backend may need product/store/user IDs to update references
          product: stockItem.product?._id || stockItem.product,
          store: stockItem.store?._id || stockItem.store,
          user:
            typeof stockItem.user === 'string'
              ? stockItem.user
              : stockItem.user?._id,
          qty: editingQty,
        }),
      });

      if (!res.ok) throw new Error('Failed to update stock');

      // The response should be the updated stock item
      const updated = await res.json();

      // Update our local `stocks` array: replace the old version with the updated one
      setStocks((prev) =>
        prev.map((s) => (s._id === updated._id ? updated : s))
      );

      // Reset editing state
      setEditingStockId(null);
      setEditingQty('');
    } catch (err) {
      console.error('Error updating stock:', err);
      alert('Failed to update stock');
    }
  };

  const handleCancelClick = () => {
    // Cancel editing mode
    setEditingStockId(null);
    setEditingQty('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Stock</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Users */}
        <div className="border border-gray-300 rounded p-4 space-y-4 h-[70vh] overflow-auto">
          <h2 className="text-lg font-semibold">Users</h2>
          {users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                className={`p-3 rounded-md border hover:shadow-sm cursor-pointer transition
                  ${selectedUser && selectedUser._id === user._id
                    ? 'bg-blue-50'
                    : 'bg-white'
                  }`}
                onClick={() => handleUserClick(user)}
              >
                <p className="font-semibold">{user.name || 'No Name'}</p>
                <p className="text-sm text-gray-600">Email: {user.email}</p>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Stock */}
        <div className="border border-gray-300 rounded p-4">
          {selectedUser ? (
            <>
              {/* If user selected, show only that user’s stock + a button to show all */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  Stock for {selectedUser.name || selectedUser.email}
                </h2>
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
                  onClick={handleDeselectUser}
                >
                  Show All Stock
                </button>
              </div>
              {filteredStock.length === 0 ? (
                <p className="text-gray-500">No stock entries for this user.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredStock.map((stockItem) => (
                    <div
                      key={stockItem._id}
                      className="border p-3 rounded-md bg-white"
                    >
                      <p className="text-xs text-gray-400">
                        Stock ID: {stockItem._id}
                      </p>
                      <p className="font-medium mt-1">
                        Product: {stockItem.product?.name || 'No product'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Store: {stockItem.store?.storeName || 'No store'}
                      </p>
                      <p className="text-sm text-gray-600">
                        User:{' '}
                        {typeof stockItem.user === 'object'
                          ? stockItem.user.name ||
                          stockItem.user.email ||
                          stockItem.user._id
                          : stockItem.user}
                      </p>

                      {/* If this stock item is in editing mode... */}
                      {editingStockId === stockItem._id ? (
                        <>
                          <div className="flex items-center space-x-2 mt-2">
                            <label>Qty:</label>
                            <input
                              type="number"
                              className="border p-1 rounded w-20"
                              value={editingQty}
                              onChange={handleQtyChange}
                              min="0"
                            />
                          </div>
                          <div className="mt-2 space-x-2">
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded-md"
                              onClick={() => handleSaveClick(stockItem)}
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-300 px-3 py-1 rounded-md"
                              onClick={handleCancelClick}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Not editing mode */}
                          <p className="mt-2">
                            Qty: <span className="font-semibold">{stockItem.qty}</span>
                          </p>
                          <button
                            className="bg-blue-500 text-white px-3 py-1 mt-3 rounded-md"
                            onClick={() => handleEditClick(stockItem)}
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {/* If no user is selected, show all stocks */}
              <h2 className="text-lg font-semibold mb-4">All Stock</h2>
              {stocks.length === 0 ? (
                <p className="text-gray-500">No stock entries found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stocks.map((stockItem) => (
                    <div
                      key={stockItem._id}
                      className="border p-3 rounded-md bg-white"
                    >
                      <p className="text-xs text-gray-400">
                        Stock ID: {stockItem._id}
                      </p>
                      <p className="font-medium mt-1">
                        Product: {stockItem.product?.name || 'No product'}
                      </p>
                      <p className="text-sm text-gray-600">
                        Store: {stockItem.store?.storeName || 'No store'}
                      </p>
                      <p className="text-sm text-gray-600">
                        User:{' '}
                        {stockItem.user
                          ? typeof stockItem.user === 'object'
                            ? stockItem.user.name ||
                            stockItem.user.email ||
                            stockItem.user._id
                            : stockItem.user
                          : 'No user assigned'}
                      </p>
                      <p className="mt-2">
                        Qty:{' '}
                        <span className="font-semibold">{stockItem.qty}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
