
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
  // Effekt zur Überprüfung der Stadt-Platzhalter mit mehr Logging
  useEffect(() => {
    console.log("Hero wird gerendert mit cityName:", cityName);
    
    const updateCityPlaceholders = () => {
      const cityPlaceholders = document.querySelectorAll('.city-placeholder');
      console.log(`Hero useEffect: ${cityPlaceholders.length} city-placeholder Elemente gefunden`);
      
      cityPlaceholders.forEach((el, index) => {
        const oldText = el.textContent;
        console.log(`Hero useEffect: city-placeholder Element ${index + 1} enthält:`, oldText);
        
        // Aktualisieren der Platzhalter mit dem aktuellen cityName
        if (oldText !== cityName) {
          el.textContent = cityName;
          console.log(`Hero useEffect: Platzhalter ${index + 1} von "${oldText}" zu "${cityName}" aktualisiert`);
        }
      });
    };
    
    // Direkt ausführen
    updateCityPlaceholders();
    
    // Nach kurzer Verzögerung nochmal ausführen
    const timeoutId = setTimeout(updateCityPlaceholders, 300);
    
    // Nach längerer Verzögerung nochmal ausführen für dynamisch nachgeladene Elemente
    const longTimeoutId = setTimeout(updateCityPlaceholders, 1000);
    
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
            <div className="w-full md:w-1/2 mb-6 sm:mb-8 md:mb-0 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-3 relative z-30">
                <Logo size="large" />
              </div>
              
              <div className="inline-block rounded-full bg-accent/10 px-3 py-1.5 text-sm sm:text-base font-medium text-accent mb-4 animate-fade-in relative z-10">
                <span className="break-words mobile-text-boost">Professionelle Schädlingsbekämpfung</span>
              </div>
              
              <h1 id="headline" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight animate-fade-in mobile-spacing-boost" style={{ animationDelay: '100ms' }}>
                Ihr Experte für effektive Schädlingsbekämpfung aus <span className="city-placeholder font-bold text-accent">{cityName}</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-5 sm:mb-6 max-w-xl mx-auto md:mx-0 animate-fade-in mobile-text-boost" style={{ animationDelay: '200ms' }}>
                Zertifizierte Profis mit über 20 Jahren Erfahrung aus <span className="city-placeholder font-medium">{cityName}</span>. Wir bieten schnelle und diskrete Lösungen für Ihre Schädlingsprobleme.
              </p>
              
              <div className="flex flex-col gap-3 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <div>
                    <PhoneButton 
                      phoneNumber={PHONE_NUMBER} 
                      size="default"
                      className="bg-blue-600 hover:bg-blue-700 text-base py-2.5 sm:py-3 shadow-lg mobile-button-boost" 
                    />
                  </div>
                  
                  <div>
                    <WhatsAppButton 
                      phoneNumber={PHONE_NUMBER} 
                      size="default"
                      className="bg-green-600 hover:bg-green-700 text-base py-2.5 sm:py-3 shadow-lg mobile-button-boost"
                    />
                  </div>
                  
                  <div>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-md bg-accent hover:bg-accent/90 text-white font-bold transition-colors text-base shadow-lg mobile-button-boost"
                    >
                      Kostenlose Beratung
                    </a>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start">
                  <MoneyBackBadge />
                </div>
              </div>
              
              <div className="mt-5 bg-red-50 text-red-600 rounded-lg py-2.5 px-3 border border-red-200 shadow-sm flex items-center justify-center md:justify-start gap-2 animate-pulse-subtle animate-fade-in mobile-text-boost" style={{ animationDelay: '400ms' }}>
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <p className="text-sm sm:text-base font-medium">
                  <span className="font-bold">HEUTE NOCH</span> freie Termine verfügbar!
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 pl-0 md:pl-6 lg:pl-10">
              <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-md mx-auto">
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
                    className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-primary/10 transition-all duration-300 hover:shadow-md animate-fade-in"
                    style={{ animationDelay: `${feature.delay}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="rounded-full bg-accent/10 p-2.5 md:p-3 mr-3 flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1 md:mb-1 text-base sm:text-base mobile-text-boost">
                          {feature.title}
                        </h3>
                        <p className="text-sm sm:text-sm text-muted-foreground mobile-text-boost">
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
