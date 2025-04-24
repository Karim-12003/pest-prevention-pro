
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
    <AnimatedSection className="py-6 bg-primary/5 overflow-hidden">
      <div className={`flex ${isMobile ? 'animate-[scroll_30s_linear_infinite]' : 'animate-[scroll_20s_linear_infinite]'}`}>
        <div className="flex min-w-full">
          {logos.map((logo, index) => (
            <Badge
              key={index}
              variant={logo.variant}
              className="mx-6 px-4 py-2 text-sm md:text-base whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-auto min-h-[3rem] flex items-center"
            >
              <div className="flex items-center">
                {logo.icon}
                <span>{logo.text}</span>
              </div>
            </Badge>
          ))}
        </div>
        <div className="flex min-w-full">
          {logos.map((logo, index) => (
            <Badge
              key={`duplicate-${index}`}
              variant={logo.variant}
              className="mx-6 px-4 py-2 text-sm md:text-base whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-auto min-h-[3rem] flex items-center"
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
