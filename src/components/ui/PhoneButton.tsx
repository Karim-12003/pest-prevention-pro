import React from 'react';
import { PhoneIncoming } from 'lucide-react';
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
  
  const handleClick = () => {
    // @ts-ignore
    if (typeof gtag_report_conversion === 'function') {
      // @ts-ignore
      gtag_report_conversion();
    }
  };
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all ease-in-out duration-300";
  
  const variantStyles = {
    default: "bg-accent text-accent-foreground hover:bg-accent/90 rounded-md shadow-sm hover:shadow-md",
    outline: "border border-accent text-accent hover:bg-accent/10 rounded-md hover:shadow-md",
    ghost: "text-accent hover:bg-accent/10 rounded-md",
    link: "text-accent underline-offset-4 hover:underline",
    fixed: "fixed bottom-6 right-6 z-50 bg-accent text-accent-foreground shadow-lg rounded-full hover:scale-110 active:scale-95 transition-transform"
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
      onClick={handleClick}
    >
      {variant === 'fixed' ? (
        <div className="relative">
          <PhoneIncoming size={24} className="text-white z-10 relative" />
          <div className="absolute inset-0 bg-accent/70 rounded-full animate-delayed-ping"></div>
        </div>
      ) : (
        <>
          <PhoneIncoming 
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            className="flex-shrink-0"
          />
          {variant !== 'ghost' || size !== 'sm' ? (
            <span className="whitespace-nowrap">{phoneNumber}</span>
          ) : null}
        </>
      )}
    </a>
  );
};

export default PhoneButton;
