
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
import SeoKeywords from '../components/seo/SeoKeywords';
import { detectCity } from '../utils/hybridCityDetection';

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Ihrer Stadt";

const Index = () => {
  const [cityName, setCityName] = useState(DEFAULT_CITY);
  
  // Hybrid Stadt-Erkennung mit dem neuen Skript
  useEffect(() => {
    const runCityDetection = () => {
      console.log("Hybrid Stadt-Erkennung wird ausgeführt...");
      
      try {
        const detectedCity = detectCity();
        console.log("Erkannte Stadt:", detectedCity);
        setCityName(detectedCity);
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

  const pageTitle = `Kammerjäger Adalbert - Professionelle Schädlingsbekämpfung in ${cityName}`;
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
          <div className="bg-accent text-white py-2">
            <div className="container mx-auto">
              <div className="flex items-center justify-center">
                <p className="text-sm sm:text-base font-medium mobile-text-boost">
                  Willkommen aus <span className="city-welcome font-bold">{cityName}</span>
                </p>
              </div>
            </div>
          </div>
          
          <MovingLogoBanner />
          
          {/* Featured image restored to before About Us section */}
          <div className="w-full bg-gradient-to-b from-accent/5 to-white py-6">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://kammerjaeger-wolfgang.de/wp-content/uploads/2025/04/norbert_wolframm_cousin.jpg" 
                  alt="Professioneller Kammerjäger im Einsatz" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">Schädlingsbekämpfung {cityName !== DEFAULT_CITY && `in ${cityName}`}</h2>
                  <p className="text-base sm:text-lg md:text-xl max-w-xl mobile-text-boost">Professionelle und diskrete Hilfe bei Schädlingsbefall</p>
                </div>
              </div>
            </div>
          </div>
          
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
          
          {/* SEO Keywords für Google-Indexierung */}
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
