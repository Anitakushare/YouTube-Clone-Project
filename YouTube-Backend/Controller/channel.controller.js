import ChannelModel from "../Model/channel.model.js";

// Create a new channel
export const createChannel = async (req, res) => {
  const { channelName, description } = req.body;
  const userId = req.user.id;  // Extracting user ID from JWT token

  try {
    // Check if the user already has a channel
    const existingChannel = await ChannelModel.findOne({ userId });
    if (existingChannel) {
      return res.status(400).json({ message: 'You already have a channel.' });
    }

    const newChannel = new ChannelModel({
      userId,
      channelName,
      description,
      createdAt: new Date(),
    });

    await newChannel.save();
    return res.status(201).json({ message: 'Channel created successfully!', channel: newChannel });
  } catch (err) {
    console.error('Error creating channel:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a channel by userId
export const getChannelByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const channel = await ChannelModel.findOne({ userId });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    return res.status(200).json(channel);
  } catch (err) {
    console.error('Error fetching channel:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update channel information
export const updateChannel = async (req, res) => {
  const { channelName, description } = req.body;
  const userId = req.user.id;

  try {
    const channel = await ChannelModel.findOne({ userId });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    channel.channelName = channelName || channel.channelName;
    channel.description = description || channel.description;

    await channel.save();

    return res.status(200).json({ message: 'Channel updated successfully!', channel });
  } catch (err) {
    console.error('Error updating channel:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a channel
export const deleteChannel = async (req, res) => {
  const userId = req.user.id;

  try {
    const channel = await ChannelModel.findOne({ userId });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    await channel.remove();

    return res.status(200).json({ message: 'Channel deleted successfully!' });
  } catch (err) {
    console.error('Error deleting channel:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
