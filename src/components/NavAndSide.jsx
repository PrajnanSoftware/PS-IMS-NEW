import { IoSettingsOutline, IoSpeedometer } from "react-icons/io5";
import { FaBox, FaShoppingCart, FaTags, FaUsers } from "react-icons/fa";
import bell from '../assets/images/bell.png';
import search from '../assets/images/vector.png';
import profile from '../assets/images/profile.png';
import { AiOutlineRise } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { PiCubeFocusFill } from 'react-icons/pi';
import { CiLogout } from 'react-icons/ci';

const NavAndSide = () => {
    return (
        <div className="flex">
            <div className="bg-[#0A2240] h-screen w-50 xl:w-80 p-5 fixed rounded-lg">
                <NavLink to="/" className="flex items-center mt-5 mb-5 justify-center">
                    <PiCubeFocusFill className="text-[#1570EF] text-4xl mr-2" />
                    <span className="text-[#1570EF] text-2xl">Dashboard</span>
                </NavLink>
                <nav>
                    <NavLink className={({ isActive }) =>
                        `${isActive ? 'text-white' : 'text-[#949494]'} flex items-center p-4 hover:text-white transition duration-300 mt-10 justify-center`}
                        to="/">
                        <IoSpeedometer className="text-[#1570EF] text-2xl mr-2" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `${isActive ? 'text-white' : 'text-[#949494]'} flex items-center p-4 hover:text-white transition duration-300 mt-5 justify-center`}
                        to="/stock">
                        <FaBox className="text-[#1570EF] text-2xl mr-2" />
                        <span>In Stock</span>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `${isActive ? 'text-white' : 'text-[#949494]'} flex items-center p-4 hover:text-white transition duration-300 mt-5 justify-center`}
                        to="/products">
                        <FaTags className="text-[#1570EF] text-2xl mr-2" />
                        <span>Products</span>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `${isActive ? 'text-white' : 'text-[#949494]'} flex items-center p-4 hover:text-white transition duration-300 mt-5 justify-center`}
                        to="/sales">
                        <AiOutlineRise className="text-[#1570EF] text-2xl mr-2" />
                        <span>Sales</span>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `${isActive ? 'text-white' : 'text-[#949494]'} flex items-center p-4 hover:text-white transition duration-300 mt-5 justify-center`}
                        to="/orders">
                        <FaShoppingCart className="text-[#1570EF] text-2xl mr-2" />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `${isActive ? 'text-white' : 'text-[#949494]'} flex items-center p-4 hover:text-white transition duration-300 mt-5 justify-center`}
                        to="/users">
                        <FaUsers className="text-[#1570EF] text-2xl mr-2" />
                        <span>Users</span>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `${isActive ? 'text-white' : 'text-[#949494]'} flex items-center p-4 hover:text-white transition duration-300 mt-64 justify-center`}
                        to="/settings">
                        <IoSettingsOutline className="text-[#1570EF] text-2xl mr-2" />
                        <span>Settings</span>
                    </NavLink>
                    <NavLink className={({ isActive }) =>
                        `${isActive ? 'text-red-600' : 'text-[#FF0000]'} flex items-center p-4 hover:text-red-800 transition duration-300 mt-4 justify-center`}
                        to="/logout">
                        <CiLogout className="text-[#FF0000] text-2xl mr-2" />
                        <span>Logout</span>
                    </NavLink>
                </nav>
            </div>

            <div className="flex-1 ml-[200px] xl:ml-[320px] bg-white fixed w-10/12">
                <header className="flex justify-around items-center p-4 shadow-md">
                    <div className="relative flex items-center ">
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