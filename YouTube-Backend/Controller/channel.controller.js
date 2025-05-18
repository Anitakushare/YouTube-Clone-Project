import ChannelModel from "../Model/channel.model.js";
//import VideoModel from "../Model/video.model.js";
import UserModel from "../Model/user.model.js";
//Cretae Channel function
export const createChannel = async (req, res) => {
  try {
    const { channelName, handle, description, channelBanner } = req.body;
    const existing = await ChannelModel.findOne({ handle });
    if (existing)
      return res.status(400).json({ message: "Handle already taken" });

    const newChannel = new ChannelModel({
      channelName,
      handle,
      description,
      channelBanner,
      owner: req.user.id,
    });

    await newChannel.save();

    // Add channel to user's document
    await UserModel.findByIdAndUpdate(req.user.id, {
      $push: { channels: newChannel.id },
    });

    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get channel info by its Handle
export const getChannelByHandle = async (req, res) => {
  try {
    const { handle } = req.params;
    const trimmedHandle = handle.trim();
    //find channel by handle and populate user,channel,video
    const channel = await ChannelModel.findOne({
      handle: { $regex: `^${trimmedHandle}$`, $options: 'i' }
    })
      .populate("owner", "userName avatar")
      .populate({
        path: "videos",
        select: "title thumbnailUrl views createdAt channelId",
        populate: {
          path: "channelId",
          select: "channelName",
        },
      });
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    return res
      .status(200)
      .json({ message: "Channel fetched successfully", channel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
