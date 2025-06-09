import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroContent from './HeroContent';
import HeroFeatures from './HeroFeatures';
import { updateCityPlaceholders } from '../../utils/modernCityDetection';

const PHONE_NUMBER = "+491782581987";

interface HeroProps {
  cityName?: string;
}

const Hero = ({ cityName = "Ihrer Stadt" }: HeroProps) => {
  // Effekt zur Aktualisierung der Stadt-Platzhalter mit dem neuen System
  useEffect(() => {
    console.log("Hero wird gerendert mit cityName:", cityName);
    
    // Verwende das neue moderne System zur Aktualisierung aller Platzhalter
    updateCityPlaceholders(cityName);
    
    // Nach kurzer Verzögerung nochmal ausführen für dynamisch nachgeladene Elemente
    const timeoutId = setTimeout(() => updateCityPlaceholders(cityName), 300);
    const longTimeoutId = setTimeout(() => updateCityPlaceholders(cityName), 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(longTimeoutId);
    };
  }, [cityName]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kammerjäger Adalbert",
    "description": `Professionelle Schädlingsbekämpfung mit IHK-zertifizierten Experten in ${cityName}. 24/7 Notdienst verfügbar.`,
    "telephone": PHONE_NUMBER,
    "url": "https://kammerjaeger-adalbert.de",
    "image": "/lovable-uploads/b413039e-1a85-4fcd-b872-92ec0f7a9ed6.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "€€"
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <section className="pb-12 sm:pb-16 md:pb-20 overflow-hidden relative">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-col md:flex-row items-center">
            <HeroContent cityName={cityName} />
            <div className="w-full md:w-1/2 pl-0 md:pl-6 lg:pl-10">
              <HeroFeatures />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
