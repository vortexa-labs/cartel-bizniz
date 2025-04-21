
import React from "react";
import { cn } from "@/lib/utils";

interface HeroButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const HeroButton: React.FC<HeroButtonProps> = ({ 
  children, 
  className,
  href,
  onClick
}) => {
  const buttonClass = cn(
    "px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold uppercase tracking-wider",
    "bg-white text-black hover:bg-black hover:text-white",
    "border-2 border-white transition-all duration-300",
    "animate-pulse-slow hover:scale-105",
    "shadow-lg hover:shadow-xl",
    "relative after:absolute after:inset-0 after:border-4 after:border-white/0 hover:after:border-white/50 after:transition-all after:duration-300",
    className
  );

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default HeroButton;
