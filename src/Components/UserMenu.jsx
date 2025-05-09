import React, { useState, useRef, useEffect } from 'react';

const UserMenu = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {user?.userName?.charAt(0).toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-xl z-50">
          <div className="p-4 border-b">
            <p className="font-semibold text-lg">{user.userName}</p>
            <p className="text-lg text-gray-500">@{user.userName}</p>
            <a href="/channel" className="text-blue-600 text-sm mt-1 block">View your channel</a>
          </div>
          <ul className="p-2 text-sm">
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Google Account</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Switch account</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={onSignOut}>Sign out</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">YouTube Studio</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Purchases and memberships</li>
          </ul>
          <ul className="p-2 border-t text-sm">
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Your data in YouTube</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Appearance: Device theme</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Language: English</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Restricted Mode: Off</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Location: India</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Keyboard shortcuts</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
