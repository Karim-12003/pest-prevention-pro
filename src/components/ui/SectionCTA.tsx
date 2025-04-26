
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
    <div className="py-8 bg-gradient-to-r from-red-50 to-red-100 transition-all duration-300 hover:from-red-100 hover:to-red-200">
      <div className="container mx-auto text-center">
        <p className="text-xl md:text-2xl mb-6 text-red-600 font-bold transition-colors duration-300 hover:text-red-700">{text}</p>
        <PhoneButton 
          phoneNumber={phoneNumber} 
          size="lg"
          className="shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:scale-[1.01]"
        />
      </div>
    </div>
  );
};

export default SectionCTA;
