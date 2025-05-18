import React from 'react';
import Sidebar from './Sidebar';
import FilterButtons  from './FilterButtons';
import VideoList from './VideoList';
import { useAuth } from '../Context/AuthContext';
import { useGlobal } from '../Context/GlobalContext';

//Home page component shows sidebar,filter buttons and video grid
const HomePage = () => {
const { isSidebarOpen } = useGlobal();
const {user}=useAuth();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">   
      <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-1 p-4 overflow-y-auto transition-all duration-300  ${isSidebarOpen?'ml-40 sm:ml-48 md:ml-56 lg:ml-60 xl:ml-64' : 'ml-16 sm:ml-20 md:ml-24'}`}>

          {user ? (<div><FilterButtons/>
                          <VideoList />
            </div>):(<div className="flex justify-center items-center w-full">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-max text-center">
        <h2 className="text-3xl font-semibold mb-2">Do Sign In to get started</h2>
        <p className="text-gray-600">Start watching videos to help us build a feed of videos you'll love.</p>
      </div>
    </div>)}
          
        </main>
      </div>
    </div>
  );
};

export default HomePage;
