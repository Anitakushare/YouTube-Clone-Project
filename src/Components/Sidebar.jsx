import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { Link,useLocation } from "react-router-dom";
import { useGlobal } from "../Context/GlobalContext";
import "../App.css";

import { Home,
    Compass,
    Video,
    Clock,
    Play,
    Heart,
    User,
    Settings,
    HelpCircle,
    MessageCircle,
    Flag,
    Zap,
    Film,
    Scissors,
    ListVideo,
    Podcast} from "lucide-react"; // Optional: icon library

const Sidebar = () => {
const { toggleSidebar,isSidebarOpen } = useGlobal();
 const location = useLocation();
 const isVideoPage = location.pathname.startsWith("/video/");
  if (isVideoPage && !isSidebarOpen) return null;

    
  return (
    <div>
  {isSidebarOpen ? (
    <aside
      className=" fixed top-16 left-0 h-[calc(100vh-56px)] w-40 sm:w-48 md:w-56 lg:w-60 xl:w-64 bg-white p-4 transition-all duration-300 overflow-hidden hover:overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparen">
      <nav className="flex flex-col space-y-4">
        <Link to='/'><SidebarItem icon={<Home />} label="Home" /></Link>
        <SidebarItem icon={<Compass />} label="Explore" />
        <SidebarItem icon={<Video />} label="Subscriptions" />
        <SidebarItem icon={<Film />} label="Shots" />
       
      </nav>

      <nav className="flex flex-col space-y-4 mt-8 border-t pt-4">
        <h2 className="text-lg h-full rounded-xl p-2 text-black font-semibold pl-3 bg-gray-100">You</h2>
        <SidebarItem icon={<Clock />} label="History" />
        <SidebarItem icon={<Play />} label="Your Videos" />
        <SidebarItem icon={<ListVideo />} label="Playlists" />
        <SidebarItem icon={<Heart />} label="Liked Videos" />
        <SidebarItem icon={<Clock />} label="Watch Later" />
        <SidebarItem icon={<Scissors />} label="Your Clips" />
        <SidebarItem icon={<Podcast />} label="Podcasts" />
        <SidebarItem icon={<Film />} label="Shots" />
      </nav>

      <nav className="flex flex-col space-y-4 mt-8 border-t">
        <h2 className="text-lg h-full p-3 text-gray-800 font-semibold pl-3 bg-gray-100 ">Explore</h2>
        <div className="ml-6 space-y-2">
          <SidebarItem icon={<Zap />} label="Trending" />
          <SidebarItem icon={<Film />} label="Movies" />
          <SidebarItem icon={<Podcast />} label="Podcasts" />
          <SidebarItem icon={<Video />} label="Live" />
        </div>
      </nav>

      <nav className="flex flex-col space-y-4 mt-8 border-t">
        <h2 className="text-lg h-full p-3 text-gray-800 font-semibold pl-3 bg-gray-100">Subscriptions</h2>
        <div className="ml-6 space-y-2">
          <SidebarItem icon={<User />} label="Channel 1" />
          <SidebarItem icon={<User />} label="Channel 2" />
          <SidebarItem icon={<User />} label="Channel 3" />
        </div>
      </nav>

      <nav className="flex flex-col space-y-4 mt-8 border-t">
        <h2 className="text-lg h-full p-3 text-gray-800 font-semibold pl-3 bg-gray-100">Your Library</h2>
        <SidebarItem icon={<Clock />} label="History" />
        <SidebarItem icon={<Play />} label="Your Videos" />
        <SidebarItem icon={<ListVideo />} label="Playlists" />
        <SidebarItem icon={<Heart />} label="Liked Videos" />
        <SidebarItem icon={<Clock />} label="Watch Later" />
        <SidebarItem icon={<Scissors />} label="Your Clips" />
        <SidebarItem icon={<Film />} label="Shots" />
      </nav>

      <nav className="flex flex-col space-y-4 mt-8 border-t pt-4">
        <SidebarItem icon={<Settings />} label="Settings" />
        <SidebarItem icon={<HelpCircle />} label="Help" />
        <SidebarItem icon={<MessageCircle />} label="Send Feedback" />
        <SidebarItem icon={<Flag />} label="Report History" />
      </nav>
      
    </aside>
  ) : (
    <aside className="fixed top-16 left-0 h-full w-16 bg-white  p-4 transition-transform duration-300">
      <nav className="flex flex-col space-y-4">
         <Link to='/'><SidebarItem icon={<Home />} label="Home" collapsed/></Link>
        <SidebarItem icon={<Film />} label="Shots" collapsed />
        <SidebarItem icon={<Video />} label="Subscriptions" collapsed />
        <SidebarItem icon={<User />} label="You" collapsed/>
        <SidebarItem icon={<Clock/>} label="History" collapsed />
      </nav>
    </aside>
  )}
</div>

  );
};
export default Sidebar;
