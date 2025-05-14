import mongoose from "mongoose";
import VideoModel from "../Model/video.model.js";


export const addVideo = async (req, res) => {
  try {
    const videoData = req.body;

    const newVideo = await VideoModel.create(videoData);

    const populatedVideo = await VideoModel.findById(newVideo._id)
      .populate({ path: 'channelId', select: 'channelName' })
      .populate({ path: 'uploader', select: 'userName avatar' }); // optional

    if (populatedVideo) {
      res.status(201).json({
        message: "Video added successfully",
        video: populatedVideo,
      });
    } else {
      res.status(404).json({ message: "Error adding video" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const fetchVideo = async (req, res) => {
  try {
     const videos = await VideoModel.find()
      .populate({ path: 'channelId', select: 'channelName' })
      .populate({ path: 'uploader', select: 'userName avatar' });
    if (!videos) {
      return res.status(404).json({ message: "Video not found" });
    }

    return res.status(200).json({message:"video fetched succefully",video:videos });
  } catch (error) {
    console.error("Error fetching video:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchVideoById= async(req,res)=>{
    try {
    const video = await VideoModel.findById(req.params.id)
      .populate({ path: "channelId", select: "channelName" })
      .populate({ path: "uploader", select: "userName avatar" })
      .populate({path: "comments", populate: { path: "postedBy", select: "username avatar" }}) ;

    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json({Message:"Video fetched successfully", video });
    }
    catch(err){
   console.log(err);
   res.status(500).json({message:"Internal Server Error"});
    }

}

export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const video = await VideoModel.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    // Like logic
    if (updateFields.action === "likes") {
      if (video.likes === undefined) video.likes = 0; // Initialize if not set
      if (video.likes === 0) {
        video.likes++; // Increment like if no likes yet
      } else {
        video.likes--; // Decrement like if it's already liked
      }
    }

    // Dislike logic
    if (updateFields.action === "dislikes") {
      if (video.dislikes === undefined) video.dislikes = 0; // Initialize if not set
      if (video.dislikes === 0) {
        video.dislikes++; // Increment dislike if no dislikes yet
      } 
      
    }

    // General update fields
    const updatableFields = ["title", "description", "thumbnailUrl", "videoUrl"];
    updatableFields.forEach((field) => {
      if (updateFields[field] !== undefined) {
        video[field] = updateFields[field];
      }
    });

    await video.save();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteVideo = async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user.id;

  try {
    const video = await VideoModel.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.uploader.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this video' });
    }

    await video.remove();
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};