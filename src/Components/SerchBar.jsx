import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { useGlobal } from "../Context/GlobalContext";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false); 
  const { searchTerm, setSearchTerm } = useGlobal();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearch = () => {
  if (searchTerm.trim() !== "") {
    setSearchTerm(searchTerm);
    if (location.pathname !== "/") {
      navigate("/"); // ✅ only if you're not on home
    }
  }
}
  
  return (
    <>
      {/* Mobile Search */}
      <div className="flex sm:hidden items-center w-full px-4 mt-2">
        {showMobileSearch ? (
            <div className="fixed inset-0 z-50 bg-transperent bg-opacity-50 flex items-start justify-center px-4 pt-4">
    <div className="bg-white w-full rounded-full flex items-center px-4 py-2 shadow-md max-w-lg">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-2 py-1 outline-none"
            />
            <button type="submit"
              className="ml-2 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowMobileSearch(false)}
            >
              ✕
            </button>
          </div></div>
        ) : (
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={() => setShowMobileSearch(true)}
          >
             <Search strokeWidth={1} className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Desktop / Tablet Full Search Bar */}
      <div className="hidden sm:flex items-center w-full max-w-md md:max-w-xl lg:max-w-2xl sm:mx-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
        />
        <button onClick={handleSearch} className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
          <Search strokeWidth={1} className="w-6 h-6" />
        </button>
        <button className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
