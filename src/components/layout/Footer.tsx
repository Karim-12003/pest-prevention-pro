
import React from 'react';
import { cn } from '@/lib/utils';
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react';

const PHONE_NUMBER = "+491782581987";

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
        { name: "Wartungsverträge", href: "#services" },
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
    <footer className="bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-[#9b87f5]">Kammerjäger Adalbert</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-[#9b87f5]" />
                <span><a href={`tel:${PHONE_NUMBER}`} aria-label="Anrufen">24/7 Notdienst: {PHONE_NUMBER}</a></span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-[#9b87f5]" />
                <span><a href="mailto:info@kammerjaeger.de" aria-label="Email senden">info@kammerjaeger.de</a></span>
              </li>
              
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5 text-[#9b87f5]" />
                <div>
                  <p>Mo-Fr: 8:00 - 20:00 Uhr</p>
                  <p>Sa: 9:00 - 19:00 Uhr</p>
                  <p>So: 24/7 Notdienst</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((column, idx) => (
            <nav key={idx} aria-labelledby={`footer-nav-${idx}`}>
              <h3 id={`footer-nav-${idx}`} className="text-lg font-semibold mb-6 text-[#9b87f5]">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href}
                      className="inline-flex items-center transition-colors hover:text-[#9b87f5]"
                    >
                      <ChevronRight className="h-3 w-3 mr-2" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80 mb-4 md:mb-0">
              © {currentYear} Kammerjäger Adalbert. Alle Rechte vorbehalten.
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
