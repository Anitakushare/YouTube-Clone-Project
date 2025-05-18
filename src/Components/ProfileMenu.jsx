import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

//Profile Menu Component
const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(); // Clear auth data
    navigate("/"); // Redirect to home
  };
//user Profile info
  return (
    
    <div className="relative">
      {user?.avatar && (
        <button
          className="w-10 h-10 rounded-full  text-white flex items-center justify-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            src={user.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </button>
      )}
{/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl z-500">
          <div className="p-4 border-b">
            <p className="font-semibold text-lg">{user.userName}</p>
            <p className="text-lg text-gray-500">@{user.userName}</p>

            {user.channels &&
            user.channels.length > 0 &&
            user.channels[0].handle ? (
              <Link
                to={`/channel/${user.channels[0].handle}`}
                className="text-blue-600 text-sm mt-1 block"
              >
                View your channel
              </Link>
            ) : (
              <Link
                to="/channel/:handle"
                className="text-blue-600 text-sm mt-1 block"
              >
                View Your Channel
              </Link>
            )}
          </div>
          <ul className="p-2 text-sm">
            <Link
              to="#"
              className="block w-full p-2 hover:bg-gray-100 cursor-pointer"
            >
              Google Account
            </Link>
            <Link
              to="#"
              className="block w-full p-2 hover:bg-gray-100 cursor-pointer"
            >
              Switch account
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left p-2 hover:bg-gray-100 cursor-pointer"
            >
              Sign out
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
