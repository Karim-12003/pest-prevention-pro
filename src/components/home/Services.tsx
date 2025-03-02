
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Bug, Rat, Sprout, Bed, BugOff, Stethoscope, Squirrel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const services = [
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Insektenbekämpfung",
    description: "Effektive Bekämpfung von Wespen, Kakerlaken, Ameisen und anderen Insekten mit modernsten Methoden.",
    image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?auto=format&fit=crop&q=80",
    alt: "Nahaufnahme von Insekten"
  },
  {
    icon: <Rat className="h-10 w-10" />,
    title: "Nagetierbekämpfung",
    description: "Professionelle Entfernung von Mäusen, Ratten und anderen Nagetieren mit nachhaltigen Lösungen.",
    image: "https://images.unsplash.com/photo-1590691566903-2a8b3433d0bf?auto=format&fit=crop&q=80",
    alt: "Nagetier in natürlicher Umgebung"
  },
  {
    icon: <Squirrel className="h-10 w-10" />,
    title: "Marderbekämpfung",
    description: "Fachgerechte Vertreibung und Prävention von Mardern in Wohnhäusern und auf Dachböden.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80",
    alt: "Marder in natürlicher Umgebung"
  },
  {
    icon: <Sprout className="h-10 w-10" />,
    title: "Schimmelbekämpfung",
    description: "Gründliche Beseitigung von Schimmel und Feuchtigkeitsschäden für ein gesundes Raumklima.",
    image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80",
    alt: "Schimmelbefall an einer Wand"
  },
  {
    icon: <Bed className="h-10 w-10" />,
    title: "Bettwanzenbekämpfung",
    description: "Spezialisierte Behandlung zur vollständigen Beseitigung von Bettwanzen und deren Eiern.",
    image: "https://images.unsplash.com/photo-1564731070937-59329a21b8d7?auto=format&fit=crop&q=80",
    alt: "Nahaufnahme eines Bettes für Bettwanzenbekämpfung"
  },
  {
    icon: <BugOff className="h-10 w-10" />,
    title: "Spinnenbekämpfung",
    description: "Gezielte Entfernung von Spinnen und deren Netzen mit langanhaltender Wirkung.",
    image: "https://images.unsplash.com/photo-1556890900-9d5bf99db4f1?auto=format&fit=crop&q=80",
    alt: "Nahaufnahme einer Spinne in ihrem Netz"
  },
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Präventionsservice",
    description: "Vorbeugende Maßnahmen und regelmäßige Inspektionen zum Schutz vor Schädlingsbefall.",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&q=80",
    alt: "Präventive Schädlingsbekämpfung"
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

        {/* Bild hinzufügen, das in den Service-Bereich integriert ist */}
        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-md">
          <AspectRatio ratio={16/9}>
            <img 
              src="/placeholder.svg" 
              alt="Professionelle Schädlingsbekämpfung in Aktion" 
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </AspectRatio>
          <div className="bg-white p-4 text-center text-sm text-muted-foreground">
            Unsere Experten sorgen für umfassende Schädlingsbekämpfung in Ihrem Zuhause oder Geschäft
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl p-6 shadow-sm border border-primary/10 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
              )}
            >
              {/* Service image */}
              <div className="mb-5 rounded-lg overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={service.image} 
                    alt={service.alt} 
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </AspectRatio>
              </div>
              
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
