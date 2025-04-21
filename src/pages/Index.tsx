
import React, { useEffect, useState } from "react";
import ScrollingText from "@/components/ScrollingText";
import SocialIcons from "@/components/SocialIcons";
import HeroButton from "@/components/HeroButton";
import VideoBackground from "@/components/VideoBackground";

// Sample video URL - replace with your own video
const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state to true after component mount
    setLoaded(true);
    
    // Set page title and description
    document.title = "Modern Brand | Scrolling Showcase";
    
    // For accessibility, ensure links are properly described
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Modern brand showcase with scrolling text and video background");
    }
  }, []);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-black text-white animate-fade-in`}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col justify-between min-h-screen h-full">
        {/* Top Scrolling Text */}
        <div className="py-5 bg-black/60 backdrop-blur-sm">
          <ScrollingText 
            text="BRAND NEW COLLECTION • EXCLUSIVE RELEASE • LIMITED EDITION • " 
            fontSize="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" 
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <HeroButton href="#how-to-buy" className="hover:rotate-1">HOW TO BUY</HeroButton>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col">
          {/* Social Icons */}
          <SocialIcons className="py-6" />
          
          {/* Bottom Scrolling Text */}
          <div className="py-4 bg-black/60 backdrop-blur-sm">
            <ScrollingText 
              text="FOLLOW US • JOIN THE COMMUNITY • STAY CONNECTED • " 
              fontSize="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
              direction="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
