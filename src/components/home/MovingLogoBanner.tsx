
import React from 'react';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '../ui/AnimatedSection';

const MovingLogoBanner = () => {
  const logos = [
    {
      text: "IHK Ausbildungsbetrieb",
      variant: "secondary" as const
    },
    {
      text: "Deutscher Schädlingsbekämpfer Verband",
      variant: "secondary" as const
    },
    {
      text: "Das Handwerk",
      variant: "secondary" as const
    },
    {
      text: "Mitglied der Handwerkskammer",
      variant: "secondary" as const
    }
  ];

  return (
    <AnimatedSection className="py-6 bg-primary/5 overflow-hidden">
      <div className="flex gap-6 animate-[scroll_20s_linear_infinite]">
        <div className="flex gap-6 min-w-full">
          {logos.map((logo, index) => (
            <Badge
              key={index}
              variant={logo.variant}
              className="px-6 py-2 text-sm whitespace-nowrap bg-white shadow-sm hover:bg-white/90"
            >
              {logo.text}
            </Badge>
          ))}
        </div>
        <div className="flex gap-6 min-w-full">
          {logos.map((logo, index) => (
            <Badge
              key={`duplicate-${index}`}
              variant={logo.variant}
              className="px-6 py-2 text-sm whitespace-nowrap bg-white shadow-sm hover:bg-white/90"
            >
              {logo.text}
            </Badge>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default MovingLogoBanner;

