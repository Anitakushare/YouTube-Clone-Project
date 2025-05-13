
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
//import Home from "./Components/Home";
import { useAuth } from "./Context/AuthContext";
import { useState } from "react";

function App() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 const { user, logout } = useAuth();
  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
        <Header onToggleSidebar={handleToggleSidebar} user={user} 
  onSignOut={logout} />
      <Outlet context={{isSidebarOpen, user }} />
    </div>
  )
}

export default App
