import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";

const VideoCard = ({
  video,
  horizontal = false,
  onEdit,
  onDelete,
  showMenu,
}) => {

  const [menuOpen, setMenuOpen] = useState(false);
  if (horizontal) {
    return (
      <Link to={`/video/${video._id}`} className="flex gap-3 mb-4 w-full">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-40 h-24 rounded-lg object-cover shrink-0"
        />
        <div className="flex flex-col overflow-hidden w-full">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold leading-tight line-clamp-2 pr-2">
              {video.title}
            </h3>
          </div>
          <p className="text-xs text-gray-600 truncate mt-0.5">
            {video.channelId?.channelName}
          </p>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {video.views?.toLocaleString()} views
          </p>
        </div>
      </Link>
    );
  }

  // Default vertical card layout
  return (
    <div className="relative group z-50">
      <Link to={`/video/${video._id}`} onClick={(e) => menuOpen && e.preventDefault()}>
        <img
          src={video.thumbnailUrl}
          className="w-full h-50 object-cover rounded-xl shadow-black z-50"
        />
        <h3 className="mt-2 text-lg text-black font-semibold line-clamp-2">{video.title}</h3>
        <p className="text-md text-gray-700">0{video.views} views</p>
         <p className="text-md text-gray-700">@{video?.channelId?.channelName}</p>
      </Link>

      {showMenu && (
        <div className="absolute bottom-4 right-0">
          <EllipsisVertical
            className="w-6 h-6 text-black cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
              <button
                onClick={() => {
                  onEdit(video);
                  setMenuOpen(false);
                }}
                className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  const videoId = video._id || video.id;
                  if (!videoId) {
                    console.error("Video ID is missing:", video);
                    return;
                  }
                  onDelete(videoId);
                  setMenuOpen(false);
                }}
                className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoCard;
