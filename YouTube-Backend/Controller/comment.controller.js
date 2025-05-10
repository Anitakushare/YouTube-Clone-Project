import CommentModel from "../Model/comment.model.js";
//Add Comment
export const addComment = async (req, res) => {
  try {
    const newComment = await CommentModel.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
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

