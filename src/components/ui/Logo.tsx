
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
    <div className={cn(sizeClasses[size], 'relative rounded-full flex items-center justify-center', className)}>
      <img 
        src="/lovable-uploads/b413039e-1a85-4fcd-b872-92ec0f7a9ed6.png" 
        alt="Kammerjäger Adalbert Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;
