import { useEffect, useState } from 'react';

const Billing = () => {
    const [inventory, setInventory] = useState([]);
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInventory, setFilteredInventory] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/inventory');
                const data = await response.json();
                setInventory(data);
                setFilteredInventory(data); // Initialize with all products
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        };
        fetchInventory();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = inventory.filter(product =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredInventory(filtered);
        setShowDropdown(!!term); // Show dropdown only if there's a search term
    };

    const handleSelectProduct = (product) => {
        addToCart(product);
        setSearchTerm(''); // Clear search term after selection
        setShowDropdown(false); // Hide dropdown after selection
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (productId, change) => {
        setCart((prevCart) => {
            return prevCart
                .map(item =>
                    item._id === productId
                        ? { ...item, quantity: Math.max(1, item.quantity + change) }
                        : item
                )
                .filter(item => item.quantity > 0);
        });
    };

    const deleteProduct = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item._id !== productId));
    };

    const calculateTotal = () => {
        // Returns a string, so we need to convert it to a number later
        return cart.reduce((total, item) => total + item.buyingPrice * item.quantity, 0).toFixed(2);
    };

    const handlePaymentMethod = (method) => {
        setPaymentMethod(method);
    };

    const handleRazorpayPayment = async () => {
        // Convert total amount string to a float
        const totalAmount = parseFloat(calculateTotal());
        if (isNaN(totalAmount) || totalAmount <= 0) {
            alert('Please add products to the cart before proceeding to payment.');
            return;
        }

        try {
            // Updated endpoint to match backend route and send amount as a number
            const response = await fetch('http://localhost:8080/api/billing/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: totalAmount }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Payment initiation failed');
            }

            const orderData = await response.json();

            const options = {
                key: 'rzp_test_QnZqng7pQVvf4L', // Replace with your actual Razorpay key
                amount: orderData.amount, // amount in paise (should be an integer)
                currency: orderData.currency,
                name: 'My Shop',
                description: 'Test Transaction',
                order_id: orderData.id,
                handler: function (response) {
                    alert('Payment successful! Order ID: ' + response.razorpay_payment_id);
                    setCart([]);
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9999999999',
                },
                theme: { color: '#3399cc' },
            };

            // Ensure Razorpay checkout script is loaded in your HTML
            const razor = new window.Razorpay(options);
            razor.open();
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Payment failed: ' + error.message);
        }
    };

    const handleCashOnDelivery = () => {
        alert('Order placed successfully with Cash on Delivery.');
        setCart([]);
    };

    return (
        <div className="bg-gray-100 ml-[210px] xl:ml-[328px] p-1 pt-5 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Billing</h2>

                {/* Search Bar with Dropdown */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border rounded-lg px-3 py-2 w-60"
                    />
                    {showDropdown && (
                        <div className="absolute z-10 bg-white border rounded-lg mt-1 w-60 max-h-40 overflow-y-auto">
                            {filteredInventory.map(product => (
                                <div
                                    key={product._id}
                                    onClick={() => handleSelectProduct(product)}
                                    className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                                >
                                    {product.name} - ₹{product.buyingPrice}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Billing Table */}
                <div className="overflow-x-scroll">
                    <table className="w-full bg-white border rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-center">Product Name</th>
                                <th className="py-2 px-4 border-b text-center">Price</th>
                                <th className="py-2 px-4 border-b text-center">Quantity</th>
                                <th className="py-2 px-4 border-b text-center">Total</th>
                                <th className="py-2 px-4 border-b text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item._id}>
                                    <td className="py-2 px-4 border-b text-center">{item.name}</td>
                                    <td className="py-2 px-4 border-b text-center">₹{item.buyingPrice}</td>
                                    <td className="py-2 px-4 border-b text-center flex items-center justify-center">
                                        <button
                                            onClick={() => updateQuantity(item._id, -1)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md mx-2"
                                        >
                                            -
                                        </button>
                                        {item.quantity}
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            className="bg-green-500 text-white px-2 py-1 rounded-md mx-2"
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        ₹{(item.buyingPrice * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => deleteProduct(item._id)}
                                            className="bg-red-600 text-white px-2 py-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Amount */}
                <div className="text-right mt-4 text-xl font-bold">
                    Total: ₹{calculateTotal()}
                </div>

                {/* Payment Options */}
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Select Payment Method:</h3>
                    <div className="flex gap-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => handlePaymentMethod('cash')}
                                className="mr-2"
                            />
                            Cash on Delivery
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="razorpay"
                                checked={paymentMethod === 'razorpay'}
                                onChange={() => handlePaymentMethod('razorpay')}
                                className="mr-2"
                            />
                            Pay with Razorpay
                        </label>
                    </div>
                </div>

                {/* Payment Button */}
                {paymentMethod && (
                    <div className="mt-4">
                        {paymentMethod === 'cash' && (
                            <button
                                onClick={handleCashOnDelivery}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg"
                            >
                                Confirm Cash Payment
                            </button>
                        )}
                        {paymentMethod === 'razorpay' && (
                            <button
                                onClick={handleRazorpayPayment}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                            >
                                Pay with Razorpay
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Billing;
