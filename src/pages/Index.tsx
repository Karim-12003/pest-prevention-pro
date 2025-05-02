import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import SectionCTA from '../components/ui/SectionCTA';
import AboutUs from '../components/home/AboutUs';
import MovingLogoBanner from '../components/home/MovingLogoBanner';
import { useUserLocation } from '@/hooks/useUserLocation';

const PHONE_NUMBER = "+491782581987";

const Index = () => {
  const { city, loading, error } = useUserLocation();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Debug logs
    console.log("Index rendering with city:", city);
    console.log("Current pathname:", window.location.pathname);
    console.log("Full URL:", window.location.href);
    
    // Update document title with the city
    document.title = `Kammerjäger Adalbert - Schädlingsbekämpfung in ${city}`;
    
    // Update all city placeholders in the DOM
    const updateCityPlaceholders = () => {
      const elements = document.querySelectorAll('.city-placeholder');
      elements.forEach(el => {
        if (el.textContent !== city) {
          console.log(`Updating city placeholder from ${el.textContent} to ${city}`);
          el.textContent = city;
        }
      });
    };
    
    // Execute immediately and after a short delay to ensure React has rendered
    updateCityPlaceholders();
    setTimeout(updateCityPlaceholders, 100);
    setTimeout(updateCityPlaceholders, 500);
  }, [city]);
  
  const pageTitle = `Kammerjäger Adalbert - Professionelle Schädlingsbekämpfung in ${city}`;
  const pageDescription = `Sofortige Hilfe bei Schädlingsbefall in ${city}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <div className="bg-accent text-white py-2">
            <div className="container mx-auto">
              <div className="flex items-center justify-center">
                <p className="text-sm font-medium md:text-base">
                  Willkommen aus <span className="city-placeholder font-bold">{city}</span>!
                </p>
              </div>
            </div>
          </div>
          
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schnelle Hilfe benötigt? Rufen Sie uns an!" />
          <MovingLogoBanner />
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
