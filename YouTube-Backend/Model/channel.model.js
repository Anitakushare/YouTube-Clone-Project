import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  description: String,
  channelBanner: String,
  subscribers: Number,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  createdAt: {
    type: Date,
    default: Date.now
  },
 
});
const ChannelModel=new mongoose.model("channel",channelSchema)
export default ChannelModel;
