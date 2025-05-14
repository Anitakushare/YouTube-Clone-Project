import { ThumbsUp, ThumbsDown, Share2, Ellipsis } from "lucide-react";
import { updateVideo } from "../Utils/VideoApi"; // Make sure axios is imported
import { useState } from "react";

function formatNumber(num) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

function VideoActions({ videoId, initialLikes, initialDislikes, token }) {
  const [likeCount, setLikeCount] = useState(initialLikes||[]);
  const [dislikeCount, setDislikeCount] = useState(initialDislikes || []);

  const handleLike = async () => {
    try {
      const updatedVideo = await updateVideo(videoId, { action: "likes" }, token);
      setLikeCount(updatedVideo.likes);
      setDislikeCount(updatedVideo.dislikes); // to sync UI
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const updatedVideo = await updateVideo(videoId, { action: "dislikes" }, token);
      setLikeCount(updatedVideo.likes);
      setDislikeCount(updatedVideo.dislikes); // to sync UI
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-4 text-black">
      <div className="bg-gray-200 flex rounded-4xl p-1 gap-2">
        <button
          onClick={handleLike}
          className="flex items-center space-x-1 hover:text-blue-600 px-2 border-r"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{formatNumber(likeCount)}</span>
        </button>
        <button
          onClick={handleDislike}
          className="flex items-center space-x-1 hover:text-red-600"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{formatNumber(dislikeCount)}</span>
        </button>
      </div>

      <button className="flex items-center space-x-1 bg-gray-200 p-1 rounded-4xl hover:bg-gray-300">
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      <button className="flex items-center space-x-1 p-1 rounded-4xl bg-gray-200 hover:bg-gray-300">
        <Ellipsis className="w-6 h-6" />
      </button>
    </div>
  );
}

export default VideoActions;
