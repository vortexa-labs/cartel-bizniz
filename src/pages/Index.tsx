import React, { useEffect, useState } from "react";
import ScrollingText from "@/components/ScrollingText";
import SocialIcons from "@/components/SocialIcons";
import HeroButton from "@/components/HeroButton";
import VideoBackground from "@/components/VideoBackground";

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

  const customFontStyle: React.CSSProperties = {
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: 1.2,
    color: "#F97316",
  };

  const borderClasses = "border-y border-[#222] bg-black/60 backdrop-blur-sm shadow-[0_0_8px_1px_#F97316]";

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-black text-white animate-fade-in`}>
      <VideoBackground 
        videoUrl="/hero.mp4" 
        overlayOpacity={50} 
        blurAmount={2} 
      />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col justify-between min-h-screen h-full">
        {/* Top Scrolling Text */}
        <div className={`${borderClasses} py-2`}>
          <ScrollingText 
            text={contractAddress}
            style={customFontStyle}
            duration={60} // even slower scroll speed
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
          <div className={`${borderClasses} py-2`}>
            <ScrollingText 
              text={contractAddress}
              style={customFontStyle}
              direction="right"
              duration={60} // even slower scroll speed
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
