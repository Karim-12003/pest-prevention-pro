
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
        src="/lovable-uploads/b662e3d0-b8bb-4a2d-81e4-c778522162ee.png" 
        alt="Kammerjäger Schneider Logo" 
        className="w-full h-full object-contain z-10 relative"
        style={{ 
          filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.1))',
        }}
      />
    </div>
  );
};

export default Logo;
