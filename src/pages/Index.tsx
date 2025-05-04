
import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
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
import { AspectRatio } from '@/components/ui/aspect-ratio';

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Ihrer Stadt";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [city, setCity] = useState(DEFAULT_CITY);
  const location = useLocation();
  
  // Format the city name if it exists
  const formatCityName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };
  
  useEffect(() => {
    // Get city from URL parameter
    let cityParam = searchParams.get('city');
    
    console.log("Original city parameter:", cityParam);
    
    // Apply the formatting and validation logic
    if (cityParam && cityParam !== "{Location(City)}" && cityParam !== "") {
      cityParam = decodeURIComponent(cityParam.replace(/\+/g, ' ')).trim();
      if (cityParam.length > 30) {
        cityParam = DEFAULT_CITY;
      } else {
        cityParam = formatCityName(cityParam);
      }
      setCity(cityParam);
    } else {
      setCity(DEFAULT_CITY);
    }
    
    // Debug logs
    console.log("Index page rendering with city:", cityParam);
    console.log("URL params:", window.location.search);
    console.log("Full URL:", window.location.href);
  }, [searchParams, location.search]);
  
  useEffect(() => {
    // Update document title with the city
    document.title = `Kammerjäger Adalbert - Schädlingsbekämpfung in ${city}`;
    
    // Update all city placeholders in the DOM
    const updateCityPlaceholders = () => {
      const elements = document.querySelectorAll('.city-placeholder');
      elements.forEach(el => {
        el.textContent = city;
      });
    };
    
    // Execute immediately and multiple times to ensure React has rendered
    updateCityPlaceholders();
    const interval = setInterval(updateCityPlaceholders, 100);
    
    // Clear interval after 2 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, 2000);
    
    return () => clearInterval(interval);
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
        
        <main className="flex-grow pt-[160px] md:pt-[180px]">
          <Hero cityName={city} />
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
          
          {/* Featured image restored to before About Us section */}
          <div className="w-full bg-gradient-to-b from-accent/5 to-white py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://storage.googleapis.com/media-hero-de-9411/DE-AT-CH/Anwendungen/_900x719_crop_center-center_82_line/hero-schaedlingsbekaempfung-software.png" 
                  alt="Professioneller Kammerjäger im Einsatz" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Schädlingsbekämpfung in <span className="city-placeholder">{city}</span></h2>
                  <p className="text-lg md:text-xl max-w-xl">Professionelle und diskrete Hilfe bei Schädlingsbefall</p>
                </div>
              </div>
            </div>
          </div>
          
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
