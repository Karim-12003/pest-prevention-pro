

import React, { useEffect, useState } from 'react';
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
import CityWelcomeBanner from '../components/home/CityWelcomeBanner';
import FeaturedImage from '../components/home/FeaturedImage';
import SeoKeywords from '../components/seo/SeoKeywords';
import { detectCity } from '../utils/modernCityDetection';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Ihrer Stadt";

const Index = () => {
  const [cityName, setCityName] = useState<string>(DEFAULT_CITY);
  const [isDetectionComplete, setIsDetectionComplete] = useState(false);
  
  useEffect(() => {
    const runCityDetection = async () => {
      console.log("Index: Stadt-Erkennung startet...");
      
      try {
        const detectedCity = await detectCity();
        console.log("Index: Stadt erkannt:", detectedCity);
        
        // Setze den State nur einmal und final
        setCityName(detectedCity);
        setIsDetectionComplete(true);
        
        console.log("Index: Stadt-Erkennung abgeschlossen mit:", detectedCity);
        
      } catch (error) {
        console.error("Index: Fehler bei der Stadt-Erkennung:", error);
        setCityName(DEFAULT_CITY);
        setIsDetectionComplete(true);
      }
    };
    
    runCityDetection();
  }, []); // Nur einmal ausführen

  console.log("Index: Rendering - cityName:", cityName, "isComplete:", isDetectionComplete);

  const pageTitle = `Kammerjäger Schneider - Professionelle Schädlingsbekämpfung in ${cityName}`;
  const pageDescription = `Sofortige Hilfe bei Schädlingsbefall in ${cityName}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;

  // Performance monitoring
  useEffect(() => {
    if (cityName !== DEFAULT_CITY && isDetectionComplete) {
      console.log(`[Performance] Finale Stadt: ${cityName}`);
      
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'city_detected', {
          'event_category': 'geolocation',
          'custom_city': cityName
        });
      }
    }
  }, [cityName, isDetectionComplete]);

  // Warte bis die Stadt-Erkennung abgeschlossen ist
  if (!isDetectionComplete) {
    return (
      <>
        <Helmet>
          <title>Kammerjäger Schneider - Lädt...</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        </Helmet>
        
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
          <Navbar />
          <main className="flex-grow pt-[83px] md:pt-28 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Standort wird ermittelt...</p>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow pt-[83px] md:pt-28">
          <Hero cityName={cityName} />
          <CityWelcomeBanner cityName={cityName} />
          <MovingLogoBanner />
          <FeaturedImage cityName={cityName} defaultCity={DEFAULT_CITY} />
          <AboutUs />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schnelle Hilfe benötigt? Rufen Sie uns an!" />
          <Services />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schädlingsproblem? Wir helfen sofort!" />
          <Certifications />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Professionelle Beratung gewünscht?" />
          <Reviews cityName={cityName} />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Überzeugt? Kontaktieren Sie uns!" />
          <PaymentOptions />
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Fragen zu unseren Zahlungsoptionen?" />
          <Contact />
          <SeoKeywords />
        </main>
        
        <Footer />
        
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default Index;

