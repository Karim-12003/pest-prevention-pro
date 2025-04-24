
import React from 'react';
import { Bug, Clock, Award, Users2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '../ui/AnimatedSection';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const AboutUs = () => {
  const features = [
    {
      icon: Bug,
      title: "Zertifizierte Expertise",
      description: "IHK-geprüfte Schädlingsbekämpfer mit jahrelanger Erfahrung"
    },
    {
      icon: Clock,
      title: "24/7 Notdienst",
      description: "Schnelle Hilfe rund um die Uhr, auch an Wochenenden"
    },
    {
      icon: Award,
      title: "Garantierte Qualität",
      description: "Modernste Methoden und umweltfreundliche Lösungen"
    },
    {
      icon: Users2,
      title: "Persönliche Betreuung",
      description: "Individuelle Beratung und maßgeschneiderte Lösungen"
    }
  ];

  return (
    <AnimatedSection className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Über uns</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seit über 15 Jahren sind wir Ihr vertrauenswürdiger Partner für professionelle Schädlingsbekämpfung. Unsere Expertise und unser Engagement für Qualität machen uns zu Ihrer ersten Wahl.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-[1.01] duration-300">
          <AspectRatio ratio={16/9}>
            <img 
              src="https://storage.googleapis.com/media-hero-de-9411/DE-AT-CH/Anwendungen/_1800x1439_crop_center-center_82_line/hero-schaedlingsbekaempfung-software.png.webp" 
              alt="Professioneller Kammerjäger lächelt freundlich" 
              className="object-cover w-full h-full transition-all duration-700 hover:scale-105"
              width="1200"
              height="675"
              loading="lazy"
            />
          </AspectRatio>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-accent/10 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-accent/10 rounded-full mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutUs;
