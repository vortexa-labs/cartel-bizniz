
import React from "react";

interface ScrollingTextProps {
  text: string;
  direction?: "left" | "right";
  style?: React.CSSProperties;
  duration?: number; // duration in seconds
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ 
  text, 
  direction = "left",
  style,
  duration = 30, // default slower duration in seconds
}) => {
  const animationClass = direction === "left" ? "animate-scroll-left-custom" : "animate-scroll-right-custom";

  // Add more spacing and a stronger visual separator between repeats
  const repeatedText = Array(3).fill(text).join("   ★   ");

  return (
    <div
      className="scroll-container"
      style={{ height: "32px", minHeight: "32px", maxHeight: "32px" }} // reduce height
      role="marquee"
    >
      <div className="scrolling-text">
        <span
          className={`${animationClass} tracking-wider`}
          style={{
            ...style,
            animationDuration: `${duration}s`
          }}
        >
          {repeatedText}
        </span>
        <span
          className={`${animationClass} tracking-wider`}
          aria-hidden="true"
          style={{
            ...style,
            animationDuration: `${duration}s`
          }}
        >
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

export default ScrollingText;
