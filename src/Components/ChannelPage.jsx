import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChannelByHandle } from "../Utils/ChannelApi";
import Sidebar from "./Sidebar";
import ChannelHeader from "./ChannelHeader";
import { Upload } from "lucide-react";
import { useGlobal } from "../Context/GlobalContext";
import VideoCard from "./VideoCard";
import UploadVideo from "./UploadVideo";
import { deleteVideo } from "../Utils/VideoApi";

//channel page component
const ChannelPage = () => {
  const { channel, setChannel, toggleSidebar, isSidebarOpen } = useGlobal();
  const { handle } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videos, setVideos] = useState();
 //const [videoFilter, setVideoFilter] = useState('Latest');
    const [activeTab,setActiveTab]=useState("Home");
  const [notFound, setNotFound] = useState(false);

  //Get channel Details by channel handle
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getChannelByHandle(handle, token);
        const resData = res.data?.channel;
        setChannel(resData);
        setVideos(resData?.videos || []);
        setNotFound(false);
      } catch (err) {
        if (err.response?.status === 404) {
          // Channel doesn't exist
          setNotFound(true);
        } else {
          // Log other unexpected errors
          console.error("Unexpected error while fetching channel:", err);
        }
      }
    };
    fetchChannel();
  }, [handle, setChannel]);
  //If No channel created navigateto create channel page
  const handleCreateChannel = () => {
    navigate("/create-channel");
  };
  //Edit Video Function
  const handleEdit = (video) => {
    setEditingVideo(video);
    setShowModal(true);
  };
  const handleVideoUpdate = (updatedVideo) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === updatedVideo._id ? updatedVideo : video
      )
    );
  };
  //Handle Delete function api call for delete perticular video
  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      //acces token from local storage
      const token = localStorage.getItem("token");
      await deleteVideo(videoId, token);
      // Instead of updating channel.videos, update the videos state
      setChannel((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
      }));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
  //Filter video by catagory like Popular ,Latest,Older
  //   const getFilteredVideos = () => {
  //   if (!channel?.videos) return [];
  
  //   let filtered = [...channel.videos];
  
  //   if (videoFilter === "Latest") {
  //     filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  //   } else if (videoFilter === "Oldest") {
  //     filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  //   } else if (videoFilter === "Popular") {
  //     filtered.sort((a, b) => b.likes.length - a.likes.length); // or b.views - a.views
  //   }
  
  //   return filtered;
  // };
  return (
    <div className="relative flex">
      {/**sidebar Toggel */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 z-20" onClick={toggleSidebar}>
          <Sidebar />
        </div>
      )}
      {/**Call to channel header Component */}
      <div className="w-full max-w-screen-lg mx-auto p-4 ">
        <ChannelHeader
          channel={channel}
          notFound={notFound}
          onCreate={handleCreateChannel}
          activeTab={activeTab}
         setActiveTab={setActiveTab}
        />

        {/* Video Grid */}
        {!notFound && (
          <>
            {channel?.videos?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-md">
                {videos?.map((vid) => (
                  <VideoCard
                    key={vid._id || vid.id}
                    video={vid}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showMenu={true}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-600 mt-6">
                <h2 className="text-xl font-semibold mb-2">
                  No videos uploaded yet
                </h2>
                <p className="text-sm mb-4">
                  Start uploading videos to share with your audience.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex flex-col items-center text-black px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition roundead-lg"
                >
                  <Upload size={18} />
                  Upload Video
                </button>
              </div>
            )}
          </>
        )}
      </div>
       
      {/* Modal */}
      {showModal && (
        <UploadVideo
          onClose={() => {
            setShowModal(false);
            setEditingVideo(null);
          }}
          editingVideo={editingVideo}
          onUpdate={handleVideoUpdate}
        />
      )}
      
    </div>  
  );
};

export default ChannelPage;
