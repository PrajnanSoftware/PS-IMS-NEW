import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from 'react';
import Popup from './Popup';

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9); // Adjust for no of items per page
    const [products, setProducts] = useState([])
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: '',
        productId: '',
        category: '',
        orderValue: '',
        quantity: '',
        unit: '',
        buyingPrice: '',
        deliveryDate: '',
        notifyOnDelivery: false,
        status: 'Confirmed'
    });
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/v1/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productToSubmit = {
            productName: newProduct.productName,
            productId: newProduct.productId,
            category: newProduct.category,
            orderValue: parseFloat(newProduct.orderValue),
            quantity: parseInt(newProduct.quantity),
            unit: parseInt(newProduct.unit),
            buyingPrice: parseFloat(newProduct.buyingPrice),
            dateOfDelivery: newProduct.deliveryDate,
            notifyOnDelivery: newProduct.notifyOnDelivery,
            status: newProduct.status,
        };

        try {
            const response = await fetch('http://localhost:8080/v1/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productToSubmit),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
            }

            const savedProduct = await response.json();
            console.log('Product saved:', savedProduct);

            setProducts((prevProducts) => [...prevProducts, savedProduct]);

            setIsFormVisible(false);

            setNewProduct({
                productName: '',
                productId: '',
                category: '',
                orderValue: '',
                quantity: '',
                unit: '',
                buyingPrice: '',
                dateOfDelivery: '',
                notifyOnDelivery: false,
                status: 'Confirmed',
            });
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <>
            <div className="p-2 pt-4 bg-gray-100  ml-80 mt-16">
                <div className="bg-white p-6 rounded-lg shadow-md ">
                    <h2 className="text-xl font-bold mb-4">Overall Orders</h2>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="p-4 bg-blue-100 rounded-lg text-center">
                            <h3 className="text-blue-600 font-bold p-1">Total Orders</h3>
                            <p className="text-2xl font-bold p-1">37</p>
                            <p className="text-gray-500 p-1">Last 7 days</p>
                        </div>
                        <div className="p-4 bg-orange-100 rounded-lg text-center">
                            <h3 className="text-yellow-600 font-bold p-1">Total Received</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px' }}>
                                <p className="text-2xl font-bold">32</p>
                                <p className="text-2xl font-bold">₹25000</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px' }}>
                                <p className="text-gray-500 mr-6">Last 7 days</p>
                                <p className="text-gray-500 mr-6">Revenue</p>
                            </div>

                        </div>
                        <div className="p-4 bg-purple-100 rounded-lg text-center ">
                            <h3 className="text-purple-600 font-bold p-1">Total Returned</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px' }}>
                                <p className="text-2xl font-bold">2</p>
                                <p className="text-2xl font-bold">₹2500</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px' }}>
                                <p className="text-gray-500 mr-7">Last 7 days</p>
                                <p className="text-gray-500 mr-7">Cost</p>
                            </div>
                        </div>
                        <div className="p-4 bg-red-100 rounded-lg text-center ">
                            <h3 className="text-red-600 font-bold p-1">On the way</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px' }}>
                                <p className="text-2xl font-bold">12</p>
                                <p className="text-2xl font-bold">₹2168</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px' }}>
                                <p className="text-gray-500 mr-6">Ordered</p>
                                <p className="text-gray-500 mr-6">Cost</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-2 bg-gray-100  ml-80 ">
                <div className="bg-white p-6 rounded-lg shadow-md ">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold mb-4">Products</h2>
                        <div>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-3xl mr-2" onClick={() => setIsFormVisible(true)}>Add Product</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-3xl mr-2">Filters</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-3xl">Order history</button>
                        </div>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-1 border-b text-center">Product Name</th>
                                <th className="py-2 px-4 border-b text-center">Order Price</th>
                                <th className="py-2 px-4 border-b text-center">Quantity</th>
                                <th className="py-2 px-4 border-b text-center">Product ID</th>
                                <th className="py-2 px-4 border-b text-center">Delivery Date</th>
                                <th className="py-2 px-4 border-b text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((product, index) => (
                                <tr key={product._id}>
                                    <td className="py-2 px-1 border-b text-center">{product.productName}</td>
                                    <td className="py-2 px-4 border-b text-center">₹{product.orderValue}</td>
                                    <td className="py-2 px-4 border-b text-center">{product.quantity} Units</td>
                                    <td className="py-2 px-4 border-b text-center">{product.productId}</td>
                                    <td className="py-2 px-4 border-b text-center">{new Date(product.dateOfDelivery).toLocaleDateString()}</td>
                                    <td className={`py-2 px-4 border-b text-center ${getStatusColor(product.status)}`}>{product.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between items-center mt-4">
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <p>Page {currentPage} of {pageNumbers.length}</p>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>

                    </div>
                    <Popup
                        isVisible={isFormVisible}
                        onClose={() => setIsFormVisible(false)}
                        onSubmit={handleSubmit}
                        newProduct={newProduct}
                        handleInputChange={handleInputChange}
                    />
                </div >
            </div>
        </>
    )
}
const getStatusColor = (status) => {
    switch (status) {
        case 'Confirmed':
            return 'text-green-500';
        case 'Delayed':
            return 'text-yellow-500';
        case 'Out for Delivery':
            return 'text-blue-500';
        case 'Returned':
            return 'text-red-500';
        case 'Reached':
            return 'text-purple-500';
        default:
            return 'text-gray-500';
    }
};
export default Orders



