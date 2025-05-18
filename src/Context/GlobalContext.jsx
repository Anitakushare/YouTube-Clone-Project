import { createContext, useContext, useState } from 'react';
// Create a new context for global state
const GlobalContext = createContext();
// GlobalContextProvider wraps your entire app and provides shared state
export const GlobalContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   // Stores the currently selected filter
  const [selectedFilter, setSelectedFilter] = useState('All');
  // Stores the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  // Stores the current user's channel information
  const [channel,setChannel]=useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
// Provide the state and functions to all children components
  return (
    <GlobalContext.Provider value={{
      isSidebarOpen,
      toggleSidebar,
      selectedFilter,
      setSelectedFilter,
      searchTerm,
      setSearchTerm,
      channel,
      setChannel
    }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobal = () => useContext(GlobalContext);
