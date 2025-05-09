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
  // Add more dummy videos as needed
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
