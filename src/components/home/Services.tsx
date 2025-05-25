
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Bug, Rat, Sprout, Bed, BugOff, Stethoscope, Mouse } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: <Rat className="h-10 w-10" />,
    title: "Rattenbekämpfung",
    description: "Professionelle Beseitigung von Ratten in Wohnhäusern, Gärten und Betrieben mit nachhaltigen Lösungen.",
    image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Effektive Rattenbekämpfung durch Fachexperten",
    keywords: ["Rattenbekämpfung", "Rattenbefall", "Rattennest entfernen"]
  },
  {
    icon: <Mouse className="h-10 w-10" />,
    title: "Mäusebekämpfung",
    description: "Effektive Entfernung von Mäusen und anderen Nagetieren aus Ihrem Zuhause oder Geschäftsräumen.",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Professionelle Mäusebekämpfung durch zertifizierte Kammerjäger",
    keywords: ["Mäusebekämpfung", "Mäusebefall", "Mäusenest entfernen"]
  },
  {
    icon: <BugOff className="h-10 w-10" />,
    title: "Marderbekämpfung",
    description: "Fachgerechte Vertreibung und Prävention von Mardern in Wohnhäusern, auf Dachböden und in Autos.",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Marderbekämpfung für Dachböden und Wohnräume durch zertifizierte Experten",
    keywords: ["Marderbekämpfung", "Marderschutz", "Marder Dachboden"]
  },
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Ameisenbekämpfung",
    description: "Gezielte und nachhaltige Bekämpfung von Ameisen in Wohnräumen, Gärten und Terrassen.",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Professionelle Ameisenbekämpfung im Innen- und Außenbereich",
    keywords: ["Ameisenbekämpfung", "Ameisennest entfernen", "Ameisen loswerden"]
  },
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Silberfisch- & Papierfischbekämpfung",
    description: "Effektive Bekämpfung von Silberfischen und Papierfischen für ein gesundes Raumklima ohne Schädlinge.",
    image: "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Spezialisierte Bekämpfung von Silberfischen und Papierfischen",
    keywords: ["Silberfischbekämpfung", "Papierfischbekämpfung", "Feuchtigkeit bekämpfen"]
  },
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Wespenbekämpfung",
    description: "Sichere und fachgerechte Entfernung von Wespennestern und Insektenschwärmen an Ihrem Gebäude.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Professionelle Wespenbekämpfung und Nestentfernung",
    keywords: ["Wespenbekämpfung", "Wespennest entfernen", "Wespenplage"]
  },
  {
    icon: <Bed className="h-10 w-10" />,
    title: "Bettwanzenbekämpfung",
    description: "Spezialisierte Behandlung zur vollständigen Beseitigung von Bettwanzen und deren Eiern in Wohn- und Schlafräumen.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Spezialisierte Bettwanzenbekämpfung durch qualifizierte Kammerjäger",
    keywords: ["Bettwanzenbekämpfung", "Bettwanzen Behandlung", "Bettwanzen loswerden"]
  },
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Flohbekämpfung",
    description: "Gründliche Beseitigung von Flöhen in Wohnräumen und Polstermöbeln mit langanhaltender Wirkung.",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Professionelle Flohbekämpfung für Wohnräume und Polstermöbel",
    keywords: ["Flohbekämpfung", "Flöhe bekämpfen", "Flohbefall behandeln"]
  },
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Wartungsverträge",
    description: "Vorbeugende Maßnahmen und regelmäßige Inspektionen zum kontinuierlichen Schutz vor Schädlingsbefall.",
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?w=400&h=225&fit=crop&auto=format&q=75",
    alt: "Vorsorgende Schädlingsbekämpfung durch regelmäßige Inspektionen und Wartungsverträge",
    keywords: ["Schädlingsmonitoring", "Präventionsservice", "Wartungsvertrag Schädlinge"]
  },
];

const Services = () => {
  return (
    <AnimatedSection id="services" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">
            Unsere Schädlingsbekämpfung-Dienstleistungen in NRW
          </h2>
          <p className="section-subheading">
            Wir bekämpfen gezielt Ratten, Mäuse, Marder, Ameisen, Silberfische, Papierfische, Wespen, Bettwanzen und Flöhe mit professionellen und nachhaltigen Methoden.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-md">
          <AspectRatio ratio={16/9}>
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=840&h=473&fit=crop&auto=format&q=80" 
              alt="Professionelle Schädlingsbekämpfung in Aktion durch zertifizierte Experten" 
              className="object-cover w-full h-full"
              width="840"
              height="473"
              loading="lazy"
              decoding="async"
            />
          </AspectRatio>
          <div className="bg-white p-4 text-center text-sm text-muted-foreground">
            Unsere zertifizierten Kammerjäger bekämpfen alle Arten von Schädlingen in Ihrem Zuhause oder Geschäft
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border border-primary/10 hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-5 rounded-lg overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={service.image} 
                    alt={service.alt} 
                    className="object-cover w-full h-full"
                    width="400"
                    height="225"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </AspectRatio>
              </div>
              
              <CardContent className="pt-6">
                <div className="rounded-full bg-accent/10 p-4 inline-flex mb-5 text-accent">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                
                <div className="sr-only">
                  <h4>Stichworte zur {service.title}</h4>
                  <ul>
                    {service.keywords.map((keyword, idx) => (
                      <li key={idx}>{keyword}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-6">
            Alle Leistungen werden in NRW mit einer <span className="font-semibold text-accent">kostenlosen Anfahrt</span> und einem <span className="font-semibold text-accent">transparenten Preismodell</span> angeboten.
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
