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

const ChannelPage = () => {
  const { handle } = useParams();
  const [channel, setChannel] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const { toggleSidebar, isSidebarOpen } = useGlobal();
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videos,setVideos]=useState();

  //Get channel Details by channel handle
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getChannelByHandle(handle, token);
        const resData=res.data.channel
        setChannel(resData);
        setNotFound(false);
      } catch (err) {
        console.error("Channel not found", err);
        setNotFound(true);
      }
    };
    fetchChannel();
  }, [handle]);

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
      await deleteVideo(videoId,token);
       console.log("Deleting video with ID:", videoId);
      setChannel((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v._id !== videoId),
      }));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };
 
  return (
    <div className="relative flex">
        {/**sidebar Toggel */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 z-20" onClick={toggleSidebar}>
          <Sidebar />
        </div>
      )}
      <div className="w-full max-w-screen-lg mx-auto p-4 ">
        <ChannelHeader
          channel={channel}
          notFound={notFound}
          onCreate={handleCreateChannel}
        />

        {/* Video Grid */}
        {!notFound && (
          <>
            {channel?.videos?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-md">
                {channel?.videos?.map((vid) => (
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
