import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaBoxes, FaStore } from 'react-icons/fa';  // For navigation

const LineChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [20000, 30000, 40000, 50000, 60000, 70000, 80000],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Profit',
                        data: [15000, 25000, 35000, 45000, 55000, 65000, 75000],
                        borderColor: 'rgba(255, 206, 86, 1)',
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                hover: {
                    mode: 'nearest',
                    intersect: true,
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Month',
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Value',
                        },
                    },
                },
            },
        });

        chartRef.current = chart;

        return () => {
            chart.destroy();
        };
    }, []);

    return <canvas id="myChart" width="400" height="200"></canvas>;
};

const Reports = () => {
    const navigate = useNavigate(); // For navigation
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    const [isSortVisible, setIsSortVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState('ascending');
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [showAllProducts, setShowAllProducts] = useState(false);

    // Fetch products and suppliers
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/inventory');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchSuppliers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/supplier/getAll');
                const data = await response.json();
                setSuppliers(data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchProducts();
        fetchSuppliers();
    }, []);

    // Combine products and suppliers data
    useEffect(() => {
        if (products.length > 0 && suppliers.length > 0) {
            const combined = products.map(product => {
                const supplier = suppliers.find(s => s.ProductName === product.name);
                return {
                    ...product,
                    turnover: supplier ? supplier.BuyingPrice : 0,
                    increaseBy: supplier ? ((supplier.BuyingPrice - 1000) / 1000 * 100).toFixed(2) : 0,
                    category: supplier ? supplier.category : 'N/A',
                };
            });
            setCombinedData(combined);
        }
    }, [products, suppliers]);

    // Calculate turnover and increased by percentage for each category
    const calculateCategoryStats = () => {
        const categoryStats = {};

        suppliers.forEach((supplier) => {
            const { category, BuyingPrice } = supplier;
            if (!categoryStats[category]) {
                categoryStats[category] = {
                    totalBuyingPrice: 0,
                    count: 0,
                };
            }
            categoryStats[category].totalBuyingPrice += BuyingPrice || 0;
            categoryStats[category].count += 1;
        });

        const result = Object.keys(categoryStats).map((category) => {
            const averagePrice = categoryStats[category].totalBuyingPrice / categoryStats[category].count;
            const previousAveragePrice = 1000; // Placeholder for previous period's average price
            const increasePercentage = ((averagePrice - previousAveragePrice) / previousAveragePrice) * 100;

            return {
                category,
                turnover: categoryStats[category].totalBuyingPrice,
                increaseBy: increasePercentage.toFixed(2), // Ensure two decimal places
            };
        });

        return result;
    };

    const categoryStats = calculateCategoryStats();

    // Rest of the code remains unchanged
    const sortedProducts = [...combinedData].sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.orderValue - b.orderValue;
        } else {
            return b.orderValue - a.orderValue;
        }
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(combinedData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > pageNumbers.length) return;
        setCurrentPage(pageNumber);
    };

    // Function to toggle "See All" functionality for categories
    const toggleShowAllCategories = () => {
        setShowAllCategories(!showAllCategories);
    };

    // Function to toggle "See All" functionality for products
    const toggleShowAllProducts = () => {
        setShowAllProducts(!showAllProducts);
    };

    // Determine how many categories to show
    const displayedCategories = showAllCategories ? categoryStats : categoryStats.slice(0, 3);

    // Determine how many products to show
    const displayedProducts = showAllProducts ? currentItems : currentItems.slice(0, 3);

    return (
        <div className="bg-gray-100 ml-[210px] xl:ml-[328px] p-1 pt-5 mt-16">
            {/* Fully stretched Overview card */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full mb-6">
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-medium">₹21,190</p>
                        <p className="text-gray-500">Total Profit</p>
                    </div>
                    <div>
                        <p className="text-2xl font-medium text-orange-500">₹18,300</p>
                        <p className="text-gray-500">Revenue</p>
                    </div>
                    <div>
                        <p className="text-2xl font-medium text-purple-500">₹17,432</p>
                        <p className="text-gray-500">Sales</p>
                    </div>
                    <div>
                        <p className="text-2xl font-medium">₹1,17,432</p>
                        <p className="text-gray-500">Net purchase value</p>
                    </div>
                </div>
            </div>

            {/* Three Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 flex items-center space-x-4">
                <FaChartLine className="text-4xl text-blue-500" /> {/* Icon for Sales Report */}
                <div>
                    <h2 className="text-xl font-semibold">Sales Report</h2>
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={() => navigate('/app/sales-report')}
                    >
                        View Report
                    </button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 flex items-center space-x-4">
                <FaBoxes className="text-4xl text-blue-500" /> {/* Icon for Inventory Report */}
                <div>
                    <h2 className="text-xl font-semibold">Inventory Report</h2>
                    <button
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={() => navigate('/app/inventory-report')}
                    >
                       View Report
                    </button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 flex items-center space-x-4">
                <FaStore className="text-4xl text-blue-500" /> {/* Icon for Store Report */}
                <div>
                    <h2 className="text-xl font-semibold">Store Report</h2>
                    <button
                        className="mt-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={() => navigate('/app/stores-report')}
                    >
                        View Report
                    </button>
                </div>
            </div>
            </div>

            {/* Rest of the code remains unchanged */}
            <div className="bg-white p-6 rounded-lg shadow-md my-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Profit & Revenue</h2>
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">Weekly</button>
                </div>
                <LineChart />
            </div>
        </div>
    );
};

export default Reports;