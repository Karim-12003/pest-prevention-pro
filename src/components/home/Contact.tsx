
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import PhoneButton from '../ui/PhoneButton';

const PHONE_NUMBER = "040 - 180 46 785";

const Contact = () => {
  return (
    <AnimatedSection id="contact">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">Kontakt</h2>
          <p className="section-subheading">
            Haben Sie ein Schädlingsproblem? Kontaktieren Sie uns für eine kostenlose Beratung und schnelle Hilfe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          <div className="rounded-xl overflow-hidden shadow-sm border border-primary/10 bg-white p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Kontaktinformationen</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Telefon</h4>
                  <p className="text-accent font-medium">{PHONE_NUMBER}</p>
                  <p className="text-sm text-muted-foreground mt-1">Für schnelle Hilfe und kostenlose Beratung</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Adresse</h4>
                  <p>Musterstraße 123, 20095</p>
                  <p className="text-sm text-muted-foreground mt-1">Service im gesamten Stadtgebiet</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">E-Mail</h4>
                  <p>info@kammerjaeger.de</p>
                  <p className="text-sm text-muted-foreground mt-1">Wir antworten innerhalb von 24 Stunden</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Geschäftszeiten</h4>
                  <p>Mo-Fr: 8:00 - 18:00 Uhr</p>
                  <p>Sa: 9:00 - 14:00 Uhr</p>
                  <p className="text-sm text-muted-foreground mt-1">Notfallservice auch außerhalb der Geschäftszeiten</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Unser Servicegebiet</h4>
                <p className="text-sm">
                  Wir bieten unsere Dienstleistungen in der gesamten Region und einem Umkreis von 50 km an.
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-sm border border-primary/10 bg-secondary/20 p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6">Schnellkontakt</h3>
            
            <div className="p-6 bg-white rounded-xl shadow-sm border border-primary/10 mb-8">
              <div className="text-center">
                <h4 className="font-semibold mb-3">Sofortige Beratung?</h4>
                <p className="mb-4">Rufen Sie uns an für eine kostenlose telefonische Erstberatung</p>
                <PhoneButton phoneNumber={PHONE_NUMBER} size="lg" className="w-full justify-center" />
              </div>
            </div>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Ihr Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-Mail</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Ihre E-Mail-Adresse"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Ihre Telefonnummer"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Nachricht</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-primary/20 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="Beschreiben Sie Ihr Anliegen"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3 rounded-md font-medium hover:bg-accent/90 transition-colors"
              >
                Anfrage senden
              </button>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                Wir antworten in der Regel innerhalb eines Werktages
              </p>
            </form>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
