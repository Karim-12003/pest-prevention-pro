
import React from 'react';
import { cn } from '@/lib/utils';
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';

const PHONE_NUMBER = "040 - 180 46 785";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Insektenbekämpfung", href: "#services" },
        { name: "Nagetierbekämpfung", href: "#services" },
        { name: "Bettwanzenbekämpfung", href: "#services" },
        { name: "Schimmelbekämpfung", href: "#services" },
        { name: "Präventionsservice", href: "#services" },
      ]
    },
    {
      title: "Unternehmen",
      links: [
        { name: "Über uns", href: "#" },
        { name: "Zertifizierungen", href: "#certifications" },
        { name: "Bewertungen", href: "#reviews" },
        { name: "Kontakt", href: "#contact" },
      ]
    },
    {
      title: "Rechtliches",
      links: [
        { name: "Impressum", href: "#" },
        { name: "Datenschutz", href: "#" },
        { name: "AGB", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6">Kammerjäger</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span>{PHONE_NUMBER}</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span>info@kammerjaeger.de</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span>Musterstraße 123, 20095</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Mo-Fr: 8:00 - 18:00 Uhr</p>
                  <p>Sa: 9:00 - 14:00 Uhr</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((column, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href}
                      className="inline-flex items-center transition-colors hover:text-accent"
                    >
                      <ChevronRight className="h-3 w-3 mr-2" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80 mb-4 md:mb-0">
              © {currentYear} Kammerjäger. Alle Rechte vorbehalten.
            </p>
            <div className="text-sm opacity-80">
              <span>IHK zertifizierte Schädlingsbekämpfung</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
