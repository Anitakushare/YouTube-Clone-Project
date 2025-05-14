import { useRef,useState } from "react";

import {Play,Pause,SkipBackIcon,SkipForward,Volume2,Settings,Fullscreen,MonitorPlay,RectangleHorizontal,
    MessageSquare,} from "lucide-react";

function VideoPlayer({ videoUrl,thumnailUrl }) {
    const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleForward = () => {
    if (videoRef.current) videoRef.current.currentTime += 10;
  };
  const handlePause = () => {
     const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }}

  const handleBackward = () => {
    if (videoRef.current) videoRef.current.currentTime -= 10;
  };

  return (
    <div className="relative w-full">
     
      <video ref={videoRef} src={videoUrl} controls={false} className="w-full rounded-xl"  autoPlay />
        {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-black/40 px-4 py-3 rounded-b-xl">
        {/* Left Controls */}
         <div className="absolute top-0 left-0 h-1 cursor-pointer bg-white" style={{ width: `10%` }} />

        <div className="flex items-center gap-4">
          <button onClick={handleBackward}>
            <SkipBackIcon className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
          <button onClick={handlePause}>{isPlaying ? <Pause className="w-5 h-5 stroke-white" /> : <Play className="w-5 h-5 stroke-white" />}
          </button>
          <button onClick={handleForward}>
            <SkipForward className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
          <button>
            <Volume2 className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
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
          <button>
            <Fullscreen className="w-5 h-5 stroke-white cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;