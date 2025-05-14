import React, { useRef, useState, useEffect } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Pencil,
  Trash2,
  EllipsisVertical,
} from "lucide-react";

const CommentItem = ({ comment, currentUser, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isUser = comment.postedBy?.user?._id === currentUser?._id;

  return (
    <div className="flex space-x-3 relative">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold">
        {comment.postedBy?.avatar ? (
          <img
            src={comment.postedBy.avatar}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span>{comment.postedBy?.userName?.[0]?.toUpperCase() || "U"}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-semibold">@{comment.postedBy?.userName}</p>
          <span className="text-xs text-gray-500">0 seconds ago</span>
        </div>

        <p className="text-sm mt-1">{comment.content}</p>

        {/* Like/Dislike/Reply */}
        <div className="flex items-center space-x-4 mt-2 text-gray-500 text-sm">
          <button className="flex items-center space-x-1 hover:text-black">
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-1 hover:text-black">
            <ThumbsDown className="w-4 h-4" />
          </button>
          <button className="hover:underline">Reply</button>
        </div>
      </div>

      {/* Edit/Delete Menu */}
      {isUser && (
        <div className="relative ml-2" ref={ref}>
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-gray-500 hover:text-black p-1"
          >
            <EllipsisVertical className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-1 bg-white border shadow-md rounded-md w-28 z-10">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onEdit(comment);
                }}
                className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 space-x-2"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete(comment._id);
                }}
                className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
