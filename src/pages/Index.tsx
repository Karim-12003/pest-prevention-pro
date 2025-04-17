import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import Certifications from '../components/home/Certifications';
import Reviews from '../components/home/Reviews';
import Contact from '../components/home/Contact';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import PaymentOptions from '../components/home/PaymentOptions';
import { Helmet } from 'react-helmet-async';
import { useUserLocation } from '@/hooks/useUserLocation';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PHONE_NUMBER = "+491782581987";

const Index = () => {
  const { city, loading, error } = useUserLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Smooth scroll to anchor links
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          window.scrollTo({
            behavior: 'smooth',
            top: element.getBoundingClientRect().top + window.scrollY - 100,
          });
        }
      }
    };

    // Scroll to the correct position when hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Check for hash on initial load
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Dynamic meta title and description with location data
  const locationText = city ? ` in ${city}` : '';
  const pageTitle = `Kammerjäger Adalbert - Professionelle Schädlingsbekämpfung${locationText}`;
  const pageDescription = `Sofortige Hilfe bei Schädlingsbefall${locationText}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        {loading && (
          <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gradient-to-r from-accent to-primary">
            <div className="h-full w-24 animate-pulse bg-white/30 rounded-full"></div>
          </div>
        )}
        
        <main className="flex-grow">
          <Hero />
          
          {city && (
            <div className="container mx-auto py-6">
              <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur shadow-md border border-accent/10 rounded-lg p-5 text-center transform transition-all hover:shadow-lg">
                <p className="text-lg text-primary">
                  Willkommen aus <span className="font-bold text-accent">{city}</span>! 
                </p>
                <p className="text-muted-foreground mt-1">
                  Unsere Schädlingsbekämpfer sind auch in Ihrer Region im Einsatz.
                </p>
              </div>
            </div>
          )}
          
          <div className="container mx-auto py-12 md:py-16 px-4">
            <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-[1.01] duration-300">
              <AspectRatio ratio={16/9}>
                <img 
                  src="https://oknoplast.de/content/uploads/2024/07/innenraeume-quiet-luxury.webp" 
                  alt="Ein sauberes, schädlingsfreies Zuhause nach professioneller Schädlingsbekämpfung" 
                  className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
                  width="1200"
                  height="675"
                  loading="lazy"
                />
              </AspectRatio>
              <div className="bg-white p-6 md:p-8 text-center">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#1A1F2C]">
                  Ihr sicheres Zuhause ist unser Ziel
                </h2>
                <p className="text-muted-foreground text-base md:text-lg">
                  Wir sorgen dafür, dass Ihr Wohnraum frei von ungebetenen Gästen bleibt und Sie sich rundum wohlfühlen können.
                </p>
              </div>
            </div>
          </div>
          <Services />
          <Certifications />
          <Reviews />
          <PaymentOptions />
          <Contact />
        </main>
        
        <Footer />
        
        {/* Fixed Buttons */}
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default Index;
