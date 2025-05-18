import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Mic, Bell, CircleUserRound, Plus } from "lucide-react";
import SearchBar from "./SerchBar";
import ProfileMenu from "./ProfileMenu";
import { useGlobal } from "../Context/GlobalContext";
import { useAuth } from "../Context/AuthContext";
import CreateChannel from "./CreateChannel";
import VideoUpload from "./UploadVideo";

const Header = () => {
    // Toggle sidebar visibility from global context
  const { toggleSidebar } = useGlobal();
  //login logout function 
  const { user, logout } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateOptions, setShowCreateOptions] = useState(false);
   const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex items-center sm:gap-4 justify-between px-4 py-2 sticky top-0 bg-white z-30">
      {/* Left Section: Menu , Logo */}
      <div className="flex items-center space-x-1">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
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
      <div className="sm:flex items-end w-full max-w-md md:max-w-xl lg:max-w-2xl mx-4">
        <SearchBar />
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-2">
        <button className="sm:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Mic className="w-5 h-5" />
        </button>
          {/* Create button with dropdown for channel or video upload */}
        <div className="relative">
  <button
    onClick={() => {
      setShowCreateOptions(!showCreateOptions);
      setIsOpen(false);
    }}
    className="text-black bg-gray-200 flex items-center py-2 px-3 text-sm rounded-full hover:bg-gray-300"
  >
    <Plus className="w-5 h-5 mr-1" />
    Create
  </button>
{/* Dropdown menu shown when 'Create' is toggled */}
  {showCreateOptions && (
    <div className="absolute mt-1 w-40 bg-white rounded-lg shadow-md z-50">
      <button
        onClick={() => {
          setShowCreateModal("channel");
          setShowCreateOptions(false);
        }}
        className="block w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100 text-sm rounded-md "
      >
        Create Channel
      </button>
      <button
        onClick={() => {
          setShowCreateModal("upload");
          setShowCreateOptions(false);
        }}
        className="block w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100 text-sm rounded-md "
      >
        Upload Video
      </button>
    </div>
  )}
</div>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <Bell className="w-5 h-5" />
        </button>
{/* If user is logged in, show profile menu, else show sign-in button */}
        {user ? (
          <ProfileMenu user={user} onSignOut={logout} />
        ) : (
          <Link to="/Login">
            <button className="flex items-center gap-2 md:gap-1 border border-gray-300 text-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition">
              <CircleUserRound className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium truncate">
                Sign in
              </span>
            </button>
          </Link>
        )}
      </div>
      {/* Modal for Create Channel */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center">
          <CreateChannel onCancel={() => setShowCreateModal(false)} />
        </div>
      )}
       {/* Modal for Video Upload */}
      {showCreateModal === "upload" && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
    <VideoUpload onClose={() => setShowCreateModal(null)} />
  </div>
)}
    </header>
  );
};

export default Header;
