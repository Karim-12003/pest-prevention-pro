
import React from 'react';
import { Badge } from '@/components/ui/badge';
import AnimatedSection from '../ui/AnimatedSection';
import { Award } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MovingLogoBanner = () => {
  const isMobile = useIsMobile();
  
  const logos = [
    {
      name: "IHK Ausbildungsbetrieb",
      variant: "secondary" as const,
      icon: <Award className="h-5 w-5 mr-2" />,
      text: "IHK Ausbildungsbetrieb"
    },
    {
      name: "Deutscher Schädlingsbekämpfer Verband",
      variant: "secondary" as const,
      icon: <Award className="h-5 w-5 mr-2" />,
      text: "DSV"
    },
    {
      name: "Das Handwerk",
      variant: "secondary" as const,
      icon: <Award className="h-5 w-5 mr-2" />,
      text: "Das Handwerk"
    },
    {
      name: "Mitglied der Handwerkskammer",
      variant: "secondary" as const,
      icon: <Award className="h-5 w-5 mr-2" />,
      text: "Handwerkskammer"
    }
  ];

  return (
    <AnimatedSection className="py-6 bg-primary/5">
      <div className="container mx-auto">
        <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-6'} items-center justify-items-center`}>
          {logos.map((logo, index) => (
            <Badge
              key={index}
              variant={logo.variant}
              className={`
                px-4 py-3 
                ${isMobile ? 'text-sm' : 'text-base'} 
                whitespace-nowrap bg-white 
                shadow-sm hover:bg-white/90 
                h-auto w-full
                flex items-center justify-center
              `}
            >
              <div className="flex items-center">
                {logo.icon}
                <span>{logo.text}</span>
              </div>
            </Badge>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default MovingLogoBanner;
