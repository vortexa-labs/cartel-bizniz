
import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
  videoUrl: string;
  overlayOpacity?: number;
  blurAmount?: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  overlayOpacity = 50,
  blurAmount = 2,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    const handleLoaded = () => {
      setIsLoaded(true);
      videoElement.play().catch(error => {
        console.error("Error attempting to play video:", error);
      });
    };
    
    videoElement.addEventListener('loadedmetadata', handleLoaded);
    
    // If video is already loaded by the time we add the listener
    if (videoElement.readyState >= 3) {
      handleLoaded();
    }
    
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 z-0">
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      ></div>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`h-full w-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        preload="auto"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;

