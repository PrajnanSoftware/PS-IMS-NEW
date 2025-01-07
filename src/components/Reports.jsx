import React, { useEffect, useRef } from 'react'

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
    return (
        <div className="p-4 bg-gray-100 ml-[200px] xl:ml-[320px] mt-16">
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
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-scroll">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Best selling product</h2>
                    <a href="#" className="text-blue-500 text-sm">See All</a>
                </div>
                <table className="w-full text-center">
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
                        <tr>
                            <td className="p-2">Product 1</td>
                            <td className="p-2">23567</td>
                            <td className="p-2">Category 1</td>
                            <td className="p-2">225 Pack</td>
                            <td className="p-2">₹17,000</td>
                            <td className="p-2 text-green-500">2.3%</td>
                        </tr>
                        <tr>
                            <td className="p-2">Product 2</td>
                            <td className="p-2">25831</td>
                            <td className="p-2">Category 2</td>
                            <td className="p-2">200 Pack</td>
                            <td className="p-2">₹12,000</td>
                            <td className="p-2 text-green-500">1.3%</td>
                        </tr>                    </tbody>
                </table>
            </div>
        </div>
    );
};





export default Reports