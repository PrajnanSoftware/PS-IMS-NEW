import React from "react";

const Header = () => {
    return (
        
     
        <header class="flex items-center justify-between bg-white p-4 shadow">
            <div class="relative w-1/3">
                <input class="w-full p-2 border rounded-lg pl-10" placeholder="Search product, supplier, order" type="text"/>
                <i class="fas fa-search absolute top-3 left-3 text-gray-400"></i>
            </div>
            <div class="flex items-center space-x-4">
                
                <button class="text-gray-400 focus:outline-none hover:text-gray-600">
                    <i class="fas fa-bell"></i>
                </button>
                
                
                <button class="focus:outline-none">
                    <img alt="User profile picture" class="w-10 h-10 rounded-full" src="https://storage.googleapis.com/a1aa/image/m6c9YdTsKBqLAB1o4eBNuRZxGj7WWOEGg4rVeQwK9Aqni60TA.jpg"/>
                </button>
            </div>
        </header>

    );
};

export default Header;
