import mongoose from "mongoose";

const videoSchema=new mongoose.Schema({
  title:{ type: String, required: true },
  thumbnailUrl:{ type: String, required: true },
  videoUrl: { type: String }, 
  description:{ type: String },
  catagory:{ type: String, required: true },
  uploader:{ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  channelId:{ type: mongoose.Schema.Types.ObjectId, ref: 'channel' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes:{ type: Number, default: 0 },
  uploadDate:{ type: Date, default: Date.now },
  comments:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

const VideoModel=new mongoose.model("video",videoSchema);

export default VideoModel;