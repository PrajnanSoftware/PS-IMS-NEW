import React, { useEffect } from 'react';

function toggleNewSupplierForm() {
    const form = document.getElementById('newSupplierForm');
    const body = document.querySelector('body');
    form.classList.toggle('hidden');
    
    // Toggle background blur when form is visible
    if (!form.classList.contains('hidden')) {
        body.classList.add('backdrop-blur-sm'); // Add blur effect
    } else {
        body.classList.remove('backdrop-blur-sm'); // Remove blur effect
    }
}

// Adds a new product to the table
function addSupplier(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form values
    const supplierName = document.getElementById("supplierName").value;
    const product = document.getElementById("product").value;
    const category = document.getElementById("category").value;
    const buyingPrice = parseFloat(document.getElementById("price").value);
    const contactNumber = document.getElementById("contactNumber").value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const onTheWay = document.getElementById("onTheWay").value;

    // Table where the supplier will be added
    const table = document.getElementById("supplierTable");

    // Create a new row for the supplier
    const newRow = table.insertRow();

    // Add cells with supplier details
    newRow.innerHTML = `
        <td class="py-3 px-4 text-center border-b border-gray-300">${supplierName}</td>
        <td class="py-3 px-4 text-center border-b border-gray-300">${product}</td>
        <td class="py-3 px-4 text-center border-b border-gray-300">${category}</td>
        <td class="py-3 px-4 text-center border-b border-gray-300">${buyingPrice}</td>
        <td class="py-3 px-4 text-center border-b border-gray-300">${contactNumber}</td>
        <td class="py-3 px-4 text-center border-b border-gray-300">${type}</td>
        <td class="py-3 px-4 text-center border-b border-gray-300">${onTheWay}</td>
    `;

    // Save the new supplier to localStorage
    const suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    suppliers.push({
        supplierName,
        product,
        category,
        buyingPrice,
        contactNumber,
        type,
        onTheWay,
    });
    localStorage.setItem('suppliers', JSON.stringify(suppliers));

    // Clear form fields and hide the form
    document.getElementById("supplierForm").reset();
    toggleNewSupplierForm();
}

function SuppliersTable() {
    useEffect(() => {
        const table = document.getElementById("supplierTable");
        const suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];

        // If there are suppliers, display them in the table
        suppliers.forEach(supplier => {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td class="py-3 px-4 text-center border-b border-gray-300">${supplier.supplierName}</td>
                <td class="py-3 px-4 text-center border-b border-gray-300">${supplier.product}</td>
                <td class="py-3 px-4 text-center border-b border-gray-300">${supplier.category}</td>
                <td class="py-3 px-4 text-center border-b border-gray-300">${supplier.buyingPrice}</td>
                <td class="py-3 px-4 text-center border-b border-gray-300">${supplier.contactNumber}</td>
                <td class="py-3 px-4 text-center border-b border-gray-300">${supplier.type}</td>
                <td class="py-3 px-4 text-center border-b border-gray-300">${supplier.onTheWay}</td>
            `;
        });
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Suppliers</h2>
                <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={toggleNewSupplierForm}>Add Product</button>
                    <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg flex items-center">
                        <i className="fas fa-filter mr-2"></i> Filters
                    </button>
                    <button className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg">
                        Download
                    </button>
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
                <tbody id="supplierTable"></tbody>
            </table>
        </div>
    );
}

function NewSupplierForm() {
    return (
        <div id="newSupplierForm" className="hidden fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
                <h2 className="text-xl font-semibold mb-6">New Supplier</h2>
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-gray-300 text-3xl"></i>
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-500">Drag image here</p>
                        <p className="text-blue-500 cursor-pointer">or Browse image</p>
                    </div>
                </div>
                <form id="supplierForm" onSubmit={addSupplier}>
                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 w-1/3">Supplier Name</label>
                        <input className="w-2/3 p-2 border rounded" id="supplierName" placeholder="Enter supplier name" type="text" required />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 w-1/3">Product</label>
                        <input className="w-2/3 p-2 border rounded" id="product" placeholder="Enter product name" type="text" required />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 w-1/3">Category</label>
                        <input className="w-2/3 p-2 border rounded" id="category" placeholder="Enter category" type="text" required />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 w-1/3">Buying Price</label>
                        <input className="w-2/3 p-2 border rounded" id="price" placeholder="Enter buying price" type="number" required />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 w-1/3">Contact Number</label>
                        <input className="w-2/3 p-2 border rounded" id="contactNumber" placeholder="Enter supplier contact number" type="tel" required />
                    </div>
                    <div className="mb-4 flex items-center">
    <label className="block text-gray-700 w-1/3">Supplier Type</label>
    <div className="flex items-center space-x-4">
        <label><input type="radio" name="type" value="Local" required /> Not taking return</label>
        <label><input type="radio" name="type" value="Overseas" required /> Taking return</label>
    </div>
</div>

                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 w-1/3">On the Way</label>
                        <input className="w-2/3 p-2 border rounded" id="onTheWay" placeholder="Enter quantity" type="number" required />
                    </div>
                    <div class="flex justify-between">
                    <button  onClick={toggleNewSupplierForm} type="button" class="bg-gray-500 text-white py-2 px-4 rounded-lg" >Discard</button>
                    <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-lg">Add supplier</button>
                </div>
                </form>
                
            </div>
        </div>
    );
}

function SupplierPage() {
    return (
        <>
            <NewSupplierForm />
            <SuppliersTable />
        </>
    );
}

export default SupplierPage;
