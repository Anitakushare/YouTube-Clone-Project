import React, { useEffect } from "react";
import { Link} from "react-router-dom";
 const VideoCard = ({ video }) => {
 
    return (
      <Link to={`/video/${video._id}`}>
      <div className="w-full sm:w-86 p-2">
        <img src={video.thumbnailUrl} alt={video.title} className="rounded-xl" />
        <h3 className="font-semibold mt-1 text-lg">{video.title}</h3>
         <p className="text-sm text-gray-600">{video.channelId.channelName}</p>
        <p className="text-sm text-gray-500">{video.views.toLocaleString()} views</p>
      </div>
      </Link>
    );
  };
  export default VideoCard;