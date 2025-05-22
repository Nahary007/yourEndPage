import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';
import ToneSelector from './ToneSelector';

function  Hero(){
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black pt-24 pb-16 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Make Your <span className="text-red-500">Exit</span> Memorable
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Create a stunning farewell page when you leave a job, project, relationship, 
              or anything else. Because if it's the end, make it <span className="italic">unforgettable</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button size="lg">
                Create Your End Page <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button variant="outline" size="lg">
                See Examples
              </Button>
            </div>
          </div>

          <div className="animate-fade-in">
            <ToneSelector />
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,100,0,100"
            fill="#111827"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;