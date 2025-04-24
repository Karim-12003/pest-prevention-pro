
import React from 'react';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '../ui/AnimatedSection';
import { Award } from 'lucide-react';

const MovingLogoBanner = () => {
  const logos = [
    {
      name: "IHK Ausbildungsbetrieb",
      logo: "/lovable-uploads/ihk-logo.svg",
      variant: "secondary" as const,
      fallback: <div className="flex items-center"><Award className="h-5 w-5 mr-2" /> IHK Ausbildungsbetrieb</div>
    },
    {
      name: "Deutscher Schädlingsbekämpfer Verband",
      logo: "/lovable-uploads/dsv-logo.svg", 
      variant: "secondary" as const,
      fallback: <div className="flex items-center"><Award className="h-5 w-5 mr-2" /> DSV</div>
    },
    {
      name: "Das Handwerk",
      logo: "/lovable-uploads/handwerk-logo.svg",
      variant: "secondary" as const,
      fallback: <div className="flex items-center"><Award className="h-5 w-5 mr-2" /> Das Handwerk</div>
    },
    {
      name: "Mitglied der Handwerkskammer",
      logo: "/lovable-uploads/hwk-logo.svg",
      variant: "secondary" as const,
      fallback: <div className="flex items-center"><Award className="h-5 w-5 mr-2" /> Handwerkskammer</div>
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
              className="px-6 py-2 text-sm whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-12 flex items-center"
            >
              {logo.fallback}
            </Badge>
          ))}
        </div>
        <div className="flex gap-6 min-w-full">
          {logos.map((logo, index) => (
            <Badge
              key={`duplicate-${index}`}
              variant={logo.variant}
              className="px-6 py-2 text-sm whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-12 flex items-center"
            >
              {logo.fallback}
            </Badge>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default MovingLogoBanner;
