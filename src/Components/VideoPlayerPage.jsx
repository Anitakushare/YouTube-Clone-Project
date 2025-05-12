import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";

function VideoPlayerPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
          const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/video/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      setVideo(res.data.video);
    };
    fetchVideo();
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row p-4 gap-6">
      {/* Left Side - Video */}
      <div className="flex-1">
        <iframe
          className="w-full h-[300px] md:h-[500px] rounded-xl"
          src={video.thumbnailUrl}
          title={video.title}
          allowFullScreen
        ></iframe>
        <h1 className="text-xl font-semibold mt-4">{video.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
          <p>{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
          <div className="space-x-4">
            <button>👍 {video.likes}</button>
            <button>👎 {video.dislikes}</button>
            <button>🔗 Share</button>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex items-center gap-4 mt-4">
          <img
            src={video.uploader?.avatar}
            className="w-10 h-10 rounded-full"
            alt="Channel"
          />
          <div>
            <p className="font-bold">{video.channelId?.channelName}</p>
            <p className="text-xs text-gray-500">@{video.uploader?.userName}</p>
            <div><p className="text-xs text-gray-500 bg-gray-200">{video.description}</p></div>
          </div>
          
          <button className="ml-auto px-4 py-2 bg-red-600 text-white rounded-xl">
            Subscribe
          </button>
        </div>
      </div>

      {/* Right Side - Recommendations */}
      <div className="w-full md:w-1/3">
        {/* You can reuse VideoCard component */}
        <p className="text-gray-400">Recommended Videos</p>
        {data.map((video)=>(<VideoCard key={video._id || video.id} video={video} />))}
        {/* map recommended videos here */}
      </div>
    </div>
  );
}

export default  VideoPlayerPage;
