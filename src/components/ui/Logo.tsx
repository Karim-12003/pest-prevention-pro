
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
    large: 'w-20 h-20',
  };

  return (
    <div className={cn(sizeClasses[size], 'relative flex items-center justify-center', className)}>
      <img 
        src="/lovable-uploads/fd34969b-82ab-4649-be06-3894900a053e.png" 
        alt="Kammerjäger Adalbert Logo" 
        className="w-full h-full object-contain z-10 relative"
        style={{ 
          filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))',
        }}
      />
    </div>
  );
};

export default Logo;
