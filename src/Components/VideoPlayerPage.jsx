import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import useFetch from "../Utils/useFetch";
import { useGlobal } from "../Context/GlobalContext";
import Sidebar from "./Sidebar";
import VideoPlayer from "./VideoPlayer";
import VideoActions from "./VideoActions";
import CommentPage from "./CommentPage";

function VideoPlayerPage() {
  const { data } = useFetch();
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const { toggleSidebar, isSidebarOpen } = useGlobal();
  const [video, setVideo] = useState(null);
  const token = localStorage.getItem("token");
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
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
  }, [id, token]);

  if (!video) return <div className="p-4">Loading...</div>;

  return (
    <div className=" relative flex">

      {/* Sidebar only if open */}
    {isSidebarOpen && (
        <div className="fixed top-0 left-0 z-20" onClick={toggleSidebar}>
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div
        className={`flex flex-col lg:flex-row gap-6 flex-1 p-4 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen
            ? "ml-10"
            : "ml-10"
        }`}
      >
        {/* Left - Video Section */}
        
        <div className="flex-1">
              {isSidebarOpen && (
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
          )}
          <VideoPlayer
            videoRef={videoRef}
            videoUrl={video.videoUrl}
            thumnailUrl={video.thumbnailUrl}
          />

          <h1 className="text-2xl font-bold mt-2">{video.title}</h1>

          <div className="flex items-center justify-between pt-2 gap-2">
            <div className="flex items-center pt-4 gap-2">
              <img
                src={video.uploader?.avatar || "/default-avatar.png"}
                className="w-12 h-12 rounded-full object-cover"
                alt="Uploader"
              />
              <div className="flex flex-col">
                <p className="font-semibold">{video.channelId?.channelName}</p>
                <p className="text-gray-500 text-sm">
                  @{video.uploader?.userName}
                </p>
              </div>
              <button className="px-4 py-1 bg-gray-200 text-black rounded-full hover:bg-gray-300">
                Join
              </button>
              <button className="px-2 py-1 bg-black text-white rounded-full hover:bg-gray-800">
                Subscribe
              </button>
            </div>
            <div className="flex items-center space-x-4 text-black">
              <VideoActions likes={video.likes} dislikes={video.dislikes} />
            </div>
          </div>

          {/* Description */}
          <div className="relative mt-4 bg-gray-100 p-4 rounded-lg text-md text-gray-900 whitespace-pre-line">
            <div
              className={`transition-all duration-500 overflow-hidden ${
                expanded ? "max-h-[500px]" : "max-h-[100px]"
              }`}
            >
              <p>{video.description}</p>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-black font-semibold mt-2 hover:underline"
            >
              {expanded ? "Show less" : "Read more..."}
            </button>
          </div>

          {/* Comments */}
          <div>
            <CommentPage
              videoId={id}
              token={token}
              comments={video.comments}
              setVideo={setVideo}
            />
          </div>
        </div>

        {/* Right - Suggested Videos */}
        <aside className="w-full lg:w-1/3">
          <h2 className="text-gray-700 font-semibold mb-2">Recommended Videos</h2>
          {data?.map((vid) => (
            <VideoCard key={vid._id || vid.id} video={vid} horizontal={true}/>
          ))}
        </aside>
      </div>
      
    </div>
  );
}

export default VideoPlayerPage;
