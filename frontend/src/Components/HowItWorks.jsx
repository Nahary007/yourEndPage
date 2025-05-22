import React from 'react';
import { Edit3, Eye, Share } from 'lucide-react';

const Step = ({ number, title, description, icon }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Step number */}
      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 rounded-full mb-4 z-10">
        <span className="text-2xl font-bold text-white">{number}</span>
      </div>
      
      {/* Icon and content */}
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 text-white">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      
      {/* Connector line (except for last item) */}
      {number < 3 && (
        <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-700 -z-10"></div>
      )}
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create your personalized end page in three simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative max-w-5xl mx-auto">
          <Step 
            number={1}
            title="Create Your Page"
            description="Choose a tone, customize your message, and add media that expresses how you feel."
            icon={<Edit3 size={32} />}
          />
          <Step 
            number={2}
            title="Preview & Perfect"
            description="See exactly how your page will look and make adjustments until it's just right."
            icon={<Eye size={32} />}
          />
          <Step 
            number={3}
            title="Share Your Exit"
            description="Get a unique link and share it with the world when you're ready to make your exit."
            icon={<Share size={32} />}
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;