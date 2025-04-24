
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo = ({ size = 'medium', className }: LogoProps) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-14 h-14',
    large: 'w-20 h-20',
  };

  return (
    <div className={cn(sizeClasses[size], 'relative flex items-center justify-center', className)}>
      <img 
        src="/lovable-uploads/b413039e-1a85-4fcd-b872-92ec0f7a9ed6.png" 
        alt="Kammerjäger Adalbert Logo" 
        className="w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.05))' }}
      />
    </div>
  );
};

export default Logo;
