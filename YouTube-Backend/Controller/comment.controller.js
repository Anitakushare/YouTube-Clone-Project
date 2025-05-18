import CommentModel from "../Model/comment.model.js";
import VideoModel from "../Model/video.model.js";
//Add Comment Function
export const addComment = async (req, res) => {
  try {
    const { content, video } = req.body;

    if (!content || !video) {
      return res
        .status(400)
        .json({ message: "Content and video ID are required." });
    }

    const newComment = await CommentModel.create({
      content,
      video,
      postedBy: req.user.id,
    });
    const savedComment = await newComment.save();
    await VideoModel.findByIdAndUpdate(video, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Add Comment Error:", err);
    res.status(500).json({ message: "Error adding comment" });
  }
};

// Get Comments for a Video
export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await CommentModel.find({ video: videoId })
      .populate("postedBy", "userName avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(comments); // returning directly as array
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

//  Update Comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const updated = await CommentModel.findByIdAndUpdate(
      commentId,
      { content: req.body.content },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating comment" });
  }
};

//Delete Comment function
export const deleteComment = async (req, res) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};
