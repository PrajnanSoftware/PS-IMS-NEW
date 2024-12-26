import React, { useState, useEffect } from 'react';
import './App.css'; // Your custom styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faHome, faBoxes, faChartLine, faTruck, faShoppingCart, faStore, faCog, faSignOutAlt, faBell, faSearch, faFilter,faUser } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [showForm, setShowForm] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        supplierName: '',
        product: '',
        category: '',
        price: '',
        contactNumber: '',
        type: '',
        onTheWay: ''
    });

    // Toggle form visibility
    const toggleNewSupplierForm = () => setShowForm(!showForm);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const addSupplier = (e) => {
        e.preventDefault();

        // Validate price as a number
        if (isNaN(newSupplier.price) || isNaN(newSupplier.contactNumber)) {
            alert("Price and Contact Number must be valid numbers.");
            return;
        }

        // Add new supplier to the list
        const updatedSuppliers = [...suppliers, newSupplier];
        setSuppliers(updatedSuppliers);

        // Save to localStorage
        localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));

        // Reset form and close
        setNewSupplier({
            supplierName: '',
            product: '',
            category: '',
            price: '',
            contactNumber: '',
            type: '',
            onTheWay: ''
        });
        toggleNewSupplierForm();
    };

    // Load suppliers from localStorage on page load
    useEffect(() => {
        const storedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
        setSuppliers(storedSuppliers);
    }, []);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/5 bg-blue-900 text-white min-h-screen flex flex-col justify-between">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <FontAwesomeIcon icon={faCubes} className="text-2xl" />
                        <span className="ml-3 text-xl font-semibold">Inventory</span>
                    </div>
                    <nav>
                        <ul>
                            <li className="mb-4"><a href="#" className="flex items-center text-blue-300"><FontAwesomeIcon icon={faHome} className="mr-3" />Dashboard</a></li>
                            <li className="mb-4"><a href="#" className="flex items-center text-blue-300"><FontAwesomeIcon icon={faBoxes} className="mr-3" />Inventory</a></li>
                            <li className="mb-4"><a href="#" className="flex items-center text-blue-300"><FontAwesomeIcon icon={faChartLine} className="mr-3" />Reports</a></li>
                            <li className="mb-4"><a href="#" className="flex items-center text-white"><FontAwesomeIcon icon={faTruck} className="mr-3" />Suppliers</a></li>
                            <li className="mb-4"><a href="#" className="flex items-center text-blue-300"><FontAwesomeIcon icon={faShoppingCart} className="mr-3" />Orders</a></li>
                            <li className="mb-4"><a href="#" className="flex items-center text-blue-300"><FontAwesomeIcon icon={faStore} className="mr-3" />Manage Store</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="p-6">
                    <nav>
                        <ul>
                            <li className="mb-4"><a href="#" className="flex items-center text-blue-300"><FontAwesomeIcon icon={faCog} className="mr-3" />Settings</a></li>
                            <li className="mb-4"><a href="#" className="flex items-center text-blue-300"><FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />Log Out</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between bg-white p-4 shadow">
                    <div className="relative w-1/3">
                        <input className="w-full p-2 border rounded-lg pl-10" placeholder="Search product, supplier, order" type="text" />
                        <FontAwesomeIcon icon={faSearch} className="absolute top-3 left-3 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-400 focus:outline-none hover:text-gray-600"><FontAwesomeIcon icon={faBell} /></button>
                        <button><img alt="User profile" className="w-10 h-10 rounded-full" src="https://storage.googleapis.com/a1aa/image/m6c9YdTsKBqLAB1o4eBNuRZxGj7WWOEGg4rVeQwK9Aqni60TA.jpg" /></button>
                    </div>
                </header>

                {/* Suppliers Table */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Suppliers</h2>
                        <div className="flex space-x-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={toggleNewSupplierForm}>Add Product</button>
                            <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg flex items-center">
                                <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filters
                            </button>
                            <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg">Download</button>
                        </div>
                    </div>

                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-3 px-4 text-center border-b border-gray-300">Supplier Name</th>
                                <th className="py-3 px-4 text-center border-b border-gray-300">Product</th>
                                <th className="py-3 px-4 text-center border-b border-gray-300">Category</th>
                                <th className="py-3 px-4 text-center border-b border-gray-300">Price</th>
                                <th className="py-3 px-4 text-center border-b border-gray-300">Contact</th>
                                <th className="py-3 px-4 text-center border-b border-gray-300">Type</th>
                                <th className="py-3 px-4 text-center border-b border-gray-300">On the Way</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers.map((supplier, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-4 text-center border-b border-gray-300">{supplier.supplierName}</td>
                                    <td className="py-3 px-4 text-center border-b border-gray-300">{supplier.product}</td>
                                    <td className="py-3 px-4 text-center border-b border-gray-300">{supplier.category}</td>
                                    <td className="py-3 px-4 text-center border-b border-gray-300">{supplier.price}</td>
                                    <td className="py-3 px-4 text-center border-b border-gray-300">{supplier.contactNumber}</td>
                                    <td className="py-3 px-4 text-center border-b border-gray-300">{supplier.type}</td>
                                    <td className="py-3 px-4 text-center border-b border-gray-300">{supplier.onTheWay}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* New Supplier Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
                        <h2 className="text-xl font-semibold mb-6">New Supplier</h2>

                        {/* Image Upload */}
                        <div className="flex items-center mb-4">
                            <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="text-gray-300 text-3xl" />
                            </div>
                            <div className="ml-4">
                                <p className="text-gray-500">Drag image here</p>
                                <p className="text-blue-500 cursor-pointer">or Browse image</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <form onSubmit={addSupplier}>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Supplier Name</label>
                                <input className="w-2/3 p-2 border rounded" name="supplierName" value={newSupplier.supplierName} onChange={handleInputChange} placeholder="Enter supplier name" required />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Product</label>
                                <input className="w-2/3 p-2 border rounded" name="product" value={newSupplier.product} onChange={handleInputChange} placeholder="Enter product name" required />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Category</label>
                                <input className="w-2/3 p-2 border rounded" name="category" value={newSupplier.category} onChange={handleInputChange} placeholder="Enter category" required />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Price</label>
                                <input className="w-2/3 p-2 border rounded" name="price" value={newSupplier.price} onChange={handleInputChange} placeholder="Enter price" type="number" required />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Contact</label>
                                <input className="w-2/3 p-2 border rounded" name="contactNumber" value={newSupplier.contactNumber} onChange={handleInputChange} placeholder="Enter contact number" type="tel" required />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Supplier Type</label>
                                <label className="mr-4">
                                    <input type="radio" name="type" value="Local" onChange={handleInputChange} required /> Not taking return
                                </label>
                                <label>
                                    <input type="radio" name="type" value="Overseas" onChange={handleInputChange} required /> Taking return
                                </label>
                            </div>
                            <div className="mb-6 flex items-center">
                                <label className="block text-gray-700 w-1/3">On the Way</label>
                                <input className="w-2/3 p-2 border rounded" name="onTheWay" value={newSupplier.onTheWay} onChange={handleInputChange} placeholder="Enter quantity on the way" type="number" required />
                            </div>
                            <div className="flex justify-between">
                                <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-lg" onClick={toggleNewSupplierForm}>Discard</button>
                                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Add supplier</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
