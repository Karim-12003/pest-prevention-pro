
import React from 'react';
import AnimatedSection from '../ui/AnimatedSection';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    location: ". Pauli",
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
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex justify-center items-center gap-4 mb-8">
            <h2 className="section-heading mb-0">Kundenbewertungen</h2>
            <a 
              href="https://www.provenexpert.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <div className="flex items-center bg-[#2D529F] text-white px-4 py-2 rounded-lg hover:bg-[#1D428F] transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="120" 
                  height="24" 
                  viewBox="0 0 120 24" 
                  fill="currentColor"
                  className="h-6"
                >
                  <path d="M2.4,7.9c0-1.3,1-2.3,2.3-2.3s2.3,1,2.3,2.3c0,1.3-1,2.3-2.3,2.3S2.4,9.2,2.4,7.9z M2.5,11.7h4.3v10.1H2.5V11.7z M9.7,11.7h4.2v1.9h0.1c0.6-1.1,2-2.2,4.1-2.2c4.4,0,5.2,2.9,5.2,6.6v7.6h-4.3v-6.7c0-1.6,0-3.7-2.2-3.7c-2.3,0-2.6,1.7-2.6,3.6V22H9.9V11.7H9.7z"/>
                  <path d="M29.1,11.7h2.9v2.5h-2.9v5.2c0,1.3,0.6,1.6,1.8,1.6h1.1V22h-1.7c-3.2,0-4.4-0.8-4.4-4v-3.8h-2.3v-2.5h0.7c1.3,0,1.7-0.9,1.7-2V7.5h3.1L29.1,11.7z"/>
                  <path d="M35.2,17c0-2.9,2.4-5.5,5.3-5.5c2.2,0,4.2,1.3,4.8,3.6h-2.4c-0.4-0.8-1.3-1.4-2.2-1.4c-1.6,0-2.9,1.5-2.9,3.3c0,1.7,1.3,3.2,2.9,3.2c1.1,0,1.9-0.5,2.4-1.4h2.3c-0.6,2.1-2.6,3.6-4.8,3.6C37.5,22.5,35.2,19.9,35.2,17"/>
                  <path d="M46.7,7.4H49v14.5h-2.3V7.4z"/>
                  <path d="M52,7.4h2.3v14.5H52V7.4z"/>
                  <path d="M56.5,17c0-3,2-5.5,5.1-5.5c2.5,0,4.8,1.7,4.9,5.5h-7.5c0.2,1.6,1.4,2.8,2.9,2.8c1.1,0,1.9-0.5,2.3-1.5H66c-0.6,2.1-2.5,3.6-4.7,3.6C59.1,22.1,56.5,20.6,56.5,17 M63.9,15.6c-0.3-1.3-1.4-2.1-2.6-2.1c-1.5,0-2.5,1-2.7,2.3L63.9,15.6z"/>
                  <path d="M67.1,11.7h2.2v1.7h0.1c0.5-1.3,1.9-1.9,3-1.9c0.4,0,0.8,0,1.1,0.1v2.2c-0.3-0.1-0.7-0.2-1.1-0.2c-2.3,0-2.9,1.7-2.9,3.7v4.7h-2.3L67.1,11.7z"/>
                  <path d="M74.2,11.7h2.3v10.2h-2.3V11.7z M74.2,7.4h2.3v2.4h-2.3V7.4z"/>
                  <path d="M78.5,17c0-3.1,2.3-5.5,5.4-5.5c3.1,0,5.4,2.4,5.4,5.5c0,3.1-2.3,5.5-5.4,5.5C80.8,22.5,78.5,20,78.5,17 M87.1,17c0-1.8-1.4-3.4-3.2-3.4S80.7,15.2,80.7,17c0,1.8,1.4,3.3,3.2,3.3S87.1,18.8,87.1,17"/>
                  <path d="M91,11.7h2.2v1.3h0.1c0.7-1,1.9-1.6,3.1-1.6c3.2,0,3.9,1.9,3.9,4.5v6h-2.3v-5.5c0-1.7-0.5-2.8-2-2.8c-1.7,0-2.7,1-2.7,3.1v5.1H91V11.7z"/>
                  <path d="M102.2,11.7h2.3v10.2h-2.3V11.7z M102.2,7.4h2.3v2.4h-2.3V7.4z"/>
                  <path d="M106.5,17c0-3,2-5.5,5.1-5.5c2.5,0,4.8,1.7,4.9,5.5H109c0.2,1.6,1.4,2.8,2.9,2.8c1.1,0,1.9-0.5,2.3-1.5h2.3c-0.6,2.1-2.5,3.6-4.7,3.6C109.1,22.1,106.5,20.6,106.5,17 M114,15.6c-0.3-1.3-1.4-2.1-2.6-2.1c-1.5,0-2.5,1-2.7,2.3L114,15.6z"/>
                </svg>
              </div>
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
