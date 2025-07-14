
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { useParams, useLocation } from 'react-router-dom';
import { getCityFromParams } from '../utils/cityDetection';

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Hagen";
const DEFAULT_PLZ = "58135";

// Erweiterte PLZ-Zuordnung für bekannte Städte
const cityToPLZ: Record<string, string> = {
  'Essen': '45127',
  'Dortmund': '44137',
  'Duisburg': '47051',
  'Bochum': '44787',
  'Herne': '44623',
  'Gelsenkirchen': '45879',
  'Oberhausen': '46045',
  'Bottrop': '46236',
  'Mülheim': '45468',
  'Hagen': '58135',
  'Recklinghausen': '45657',
  'Köln': '50667',
  'Berlin': '10115',
  'Hamburg': '20095',
  'München': '80331',
  'Frankfurt': '60311',
  'Stuttgart': '70173',
  'Altenessen-Nord': '45329',
  'Altenessen Nord': '45329',
  'Altenessen': '45329',
  'Ihre Stadt': '58135',
  'Ihrer Stadt': '58135',
};

const Impressum = () => {
  const { city: routeCity } = useParams();
  const location = useLocation();
  const [cityInfo, setCityInfo] = useState({ city: DEFAULT_CITY, plz: DEFAULT_PLZ });
  
  useEffect(() => {
    const runCityDetection = async () => {
      console.log("Impressum: Stadt-Erkennung wird ausgeführt...");
      
      try {
        // Erst versuchen, Stadt aus URL-Parametern zu erkennen
        let detectedCityData = getCityFromParams();
        console.log("Impressum: Stadt aus URL-Parametern:", detectedCityData);
        let detectedCity = detectedCityData.name;
        
        // Falls keine Stadt aus URL erkannt wurde, prüfe sessionStorage
        if (detectedCity === "Ihrer Stadt") {
          const storedCity = sessionStorage.getItem('detectedCity');
          if (storedCity && storedCity !== "Ihrer Stadt") {
            detectedCity = storedCity;
            console.log("Impressum: Stadt aus sessionStorage übernommen:", detectedCity);
          }
        } else {
          // Stadt in sessionStorage speichern für andere Seiten
          sessionStorage.setItem('detectedCity', detectedCity);
        }
        
        console.log("Impressum: Finale erkannte Stadt:", detectedCity);
        
        // PLZ für erkannte Stadt finden - mit mehreren Varianten
        let plz = DEFAULT_PLZ;
        
        // Zuerst exakte Übereinstimmung
        if (cityToPLZ[detectedCity]) {
          plz = cityToPLZ[detectedCity];
        } else {
          // Dann nach ähnlichen Namen suchen
          const cityKey = Object.keys(cityToPLZ).find(key => 
            key.toLowerCase().includes(detectedCity.toLowerCase()) ||
            detectedCity.toLowerCase().includes(key.toLowerCase())
          );
          if (cityKey) {
            plz = cityToPLZ[cityKey];
          }
        }
        
        console.log("Impressum: Verwendete PLZ:", plz, "für Stadt:", detectedCity);
        
        setCityInfo({ 
          city: detectedCity, 
          plz 
        });
      } catch (error) {
        console.error("Impressum: Fehler bei der Stadt-Erkennung:", error);
        setCityInfo({ city: DEFAULT_CITY, plz: DEFAULT_PLZ });
      }
    };
    
    // Sofort ausführen
    runCityDetection();
    
    // Und nach Verzögerung nochmals
    const timeoutId = setTimeout(runCityDetection, 500);
    
    return () => clearTimeout(timeoutId);
  }, [routeCity, location]);

  return (
    <>
      <Helmet>
        <title>Impressum - Kammerjäger Schneider</title>
        <meta name="description" content={`Impressum und rechtliche Informationen zu Kammerjäger Schneider in ${cityInfo.city}.`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1F2C]">Impressum</h1>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-2">
                <p>Kammerjäger Schneider</p>
                <p>Hauptstraße 26–36</p>
                <p>{cityInfo.plz} {cityInfo.city}</p>
                <p>Deutschland</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Kontakt</h2>
              <div className="space-y-2">
                <p>Telefon: <a href="tel:+491782581987" className="text-[#9b87f5] hover:underline">+49 178 2581987</a></p>
                <p>E-Mail: <a href="mailto:info@kammerjaegerschneider.de" className="text-[#9b87f5] hover:underline">info@kammerjaegerschneider.de</a></p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Haftungsausschluss</h2>
              <p className="text-gray-700">
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. 
                Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Plattform der EU-Kommission zur Online-Streitbeilegung</h2>
              <p className="text-gray-700">
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#9b87f5] hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
            </section>
          </div>
        </main>
        
        <Footer />
        
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default Impressum;
