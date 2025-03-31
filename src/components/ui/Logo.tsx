
import React from 'react';
import { cn } from '@/lib/utils';
import { Bug } from 'lucide-react';

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
    <div className={cn(sizeClasses[size], 'relative rounded-full', className)}>
      <div className="absolute inset-0 bg-accent rounded-full"></div>
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
        <Bug className="w-1/2 h-1/2 text-accent" />
      </div>
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <circle cx="50" cy="50" r="48" fill="none" stroke="#9b87f5" strokeWidth="4" strokeDasharray="8 4" />
      </svg>
    </div>
  );
};

export default Logo;
