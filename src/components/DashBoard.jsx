
import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { FaHome, FaPercentage, FaShoppingBag, FaTimesCircle } from 'react-icons/fa';
import { FaBox, FaChartBar, FaChartLine, FaList, FaPeopleGroup, FaTruck } from 'react-icons/fa6';
import { GiReceiveMoney } from 'react-icons/gi';

// Register all necessary components of Chart.js  
Chart.register(...registerables);

const Report = () => {
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

    useEffect(() => {
        let barChart;
        let pieChart;

        if (barChartRef.current) {
            const barCtx = barChartRef.current.getContext('2d');
            barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Order',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: 'rgba(10, 34, 64, 1)',
                            borderColor: 'rgba(255, 206, 86, 2)',
                            borderWidth: 1
                        },
                        {
                            label: 'Sales',
                            data: [2, 3, 20, 5, 1, 4],
                            backgroundColor: '#5F6FFF',
                            borderColor: '#5F6FFF',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        if (pieChartRef.current) {
            const pieCtx = pieChartRef.current.getContext('2d');
            pieChart = new Chart(pieCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [
                        {
                            label: 'Ordered',
                            data: [1000, 2000, 1500, 3000, 2500],
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(21, 112, 239, 1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Delivered',
                            data: [800, 1800, 1200, 2800, 2200],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Cleanup function to destroy charts on component unmount  
        return () => {
            if (barChart) {
                barChart.destroy();
            }
            if (pieChart) {
                pieChart.destroy();
            }
        };
    }, []);

    return (
        <>
            <div className="space-y-4 mt-20 " style={{ marginLeft: '328px' }}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Sales Overview</h2>
                        <div className="flex justify-around items-center">
                            <div className="text-center justify-items-center">
                                <GiReceiveMoney className="text-2xl text-gray-500" />
                                <p className="text-xl font-semibold">832</p>
                                <p className="text-gray-500">Sales</p>
                            </div>
                            <div className="text-center justify-items-center">
                                <FaChartLine className="text-2xl text-purple-500" />
                                <p className="text-xl font-semibold">₹ 18,300</p>
                                <p className="text-gray-500">Revenue</p>
                            </div>
                            <div className="text-center justify-items-center">
                                <FaChartBar className="text-2xl text-orange-500" />
                                <p className="text-xl font-semibold">₹ 868</p>
                                <p className="text-gray-500">Profit</p>
                            </div>
                            <div className="text-center justify-items-center">
                                <FaHome className="text-2xl text-green-500" />
                                <p className="text-xl font-semibold">₹ 17,432</p>
                                <p className="text-gray-500">Cost</p>

                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Inventory Summary</h2>
                        <div className="flex justify-around items-center">
                            <div className="text-center justify-items-center">
                                <FaBox className="text-2xl text-orange-500" />
                                <p className="text-xl font-semibold">868</p>
                                <p className="text-gray-500">Quantity in Hand</p>
                            </div>
                            <div className="text-center justify-items-center">
                                <FaTruck className="text-2xl text-purple-500" />
                                <p className="text-xl font-semibold">200</p>
                                <p className="text-gray-500">To be received</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Purchase Overview</h2>
                        <div className="flex justify-around items-center">
                            <div className="text-center justify-items-center">
                                <FaShoppingBag className="text-2xl text-blue-500" />
                                <p className="text-xl font-semibold">82</p>
                                <p className="text-gray-500">Purchase</p>
                            </div>
                            <div className="text-center justify-items-center">
                                <FaHome className="text-2xl text-green-500" />
                                <p className="text-xl font-semibold">₹ 18,300</p>
                                <p className="text-gray-500">Cost</p>
                            </div>
                            <div className="text-center justify-items-center">
                                <FaTimesCircle className="text-2xl text-purple-500" />
                                <p className="text-xl font-semibold">5</p>
                                <p className="text-gray-500">Cancel</p>
                            </div>
                            <div className="text-center justify-items-center">
                                <FaChartBar className="text-2xl text-orange-500" />
                                <p className="text-xl font-semibold">₹ 17,432</p>
                                <p className="text-gray-500">Return</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Product Summary</h2>
                        <div className="flex justify-around items-center">
                            <div className="text-center justify-items-center">
                                <FaPeopleGroup className="text-2xl text-gray-500" />
                                <p className="text-xl font-semibold">31</p>
                                <p className="text-gray-500">Number of Suppliers</p>
                            </div>
                            <div className="text-center justify-items-center">
                                <FaList className="text-2xl text-purple-500" />
                                <p className="text-xl font-semibold">21</p>
                                <p className="text-gray-500">Number of Categories</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 ">
                    <div className="bg-white p-4 rounded-lg shadow ">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Sales & Purchase</h2>
                            <button className="bg-gray-200 p-2 rounded-lg text-sm">Weekly</button>
                        </div>
                        <div className="chart" id='bar'>
                            <h3 className='text-purple-900 text-2xl font-bold'>Today's data</h3>
                            <canvas ref={barChartRef} id="barChart" style={{ maxHeight: '400px' }}></canvas>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <div className="chart" id='pie'>
                            <h3 className='text-purple-900 text-2xl font-bold'>Top selling Products</h3>
                            <canvas ref={pieChartRef} id="pieChart" style={{ maxHeight: '400px' }}></canvas>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Top Selling Stock</h2>
                            <a href="#" className="text-blue-500">See All</a>
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="py-2">Name</th>
                                    <th className="py-2">Sold Quantity</th>
                                    <th className="py-2">Remaining Quantity</th>
                                    <th className="py-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2">Product 1</td>
                                    <td className="py-2">100</td>
                                    <td className="py-2">50</td>
                                    <td className="py-2">₹ 500</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Product 2</td>
                                    <td className="py-2">80</td>
                                    <td className="py-2">30</td>
                                    <td className="py-2">₹ 400</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Product 3</td>
                                    <td className="py-2">60</td>
                                    <td className="py-2">20</td>
                                    <td className="py-2">₹ 300</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Low Quantity Stock</h2>
                            <a href="#" className="text-blue-500">See All</a>
                        </div>
                        <div className="flex items-center">
                            <img src="https://placehold.co/50x50" alt="Stacked boxes" className="w-12 h-12 mr-4" />
                            <div>
                                <h3 className="text-md font-semibold">Product 1</h3>
                                <p className="text-sm text-gray-500">Remaining Quantity : 10 Packet</p>
                            </div>
                            <span className="ml-auto bg-red-100 text-red-500 text-xs font-semibold px-2 py-1 rounded-full">Low</span>
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
};

export default Report;