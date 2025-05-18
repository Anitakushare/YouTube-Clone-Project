import { useRef, useState } from "react";
import "../App.css";

import {
  Play,
  Pause,
  SkipBackIcon,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  Fullscreen,
  MonitorPlay,
  RectangleHorizontal,
  MessageSquare,
} from "lucide-react";
//Video Player:it shows video player with controll function
function VideoPlayer({ videoUrl}) {
 const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  // Play/pause toggle function
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Volume toggle function
  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Volume slider function
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;
    setIsMuted(newVolume === 0);
  };

  // Update progress function
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const progressValue = (video.currentTime / video.duration) * 100;
    setProgress(progressValue);
  };

  // Seek video function
  const handleProgressChange = (e) => {
    const video = videoRef.current;
    const newProgress = parseFloat(e.target.value);
    video.currentTime = (newProgress / 100) * video.duration;
    setProgress(newProgress);
  };

  // Skip time function
  const skipTime = (seconds) => {
    const video = videoRef.current;
    video.currentTime += seconds;
  };

  // Fullscreen function
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };
  

  return (
    <div className="relative w-full ">
      <video
        ref={videoRef}
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        controls={false}
        className="w-full rounded-xl"
        autoPlay
      />
      {/* Progress Bar Above Controls */}
  <div className="absolute bottom-12 left-0 right-0 px-4 py-2">
    <input
      ref={progressRef}
      type="range"
      min="0"
      max="100"
      step="0.1"
      value={progress}
      onChange={handleProgressChange}
      onInput={handleProgressChange}
      style={{background: `linear-gradient(to right, #f00 ${progress}%, #555 ${progress}%)`}}
      className="w-full h-1 rounded-lg appearance-none cursor-pointer"
  />
  </div>
      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 cursor-pointer flex justify-between items-center bg-black/40 px-4 py-3 rounded-b-xl">
        {/* Left Controls */}
        
        <div className=" relative flex items-center gap-4">
          <button onClick={() => skipTime(-10)}>
            <SkipBackIcon className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? (
              <Pause className="w-5 h-5 stroke-white" />
            ) : (
              <Play className="w-5 h-5 stroke-white" />
            )}
          </button>
          <button onClick={() => skipTime(10)}>
            <SkipForward className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
          <div className="flex relative group items-center gap-2 ml-4">
              <button onClick={toggleMute}>
                {isMuted || volume === 0 ? <VolumeX size={20} className="w-5 h-5 stroke-white cursor-pointer" /> : <Volume2 size={20} className="w-5 h-5 stroke-white cursor-pointer" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 appearance-none  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
    background: `linear-gradient(to right, white ${volume * 100}%, gray ${volume * 100}%)`,
    borderRadius: '9999px',
  }}/>
            </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <button>
            <MessageSquare className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
          <button>
            <Settings className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
          <button>
            <MonitorPlay className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
          <button>
            <RectangleHorizontal className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
          <button onClick={toggleFullscreen}>
            <Fullscreen className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
