
import React from 'react';
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

const PHONE_NUMBER = "+491782581987";
const DEFAULT_CITY = "Ihrer Stadt";

const Index = () => {
  const pageTitle = "Kammerjäger Adalbert - Professionelle Schädlingsbekämpfung";
  const pageDescription = "Sofortige Hilfe bei Schädlingsbefall. IHK-zertifizierte Schädlingsbekämpfer für Bettwanzen, Insekten, Ratten und mehr. 24/7 Notdienst & kostenlose Anfahrt.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
        <Navbar />
        
        <main className="flex-grow pt-[76px] md:pt-[80px]">
          <Hero cityName={DEFAULT_CITY} />
          <div className="bg-accent text-white py-2">
            <div className="container mx-auto">
              <div className="flex items-center justify-center">
                <p className="text-sm font-medium md:text-base">
                  Willkommen aus <span className="city-welcome">{DEFAULT_CITY}</span>
                </p>
              </div>
            </div>
          </div>
          
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
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Schädlingsbekämpfung</h2>
                  <p className="text-lg md:text-xl max-w-xl">Professionelle und diskrete Hilfe bei Schädlingsbefall</p>
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
