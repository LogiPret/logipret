import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src="/logipret_logo_transparent.png" 
        alt="Logiprêt Logo" 
        className="h-10 md:h-12 w-auto"
      />
    </div>
  );
};