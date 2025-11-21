import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Icon Mark - White Stroke */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path 
          d="M20 4L4 16V36H16V26H24V36H36V16L20 4Z" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Text Mark */}
      <span className="font-extrabold text-2xl tracking-tight text-white">
        LOGIPRÊT
      </span>
    </div>
  );
};