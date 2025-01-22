import React, { useState } from "react";

const FilterComponent = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <button
        className="p-2 border rounded bg-gray-200 text-gray-700"
        onClick={toggleDropdown}
      >
        Filter
      </button>
      {isDropdownVisible && (
        <div className="absolute bg-white p-4 rounded shadow mt-2">
          <select className="w-full mb-2 p-2 border rounded">
            <option>Filter by Category</option>
          </select>
          <select className="w-full p-2 border rounded">
            <option>Filter by Availability</option>
          </select>
        </div>
      )}
    </div>
  );
};

const ManageStore = () => {
  return (
    <div className=" bg-gray-100 ml-[215px] xl:ml-[328px] pt-1 mt-14">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex-1 ">

        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Store Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Store Name</h3>
                <p className="text-gray-700">Example</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-gray-700">23 Main St, City, Country</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-700">23713172813</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-700">info@example.com</p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold">Operating Hours</h3>
                <p className="text-gray-700">9:00AM - 6:00PM</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Inventory Summary</h2>
            <div className="grid grid-cols-1 gap-4 text-center">
              <div>
                <p className="text-2xl font-semibold">Total Items: 0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="bg-white p-6 rounded shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Inventory Overview</h2>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                placeholder="Search items"
                className="p-2 border rounded"
              />
              <FilterComponent />
            </div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Item Name</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Location</th>
                  <th className="py-2 px-4 border-b">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {/* Add inventory rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStore;
