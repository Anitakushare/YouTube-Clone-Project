import CommentModel from "../Model/comment.model.js";
import Video from "../Model/video.model.js";

//Add Comment
export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { content } = req.body;
    const userId = req.user._id; // from authenticated middleware

    const newComment = await CommentModel.create({
      content,
      video: videoId,
      postedBy: userId,
    });

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (err) {
    console.error("Add Comment Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Update Comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const comment = await CommentModel.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.postedBy.toString() !== userId.toString())
      return res.status(403).json({ message: "Unauthorized to update this comment" });

    comment.content = content;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (err) {
    console.error("Update Comment Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await CommentModel.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.postedBy.toString() !== userId.toString())
      return res.status(403).json({ message: "Unauthorized to delete this comment" });

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    console.error("Delete Comment Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
