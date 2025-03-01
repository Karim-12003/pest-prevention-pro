
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const reviews = [
  {
    name: "Markus Schmidt",
    location: "Hamburg, Eimsbüttel",
    rating: 5,
    text: "Fantastischer Service! Hatte einen Wespenbefall im Gartenhaus, das Team war innerhalb von 24 Stunden vor Ort und hat das Problem professionell gelöst. Sehr freundliches Personal und faire Preise.",
  },
  {
    name: "Sabine Müller",
    location: "Hamburg, Winterhude",
    rating: 5,
    text: "Nach wochenlangem Kampf gegen Bettwanzen endlich eine Lösung! Die Experten haben eine gründliche Behandlung durchgeführt und mir wertvolle Tipps zur Vorbeugung gegeben. Sehr empfehlenswert!",
  },
  {
    name: "Thomas Weber",
    location: "Hamburg, Barmbek",
    rating: 5,
    text: "Absolut zuverlässiger Service. Terminvereinbarung war unkompliziert, der Techniker pünktlich und kompetent. Das Mäuseproblem in unserem Keller wurde schnell und effektiv beseitigt. Vielen Dank!",
  },
  {
    name: "Claudia Fischer",
    location: "Hamburg, Altona",
    rating: 5,
    text: "Hervorragende Arbeit bei der Bekämpfung von Ameisen in unserem Haus. Besonders beeindruckt hat mich die umweltfreundliche Herangehensweise und die ausführliche Beratung. Ein Jahr später immer noch keine Probleme.",
  },
  {
    name: "Jürgen Hoffmann",
    location: "Hamburg, St. Pauli",
    rating: 4,
    text: "Guter und schneller Service bei akutem Schädlingsbefall. Die kostenlose Anfahrt war ein großer Pluspunkt. Einziger kleiner Kritikpunkt: Die Nachkontrolle musste ich selbst anstoßen, sonst top!",
  },
  {
    name: "Monika Becker",
    location: "Hamburg, Eppendorf",
    rating: 5,
    text: "Sehr professionelles Unternehmen! Der Kammerjäger hat unser Taubenproblem auf dem Dachboden schnell in den Griff bekommen. Auch die präventiven Maßnahmen funktionieren bis heute einwandfrei. Danke für die tolle Arbeit!",
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0], index: number }) => {
  return (
    <div 
      className={cn(
        "rounded-xl p-6 shadow-sm border border-primary/10 bg-white transition-all duration-300 hover:shadow-md",
        index % 3 === 1 ? "md:translate-y-4" : "",
        index % 3 === 2 ? "md:translate-y-8" : ""
      )}
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 mr-4">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Quote className="h-5 w-5 text-accent" />
          </div>
        </div>
        <div>
          <h4 className="font-semibold">{review.name}</h4>
          <p className="text-xs text-muted-foreground">{review.location}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "h-4 w-4 mr-1", 
              i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            )} 
          />
        ))}
      </div>
      
      <p className="text-sm text-primary/80">{review.text}</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <AnimatedSection id="reviews" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="section-heading">Kundenbewertungen</h2>
          <p className="section-subheading">
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
            <p className="text-lg font-medium">
              4.9/5 Durchschnittsbewertung aus über 120 Kundenbewertungen
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Reviews;
