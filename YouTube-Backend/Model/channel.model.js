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
  createdAt: {
    type: Date,
    default: Date.now
  },
  profileImage: String, // optional
  bannerImage: String   // optional
});
const ChannelModel=new mongoose.model("channel",channelSchema)
export default ChannelModel;
