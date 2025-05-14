import { useState, useEffect } from "react";

import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from "../Utils/CommentsApi";
import CommentItem from "./CommentItem";

const CommentPage = ({ videoId, setVideo }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleFocus = () => setIsFocused(true);

  const handleCancel = () => {
    setIsFocused(false);
    setContent("");
    setEditingId(null);
  };

  const loadComments = async () => {
    try {
      const res = await fetchComments(videoId);
      const data = Array.isArray(res.data) ? res.data : res.data.comments || [];
      setComments(data);
    } catch (error) {
      console.error("Failed to load comments", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      loadComments();
    }
  }, [videoId]);

  const handleComment = async () => {
    if (!content.trim()) return;

    try {
      if (editingId) {
        await updateComment(editingId, content, token);
        setEditingId(null);
      } else {
        const res = await addComment(videoId, content, token);
        if (res.data && res.data.updatedVideo) {
          setVideo(res.data.updatedVideo); // Optional: if backend returns updated video
        }
      }
      setContent("");
      setIsFocused(false);
      loadComments();
    } catch (err) {
      console.error("Failed to post/update comment", err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId, token);
      loadComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="mt-6">
      {/* Input Area */}
      <div className="flex items-start space-x-4">
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-500 flex items-center justify-center text-white font-semibold">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{user?.username?.[0]?.toUpperCase() || "A"}</span>
          )}
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={handleFocus}
            className="w-full border-b border-gray-300 focus:outline-none focus:border-black py-1"
          />

          {isFocused && (
            <div className="flex items-center justify-end mt-2">
              <div className="space-x-2">
                <button
                  onClick={handleCancel}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleComment}
                  disabled={!content.trim()}
                  className={`text-sm font-medium px-4 py-1 rounded-full ${
                    content.trim()
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {editingId ? "Update" : "Comment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="mt-6 space-y-4">
        {comments.map((c) => (
          <CommentItem
            key={c._id}
            comment={c}
            currentUser={user}
            onEdit={(comment) => {
              setEditingId(comment._id);
              setContent(comment.content);
              setIsFocused(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentPage;
