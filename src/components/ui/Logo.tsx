
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo = ({ size = 'medium', className }: LogoProps) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className={cn(sizeClasses[size], 'relative', className)}>
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="50" cy="50" r="45" fill="#1A1F2C" />
        <circle cx="50" cy="50" r="35" fill="#9b87f5" />
        <path 
          d="M30,50 Q50,20 70,50 Q50,80 30,50 Z" 
          fill="#fff" 
          stroke="#1A1F2C" 
          strokeWidth="2" 
        />
        <circle cx="50" cy="40" r="5" fill="#1A1F2C" />
      </svg>
    </div>
  );
};

export default Logo;
