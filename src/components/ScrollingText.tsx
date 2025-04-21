
import React from "react";

interface ScrollingTextProps {
  text: string;
  fontSize?: string;
  direction?: "left" | "right";
  style?: React.CSSProperties;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ 
  text, 
  fontSize = "text-3xl", 
  direction = "left",
  style,
}) => {
  const animationClass = direction === "left" ? "animate-scroll-left" : "animate-scroll-right";
  
  // Create duplicated text to ensure continuous scrolling
  const repeatedText = Array(8).fill(text).join(" • ");
  
  return (
    <div className="scroll-container" role="marquee">
      <div className="scrolling-text">
        <span
          className={`${animationClass} ${fontSize} uppercase tracking-wider`}
          style={style}
        >
          {repeatedText}
        </span>
        <span
          className={`${animationClass} ${fontSize} uppercase tracking-wider`}
          aria-hidden="true"
          style={style}
        >
          {repeatedText}
        </span>
      </div>
    </div>
  );
};

export default ScrollingText;

