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

  const videoPath = "/ssstwitter.com_1745157809978.mp4";
  const fallbackImagePath = "/lovable-uploads/2315e86c-dabc-4acc-872a-4b2a89136c42.png";
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white animate-fade-in">
      <VideoBackground 
        videoUrl={videoPath}
        overlayOpacity={50} 
        blurAmount={2}
        fallbackImageUrl={fallbackImagePath}
      />
      
      <div className="absolute inset-0 z-10">
        <div className="relative h-full flex flex-col">
          <div className={`${borderClasses} py-2 relative z-20`}>
            <ScrollingText 
              text={contractAddress}
              style={customFontStyle}
              duration={60}
            />
          </div>

          {/* Center Content */}
          <div className="flex-1 relative flex items-center justify-center z-20">
            <HeroButton href="#how-to-buy" className="hover:rotate-1">HOW TO BUY</HeroButton>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col relative z-20">
            <SocialIcons className="py-6" />
            <div className={`${borderClasses} py-2`}>
              <ScrollingText 
                text={contractAddress}
                style={customFontStyle}
                direction="right"
                duration={60}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
