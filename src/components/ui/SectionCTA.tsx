
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
    <div className="py-8 bg-white">
      <div className="container mx-auto text-center">
        <p className="text-xl md:text-2xl mb-6 text-red-600 font-bold">{text}</p>
        <PhoneButton 
          phoneNumber={phoneNumber} 
          size="lg"
          className="shadow-md"
        />
      </div>
    </div>
  );
};

export default SectionCTA;
