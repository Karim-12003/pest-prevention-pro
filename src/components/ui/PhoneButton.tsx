
import React from 'react';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneButtonProps {
  phoneNumber: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'fixed';
  size?: 'sm' | 'default' | 'lg';
}

const PhoneButton = ({
  phoneNumber,
  className,
  variant = 'default',
  size = 'default',
}: PhoneButtonProps) => {
  const formattedNumber = phoneNumber.replace(/\s/g, '');
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all ease-in-out duration-300";
  
  const variantStyles = {
    default: "bg-accent text-accent-foreground hover:bg-accent/90 rounded-md shadow-sm",
    outline: "border border-accent text-accent hover:bg-accent/10 rounded-md",
    ghost: "text-accent hover:bg-accent/10 rounded-md",
    link: "text-accent underline-offset-4 hover:underline",
    fixed: "fixed bottom-6 right-6 z-50 bg-accent text-accent-foreground shadow-lg rounded-full hover:scale-105 active:scale-95 transition-transform"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1 gap-1",
    default: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2"
  };
  
  const fixedStyles = variant === 'fixed' 
    ? "w-14 h-14 flex items-center justify-center" 
    : "";

  return (
    <a
      href={`tel:${formattedNumber}`}
      className={cn(
        baseStyles,
        variantStyles[variant],
        variant !== 'fixed' ? sizeStyles[size] : fixedStyles,
        className
      )}
      aria-label="Rufen Sie uns an"
    >
      {variant === 'fixed' ? (
        <Phone size={24} className="animate-pulse-subtle" />
      ) : (
        <>
          <Phone size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
          <span>{phoneNumber}</span>
        </>
      )}
    </a>
  );
};

export default PhoneButton;
