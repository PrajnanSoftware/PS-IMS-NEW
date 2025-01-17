import React from 'react';
import { IoSettingsOutline, IoSpeedometer } from "react-icons/io5";
import { FaBox, FaShoppingCart, FaTags } from "react-icons/fa";
import bell from '../assets/images/bell.png';
import search from '../assets/images/vector.png';
import profile from '../assets/images/profile.png';
import { AiOutlineRise } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { PiCubeFocusFill } from 'react-icons/pi';
import { CiLogout } from 'react-icons/ci';
import { TbReportAnalytics } from "react-icons/tb";

const NavAndSide = () => {
    // Updated nav items: note the extraClass on Settings
    const navItems = [
        { to: '/', label: 'Dashboard', icon: <IoSpeedometer /> },
        { to: '/inventory-dashboard', label: 'Inventory', icon: <FaBox /> },
        { to: '/reports', label: 'Reports', icon: <FaTags /> },
        { to: '/Suppliers', label: 'Suppliers', icon: <TbReportAnalytics /> },
        { to: '/orders', label: 'Orders', icon: <AiOutlineRise /> },
        { to: '/manage-store', label: 'Manage Store', icon: <FaShoppingCart /> },
        {
            to: '/settings',
            label: 'Settings',
            icon: <IoSettingsOutline />,
            extraClass: 'mt-[12rem]' // Add extra margin on top
        },
        { to: '/logout', label: 'Logout', icon: <CiLogout />, special: true },
    ];

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="bg-[#0A2240] h-screen w-[204px] xl:w-[320px] p-5 fixed">
                <NavLink to="/" className="flex items-center mt-5 mb-5 justify-center">
                    <PiCubeFocusFill className="text-[#1570EF] text-4xl mr-2" />
                    <span className="text-[#1570EF] text-2xl">Inventory</span>
                </NavLink>

                <nav>
                    {navItems.map(({ to, label, icon, special, extraClass }, index) => (
                        <NavLink
                            key={index}
                            to={to}
                            className={({ isActive }) =>
                                `${isActive
                                    ? 'text-white'
                                    : special
                                        ? 'text-[#FF0000]'
                                        : 'text-[#949494]'
                                }
                                flex items-center p-4 hover:text-white transition duration-300
                                ${extraClass ? extraClass : 'mt-5'}  /* <-- Use mt-8 for Settings, else mt-5 */
                                justify-center`
                            }
                        >
                            <span className="text-[#1570EF] text-2xl mr-2">{icon}</span>
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-[204px] xl:ml-[320px] bg-white">
                <header className="flex justify-between items-center p-4 shadow-md fixed top-0 left-[204px] xl:left-[320px] right-0 bg-white z-10">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded-3xl p-2 pl-10 w-96"
                        />
                        <img
                            src={search}
                            alt="Search"
                            className="absolute left-3 w-5 h-5"
                        />
                    </div>
                    <div className="flex items-center">
                        <img src={bell} alt="Notifications" className="w-4 h-4 mr-4" />
                        <img src={profile} alt="Profile" className="w-8 h-8 rounded-full" />
                    </div>
                </header>
            </div>
        </div>
    );
};

export default NavAndSide;
