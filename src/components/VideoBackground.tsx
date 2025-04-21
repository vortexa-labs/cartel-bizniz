
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
    
    // Reset states when video URL changes
    setIsLoaded(false);
    setHasError(false);
    
    const handleLoaded = () => {
      setIsLoaded(true);
      console.log("Video loaded successfully");
      console.log("Video duration:", videoElement.duration);
      console.log("Video src:", videoElement.currentSrc);
      
      videoElement.play().catch(error => {
        console.error("Autoplay prevented:", error);
        setHasError(true);
      });
    };
    
    const handleError = (e: Event) => {
      console.error("Video loading error:", e);
      setHasError(true);
    };
    
    videoElement.addEventListener('canplaythrough', handleLoaded);
    videoElement.addEventListener('error', handleError);
    
    // Fallback if video is already loaded
    if (videoElement.readyState >= 2) {
      handleLoaded();
    }
    
    return () => {
      videoElement.removeEventListener('canplaythrough', handleLoaded);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoUrl]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div 
        className={`absolute inset-0 bg-black/${overlayOpacity} backdrop-blur-[${blurAmount}px] z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      ></div>
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80 z-20">
          <p className="text-center p-4">
            Unable to load video from: {videoUrl}<br/>
            Please check that the file exists and is in the correct format.
          </p>
        </div>
      )}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className={`h-full w-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
