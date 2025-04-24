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
import PaymentOptions from '../components/home/PaymentOptions';
import { Helmet } from 'react-helmet-async';
import { useUserLocation } from '@/hooks/useUserLocation';
import SectionCTA from '../components/ui/SectionCTA';
import AboutUs from '../components/home/AboutUs';

const PHONE_NUMBER = "+491782581987";

const Index = () => {
  const { city, loading } = useUserLocation();
  
  useEffect(() => {
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

    window.addEventListener('hashchange', handleHashChange);
    
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

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
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schnelle Hilfe benötigt? Rufen Sie uns an!" />
          
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
          
          <AboutUs />
          <Services />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schädlingsproblem? Wir helfen sofort!" />
          <Certifications />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Professionelle Beratung gewünscht?" />
          <Reviews />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Überzeugt? Kontaktieren Sie uns!" />
          <PaymentOptions />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Fragen zu unseren Zahlungsoptionen?" />
          <Contact />
        </main>
        
        <Footer />
        
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default Index;
