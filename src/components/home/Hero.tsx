
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Shield, Home, Zap, Calendar, Bell } from 'lucide-react';
import PhoneButton from '../ui/PhoneButton';
import WhatsAppButton from '../ui/WhatsAppButton';
import Logo from '../ui/Logo';
import { Helmet } from 'react-helmet-async';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import MoneyBackBadge from '../ui/MoneyBackBadge';

const PHONE_NUMBER = "+491782581987";

interface HeroProps {
  cityName?: string;
}

const Hero = ({ cityName = "Ihrer Stadt" }: HeroProps) => {
  // Effekt zum Überprüfen, ob die Elemente korrekt aktualisiert wurden
  useEffect(() => {
    const checkCityElements = () => {
      const cityElements = document.querySelectorAll('.city-placeholder');
      if (cityElements.length > 0) {
        console.log("Hero city-placeholder Elemente gefunden:", cityElements.length);
      } else {
        console.warn("Keine city-placeholder Elemente im Hero-Komponenten gefunden!");
      }
    };
    
    // Nach kurzer Verzögerung prüfen, um sicherzustellen, dass DOM geladen ist
    setTimeout(checkCityElements, 500);
  }, []);

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
      
      <section className="pb-16 md:pb-20 overflow-hidden relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4 relative z-30">
                <Logo size="large" />
              </div>
              
              <div className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-6 animate-fade-in relative z-10">
                <span className="break-words">Professionelle Schädlingsbekämpfung</span>
              </div>
              
              <h1 id="headline" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
                Ihr Experte für effektive Schädlingsbekämpfung aus <span className="city-placeholder">{cityName}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
                Zertifizierte Profis mit über 20 Jahren Erfahrung aus <span className="city-placeholder">{cityName}</span>. Wir bieten schnelle und diskrete Lösungen für Ihre Schädlingsprobleme.
              </p>
              
              <div className="flex flex-col gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <div>
                    <PhoneButton 
                      phoneNumber={PHONE_NUMBER} 
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-lg py-4 shadow-lg" 
                    />
                  </div>
                  
                  <div>
                    <WhatsAppButton 
                      phoneNumber={PHONE_NUMBER} 
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-lg py-4 shadow-lg"
                    />
                  </div>
                  
                  <div>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center justify-center px-6 py-4 rounded-md bg-accent hover:bg-accent/90 text-white font-bold transition-colors text-lg shadow-lg"
                    >
                      Kostenlose Beratung
                    </a>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start">
                  <MoneyBackBadge />
                </div>
              </div>
              
              <div className="mt-6 bg-red-50 text-red-600 rounded-lg py-3 px-4 border border-red-200 shadow-sm flex items-center justify-center md:justify-start gap-2 animate-pulse-subtle animate-fade-in" style={{ animationDelay: '400ms' }}>
                <Calendar className="w-5 h-5 animate-pulse" />
                <p className="text-sm font-medium md:text-base">
                  <span className="font-bold">HEUTE NOCH</span> freie Termine verfügbar!
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 pl-0 md:pl-10">
              <div className="grid grid-cols-1 gap-5 md:gap-6 max-w-md mx-auto">
                {[
                  {
                    icon: <Shield className="w-5 h-5 md:w-6 md:h-6 text-accent" />,
                    title: "IHK zertifizierte Experten",
                    description: "Von der IHK anerkannte Fachkräfte für Schädlingsbekämpfung",
                    delay: 400,
                  },
                  {
                    icon: <Home className="w-5 h-5 md:w-6 md:h-6 text-accent" />,
                    title: "Kostenlose Anfahrt",
                    description: "Keine versteckten Kosten - transparente Preise garantiert",
                    delay: 500,
                  },
                  {
                    icon: <Zap className="w-5 h-5 md:w-6 md:h-6 text-accent" />,
                    title: "Schnelle Reaktionszeit",
                    description: "Wir sind innerhalb von 30-60 Minuten bei Ihnen vor Ort",
                    delay: 600,
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-primary/10 transition-all duration-300 hover:shadow-md animate-fade-in"
                    style={{ animationDelay: `${feature.delay}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="rounded-full bg-accent/10 p-3 mr-4 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
