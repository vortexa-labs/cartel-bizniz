
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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    const handleLoaded = () => {
      setIsLoaded(true);
      console.log("Video loaded successfully");
      
      videoElement.play().catch(error => {
        console.error("Error attempting to play video:", error);
        setHasError(true);
      });
    };
    
    const handleError = (e: Event) => {
      console.error("Video loading error:", e);
      setHasError(true);
    };
    
    videoElement.addEventListener('loadedmetadata', handleLoaded);
    videoElement.addEventListener('error', handleError);
    
    // If video is already loaded by the time we add the listener
    if (videoElement.readyState >= 3) {
      handleLoaded();
    }
    
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoaded);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 z-0">
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      ></div>
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80 z-20">
          <p>Unable to load video. Please check the path: {videoUrl}</p>
        </div>
      )}
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
