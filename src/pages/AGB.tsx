
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

const AGB = () => {
  const { city: routeCity } = useParams();
  const location = useLocation();
  const [cityInfo, setCityInfo] = useState({ city: DEFAULT_CITY, plz: DEFAULT_PLZ });
  
  useEffect(() => {
    const detectCity = () => {
      console.log("AGB: City detection running...");
      
      // First check route parameter
      if (routeCity) {
        console.log("AGB: Route city found:", routeCity);
        const foundCity = cityList.find(item => 
          item.city.toLowerCase() === routeCity.toLowerCase()
        );
        
        if (foundCity) {
          console.log("AGB: City matched from route:", foundCity);
          setCityInfo(foundCity);
          return;
        }
      }
      
      // Then check URL for kw parameter
      const urlParams = new URLSearchParams(location.search);
      const kwParam = urlParams.get('kw');
      
      if (kwParam) {
        console.log("AGB: kw param found:", kwParam);
        const decodedKw = decodeURIComponent(kwParam).toLowerCase();
        
        for (const cityData of cityList) {
          if (decodedKw.includes(cityData.city.toLowerCase())) {
            console.log("AGB: City matched from kw param:", cityData);
            setCityInfo(cityData);
            return;
          }
        }
      }
      
      // Check full URL for city name
      const fullUrl = window.location.href.toLowerCase();
      console.log("AGB: Checking full URL:", fullUrl);
      
      for (const cityData of cityList) {
        if (fullUrl.includes(cityData.city.toLowerCase())) {
          console.log("AGB: City matched from URL:", cityData);
          setCityInfo(cityData);
          return;
        }
      }
      
      // Default if no city is found
      console.log("AGB: No city detected, using default:", DEFAULT_CITY);
    };
    
    detectCity();
  }, [routeCity, location]);
  
  return (
    <>
      <Helmet>
        <title>Allgemeine Geschäftsbedingungen - Kammerjäger Adalbert</title>
        <meta name="description" content={`Allgemeine Geschäftsbedingungen (AGB) für die Dienstleistungen von Kammerjäger Adalbert in ${cityInfo.city}.`} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-[#1A1F2C]">Allgemeine Geschäftsbedingungen (AGB)</h1>
            
            <section className="mb-8">
              <div className="space-y-2 mb-6">
                <p>Kammerjäger Adalbert</p>
                <p>Berliner Straße 26–36, {cityInfo.plz} {cityInfo.city}</p>
                <p>E-Mail: <a href="mailto:info.kammerjaegeradalbert.de" className="text-[#9b87f5] hover:underline">info.kammerjaegeradalbert.de</a></p>
                <p>Telefon: <a href="tel:+491782581987" className="text-[#9b87f5] hover:underline">+49 178 2581987</a></p>
              </div>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§1 Geltungsbereich</h2>
              <p className="text-gray-700">
                Diese AGB gelten für alle Verträge über Dienstleistungen im Bereich der Schädlingsbekämpfung, die zwischen Kammerjäger Adalbert (nachfolgend „Dienstleister") und Kunden (Verbraucher und Unternehmer) abgeschlossen werden.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§2 Leistungen</h2>
              <p className="text-gray-700">
                Der Dienstleister bietet die Beseitigung von Schädlingen wie Insekten, Nagetieren, Bettwanzen, Wespen u. Ä. sowie präventive Maßnahmen an. Der genaue Leistungsumfang ergibt sich aus der individuellen Vereinbarung.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§3 Auftragserteilung</h2>
              <p className="text-gray-700">
                Die Beauftragung erfolgt telefonisch, per WhatsApp, E-Mail oder über andere Kontaktwege. Mit Annahme des Angebots gilt der Auftrag als verbindlich erteilt.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§4 Preise und Zahlung</h2>
              <p className="text-gray-700">
                Die Preise richten sich nach Art, Umfang und Dringlichkeit der Dienstleistung und werden dem Kunden vor Beginn mitgeteilt. Zahlungen erfolgen – sofern nicht anders vereinbart – unmittelbar nach Leistungserbringung in bar oder per Überweisung.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§5 Terminvereinbarung und Stornierung</h2>
              <p className="text-gray-700">
                Vereinbarte Termine sind verbindlich. Bei kurzfristiger Stornierung (weniger als 24 Stunden vor dem Termin) kann eine Ausfallpauschale in Rechnung gestellt werden. Bei Nichterscheinen des Kunden behält sich der Dienstleister vor, den vollen Preis zu berechnen.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§6 Haftung</h2>
              <p className="text-gray-700">
                Der Dienstleister haftet nur bei Vorsatz oder grober Fahrlässigkeit. Eine Haftung für Folgeschäden durch unsachgemäße Nachbehandlung durch den Kunden ist ausgeschlossen.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§7 Widerrufsrecht</h2>
              <p className="text-gray-700">
                Bei Dienstleistungen, die auf ausdrücklichen Wunsch des Kunden kurzfristig (z. B. als Notfall) begonnen werden, erlischt das Widerrufsrecht gemäß § 356 Abs. 4 BGB mit vollständiger Vertragserfüllung.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§8 Datenschutz</h2>
              <p className="text-gray-700">
                Die im Rahmen der Auftragsabwicklung erhobenen personenbezogenen Daten werden ausschließlich zur Vertragsabwicklung genutzt und nicht an Dritte weitergegeben. Weitere Infos siehe Datenschutzerklärung.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§9 Gerichtsstand</h2>
              <p className="text-gray-700">
                Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz des Dienstleisters.
              </p>
            </section>
            
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-[#1A1F2C]">§10 Schlussbestimmungen</h2>
              <p className="text-gray-700">
                Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.
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

export default AGB;
