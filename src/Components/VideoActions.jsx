import { ThumbsUp, ThumbsDown, Share2, Ellipsis } from "lucide-react";
import { updateVideo } from "../Utils/VideoApi";
import { useState } from "react";
//Number formater function 
function formatNumber(num) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}
//Video action Component
function VideoActions({ videoId, initialLikes = [], initialDislikes = [], token, userId }) {
  // Local state for likes and dislikes
  const [likes, setLikes] = useState(Array.isArray(initialLikes) ? initialLikes : []);
  const [dislikes, setDislikes] = useState(Array.isArray(initialDislikes) ? initialDislikes : []);
// Check if the current user has liked or disliked the video
  const hasLiked = likes.includes(userId);
  const hasDisliked = dislikes.includes(userId);
// Handle like button click
   const handleLike = async () => {
    try {
      //Api call to update video
      const updatedVideo = await updateVideo(videoId, { action: "likes", userId }, token);
      if (updatedVideo && updatedVideo.video) {
         // Update local state based on response
        setLikes(updatedVideo.video.likes || []);
        setDislikes(updatedVideo.video.dislikes || []);
      } else {
        console.error("Invalid video data received:", updatedVideo);
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };
// Handle dislike button click
  const handleDislike = async () => {
    try {
      const updatedVideo = await updateVideo(videoId, { action: "dislikes", userId }, token);
      if (updatedVideo && updatedVideo.video) {
        setLikes(updatedVideo.video.likes || []);
        setDislikes(updatedVideo.video.dislikes || []);
      } else {
        console.error("Invalid video data received:", updatedVideo);
      }
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };
  return (
    <div className="flex items-center space-x-4 mt-4 text-black">
       {/* Like & Dislike buttons group */}
      <div className="bg-gray-200 flex rounded-4xl p-1 gap-2">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 px-2 border-r ${hasLiked ? 'text-blue-600' : 'hover:text-blue-600'}`}
        >
          <ThumbsUp className="w-4 h-4" />
         {formatNumber(isNaN(likes.length) ? 0 : likes.length)}
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center space-x-1 ${hasDisliked ? 'text-red-600' : 'hover:text-red-600'}`}
        >
          <ThumbsDown className="w-4 h-4" />
         <span>{formatNumber(isNaN(dislikes.length) ? 0 : dislikes.length)}</span>
        </button>
      </div>
  {/* Share Button */}
      <button className="flex items-center space-x-1 bg-gray-200 p-1 rounded-4xl hover:bg-gray-300">
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
 {/* More Options Button */}
      <button className="flex items-center space-x-1 p-1 rounded-4xl bg-gray-200 hover:bg-gray-300">
        <Ellipsis className="w-6 h-6" />
      </button>
    </div>
  );
}

export default VideoActions;
