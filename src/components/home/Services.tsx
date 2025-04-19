
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Bug, Rat, Sprout, Bed, BugOff, Stethoscope, Squirrel } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useUserLocation } from '@/hooks/useUserLocation';

const services = [
  {
    icon: <Bug className="h-10 w-10" />,
    title: "Insektenbekämpfung",
    description: "Effektive Bekämpfung von Wespen, Kakerlaken, Ameisen und anderen Insekten mit modernsten Methoden.",
    image: "https://www.bund-niedersachsen.de/fileadmin/niedersachsen/bilder/artenschutz/wespen/wespennest_wasp-nest-gba3281439_1920_pixabay_com_wespennest-wespen-waben-nest-335984_kundennote_com.jpg",
    alt: "Professionelle Insektenbekämpfung bei Wespen, Kakerlaken und Ameisen",
    keywords: ["Wespenbekämpfung", "Ameisenbekämpfung", "Kakerlakenbekämpfung"]
  },
  {
    icon: <Rat className="h-10 w-10" />,
    title: "Nagetierbekämpfung",
    description: "Professionelle Entfernung von Mäusen, Ratten und anderen Nagetieren mit nachhaltigen Lösungen.",
    image: "https://www.das-tierlexikon.de/wp-content/uploads/2018/08/mongolische-rennmaeuse.jpg",
    alt: "Effektive Nagetierbekämpfung gegen Mäuse und Ratten durch Fachexperten",
    keywords: ["Rattenbekämpfung", "Mäusebekämpfung", "Nagerbefall"]
  },
  {
    icon: <Squirrel className="h-10 w-10" />,
    title: "Marderbekämpfung",
    description: "Fachgerechte Vertreibung und Prävention von Mardern in Wohnhäusern und auf Dachböden.",
    image: "https://images.t-online.de/2021/08/87372772v2/0x100:1920x1080/fit-in/1920x0/marder-meist-faellt-ein-marder-im-haus-anfangs-nicht-auf-da-die-tiere-erst-nachts-aktiv-werden.jpg",
    alt: "Marderbekämpfung für Dachböden und Wohnräume durch zertifizierte Experten",
    keywords: ["Marderbekämpfung", "Marderschutz", "Marder Dachboden"]
  },
  {
    icon: <Sprout className="h-10 w-10" />,
    title: "Schimmelbekämpfung",
    description: "Gründliche Beseitigung von Schimmel und Feuchtigkeitsschäden für ein gesundes Raumklima.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    alt: "Professionelle Schimmelbekämpfung und Feuchtigkeitsbehandlung für gesundes Raumklima",
    keywords: ["Schimmelbekämpfung", "Feuchtigkeitsschäden", "Schimmelpilz Entfernung"]
  },
  {
    icon: <Bed className="h-10 w-10" />,
    title: "Bettwanzenbekämpfung",
    description: "Spezialisierte Behandlung zur vollständigen Beseitigung von Bettwanzen und deren Eiern.",
    image: "https://farmers-cat.de/media/wysiwyg/Bettwanzen/shutterstock_2236348135_.jpg",
    alt: "Spezialisierte Bettwanzenbekämpfung durch qualifizierte Kammerjäger",
    keywords: ["Bettwanzenbekämpfung", "Bettwanzen Behandlung", "Bettwanzen loswerden"]
  },
  {
    icon: <BugOff className="h-10 w-10" />,
    title: "Spinnenbekämpfung",
    description: "Gezielte Entfernung von Spinnen und deren Netzen mit langanhaltender Wirkung.",
    image: "https://www.maler-raschke.de/wp-content/uploads/2015/08/schimmelsanierung_22.jpg",
    alt: "Spinnenbekämpfung und Entfernung von Spinnennetzen mit langanhaltender Wirkung",
    keywords: ["Spinnenbekämpfung", "Spinnenentfernung", "Spinnennetze entfernen"]
  },
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Wartungsverträge",
    description: "Vorbeugende Maßnahmen und regelmäßige Inspektionen zum Schutz vor Schädlingsbefall.",
    image: "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1000",
    alt: "Vorsorgende Schädlingsbekämpfung durch regelmäßige Inspektionen und Wartungsverträge",
    keywords: ["Schädlingsmonitoring", "Präventionsservice", "Wartungsvertrag Schädlinge"]
  },
];

const Services = () => {
  const { city } = useUserLocation();
  const locationText = city ? ` in ${city}` : '';

  return (
    <AnimatedSection id="services" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">Unsere Schädlingsbekämpfung-Leistungen{locationText}</h2>
          <p className="section-subheading">
            Wir bieten umfassende und maßgeschneiderte Lösungen für alle Arten von Schädlingsproblemen - schnell, zuverlässig und effektiv.
          </p>
        </div>

        {/* Bild hinzufügen, das in den Service-Bereich integriert ist */}
        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-md">
          <AspectRatio ratio={16/9}>
            <img 
              src="https://www.hcc-magazin.com/wp-content/uploads/2021/11/hcc-magazin_schaelingsbekaempfung-gesundheitsschutz_arten-schaedlinge-professionelle-bekaempfung-methoden-840x473.jpg" 
              alt="Professionelle Schädlingsbekämpfung in Aktion durch zertifizierte Experten" 
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              width="840"
              height="473"
              loading="lazy"
            />
          </AspectRatio>
          <div className="bg-white p-4 text-center text-sm text-muted-foreground">
            Unsere Experten sorgen für umfassende Schädlingsbekämpfung in Ihrem Zuhause oder Geschäft{locationText}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <article
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
                    width="400"
                    height="225"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
              
              <div className="rounded-full bg-accent/10 p-4 inline-flex mb-5 text-accent">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}{locationText}</h3>
              <p className="text-muted-foreground">{service.description}</p>
              
              {/* Hidden keywords for SEO */}
              <div className="sr-only">
                <h4>Stichworte zur {service.title}</h4>
                <ul>
                  {service.keywords.map((keyword, idx) => (
                    <li key={idx}>{keyword}{locationText}</li>
                  ))}
                </ul>
              </div>
            </article>
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
