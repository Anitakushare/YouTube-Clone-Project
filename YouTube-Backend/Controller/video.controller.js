import mongoose from "mongoose";
import VideoModel from "../Model/video.model.js";
import ChannelModel from "../Model/channel.model.js";

//Add videos to videos Collection
export const addVideo = async (req, res) => {
  try {
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
    } = req.body;

    if (!title || !channelId) {
      return res.status(400).json({ message: "Title and channelId are required" });
    }

    // Confirm channel exists and belongs to logged-in user
    const channel = await ChannelModel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Ownership check
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only upload videos to your own channel" });
    }

    // Create the video
    const newVideo = await VideoModel.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channelId,
      likes: [],
      dislikes: [],
      views: [],
      uploader: req.user.id, 
      createdAt: new Date(),
    });

    // Add video ID to channel's videos array
    channel.videos.push(newVideo._id);
    await channel.save();

    res.status(201).json({ message: "Video added to channel", video: newVideo });
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
   
if (updatedField.action === "views" && updatedField.userId) {
      if (!video.views.includes(updatedField.userId)) {
        video.views.push(updatedField.userId);
      }
    }
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
//Update viw count function 
export const updateViewCount=async(req,res)=>{
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const video = await VideoModel.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Add userId to views if not already present
    if (userId && !video.views.includes(userId)) {
      video.views.push(userId);
      await video.save();
    }

    res.json({ success: true, viewsCount: video.views.length });
  } catch (error) {
    res.status(500).json({ message: "Error updating views" });
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
