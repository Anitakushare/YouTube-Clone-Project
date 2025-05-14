import React from "react";
import { Link } from 'react-router-dom';
import { Menu, Mic, Bell, CircleUserRound } from "lucide-react";
import SearchBar from "./SerchBar";
import ProfileMenu from "./ProfileMenu";
import { useGlobal } from "../Context/GlobalContext";
import { useAuth } from "../Context/AuthContext";

const Header = () => {
  const { toggleSidebar } = useGlobal();
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center sm:gap-4 justify-between px-4 py-2 sticky top-0 bg-white z-30">
      {/* Left Section: Menu + Logo */}
      <div className="flex items-center space-x-1">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-full">
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

      {/* Middle Section: Search bar */}
      <div className="sm:flex items-center w-full max-w-md md:max-w-xl lg:max-w-2xl mx-4">
        <SearchBar />
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-2">
        <button className="sm:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Mic className="w-5 h-5" />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bell className="w-5 h-5" />
        </button>

        {user ? (
          <ProfileMenu user={user} onSignOut={logout} />
        ) : (
          <Link to="/Login">
            <button className="flex items-center gap-2 md:gap-1 border border-gray-300 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition">
              <CircleUserRound className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium truncate">Sign in</span>
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
