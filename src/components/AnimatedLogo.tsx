import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  variant?: "default" | "minimal" | "dark";
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className = "",
  variant = "default",
  size = "md",
  showText = true,
  animated = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
  };

  const logoId = `logo-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Link 
      to="/" 
      className={cn("inline-block relative group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>
        {animated && `
          @keyframes pulse-ring {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-3px);
            }
          }

          @keyframes dot-pulse {
            0%, 100% {
              opacity: 0.6;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.5);
            }
          }

          @keyframes text-slide {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes glow {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 0.5;
            }
          }

          .logo-container-${logoId} {
            animation: float 3s ease-in-out infinite;
          }

          .logo-container-${logoId}:hover .logo-main-circle {
            animation: pulse-ring 1s ease-out;
            transform-origin: center;
          }

          .logo-container-${logoId} .logo-center-circle {
            animation: pulse-ring 2s ease-in-out infinite;
          }

          .logo-container-${logoId} .logo-dot-1 {
            animation: dot-pulse 2s ease-in-out infinite;
          }

          .logo-container-${logoId} .logo-dot-2 {
            animation: dot-pulse 2s ease-in-out infinite 0.5s;
          }

          .logo-container-${logoId} .logo-dot-3 {
            animation: dot-pulse 2s ease-in-out infinite 1s;
          }

          .logo-container-${logoId} .logo-text {
            animation: text-slide 0.5s ease-out;
          }

          .logo-container-${logoId} .logo-glow {
            animation: glow 3s ease-in-out infinite;
          }

          .logo-container-${logoId}:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
          }
        `}
      </style>

      <div className={cn(`logo-container-${logoId}`, animated && "transition-all duration-300")}>
        <svg
          viewBox="0 0 200 60"
          fill="none"
          className={cn(sizeClasses[size], "relative z-10")}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle Accent */}
          <circle
            cx="30"
            cy="30"
            r="28"
            fill={`url(#${logoId}-gradient1)`}
            opacity="0.1"
            className={cn(animated && "transition-all duration-500", isHovered && "opacity-20")}
          />

          {/* Main O Shape with Gradient */}
          <g id="logo-o">
            <circle
              cx="30"
              cy="30"
              r="20"
              stroke={`url(#${logoId}-gradient2)`}
              strokeWidth="3"
              fill="none"
              className={cn("logo-main-circle", animated && "transition-all duration-500")}
            />
            <circle
              cx="30"
              cy="30"
              r="14"
              fill={`url(#${logoId}-gradient3)`}
              opacity="0.2"
              className={cn(animated && "transition-all duration-500")}
            />
            <circle
              cx="30"
              cy="30"
              r="8"
              fill={`url(#${logoId}-gradient2)`}
              className={cn("logo-center-circle", animated && "transition-all duration-500")}
            />
          </g>

          {/* Text Logo */}
          {showText && (
            <g id="logo-text">
              <text
                x="65"
                y="38"
                fontFamily="Inter, system-ui, -apple-system, sans-serif"
                fontSize="32"
                fontWeight="700"
                fill={`url(#${logoId}-gradient2)`}
                className={cn("logo-text", animated && "transition-all duration-500")}
              >
                rdify
              </text>
            </g>
          )}

          {/* Animated Dots */}
          <g id="animated-dots">
            <circle
              cx="45"
              cy="15"
              r="2"
              fill="#10B981"
              className={cn("logo-dot-1", animated && "transition-all duration-300")}
              opacity="0.6"
            />
            <circle
              cx="52"
              cy="12"
              r="2"
              fill="#3B82F6"
              className={cn("logo-dot-2", animated && "transition-all duration-300")}
              opacity="0.6"
            />
            <circle
              cx="58"
              cy="15"
              r="2"
              fill="#8B5CF6"
              className={cn("logo-dot-3", animated && "transition-all duration-300")}
              opacity="0.6"
            />
          </g>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id={`${logoId}-gradient1`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            <linearGradient id={`${logoId}-gradient2`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={variant === "dark" ? "#60A5FA" : "#3B82F6"} />
              <stop offset="50%" stopColor={variant === "dark" ? "#A78BFA" : "#8B5CF6"} />
              <stop offset="100%" stopColor={variant === "dark" ? "#F472B6" : "#EC4899"} />
            </linearGradient>

            <radialGradient id={`${logoId}-gradient3`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>

        {/* Glow Effect */}
        {animated && (
          <div
            className={cn(
              "absolute inset-0 -z-10 blur-xl logo-glow",
              "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full",
              "transition-opacity duration-300"
            )}
          />
        )}
      </div>
    </Link>
  );
};

export default AnimatedLogo;