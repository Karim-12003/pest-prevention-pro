
import React from 'react';
import PhoneButton from './PhoneButton';

interface SectionCTAProps {
  text?: string;
  phoneNumber: string;
}

const SectionCTA = ({ 
  text = "Jetzt kostenlos beraten lassen!", 
  phoneNumber 
}: SectionCTAProps) => {
  return (
    <div className="py-8 bg-secondary/30">
      <div className="container mx-auto text-center">
        <p className="text-lg md:text-xl mb-4 text-primary/90">{text}</p>
        <PhoneButton 
          phoneNumber={phoneNumber} 
          size="lg"
          className="shadow-lg hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
};

export default SectionCTA;
