import mongoose from "mongoose";
import VideoModel from "../Model/video.model.js";
import ChannelModel from "../Model/channel.model.js";

//Add videos to videos Collection
export const addVideo = async (req, res) => {
  const {
    title,
    description,
    thumbnailUrl,
    channelId,
    videoUrl,
    category,
    views,
    likes,
    dislikes,
    uploader,
  } = req.body;
  try {
    if (!title || !channelId) {
      return res
        .status(400)
        .json({ message: "Title and channelId are required" });
    }

    //  Create the video
    const newVideo = await VideoModel.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channelId,
      likes,
      dislikes,
      views,
      uploader,
      createdAt: new Date(),
    });

    //  Add video ID to channel.videos
    await ChannelModel.findByIdAndUpdate(channelId, {
      $push: { videos: newVideo._id },
    });

    res
      .status(201)
      .json({ message: "Video added to channel", video: newVideo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//fetch all videos
export const fetchVideo = async (req, res) => {
  try {
    const videos = await VideoModel.find()
      .populate({ path: "channelId", select: "channelName" })
      .populate({ path: "uploader", select: "userName avatar" });
    if (!videos) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res
      .status(200)
      .json({ message: "video fetched succefully", video: videos });
  } catch (error) {
    console.error("Error fetching video:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//Fetch specific video by id
export const fetchVideoById = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id)
      .populate({ path: "channelId", select: "channelName" })
      .populate({ path: "uploader", select: "userName avatar" })
      .populate({
        path: "comments",
        populate: { path: "postedBy", select: "username avatar" },
      });

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json({ Message: "Video fetched successfully", video });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//update video function
export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const updatedField = req.body;

  try {
    const video = await VideoModel.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Like logic
    if (updatedField.action === "likes") {
      if (!video.likes.includes(updatedField.userId)) {
        video.likes.push(updatedField.userId);
        video.dislikes = video.dislikes.filter(id => id !== updatedField.userId);
      } else {
        video.likes = video.likes.filter(id => id !== updatedField.userId);
      }
    } else if (updatedField.action === "dislikes") {
      if (!video.dislikes.includes(updatedField.userId)) {
        video.dislikes.push(updatedField.userId);
        video.likes = video.likes.filter(id => id !== updatedField.userId);
      } else {
        video.dislikes = video.dislikes.filter(id => id !== updatedField.userId);
      }
    }
    //video info updates
    const updatableFields = [
      "title",
      "description",
      "thumbnailUrl",
      "videoUrl",
      "category",
    ];
    updatableFields.forEach((field) => {
      if (updatedField[field] !== undefined) {
        video[field] = updatedField[field];
      }
    });

    await video.save();
    //Succesfull when video update
    res.status(200).json({ message: "Video updated", video });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating video", error: error.message });
  }
};

//delete video function
export const deleteVideo = async (req, res) => {
  //acces from request header
  const { id } = req.params;
  const userId = req.user.id;

  try {
    //find video by id
    const video = await VideoModel.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (video.uploader.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this video" });
    }

    // Remove from associated channel
    await ChannelModel.findByIdAndUpdate(video.channelId, {
      $pull: { videos: video._id },
    });

    // Properly delete from DB
    await VideoModel.findByIdAndDelete(id); // This actually deletes the document

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting video", error: err.message });
  }
};
