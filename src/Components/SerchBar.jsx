import { useState } from "react";
import { Search, Mic } from "lucide-react";

const SearchBar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      {/* Mobile Search Icon Only */}
      <div className="flex sm:hidden items-center">
        {showMobileSearch ? (
          <div className="flex items-center w-full bg-white px-2 py-1 rounded-full border border-gray-300">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow px-2 py-1 outline-none"
            />
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Mic className="w-5 h-5" />
            </button>
            <button
              className="ml-2 p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowMobileSearch(false)}
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={() => setShowMobileSearch(true)}
          >
            <Search className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Desktop / Tablet Full Search Bar */}
      <div className="hidden sm:flex items-center w-full max-w-md md:max-w-xl lg:max-w-2xl sm:mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none"
        />
        <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
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
