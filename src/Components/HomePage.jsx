import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FilterButtons  from './FilterButtons';
import VideoList from './VideoList';
import { useOutletContext, useParams } from 'react-router-dom';
//import useFetch from '../Utils/useFetch';
const HomePage = () => {
  const {isSidebarOpen,user}=useOutletContext()
  const [selectedFilter, setSelectedFilter] = useState('All');
  

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">   
      <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-4 overflow-y-auto transition-all duration-300  ${isSidebarOpen?'ml-40 sm:ml-48 md:ml-56 lg:ml-60 xl:ml-64' : 'ml-16 sm:ml-20 md:ml-24'}`}>
          {user ? (<div><FilterButtons selectedFilter={selectedFilter} onFilterSelect={handleFilterSelect} />
                          <VideoList filter={selectedFilter} />
            </div>):('')}
          
        </main>
      </div>
    </div>
  );
};

export default HomePage;
