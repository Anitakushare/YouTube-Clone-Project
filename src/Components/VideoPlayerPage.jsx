import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import useFetch from "../Utils/useFetch";
import { useOutletContext } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { useRef } from "react";
import VideoPlayer from "./VideoPlayer";
import VideoActions from "./VideoActions";

function VideoPlayerPage() {
  const { data,loading,error} = useFetch();
   const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const {isSidebarOpen}=useOutletContext()
  const [video, setVideo] = useState(null);
  
   const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:3000/api/video/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideo(res.data.video);
      } catch (err) {
        console.error("Failed to fetch video", err);
      }
    };
    fetchVideo();
  }, [id]);

  if (!video) return <div className="p-4">Loading...</div>;

  return (
    <div className={`flex flex-col lg:flex-row gap-6 flex-1 p-4 overflow-y-auto transition-all duration-300  ${isSidebarOpen?'ml-40 sm:ml-48 md:ml-56 lg:ml-60 xl:ml-64' : 'ml-16 sm:ml-20 md:ml-24'}`}>
         <Sidebar isOpen={isSidebarOpen} />
      {/* Left - Video content */}
      <div className="flex-1">
       <VideoPlayer videoRef={videoRef} videoUrl={video.videoUrl} />
        
        <h1 className="text-2xl font-bold mt-2">{video.title}</h1>
        {/* Channel info and subscribe */}
       <div className="flex items-center justify-between pt-2 gap-2">
        <div className="flex items-center pt-4 gap-2">
          <img
            src={video.uploader?.avatar || "/default-avatar.png"}
            className="w-12 h-12 rounded-full object-cover"
            alt="Uploader"
          />
          <div className="flex flex-col">
            <p className="font-semibold">{video.channelId?.channelName}</p>
            <p className="text-gray-500 text-sm">@{video.uploader?.userName}</p>
          </div>
            <button className=" px-4 py-1 bg-gray-200 text-black rounded-full hover:bg-gray-300">
            Join
          </button>
          <button className=" px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800">
            Subscribe
          </button>
          </div>
             <div className="flex items-center space-x-4  text-black ">
               <VideoActions likes={video.likes} dislikes={video.dislikes} />
             </div>
        
         </div>

        {/* Description */}
        <div className=" relative mt-4 bg-gray-100 p-4 rounded-lg text-md text-gray-900 whitespace-pre-line">
          <div className={`transition-all duration-500 overflow-hidden ${
                expanded ? 'max-h-[500px]' : 'max-h-[100px]'
                } bg-gray-100 p-4 rounded-lg text-md text-gray-900`}
          >
                 <p>{video.description}</p>
           </div>
             <button onClick={() => setExpanded(!expanded)}className="text-black font-semibold mt-2 hover:underline">
                     {expanded ? 'Show less' : 'Read more...'}
             </button>
            </div>
      
          </div>

      {/* Right - Suggested Videos */}
      <aside className="w-full lg:w-1/3">
        <h2 className="text-gray-700 font-semibold mb-2">Recommended Videos</h2>
        {data?.map((vid) => (
          <VideoCard key={vid._id || vid.id} video={vid} />
        ))}
      </aside>
    </div>
  );
}

export default VideoPlayerPage;
