import React from "react";
import  VideoCard  from "./VideoCard";

// Sample dummy data
const dummyVideos = [
  {
    id: 1,
    title: "Learn React in 10 Minutes",
    uploader: "CodeMaster",
    views: 24000,
    thumbnailUrl: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
    category: "Computer programming"
  },
  {
    id: 2,
    title: "Top Tamil Songs 2023",
    uploader: "T-Series Tamil",
    views: 102000,
    thumbnailUrl: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
    category: "Music"
  },
  {
    id: 3,
    title: "Live SpaceX Launch",
    uploader: "SpaceX",
    views: 560000,
    thumbnailUrl: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
    category: "Live"
  },
   {
      id: "video04",
      title: "Gaming Setup Tour 2025",
      thumbnailUrl: "https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg",
      description: "A walkthrough of my new gaming rig and setup.",
      channelId: "channel04",
      uploader: "GamerGuy",
      views: 78600,
      likes: 4200,
      dislikes: 100,
      uploadDate: "2025-03-11",
      comments: [
        {
          commentId: "comment04",
          userId: "user10",
          text: "Your setup is goals!",
          timestamp: "2025-03-12T10:45:00Z"
        }
      ]
    }
  
];

const VideoList = ({ filter }) => {
  const filteredVideos = filter === 'All'
    ? dummyVideos
    : dummyVideos.filter(video => video.category === filter);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 cursor-pointer">
      {filteredVideos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
