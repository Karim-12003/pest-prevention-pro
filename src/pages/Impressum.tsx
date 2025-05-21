
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PhoneButton from '../components/ui/PhoneButton';
import WhatsAppButton from '../components/ui/WhatsAppButton';
import { useParams, useLocation } from 'react-router-dom';

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Hagen";
const DEFAULT_PLZ = "58135";

// Liste deutscher Städte für die Erkennung
const cityList = [
  { city: 'Essen', plz: '45127' },
  { city: 'Dortmund', plz: '44137' },
  { city: 'Duisburg', plz: '47051' },
  { city: 'Bochum', plz: '44787' },
  { city: 'Herne', plz: '44623' },
  { city: 'Gelsenkirchen', plz: '45879' },
  { city: 'Oberhausen', plz: '46045' },
  { city: 'Bottrop', plz: '46236' },
  { city: 'Mülheim', plz: '45468' },
  { city: 'Hagen', plz: '58135' },
  { city: 'Recklinghausen', plz: '45657' },
  { city: 'Köln', plz: '50667' },
  { city: 'Berlin', plz: '10115' },
  { city: 'Hamburg', plz: '20095' },
  { city: 'München', plz: '80331' },
  { city: 'Frankfurt', plz: '60311' },
  { city: 'Stuttgart', plz: '70173' },
];

const Impressum = () => {
  const { city: routeCity } = useParams();
  const location = useLocation();
  const [cityInfo, setCityInfo] = useState({ city: DEFAULT_CITY, plz: DEFAULT_PLZ });
  
  useEffect(() => {
    const detectCity = () => {
      console.log("Impressum: City detection running...");
      
      // First check route parameter
      if (routeCity) {
        console.log("Impressum: Route city found:", routeCity);
        const foundCity = cityList.find(item => 
          item.city.toLowerCase() === routeCity.toLowerCase()
        );
        
        if (foundCity) {
          console.log("Impressum: City matched from route:", foundCity);
          setCityInfo(foundCity);
          return;
        }
      }
      
      // Then check URL for kw parameter
      const urlParams = new URLSearchParams(location.search);
      const kwParam = urlParams.get('kw');
      
      if (kwParam) {
        console.log("Impressum: kw param found:", kwParam);
        const decodedKw = decodeURIComponent(kwParam).toLowerCase();
        
        for (const cityData of cityList) {
          if (decodedKw.includes(cityData.city.toLowerCase())) {
            console.log("Impressum: City matched from kw param:", cityData);
            setCityInfo(cityData);
            return;
          }
        }
      }
      
      // Check full URL for city name
      const fullUrl = window.location.href.toLowerCase();
      console.log("Impressum: Checking full URL:", fullUrl);
      
      for (const cityData of cityList) {
        if (fullUrl.includes(cityData.city.toLowerCase())) {
          console.log("Impressum: City matched from URL:", cityData);
          setCityInfo(cityData);
          return;
        }
      }
      
      // Default if no city is found
      console.log("Impressum: No city detected, using default:", DEFAULT_CITY);
    };
    
    detectCity();
  }, [routeCity, location]);

  return (
    <>
      <Helmet>
        <title>Impressum - Kammerjäger Adalbert</title>
        <meta name="description" content={`Impressum und rechtliche Informationen zu Kammerjäger Adalbert in ${cityInfo.city}.`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1F2C]">Impressum</h1>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Angaben gemäß § 5 TMG</h2>
              <div className="space-y-2">
                <p>Kammerjäger Adalbert</p>
                <p>Berliner Straße 26–36</p>
                <p>{cityInfo.plz} {cityInfo.city}</p>
                <p>Deutschland</p>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#1A1F2C]">Kontakt</h2>
              <div className="space-y-2">
                <p>Telefon: <a href="tel:+491782581987" className="text-[#9b87f5] hover:underline">+49 178 2581987</a></p>
                <p>E-Mail: <a href="mailto:info@kammerjaeger-adalbert.de" className="text-[#9b87f5] hover:underline">info@kammerjaeger-adalbert.de</a></p>
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
        
        {/* Fixed Buttons */}
        <PhoneButton phoneNumber={PHONE_NUMBER} variant="fixed" />
        <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="fixed" />
      </div>
    </>
  );
};

export default Impressum;
