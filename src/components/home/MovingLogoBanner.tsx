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

  // For mobile, render a simpler version with static badges
  if (isMobile) {
    return (
      <AnimatedSection className="py-4 bg-primary/5">
        <div className="container px-2">
          <div className="flex flex-wrap justify-center gap-3">
            {logos.map((logo, index) => (
              <Badge
                key={index}
                variant={logo.variant}
                className="px-3 py-2 text-sm whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-auto flex items-center"
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
  }

  // For desktop, keep the scrolling animation
  return (
    <AnimatedSection className="py-6 bg-primary/5 overflow-hidden">
      <div className="animate-[scroll_20s_linear_infinite]">
        <div className="flex min-w-full justify-center">
          {logos.map((logo, index) => (
            <Badge
              key={index}
              variant={logo.variant}
              className="mx-6 px-6 py-2 text-base whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-auto min-h-[3rem] flex items-center"
            >
              <div className="flex items-center">
                {logo.icon}
                <span>{logo.text}</span>
              </div>
            </Badge>
          ))}
        </div>
        <div className="flex min-w-full justify-center">
          {logos.map((logo, index) => (
            <Badge
              key={`duplicate-${index}`}
              variant={logo.variant}
              className="mx-6 px-6 py-2 text-base whitespace-nowrap bg-white shadow-sm hover:bg-white/90 h-auto min-h-[3rem] flex items-center"
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
