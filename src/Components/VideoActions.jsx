import { ThumbsUp, ThumbsDown, Share2,Ellipsis } from "lucide-react";

function formatNumber(num) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

function VideoActions({ likes, dislikes }) {
  return (
    <div className="flex items-center space-x-4 mt-4 text-black">
      <div className="bg-gray-200 flex rounded-4xl p-1 gap-2">
        <button className="flex items-center space-x-1 hover:text-blue-600 px-2 border-r ">
          <ThumbsUp className="w-4 h-4" />
          <span>{formatNumber(likes)}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-red-600 ">
          <ThumbsDown className="w-4 h-4" />
          <span>{formatNumber(dislikes)}</span>
        </button>
      </div>
      <button className="flex items-center space-x-1 bg-gray-200 p-1 rounded-4xl hover:bg-gray-300 ">
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