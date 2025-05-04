
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo = ({ size = 'medium', className }: LogoProps) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  return (
    <div className={cn(sizeClasses[size], 'relative flex items-center justify-center', className)}>
      <img 
        src="/lovable-uploads/fd34969b-82ab-4649-be06-3894900a053e.png" 
        alt="Kammerjäger Adalbert Logo" 
        className="w-full h-full object-contain z-10"
        style={{ 
          filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))',
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default Logo;
