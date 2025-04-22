import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VideoBackgroundProps {
  videoUrl: string;
  overlayOpacity?: number;
  blurAmount?: number;
  fallbackImageUrl?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  overlayOpacity = 50,
  blurAmount = 2,
  fallbackImageUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    // Reset states when video URL changes
    setIsLoaded(false);
    setHasError(false);
    
    console.log("Attempting to load video from:", videoUrl);
    
    const handleLoaded = () => {
      setIsLoaded(true);
      console.log("Video loaded successfully");
      
      videoElement.play().catch(error => {
        console.error("Autoplay prevented:", error);
        // Try with muted option as fallback for autoplay policy
        videoElement.muted = true;
        setIsMuted(true);
        videoElement.play().catch(innerError => {
          console.error("Muted autoplay also prevented:", innerError);
          setHasError(true);
        });
      });
    };
    
    const handleError = (e: Event) => {
      console.error("Video loading error:", e);
      setHasError(true);
    };
    
    // Using multiple event listeners to catch various loading scenarios
    videoElement.addEventListener('loadeddata', handleLoaded);
    videoElement.addEventListener('canplay', handleLoaded); 
    videoElement.addEventListener('error', handleError);
    
    // Fallback if video is already loaded
    if (videoElement.readyState >= 2) {
      handleLoaded();
    }
    
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoaded);
      videoElement.removeEventListener('canplay', handleLoaded);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoUrl]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          style={{ backdropFilter: `blur(${blurAmount}px)` }}
          className={`absolute inset-0 bg-black/${overlayOpacity} z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        ></div>
        
        {hasError && fallbackImageUrl && (
          <div className="absolute inset-0 z-5">
            <img 
              src={fallbackImageUrl} 
              alt="Background" 
              className="h-full w-full object-contain"
            />
          </div>
        )}
        
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            muted={isMuted}
            autoPlay
            loop
            playsInline
            className={`w-auto h-full max-w-none object-contain transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            preload="auto"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {isLoaded && !hasError && (
          <button 
            onClick={toggleMute} 
            className="absolute top-4 right-4 z-30 bg-black/50 p-2 rounded-full"
          >
            {isMuted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoBackground;
