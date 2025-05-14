import React from 'react';
import { PhoneIncoming } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneButtonProps {
  phoneNumber: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'fixed';
  size?: 'sm' | 'default' | 'lg';
  linkText?: string;
}

const PhoneButton = ({
  phoneNumber,
  className,
  variant = 'default',
  size = 'default',
  linkText = "Jetzt anrufen",
}: PhoneButtonProps) => {
  // Format the displayed number with spaces as +49 178 2581987
  const displayNumber = phoneNumber.replace(/(\+\d{2})(\d{3})(\d{7})/, '$1 $2 $3');
  
  // Keep the href format without spaces
  const formattedNumber = phoneNumber.replace(/\s/g, '');
  
  const handleClick = (e: React.MouseEvent) => {
    // Call Google Ads conversion tracking function
    // @ts-ignore
    if (typeof gtag_report_conversion === 'function') {
      // @ts-ignore
      gtag_report_conversion();
      
      // Add a small delay to ensure tracking fires before navigation
      if (variant !== 'fixed') {
        e.preventDefault();
        setTimeout(() => {
          window.location.href = `tel:${formattedNumber}`;
        }, 300);
        return false;
      }
    }
  };
  
  const baseStyles = "inline-flex items-center justify-center font-medium";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 rounded-md",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md",
    ghost: "text-accent hover:text-accent/80 rounded-md",
    link: "text-accent underline-offset-4 hover:underline",
    fixed: "fixed bottom-6 right-6 z-50 bg-blue-600 text-white shadow-xl rounded-full hover:bg-blue-700"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1 gap-1",
    default: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-3 gap-2 font-bold"
  };
  
  const fixedStyles = variant === 'fixed' 
    ? "w-16 h-16 flex items-center justify-center transition-colors" 
    : "";

  // If we're using the fixed variant button, we'll show only the icon
  // Otherwise, show the standard button with text and icon
  if (variant === 'fixed') {
    return (
      <a
        href={`tel:${formattedNumber}`}
        className={cn(
          baseStyles,
          variantStyles[variant],
          fixedStyles,
          "transition-colors duration-200",
          "call-link",
          className
        )}
        aria-label={displayNumber}
        onClick={handleClick}
      >
        <div className="relative">
          <PhoneIncoming size={28} className="text-white" />
        </div>
      </a>
    );
  }

  // Standard button with text
  return (
    <a
      href={`tel:${formattedNumber}`}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "transition-colors duration-200",
        "call-link",
        className
      )}
      aria-label={displayNumber}
      onClick={handleClick}
    >
      <PhoneIncoming 
        size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
        className="flex-shrink-0"
      />
      {/* Display the formatted phone number */}
      {variant !== 'ghost' || size !== 'sm' ? (
        <span className="whitespace-nowrap font-bold">{displayNumber}</span>
      ) : null}
    </a>
  );
};

export default PhoneButton;
