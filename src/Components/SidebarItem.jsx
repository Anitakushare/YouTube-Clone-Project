import React from 'react'
  
const SidebarItem = ({ icon, label, collapsed }) => (
    <div
      className={`flex items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer w-full ${
        collapsed ? "flex-col justify-center" : "flex-row space-x-2"
      }`}
    >
      <div className="w-6 h-6">{icon}</div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
      {collapsed && <span className="text-[10px] mt-1">{label}</span>}
    </div>
  );
  
  export default SidebarItem
  