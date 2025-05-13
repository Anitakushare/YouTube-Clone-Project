import CommentModel from "../Model/comment.model.js";
import UserModel from "../Model/user.model.js"
//Add Comment
export const addComment = async (req, res) => {
   try {
    const newComment = await CommentModel.create({
      ...req.body,
      postedBy: req.user.id, // ensure this matches your schema
    });
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Add Comment Error:", err);
    res.status(500).json({ message: "Error adding comment" });
  }
};
export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await CommentModel.find({ videoId })
      .populate('userId', 'username avatar') // Optional: get user's name and avatar
      .sort({ timestamp: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

export const updateComment = async (req, res) => {
  try {
    const id=req.params.id;
    const data=req.body;
    const updated = await CommentModel.findByIdAndUpdate(id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};

