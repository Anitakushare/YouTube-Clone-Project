import mongoose from "mongoose";

const videoSchema=new mongoose.Schema({
  title: String,
  thumbnailUrl: String,
  videoUrl:String,
  description: String,
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: "channel" },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }], 
},{ timestamps: true });

const VideoModel=new mongoose.model("video",videoSchema);

export default VideoModel;