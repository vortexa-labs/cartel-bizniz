
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

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
  const [isMuted, setIsMuted] = useState(true); // Start muted to allow autoplay

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
      
      // Always start with autoplay muted (browser requirement)
      videoElement.muted = true;
      videoElement.play().catch(error => {
        console.error("Autoplay prevented:", error);
        setHasError(true);
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

  // Update muted state whenever isMuted changes
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
      ></div>
      
      {/* Volume Toggle */}
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
      
      {hasError && (
        <div className="absolute inset-0 z-5">
          {fallbackImageUrl ? (
            <img 
              src={fallbackImageUrl} 
              alt="Background" 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white bg-black/80 z-20">
              <p className="text-center p-4">
                Unable to load video from: {videoUrl}<br/>
                Please check that the file exists and is in the correct format.
              </p>
            </div>
          )}
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
