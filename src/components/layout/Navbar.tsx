
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import PhoneButton from '../ui/PhoneButton';
import WhatsAppButton from '../ui/WhatsAppButton';
import Logo from '../ui/Logo';

const PHONE_NUMBER = "+491782581987";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Startseite', href: '#' },
    { name: 'Leistungen', href: '#services' },
    { name: 'Zertifizierungen', href: '#certifications' },
    { name: 'Bewertungen', href: '#reviews' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="small" />
            <div className="text-primary font-bold text-xl md:text-2xl transition-all ml-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center">
                <span className="text-[#9b87f5] whitespace-nowrap">Kammerjäger</span>
                <span className="font-light whitespace-nowrap ml-0 sm:ml-1">Adalbert</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary/80 hover:text-[#9b87f5] transition-colors py-2 text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <PhoneButton phoneNumber={PHONE_NUMBER} size="sm" />
            <WhatsAppButton phoneNumber={PHONE_NUMBER} size="sm" />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <PhoneButton phoneNumber={PHONE_NUMBER} variant="ghost" size="sm" className="text-accent" />
            <WhatsAppButton phoneNumber={PHONE_NUMBER} variant="ghost" size="sm" className="text-green-600" />
            <button
              onClick={toggleMenu}
              className="text-primary p-2 rounded-md hover:bg-secondary transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          'md:hidden absolute w-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg',
          isMenuOpen ? 'top-full opacity-100' : '-top-[400px] opacity-0'
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-primary/80 hover:text-[#9b87f5] transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
