
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
import { useParams } from 'react-router-dom';
import SeoKeywords from '../components/seo/SeoKeywords';

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Ihrer Stadt";

// Liste deutscher Städte für die Erkennung
const cityList = [
  'Essen', 'Dortmund', 'Duisburg', 'Bochum', 'Herne', 'Gelsenkirchen', 'Oberhausen', 
  'Bottrop', 'Mülheim', 'Hagen', 'Recklinghausen', 'Marl', 'Castrop', 'Rauxel',
  'Gladbeck', 'Dorsten', 'Herten', 'Oer', 'Erkenschwick', 'Haltern', 'Datteln', 
  'Waltrop', 'Iserlohn', 'Lüdenscheid', 'Menden', 'Werdohl', 'Plettenberg', 'Altena', 
  'Neuenrade', 'Meinerzhagen', 'Balve', 'Schalksmühle', 'Moers', 'Wesel', 'Dinslaken', 
  'Kamp', 'Lintfort', 'Xanten', 'Rheinberg', 'Alpen', 'Voerde', 'Hamminkeln', 'Hünxe', 
  'Köln', 'Leverkusen', 'Bergisch', 'Gladbach', 'Frechen', 'Hürth', 'Brühl', 'Pulheim', 
  'Kerpen', 'Bergheim', 'Wesseling', 'Bonn', 'Siegburg', 'Troisdorf',
  'Düsseldorf', 'Wuppertal', 'Krefeld', 'Neuss', 'Mönchengladbach', 'München', 'Berlin',
  'Hamburg', 'Frankfurt', 'Stuttgart', 'Leipzig', 'Dresden', 'Hannover', 'Nürnberg',
  'Bremen', 'Mannheim', 'Karlsruhe', 'Freiburg', 'Münster', 'Aachen'
];

const CityPage = () => {
  const { city } = useParams();
  const [cityName, setCityName] = useState(city || DEFAULT_CITY);
  
  // Stadt-Erkennung mit direkter Analyse der URL
  useEffect(() => {
    const detectCityFromURL = () => {
      console.log("Stadt-Erkennung in CityPage wird ausgeführt...");
      
      // Zuerst die Route-Parameter prüfen
      if (city) {
        console.log("Stadt aus Route-Parametern:", city);
        setCityName(city);
        return;
      }
      
      try {
        // Google Ads Parameter "kw" (keyword) überprüfen
        const urlParams = new URLSearchParams(window.location.search);
        const kwParam = urlParams.get('kw');
        
        if (kwParam) {
          console.log("kw-Parameter gefunden:", kwParam);
          const decodedKw = decodeURIComponent(kwParam);
          console.log("Dekodierter kw-Parameter:", decodedKw);
          
          // Die Wörter des Parameters aufteilen
          const words = decodedKw.toLowerCase().split(/\s+/);
          console.log("Aufgeteilte Wörter:", words);
          
          // Jedes Wort mit unserer Städteliste vergleichen
          for (const city of cityList) {
            const cityLower = city.toLowerCase();
            
            // Prüfen ob Stadt komplett im Parameter enthalten ist
            if (decodedKw.toLowerCase().includes(cityLower)) {
              console.log(`Stadt "${city}" im Keyword gefunden!`);
              setCityName(city);
              return;
            }
            
            // Einzelwortvergleich für genauere Erkennung
            for (const word of words) {
              if (word === cityLower || (word.length > 3 && cityLower.includes(word))) {
                console.log(`Stadt "${city}" aus Teilwort "${word}" erkannt!`);
                setCityName(city);
                return;
              }
            }
          }
          
          // Speziell für "bochum" prüfen (da dies in der URL vorkommt)
          if (decodedKw.toLowerCase().includes("bochum")) {
            console.log("Bochum explizit erkannt!");
            setCityName("Bochum");
            return;
          }
        }
        
        // Falls kein Parameter gefunden wurde, auch die URL selbst prüfen
        const fullUrl = window.location.href.toLowerCase();
        for (const city of cityList) {
          if (fullUrl.includes(city.toLowerCase())) {
            console.log(`Stadt "${city}" in der URL gefunden!`);
            setCityName(city);
            return;
          }
        }
        
        // Speziell für "bochum" in der URL prüfen
        if (fullUrl.includes("bochum")) {
          console.log("Bochum explizit in der URL erkannt!");
          setCityName("Bochum");
          return;
        }
        
        console.log("Keine Stadt erkannt, verwende Standardwert:", DEFAULT_CITY);
      } catch (error) {
        console.error("Fehler bei der Stadt-Erkennung:", error);
      }
    };
    
    // Sofort die Erkennung ausführen
    detectCityFromURL();
    
    // Nach kurzer Verzögerung nochmals (falls Script später lädt)
    const timeoutId = setTimeout(detectCityFromURL, 500);
    
    return () => clearTimeout(timeoutId);
  }, [city]); // Abhängigkeit von city-Parameter, damit es bei Änderung erneut ausgeführt wird

  const pageTitle = `Kammerjäger Adalbert - Professionelle Schädlingsbekämpfung in ${cityName}`;
  const pageDescription = `Sofortige Hilfe bei Schädlingsbefall in ${cityName}. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="preconnect" href="https://storage.googleapis.com" />
        <link rel="preconnect" href="https://www.immoportal.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow pt-[76px] md:pt-[80px]">
          <Hero cityName={cityName} />
          <div className="bg-accent text-white py-2">
            <div className="container mx-auto">
              <div className="flex items-center justify-center">
                <p className="text-sm font-medium md:text-base">
                  Willkommen aus <span className="city-welcome font-bold">{cityName}</span>
                </p>
              </div>
            </div>
          </div>
          
          <SectionCTA phoneNumber={PHONE_NUMBER} text="Schnelle Hilfe benötigt? Rufen Sie uns an!" />
          <MovingLogoBanner />
          
          {/* Featured image with loading optimization - fixed the fetchPriority capitalization */}
          <div className="w-full bg-gradient-to-b from-accent/5 to-white py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://storage.googleapis.com/media-hero-de-9411/DE-AT-CH/Anwendungen/_900x719_crop_center-center_82_line/hero-schaedlingsbekaempfung-software.png" 
                  alt="Professioneller Kammerjäger im Einsatz" 
                  className="w-full h-auto"
                  loading="eager"
                  width="900"
                  height="719"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Schädlingsbekämpfung {cityName !== DEFAULT_CITY && `in ${cityName}`}</h2>
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

export default CityPage;
