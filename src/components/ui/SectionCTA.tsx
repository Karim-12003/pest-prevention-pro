
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
    <div className="py-8 bg-gradient-to-r from-accent/5 to-accent/10">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-accent/20">
          <p className="text-xl md:text-2xl mb-6 text-accent font-bold">{text}</p>
          <PhoneButton 
            phoneNumber={phoneNumber} 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg py-4 shadow-lg transform hover:scale-105 transition-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionCTA;
