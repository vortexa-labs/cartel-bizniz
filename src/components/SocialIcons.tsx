
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Github,
  Linkedin
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialIconsProps {
  className?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ className }) => {
  const iconSize = 22;
  
  const icons = [
    { Icon: Instagram, href: "https://instagram.com" },
    { Icon: Twitter, href: "https://twitter.com" },
    { Icon: Youtube, href: "https://youtube.com" },
    { Icon: Facebook, href: "https://facebook.com" },
    { Icon: Linkedin, href: "https://linkedin.com" },
    { Icon: Github, href: "https://github.com" },
  ];

  return (
    <div className={cn("flex items-center justify-center gap-6 md:gap-8 py-2", className)}>
      {icons.map(({ Icon, href }, index) => (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${Icon.name} page`}
          className="text-white/70 hover:text-white transition-all duration-300 hover:scale-125 transform relative p-2"
        >
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 hover:scale-100 transition-transform duration-300 -z-10"></div>
          <Icon size={iconSize} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
