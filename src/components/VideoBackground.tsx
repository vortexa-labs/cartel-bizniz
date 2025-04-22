
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface VideoBackgroundProps {
  videoUrl: string;
  overlayOpacity?: number;
  blurAmount?: number;
  fallbackImageUrl?: string;
  userInteracted?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  overlayOpacity = 50,
  blurAmount = 2,
  fallbackImageUrl,
  userInteracted = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(!userInteracted);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    setIsLoaded(false);
    setHasError(false);
    
    console.log("Attempting to load video from:", videoUrl);
    
    const handleLoaded = () => {
      setIsLoaded(true);
      console.log("Video loaded successfully");
      videoElement.muted = !userInteracted;
      
      videoElement.play().catch(error => {
        console.error("Autoplay prevented:", error);
        setHasError(true);
      });
    };
    
    const handleError = (e: Event) => {
      console.error("Video loading error:", e);
      setHasError(true);
    };
    
    videoElement.addEventListener('loadeddata', handleLoaded);
    videoElement.addEventListener('canplay', handleLoaded);
    videoElement.addEventListener('error', handleError);
    
    if (videoElement.readyState >= 2) {
      handleLoaded();
    }
    
    return () => {
      videoElement.removeEventListener('loadeddata', handleLoaded);
      videoElement.removeEventListener('canplay', handleLoaded);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoUrl, userInteracted]);

  useEffect(() => {
    if (userInteracted && videoRef.current) {
      setIsMuted(false);
      videoRef.current.muted = false;
      console.log("User interacted, unmuting video");
    }
  }, [userInteracted]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    videoElement.muted = isMuted;
    console.log("Video muted state updated to:", isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    console.log("Toggle mute clicked");
    setIsMuted(!isMuted);
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div 
        style={{ backdropFilter: `blur(${blurAmount}px)` }}
        className={`absolute inset-0 bg-black/${overlayOpacity} z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {isLoaded && !hasError && (
        <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
          <Toggle 
            pressed={isMuted}
            onPressedChange={setIsMuted}
            className="bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-white" />
            ) : (
              <Volume2 className="h-5 w-5 text-white" />
            )}
          </Toggle>
        </div>
      )}
      
      {hasError && fallbackImageUrl && (
        <div className="absolute inset-0 z-5">
          <img 
            src={fallbackImageUrl} 
            alt="Background" 
            className="h-full w-full object-cover"
          />
        </div>
      )}
      
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted={!userInteracted}
          playsInline
          preload="auto"
          style={{ imageRendering: 'auto' }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoBackground;
