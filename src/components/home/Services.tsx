
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Bug, Rat, Sprout, Bed, BugOff, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

const services = [
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Insektenbekämpfung",
    description: "Effektive Bekämpfung von Wespen, Kakerlaken, Ameisen und anderen Insekten mit modernsten Methoden.",
  },
  {
    icon: <Rat className="h-10 w-10" />,
    title: "Nagetierbekämpfung",
    description: "Professionelle Entfernung von Mäusen, Ratten und anderen Nagetieren mit nachhaltigen Lösungen.",
  },
  {
    icon: <Sprout className="h-10 w-10" />,
    title: "Schimmelbekämpfung",
    description: "Gründliche Beseitigung von Schimmel und Feuchtigkeitsschäden für ein gesundes Raumklima.",
  },
  {
    icon: <Bed className="h-10 w-10" />,
    title: "Bettwanzenbekämpfung",
    description: "Spezialisierte Behandlung zur vollständigen Beseitigung von Bettwanzen und deren Eiern.",
  },
  {
    icon: <BugOff className="h-10 w-10" />,
    title: "Spinnenbekämpfung",
    description: "Gezielte Entfernung von Spinnen und deren Netzen mit langanhaltender Wirkung.",
  },
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Präventionsservice",
    description: "Vorbeugende Maßnahmen und regelmäßige Inspektionen zum Schutz vor Schädlingsbefall.",
  },
];

const Services = () => {
  return (
    <AnimatedSection id="services" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">Unsere Leistungen</h2>
          <p className="section-subheading">
            Wir bieten umfassende und maßgeschneiderte Lösungen für alle Arten von Schädlingsproblemen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl p-6 shadow-sm border border-primary/10 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
              )}
            >
              <div className="rounded-full bg-accent/10 p-4 inline-flex mb-5 text-accent">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-6">
            Alle Leistungen werden mit <span className="font-semibold text-accent">kostenloser Anfahrt</span> und einem <span className="font-semibold text-accent">transparenten Preismodell</span> angeboten.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 font-medium transition-colors shadow-sm"
          >
            Kostenlose Beratung anfordern
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Services;
