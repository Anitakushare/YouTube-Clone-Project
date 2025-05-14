import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
const VideoCard = ({ video, horizontal = false }) => {
  if (horizontal) {
    // Sidebar-style layout for reccomended video 
    return (
      <Link to={`/video/${video._id}`} className="flex gap-3 mb-4">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-40 h-24 rounded-lg object-cover"
        />
        <div className="flex flex-col overflow-hidden w-full">
          {/* Recommended video Title  */}
          <div className="flex">
            <h3 className="text-md font-semibold leading-snug line-clamp-2 flex-1">
              {video.title}
            </h3>
            <EllipsisVertical className="w-4 h-4 text-gray-600 cursor-pointer" />
          </div>

          {/* Recommended Videos Content */}
          <div className="flex items-center justify-between mt-1">
            <div>
              <p className="text-sm text-gray-600 truncate">
                {video.channelId?.channelName}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {video.views.toLocaleString()} views
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  {/**Default videocCrd layout */}
  return (
    <Link to={`/video/${video._id}`}>
      <div className="w-full sm:w-86 p-2">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="rounded-xl"
        />
        <h3 className="font-semibold mt-1 text-lg">{video.title}</h3>
        <p className="text-sm text-gray-600">{video.channelId.channelName}</p>
        <p className="text-sm text-gray-500">
          {video.views.toLocaleString()} views
        </p>
      </div>
    </Link>
  );
};
export default VideoCard;
