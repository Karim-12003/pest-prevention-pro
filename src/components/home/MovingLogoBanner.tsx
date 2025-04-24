
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
      icon: <Award className="h-4 w-4 mr-2" />,
      text: "IHK Ausbildungsbetrieb"
    },
    {
      name: "Deutscher Schädlingsbekämpfer Verband",
      variant: "secondary" as const,
      icon: <Award className="h-4 w-4 mr-2" />,
      text: "DSV"
    },
    {
      name: "Das Handwerk",
      variant: "secondary" as const,
      icon: <Award className="h-4 w-4 mr-2" />,
      text: "Das Handwerk"
    },
    {
      name: "Mitglied der Handwerkskammer",
      variant: "secondary" as const,
      icon: <Award className="h-4 w-4 mr-2" />,
      text: "Handwerkskammer"
    }
  ];

  return (
    <AnimatedSection className="py-6 bg-primary/5 overflow-hidden">
      <div className={`flex gap-6 ${isMobile ? 'animate-[scroll_30s_linear_infinite]' : 'animate-[scroll_20s_linear_infinite]'}`}>
        <div className="flex gap-6 min-w-full justify-center">
          {logos.map((logo, index) => (
            <Badge
              key={index}
              variant={logo.variant}
              className="px-4 py-2 text-sm whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-10 flex items-center"
            >
              <div className="flex items-center">
                {logo.icon}
                <span>{logo.text}</span>
              </div>
            </Badge>
          ))}
        </div>
        <div className="flex gap-6 min-w-full justify-center">
          {logos.map((logo, index) => (
            <Badge
              key={`duplicate-${index}`}
              variant={logo.variant}
              className="px-4 py-2 text-sm whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-10 flex items-center"
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
