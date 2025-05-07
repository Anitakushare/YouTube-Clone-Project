import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import { useState } from "react";
function App() {
  const [sidebarOpen,setSidebarOpen]=useState();

  function handleToggleSidebar(){
    setSidebarOpen(prev => !prev);
  }
  

  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1">
        <Home onToggleSidebar={handleToggleSidebar} />
      </div>
      
    </div>
  )
}

export default App
