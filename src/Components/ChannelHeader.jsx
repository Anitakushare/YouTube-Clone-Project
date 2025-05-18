import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChannelHeader = ({ channel, notFound,activeTab,setActiveTab }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
   
  
  const {user}=useAuth();
  const navigate=useNavigate();
  const handleNavigate=()=>{
    navigate("/CreateChannel");
  }
//Read more toggle
  const handleReadMoreToggle = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  // If user doesn't have a channel display this
  if (notFound) {
    return (
      <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 min-h-screen rounded-lg">
  <div className="flex flex-col">
  <img
    src={user.avatar}
    alt="No content"
    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full shadow-md"
  />
  <h1 className="text-2xl font-bold text-gray-800 mt-2">{user?.userName}</h1>
</div>
 <div className="mt-6 border-b border-gray-200">
  <nav className="flex space-x-6 text-sm font-medium text-gray-600">
    {["Home", "Videos", "Shorts", "Live", "Playlists", "Community"].map((tab) => (
      <span
        key={tab}
        className={`cursor-pointer pb-2 ${
          activeTab === tab ? "text-black border-b-2 border-black" : "hover:text-black"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </span>
    ))}
  </nav>
</div>

  <div className="flex flex-col items-center justify-center text-center mt-16 px-4">
    <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-800">No Channel Available</h2>
    <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl">
      You haven’t created a channel yet. Create one to upload videos and share your content.
    </p>
    <button
      onClick={handleNavigate}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Create Channel
    </button>
  </div>
</div>

    );
  }

  // If user has a channel then display channel information
  return (
    <div>
      <img
        src={channel?.channelBanner}
        className="w-full h-48 object-cover rounded-lg"
        alt="banner"
      />

      <div className="flex items-center gap-4 mt-4">
        <img
          src={channel?.owner?.avatar}
          alt="avatar"
          className="w-40 h-40 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{channel?.channelName}</h1>
          <p className="text-gray-600 text-sm">
            @{channel?.handle} • {channel?.subscribers || 0} subscribers • {channel?.videos?.length || 0} videos
          </p>

          {channel?.description && (
            <p className="text-sm mt-1 text-gray-700">
              {showFullDescription
                ? channel.description
                : `${channel.description.slice(0, 150)}... `}
              {channel.description.length > 150 && (
                <button
                  onClick={handleReadMoreToggle}
                  className="text-blue-600 ml-1"
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              )}
            </p>
          )}

          <button className="mt-2 px-4 py-1 bg-black text-white rounded-full text-sm">
            Subscribe
          </button>
        </div>
      </div>
       <div className="mt-6 border-b border-gray-200">
        <nav className="flex space-x-6 text-sm font-medium text-gray-600">
          {["Home", "Videos", "Shorts", "Live", "Playlists", "Community"].map((tab) => (
            <span
              key={tab}
              className={`cursor-pointer pb-2 ${
                activeTab === tab ? "text-black border-b-2 border-black" : "hover:text-black"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </nav>
      </div>
     
   </div> )}
export default ChannelHeader;