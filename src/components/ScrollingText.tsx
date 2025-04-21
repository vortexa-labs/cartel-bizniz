
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
  duration = 45, // default slower duration in seconds
}) => {
  const animationClass = direction === "left" ? "animate-scroll-left-custom" : "animate-scroll-right-custom";

  // Instead of concatenating the address, display it with a clear visual separator
  // This prevents confusion when the end of one address runs into the start of another
  const displayText = `${text} ⭐⭐⭐ ${text} ⭐⭐⭐ ${text}`;

  return (
    <div
      className="scroll-container"
      style={{ height: "32px", minHeight: "32px", maxHeight: "32px" }}
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
          {displayText}
        </span>
        <span
          className={`${animationClass} tracking-wider`}
          aria-hidden="true"
          style={{
            ...style,
            animationDuration: `${duration}s`
          }}
        >
          {displayText}
        </span>
      </div>
    </div>
  );
};

export default ScrollingText;
