import mongoose from "mongoose";
import VideoModel from "../Model/video.model.js";


export const addVideo= async (req,res)=>{
    try{
  const videoData=req.body;
   const newVideo=await VideoModel.create(videoData);
    // const populatedVideo = await VideoModel.findById(newVideo._id).populate({
    //     path: 'channelId',
    //     select: 'name'  
    //   });

   if(newVideo){
    res.status(201).json({message:"Video added successfull",newVideo});
   }
   else{
    res.status(404).json({message:"Error to add Video"});
   }
    }catch(err){
      res.send(err)
    }

}

export const fetchVideo= async(req,res)=>{
    try{
 const fetchVideos=await VideoModel.find();

 if(!fetchVideos || fetchVideos.length===0){
    res.status(404).json({message:"Video Not Found!"});
 }
 res.status(200).json({message:"Succesfully fetch all videos",fetchVideos});
    }
   catch(err){
    console.log(err);
    res.status(500).json({message:"Internl Server Error"})

   }

}

export const fetchVideoById= async(req,res)=>{
    try{
  const {id}=req.params;
  const fetchVideoById=await VideoModel.findById(id);
 
  if(!fetchVideoById){
    res.status(404).json({message:`Video of this id ${id} not found`});
  }
  res.status(200).json({message:`The ideo of this Id ${id} has been fetched successfully`,fetchVideoById});
    }
    catch(err){
   console.log(err);
   res.status(500).json({message:"Internal Server Error"});
    }

}
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