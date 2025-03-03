
import React from 'react';
import { cn } from '@/lib/utils';
import { Shield, Home, Zap } from 'lucide-react';
import PhoneButton from '../ui/PhoneButton';
import WhatsAppButton from '../ui/WhatsAppButton';

const PHONE_NUMBER = "040 - 180 46 785";

const Hero = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          {/* Hero Text Content */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <div className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-6 animate-fade-in whitespace-nowrap overflow-visible">
              Professionelle Schädlingsbekämpfung
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
              Ihr Experte für <span className="text-accent">effektive</span> Schädlingsbekämpfung
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Zertifizierte Profis mit über 20 Jahren Erfahrung. Wir bieten schnelle und diskrete Lösungen für Ihre Schädlingsprobleme.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '300ms' }}>
              <PhoneButton phoneNumber={PHONE_NUMBER} size="lg" />
              <WhatsAppButton phoneNumber={PHONE_NUMBER} size="lg" />
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-primary/10 bg-secondary hover:bg-secondary/80 text-primary font-medium transition-colors"
              >
                Kostenlose Beratung
              </a>
            </div>
          </div>
          
          {/* Hero Features */}
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
                  description: "Wir sind innerhalb von 24-48 Stunden bei Ihnen vor Ort",
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
  );
};

export default Hero;
