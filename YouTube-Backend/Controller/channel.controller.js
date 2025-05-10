import ChannelModel from "../Model/channel.model.js";
import VideoModel from "../Model/video.model.js";

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
  const { title, description, thumbnailUrl, videoUrl } = req.body;
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