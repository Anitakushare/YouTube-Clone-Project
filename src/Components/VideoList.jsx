import React from "react";
import  VideoCard  from "./VideoCard";
import useFetch from "../Utils/useFetch";
import { useGlobal } from "../Context/GlobalContext";

//Video list componet Dispay video Grid in home page
const VideoList = () => {
   const { data, loading, error } = useFetch();
  const {searchTerm ,selectedFilter}=useGlobal()

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No videos found.</p>;
  if (error) return <p>Error: {error}</p>;
  //Filter the data by title and filter category buttons
   const filteredVideos = data
    .filter(video => selectedFilter === "All" || video.category === selectedFilter)
    .filter(video =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-4 cursor-pointer">
       {/**videoCard componet with props */}
       {filteredVideos.map((video) => (
        <VideoCard key={video._id || video.id} video={video} />
      ))}
      </div>
  );
};

export default VideoList;
