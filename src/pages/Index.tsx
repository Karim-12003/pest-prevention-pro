
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

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Ihrer Stadt";

const Index = () => {
  const [cityName, setCityName] = useState(DEFAULT_CITY);
  
  // Moderne Stadt-Erkennung mit dem neuen System
  useEffect(() => {
    const runCityDetection = async () => {
      console.log("Moderne Stadt-Erkennung wird ausgeführt...");
      
      try {
        const detectedCity = await detectCity();
        console.log("Erkannte Stadt:", detectedCity);
        setCityName(detectedCity);
        
        // Stadt im sessionStorage speichern für andere Seiten (z.B. Impressum)
        if (detectedCity !== DEFAULT_CITY) {
          sessionStorage.setItem('detectedCity', detectedCity);
          console.log("Stadt im sessionStorage gespeichert:", detectedCity);
        }
      } catch (error) {
        console.error("Fehler bei der Stadt-Erkennung:", error);
        setCityName(DEFAULT_CITY);
      }
    };
    
    // Sofort die Erkennung ausführen
    runCityDetection();
    
    // Und nach kurzer Verzögerung nochmals (falls Script später lädt)
    const timeoutId = setTimeout(runCityDetection, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const pageTitle = `Kammerjäger Schneider - Professionelle Schädlingsbekämpfung in ${cityName}`;
  const pageDescription = `Sofortige Hilfe bei Schädlingsbefall in ${cityName}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;

  // Debug-Toast anzeigen, wenn eine Stadt erkannt wurde
  useEffect(() => {
    if (cityName !== DEFAULT_CITY) {
      console.log("Stadt erkannt und im Zustand gespeichert:", cityName);
    }
  }, [cityName]);

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
