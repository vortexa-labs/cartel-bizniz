
import React, { useEffect, useState } from "react";
import ScrollingText from "@/components/ScrollingText";
import SocialIcons from "@/components/SocialIcons";
import HeroButton from "@/components/HeroButton";
import VideoBackground from "@/components/VideoBackground";

// Sample video URL - replace with your own video
const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4";

const contractAddress = "DX6XqmtEs8zTyswu4cBpsgAvjsw1kUGGi6rxF3jWpump";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    document.title = "Modern Brand | Scrolling Showcase";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Modern brand showcase with scrolling text and video background");
    }
  }, []);

  // Set font size to 17px, no bold, everywhere for scrolling text
  const customFontStyle: React.CSSProperties = {
    fontSize: "17px",
    fontWeight: 400, // changed to normal weight
    lineHeight: 1.2,
  };
  // Add border for header and footer scroll for distinct hero section + smaller glow effect
  const borderClasses = "border-y border-[#222] bg-black/60 backdrop-blur-sm shadow-[0_0_8px_1px_#9b87f5]";

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
        <div className={borderClasses + " py-5"}>
          <ScrollingText 
            text={contractAddress}
            style={customFontStyle}
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
          <div className={borderClasses + " py-4"}>
            <ScrollingText 
              text={contractAddress}
              style={customFontStyle}
              direction="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

