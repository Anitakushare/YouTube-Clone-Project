import mongoose from "mongoose";
//channel model
const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  handle: { type: String, required: true , unique: true,trim:true},
  description: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },//user Model Reference
  subscribers: { type: Number, default: 0 },
  channelBanner: { type: String, default: 'https://example.com/banner.png' },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'video' }],//video model reference
  createdAt: { type: Date, default: Date.now },

});
const ChannelModel=new mongoose.model("channel",channelSchema)
export default ChannelModel;
