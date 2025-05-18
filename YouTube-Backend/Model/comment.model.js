import mongoose from "mongoose";
//comment model
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId, //video Model reference
    ref: "video",
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,//user model Reference
    ref: "user",
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const CommentModel=new mongoose.model("comment", commentSchema);
export default CommentModel;
