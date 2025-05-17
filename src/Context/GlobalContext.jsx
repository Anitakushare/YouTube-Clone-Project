import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [channel,setChannel]=useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

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
