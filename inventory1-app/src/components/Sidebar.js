import React from "react";

const Sidebar = () => {
    return (
        <div className="w-1/5 bg-blue-900 text-white min-h-screen flex flex-col justify-between">
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <i className="fas fa-cubes text-2xl"></i>
                    <span className="ml-3 text-xl font-semibold">Inventory</span>
                </div>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a className="flex items-center text-blue-300" href="#">
                                <i className="fas fa-home mr-3"></i> Dashboard
                            </a>
                        </li>
                        <li className="mb-4">
                            <a className="flex items-center text-blue-300" href="#">
                                <i className="fas fa-boxes mr-3"></i> Inventory
                            </a>
                        </li>
                        <li className="mb-4">
                            <a className="flex items-center text-blue-300" href="#">
                                <i className="fas fa-chart-line mr-3"></i> Reports
                            </a>
                        </li>
                        <li className="mb-4">
                            <a className="flex items-center text-white" href="#">
                                <i className="fas fa-truck mr-3"></i> Suppliers
                            </a>
                        </li>
                        <li className="mb-4">
                            <a className="flex items-center text-blue-300" href="#">
                                <i className="fas fa-shopping-cart mr-3"></i> Orders
                            </a>
                        </li>
                        <li className="mb-4">
                            <a className="flex items-center text-blue-300" href="#">
                                <i className="fas fa-store mr-3"></i> Manage Store
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="p-6">
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a className="flex items-center text-blue-300" href="#">
                                <i className="fas fa-cog mr-3"></i> Settings
                            </a>
                        </li>
                        <li className="mb-4">
                            <a className="flex items-center text-blue-300" href="#">
                                <i className="fas fa-sign-out-alt mr-3"></i> Log Out
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
