import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import FilterButtons  from './FilterButtons';
import VideoList from './VideoList';
import { useAuth } from '../Context/AuthContext';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { user,logout } = useAuth();
  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    // You can add filter logic here to fetch or filter videos
  };
   const handleSignOut = () => {
    logout();
  };


  return (
    <div className="flex flex-col h-screen">
      <Header onToggleSidebar={handleToggleSidebar} user={user} 
  onSignOut={handleSignOut} />
     
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

export default Home;
