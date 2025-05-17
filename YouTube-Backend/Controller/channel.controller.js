import ChannelModel from "../Model/channel.model.js";
import VideoModel from "../Model/video.model.js";
import UserModel from "../Model/user.model.js"

export const createChannel = async (req, res) => {
  try {
    const { channelName, handle, description, channelBanner } = req.body;
    const existing = await ChannelModel.findOne({ handle });
    if (existing) return res.status(400).json({ message: "Handle already taken" });

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
export const getChannelByHandle = async (req, res) => {
  try {
    const { handle } = req.params;

    const channel = await ChannelModel.findOne( { handle: new RegExp(`^${handle}$`, 'i') } )
      .populate('owner', 'userName avatar')
      .populate({
        path: 'videos',
        select: 'title thumbnailUrl views createdAt channelId',
        populate: {
          path: 'channelId',
          select: 'channelName',
        },
      });
     
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
     return res.status(200).json({ message: "Channel fetched successfully", channel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getVideosByChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await ChannelModel.findById(channelId).populate('videos');
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    res.status(200).json({ videos: channel.videos });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const addVideoToChannel = async (req, res) => {
  const { channelId } = req.params;
  const { title, description, thumbnailUrl, videoUrl, category } = req.body;
  const userId = req.user.id;

  try {
    const channel = await ChannelModel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    const newVideo = new VideoModel({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channelId: channel._id,
      uploader: userId,
    });

    await newVideo.save();
    channel.videos.push(newVideo._id);
    await channel.save();

    res.status(201).json({ message: 'Video added successfully', newVideo });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};