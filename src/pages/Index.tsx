
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
import { useUserLocation } from '@/hooks/useUserLocation';
import PaymentOptions from '../components/home/PaymentOptions';

const PHONE_NUMBER = "+491782581987";

const Index = () => {
  const { city } = useUserLocation();
  
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-[1.01] duration-300">
            <AspectRatio ratio={16/9}>
              <img 
                src="https://oknoplast.de/content/uploads/2024/07/innenraeume-quiet-luxury.webp" 
                alt="Ein sauberes, schädlingsfreies Zuhause" 
                className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
              />
            </AspectRatio>
            <div className="bg-white p-6 md:p-8 text-center">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#1A1F2C]">
                {city ? `Ihr sicheres Zuhause in ${city} ist unser Ziel` : 'Ihr sicheres Zuhause ist unser Ziel'}
              </h3>
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
  );
};

export default Index;
