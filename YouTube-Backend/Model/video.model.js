import mongoose from "mongoose";

const videoSchema=new mongoose.Schema({
  title:{ type:String,required:true},
  thumbnailUrl:{ type:String,required:true},
  videoUrl:{ type:String,required:true},
  description: { type:String,required:true},
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: "channel" },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  views: Number,
  likes: Number,
  dislikes: Number,
  category:{ type:String,required:true},
  uploadDate: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }], 
},{ timestamps: true });

const VideoModel=new mongoose.model("video",videoSchema);

export default VideoModel;