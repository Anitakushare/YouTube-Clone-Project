import React from "react";
import  VideoCard  from "./VideoCard";
import useFetch from "../Utils/useFetch";
import {useParams} from "react-router-dom";


const VideoList = ({ filter }) => {
   const { data, loading, error } = useFetch(); // replace with your actual endpoint
   console.log(data)

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No videos found.</p>;
  if (error) return <p>Error: {error}</p>;
   const filteredVideos =
  filter === "All"
    ? data
    : data.filter(video => video.category === filter); 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4 cursor-pointer">
       {filteredVideos.map((video) => (
        <VideoCard key={video._id || video.id} video={video} />
      ))}
      </div>
  );
};

export default VideoList;
