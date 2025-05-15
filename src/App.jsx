
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { useAuth } from './Context/AuthContext';
import { useState,useEffect } from "react";

function App() {
   const { logout } = useAuth();
  const [authError, setAuthError] = useState('');
  useEffect(() => {
    const handleTokenExpired = () => {
      setAuthError("Your session expired. Please login again.");
      logout();
    };

    window.addEventListener("tokenExpired", handleTokenExpired);
    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };
  }, [logout]);
  
  return (
    <div className="flex flex-col h-screen">
        <Header  />
         {authError && (
        <div className="bg-red-100 text-red-700 text-center py-2 text-sm">
          {authError}
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default App
