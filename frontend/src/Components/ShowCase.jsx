import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

 
const exampleCards = [
  {
    id: "job-quit",
    title: "Corporate Goodbye",
    context: "After 5 years at MegaCorp",
    excerpt: "It's been a journey, but as they say, all good things must come to an end. Thank you for the opportunities, but it's time I pursue my passion...",
    tone: "Professional",
    color: "from-blue-600 to-indigo-700",
    imageUrl: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "relationship-end",
    title: "It's Not You, It's...",
    context: "After 2 years together",
    excerpt: "We had our moments, the good and the bad. I'm grateful for the memories we created, but I can no longer ignore the fact that we're growing in different directions...",
    tone: "Emotional",
    color: "from-pink-500 to-purple-600",
    imageUrl: "https://images.pexels.com/photos/7713271/pexels-photo-7713271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "project-exit",
    title: "Project Departure",
    context: "After 8 months on Project X",
    excerpt: "What started as an exciting opportunity became a lesson in mismanagement. Despite my best efforts to salvage this sinking ship, I must now save myself...",
    tone: "Frustrated",
    color: "from-amber-500 to-red-600",
    imageUrl: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

function Showcase(){
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % exampleCards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + exampleCards.length) % exampleCards.length);
  };

  const currentExample = exampleCards[currentIndex];

  return (
    <section id="showcase" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Dramatic Exits in Action</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how others have made their final statement memorable.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Example Card */}
          <div className="rounded-xl overflow-hidden bg-gray-900 shadow-xl">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={currentExample.imageUrl} 
                alt={currentExample.title} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${currentExample.color} mb-2`}>
                  {currentExample.tone}
                </span>
                <h3 className="text-2xl font-bold text-white">{currentExample.title}</h3>
                <p className="text-gray-300">{currentExample.context}</p>
              </div>
            </div>
            
            <div className="p-6">
              <blockquote className="text-lg text-gray-300 italic mb-4">
                "{currentExample.excerpt}"
              </blockquote>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <button className="text-gray-400 hover:text-white transition-colors">
                  Read full story
                </button>
                <div className="flex space-x-3">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {exampleCards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-red-500 w-6' : 'bg-gray-600'
                }`}
                aria-label={`Go to example ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;