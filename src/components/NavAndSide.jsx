import React, { useState } from 'react';
import { IoSettingsOutline, IoSpeedometer } from "react-icons/io5";
import { FaBox, FaShoppingCart, FaTags } from "react-icons/fa";
import bell from '../assets/images/bell.png';
import search from '../assets/images/vector.png';
import profile from '../assets/images/profile-pic.jpg';
import { AiOutlineRise } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { PiCubeFocusFill } from 'react-icons/pi';
import { CiLogout } from 'react-icons/ci';
import { TbReportAnalytics } from "react-icons/tb";
import Swal from 'sweetalert2';

const NavAndSide = () => {
    const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
    const [isNotificationCardVisible, setIsNotificationCardVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Raghu',
        place: 'New York',
        phoneNumber: '123-456-7890',
        profilePicture: profile,
    });

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        setIsEditing(false);
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setProfileData((prevData) => ({ ...prevData, profilePicture: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const navItems = [
        { to: '/app', label: 'Dashboard', icon: <IoSpeedometer /> },
        { to: '/app/inventory-dashboard', label: 'Inventory', icon: <FaBox /> },
        { to: '/app/reports', label: 'Reports', icon: <FaTags /> },
        { to: '/app/suppliers', label: 'Suppliers', icon: <TbReportAnalytics /> },
        { to: '/app/orders', label: 'Orders', icon: <AiOutlineRise /> },
        { to: '/app/manage-store', label: 'Manage Store', icon: <FaShoppingCart /> },
        { to: '/get-started', label: 'Logout', icon: <CiLogout />, special: true, },
    ];

    const fetchOutForDeliveryOrders = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/orders?status=Out for Delivery');
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching out for delivery orders:', error);
        }
    };

    const handleBellClick = () => {
        setIsNotificationCardVisible(!isNotificationCardVisible);
        if (!isNotificationCardVisible) {
            fetchOutForDeliveryOrders();
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="bg-[#0A2240] h-screen w-[204px] xl:w-[320px] p-5 fixed">
                <NavLink to="/app" className="flex items-center mt-5 mb-5 justify-center">
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
                ${extraClass ? extraClass : 'mt-5'}  
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
                        <img
                            src={bell}
                            alt="Notifications"
                            className="w-4 h-4 mr-4 cursor-pointer"
                            onClick={handleBellClick}
                        />
                        <img
                            src={profileData.profilePicture}
                            alt="Profile"
                            className="w-8 h-8 rounded-full cursor-pointer"
                            onClick={() => setIsProfileCardVisible(true)}
                        />
                    </div>
                </header>

                {isNotificationCardVisible && (
                    <div className="fixed top-16 right-4 bg-white p-4 rounded-lg shadow-lg w-80 z-20">
                        <h3 className="text-lg font-bold mb-2">Out for Delivery</h3>
                        <ul>
                            {notifications.length > 0 ? (
                                notifications.map(notification => (
                                    <li key={notification._id} className="border-b py-2">
                                        {notification.productName}
                                    </li>
                                ))
                            ) : (
                                <li className="py-2">No orders out for delivery</li>
                            )}
                        </ul>
                    </div>
                )}

                {isProfileCardVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-md w-flex">
                            <h2 className="text-lg font-bold mb-4">Profile</h2>
                            <div className="flex justify-center mb-4 items-center">
                                <img
                                    src={profileData.profilePicture}
                                    alt="Profile Picture"
                                    className="w-24 h-24 rounded-full"
                                />
                                {isEditing && (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
                                        className="ml-4"
                                    />
                                )}
                            </div>
                            <form>
                                <div className="mb-4">
                                    <label className="block mb-1">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Place:</label>
                                    <input
                                        type="text"
                                        name="place"
                                        value={profileData.place}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1">Phone Number:</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={profileData.phoneNumber}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </form>
                            <div className="flex justify-end">
                                {isEditing ? (
                                    <button
                                        type="button"
                                        onClick={handleSaveProfile}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleEditProfile}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setIsProfileCardVisible(false)}
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ml-2"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavAndSide;