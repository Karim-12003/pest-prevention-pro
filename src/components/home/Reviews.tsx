
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const reviews = [
  {
    name: "Markus Schmidt",
    location: "",
    rating: 5,
    text: "Fantastischer Service! Hatte einen Wespenbefall im Gartenhaus, das Team war innerhalb von 24 Stunden vor Ort und hat das Problem professionell gelöst. Sehr freundliches Personal und faire Preise.",
  },
  {
    name: "Sabine Müller",
    location: "",
    rating: 5,
    text: "Nach wochenlangem Kampf gegen Bettwanzen endlich eine Lösung! Die Experten haben eine gründliche Behandlung durchgeführt und mir wertvolle Tipps zur Vorbeugung gegeben. Sehr empfehlenswert!",
  },
  {
    name: "Thomas Weber",
    location: "",
    rating: 5,
    text: "Absolut zuverlässiger Service. Terminvereinbarung war unkompliziert, der Techniker pünktlich und kompetent. Das Mäuseproblem in unserem Keller wurde schnell und effektiv beseitigt. Vielen Dank!",
  },
  {
    name: "Claudia Fischer",
    location: "",
    rating: 5,
    text: "Hervorragende Arbeit bei der Bekämpfung von Ameisen in unserem Haus. Besonders beeindruckt hat mich die umweltfreundliche Herangehensweise und die ausführliche Beratung. Ein Jahr später immer noch keine Probleme.",
  },
  {
    name: "Jürgen Hoffmann",
    location: "St. Pauli",
    rating: 4,
    text: "Guter und schneller Service bei akutem Schädlingsbefall. Die kostenlose Anfahrt war ein großer Pluspunkt. Einziger kleiner Kritikpunkt: Die Nachkontrolle musste ich selbst anstoßen, sonst top!",
  },
  {
    name: "Monika Becker",
    location: "",
    rating: 5,
    text: "Sehr professionelles Unternehmen! Der Kammerjäger hat unser Taubenproblem auf dem Dachboden schnell in den Griff bekommen. Auch die präventiven Maßnahmen funktionieren bis heute einwandfrei. Danke für die tolle Arbeit!",
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0], index: number }) => {
  return (
    <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 relative">
      <CardContent className="pt-6">
        <div className="absolute top-4 right-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
            alt="Google Logo" 
            className="h-6 w-6"
          />
        </div>
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 mr-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">{review.name.charAt(0)}</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">{review.name}</h4>
            {review.location && (
              <p className="text-xs text-gray-500">{review.location}</p>
            )}
          </div>
        </div>
        
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "h-5 w-5 mr-1", 
                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )} 
            />
          ))}
        </div>
        
        <p className="text-sm text-gray-600 mt-2">{review.text}</p>
      </CardContent>
    </Card>
  );
};

const Reviews = () => {
  return (
    <AnimatedSection id="reviews" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex justify-center items-center gap-6 mb-8">
            <h2 className="section-heading mb-0">Kundenbewertungen</h2>
            <a 
              href="https://www.provenexpert.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <img 
                src="https://weltweiser.de/wp-content/uploads/2022/07/proven-expert.png" 
                alt="ProvenExpert Logo" 
                className="h-16 object-contain" 
              />
            </a>
          </div>
          <p className="section-subheading mb-0">
            Erfahren Sie, was unsere Kunden über unsere Schädlingsbekämpfungsdienste sagen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-xl p-6 inline-block shadow-sm border border-primary/10">
            <div className="flex items-center justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-6 w-6 mr-1 text-yellow-400 fill-yellow-400" 
                />
              ))}
            </div>
            <p className="text-lg font-medium mb-2">
              4.9/5 Durchschnittsbewertung
            </p>
            <p className="text-sm text-muted-foreground">
              Basierend auf über 487 verifizierten Bewertungen auf ProvenExpert
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Reviews;
