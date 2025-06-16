import React from 'react';
import { MessageCircle, Share2, Palette, ShieldCheck } from 'lucide-react';

const Feature = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 transition-transform hover:transform hover:-translate-y-1">
      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Make Your Exit Memorable</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Express yourself freely with a personalized end page that captures exactly how you feel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<MessageCircle className="w-6 h-6 text-white" />}
            title="Your Story, Your Way"
            description="Choose from multiple tones to express exactly how you feel about your departure."
          />
          <Feature
            icon={<Palette className="w-6 h-6 text-white" />}
            title="Fully Customizable"
            description="Add GIFs, images, background music, and custom styling to match your message."
          />
          <Feature
            icon={<Share2 className="w-6 h-6 text-white" />}
            title="Easy Sharing"
            description="Get a unique link to share with colleagues, friends, or anyone you're leaving behind."
          />
          <Feature
            icon={<ShieldCheck className="w-6 h-6 text-white" />}
            title="Privacy Controls"
            description="Decide who can see your page and for how long it remains active."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;