import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Suppliers() {
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

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const toggleNewSupplierForm = () => setShowForm(!showForm);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addSupplier = (e) => {
        e.preventDefault();
        if (isNaN(newSupplier.price) || isNaN(newSupplier.contactNumber)) {
            alert("Price and Contact Number must be valid numbers.");
            return;
        }
        const updatedSuppliers = [...suppliers, newSupplier];
        setSuppliers(updatedSuppliers);
        localStorage.setItem('suppliers', JSON.stringify(updatedSuppliers));
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

    useEffect(() => {
        const storedSuppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
        setSuppliers(storedSuppliers);
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSuppliers = suppliers.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(suppliers.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col h-screen ml-[250px] xl:ml-[320px] p-6 bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow m-4 mt-20">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Suppliers</h2>
                    <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={toggleNewSupplierForm}>Add Product</button>
                        <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg">Download</button>
                    </div>
                </div>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            {['Supplier Name', 'Product', 'Category', 'Price', 'Contact', 'Type', 'On the Way'].map((header, index) => (
                                <th key={index} className="py-3 px-4 text-center border-b border-gray-300">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentSuppliers.map((supplier, index) => (
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

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <div className="text-center">
                        {pageNumbers.length > 0 && (
                            <p className="text-gray-700">
                                Page {currentPage} of {pageNumbers.length}
                            </p>
                        )}
                    </div>
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === pageNumbers.length}
                    >
                        Next
                    </button>
                </div>
            </div>

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
                                <input
                                    className="w-2/3 p-2 border rounded"
                                    name="supplierName"
                                    value={newSupplier.supplierName}
                                    onChange={handleInputChange}
                                    placeholder="Enter supplier name"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Product</label>
                                <input
                                    className="w-2/3 p-2 border rounded"
                                    name="product"
                                    value={newSupplier.product}
                                    onChange={handleInputChange}
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Category</label>
                                <input
                                    className="w-2/3 p-2 border rounded"
                                    name="category"
                                    value={newSupplier.category}
                                    onChange={handleInputChange}
                                    placeholder="Enter category"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Price</label>
                                <input
                                    className="w-2/3 p-2 border rounded"
                                    name="price"
                                    value={newSupplier.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter price"
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Contact Number</label>
                                <input
                                    className="w-2/3 p-2 border rounded"
                                    name="contactNumber"
                                    value={newSupplier.contactNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter contact number"
                                    type="tel"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">Type</label>
                                <select
                                    className="w-2/3 p-2 border rounded"
                                    name="type"
                                    value={newSupplier.type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select type</option>
                                    <option value="Wholesaler">Taking return</option>
                                    <option value="Retailer">Not taking return</option>
                                </select>
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="block text-gray-700 w-1/3">On the Way</label>
                                <input
                                    className="w-2/3 p-2 border rounded"
                                    name="onTheWay"
                                    value={newSupplier.onTheWay}
                                    onChange={handleInputChange}
                                    placeholder="On the way quantity"
                                    type="number"
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
    <button
        type="button"
        onClick={toggleNewSupplierForm}
        className="bg-gray-600 text-white py-2 px-4 rounded-lg"
    >
        Discard
    </button>
    <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
    >
        Add Supplier
    </button>
</div>

                            
                            
                                
                        </form>

                       
                    </div>
                </div>
            )}
        </div>
    );
}

export default Suppliers;
