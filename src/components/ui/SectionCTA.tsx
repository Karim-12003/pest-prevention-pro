
import React from 'react';
import PhoneButton from './PhoneButton';
import MoneyBackBadge from './MoneyBackBadge';

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
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-accent/20 relative">
          <p className="text-xl md:text-2xl mb-6 text-accent font-bold">{text}</p>
          <div className="flex flex-col items-center gap-4">
            <PhoneButton 
              phoneNumber={phoneNumber} 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg py-4 shadow-lg transition-colors"
            />
            <MoneyBackBadge />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCTA;
