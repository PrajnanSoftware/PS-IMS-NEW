import React, { useEffect, useRef, useState } from 'react'

import { Chart } from 'chart.js';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [products, setProducts] = useState([]);
    const [isSortVisible, setIsSortVisible] = useState(false);
    const [sortOrder, setSortOrder] = useState('ascending'); // Default 

    // sorting based on price
    const handleSort = (order) => {
        setSortOrder(order);
        setIsSortVisible(false); // Close the sort 
    };

    // Sort products 
    const sortedProducts = [...products].sort((a, b) => {
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
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > pageNumbers.length) return; // Prevent out of bounds
        setCurrentPage(pageNumber);
    };

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
    return (
        <div className=" bg-gray-100 ml-[210px] xl:ml-[328px] p-1 pt-5 mt-16">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                    <h2 className="text-xl font-semibold mb-4">Overview</h2>
                    <div className="grid grid-cols-3 gap-4 mb-6 text-center">
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
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                            <p className="text-lg font-medium">₹1,17,432</p>
                            <p className="text-gray-500">Net purchase value</p>
                        </div>
                        <div>
                            <p className="text-lg font-medium">₹80,432</p>
                            <p className="text-gray-500">Net sales value</p>
                        </div>
                        <div>
                            <p className="text-lg font-medium">₹30,432</p>
                            <p className="text-gray-500">MoM Profit</p>
                        </div>
                        <div>
                            <p className="text-lg font-medium">₹1,10,432</p>
                            <p className="text-gray-500">YoY Profit</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                    <div className="flex justify-between items-center mb-4 ">
                        <h2 className="text-xl font-semibold">Best selling category</h2>
                        <a href="#" className="text-blue-500">See All</a>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-800 text-center">
                                <th className="pb-2">Category</th>
                                <th className="pb-2">Turn Over</th>
                                <th className="pb-2">Increase By</th>
                            </tr>
                        </thead>
                        <tbody className=" text-center">
                            <tr>
                                <td className="py-2">Vegetable</td>
                                <td className="py-2">₹26,000</td>
                                <td className="py-2 text-green-500">3.2%</td>
                            </tr>
                            <tr>
                                <td className="py-2">Instant Food</td>
                                <td className="py-2">₹22,000</td>
                                <td className="py-2 text-green-500">2%</td>
                            </tr>
                            <tr>
                                <td className="py-2">Households</td>
                                <td className="py-2">₹22,000</td>
                                <td className="py-2 text-green-500">1.5%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md my-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Profit & Revenue</h2>
                    <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">Weekly</button>
                </div>
                <LineChart />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 overflow-x-scroll">
                <h2 className="text-xl font-semibold mb-4">Products</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="p-2 whitespace-nowrap">Product</th>
                            <th className="p-2 whitespace-nowrap">Product ID</th>
                            <th className="p-2 whitespace-nowrap">Category</th>
                            <th className="p-2 whitespace-nowrap">Remaining Quantity</th>
                            <th className="p-2 whitespace-nowrap">Turn Over</th>
                            <th className="p-2 whitespace-nowrap">Increase By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product) => (
                            <tr key={product.id}>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.productId}</td>
                                <td className="py-2 px-4 border-b">{product.category}</td>
                                <td className="py-2 px-4 border-b">{product.remainingQuantity}</td>
                                <td className="py-2 px-4 border-b">₹{product.turnOver}</td>
                                <td className="py-2 px-4 border-b">₹{product.increaseBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <p>Page {currentPage} of {pageNumbers.length}</p>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageNumbers.length}>Next</button>
                </div>
            </div>
        </div>
    );
};





export default Reports
