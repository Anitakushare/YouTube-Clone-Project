import mongoose from "mongoose";

const videoSchema=new mongoose.Schema({
  title: String,
  thumbnailUrl: String,
  description: String,
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], 
},{ timestamps: true });

const VideoModel=new mongoose.model("video",videoSchema);

export default VideoModel;