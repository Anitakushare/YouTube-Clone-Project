import React from "react";
 const VideoCard = ({ video }) => {
    return (
      <div className="w-full sm:w-60 p-2">
        <img src={video.thumbnailUrl} alt={video.title} className="rounded-xl" />
        <h3 className="font-semibold mt-1 text-sm">{video.title}</h3>
        <p className="text-xs text-gray-600">{video.uploader}</p>
        <p className="text-xs text-gray-500">{video.views.toLocaleString()} views</p>
      </div>
    );
  };
  export default VideoCard;