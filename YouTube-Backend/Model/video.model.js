import mongoose from "mongoose";
//video Model
const videoSchema=new mongoose.Schema({
  title:{ type:String,required:true},
  thumbnailUrl:{ type:String,required:true},
  videoUrl:{ type:String,required:true},
  description: { type:String,required:true},
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: "channel" },//channel model
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "user" },//user model reference
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],//user model:store view count with user
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],//user model
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],//user Model
  category:{ type:String,required:true},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }], //comment Model
},{ timestamps: true });

const VideoModel=new mongoose.model("video",videoSchema);

export default VideoModel;