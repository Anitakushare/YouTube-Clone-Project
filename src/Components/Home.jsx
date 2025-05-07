import React from "react";
import { Menu, Mic, Search, Bell, CircleUserRound } from "lucide-react";
import SearchBar from "./SerchBar";

const Home = ({ onToggleSidebar }) => {
  return (
    <header className="flex items-center sm:gap-4 justify-between px-4 py-2 sticky top-0 bg-white z-30">
      {/* Left Section: Menu + Logo */}
      <div className="flex items-center space-x-1">
        <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-100 rounded-full">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-1">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            className="h-4 sm:h-5 w-auto"
            alt="YouTube Logo"
          />
          <sup className="text-xs text-gray-600 mt-1">IN</sup>
        </div>
      </div>

      {/* Middle Section: Search bar (hidden on xs) */}
      <div className="sm:flex items-center w-full max-w-md md:max-w-xl lg:max-w-2xl mx-4">
        <SearchBar/>
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-2">
        {/* Mic (shown only on xs) */}
        <button className="sm:hidden p-2 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200">
          <Mic className="w-5 h-5" />
        </button>

        {/* Create (hidden on small screens) 
        <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition">
          <Plus strokeWidth={1} className="w-5 h-5" />
          <span className="text-sm font-medium">Create</span>
        </button> */}

        {/* Notifications */}
        <button className="p-2 rounded-full cursor-pointer hover:bg-gray-200">
          <Bell className="w-5 h-5" />
        </button>

        {/* Sign in (hidden on xs) */}
        <button className="flex items-center cursor-pointer gap-2 md:gap-1 border border-gray-300 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition">
          <CircleUserRound strokeWidth={1.2} className="w-5 h-5" />
          <span className="hidden sm:inline md:flex text-sm font-medium truncate">Sign in</span>
        </button>
      </div>
    </header>
  );
};

export default Home;
