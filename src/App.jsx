
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { useAuth } from './Context/AuthContext';
import { useState,useEffect } from "react";


function App() {
  // Get the logout function from authentication context
   const { logout } = useAuth();
   
  // State to store authentication error messages
  const [authError, setAuthError] = useState('');
  //  Access for custom 'tokenExpired' event globally
  useEffect(() => {
    //handle when token expire
    const handleTokenExpired = () => {
      setAuthError("Your session expired. Please login again.");
      logout();
    };
  // Add event listener for 'tokenExpired' on window object
    window.addEventListener("tokenExpired", handleTokenExpired);
    return () => {
      window.removeEventListener("tokenExpired", handleTokenExpired);
    };
  }, [logout]);
  
  return (
    <div className="flex flex-col h-screen">
       {/* Header component always shown */}
        <Header  />
         {authError && (
        <div className="bg-red-100 text-red-700 text-center py-2 text-sm">
          {authError}
        </div>
      )}
      {/* Outlet renders matched child routes from React Router */}
      <Outlet/>
    </div>
  )
}

export default App
