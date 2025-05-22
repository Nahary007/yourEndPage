import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white font-bold text-2xl">
            <HashLink
            smooth
            to="/endpage"
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            TheEnd<span className="text-violet-500">.</span>page
          </HashLink>
          </span>
    
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <HashLink
            smooth
            to="/#how-it-works"
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </HashLink>
          <HashLink
            smooth
            to="/#showcase"
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Examples
          </HashLink>
          <Link
            to="/faq"
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link 
            to="/auth" 
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button className="border border-white bg-transparent text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-200">Login</Button>
          </Link>
          <Link
            to="/register" 
            className="text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >   
            <Button variant="primary">Register</Button>
          </Link>
        </nav>

        {/* Bouton du menu mobile */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Navigation mobile */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } bg-black/95`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <HashLink 
            smooth
            to="/#how-it-works" 
            className="text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </HashLink>
          <HashLink 
            smooth
            to="/#showcase" 
            className="text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Examples
          </HashLink>
          <Link 
            to="/faq" 
            className="text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link 
            to="/register" 
            className="text-gray-300 hover:text-white transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button variant="primary" fullWidth>Create Your End</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
