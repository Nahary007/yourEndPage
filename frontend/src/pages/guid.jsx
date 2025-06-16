import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MOODS = [
  { value: 'ironic', label: 'Ironic', emoji: '😏', color: 'from-yellow-400 to-yellow-600' },
  { value: 'dramatic', label: 'Dramatic', emoji: '🎭', color: 'from-purple-500 to-purple-800' },
  { value: 'humorous', label: 'Humorous', emoji: '😂', color: 'from-pink-500 to-pink-700' },
  { value: 'philosophical', label: 'Philosophical', emoji: '🤔', color: 'from-blue-500 to-blue-800' },
  { value: 'minimalist', label: 'Minimalist', emoji: '🫥', color: 'from-gray-500 to-gray-700' }
];

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

const Star = ({ x, y, size, delay }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)'
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        delay: delay,
        ease: 'easeInOut'
      }}
    />
  );
};

const ShootingStar = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * 100,
        y: Math.random() * 50
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute bg-white"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: '100px',
        height: '2px',
        transform: 'rotate(-45deg)',
        boxShadow: '0 0 10px 1px rgba(255, 255, 255, 0.8)'
      }}
      initial={{ opacity: 0, x: '-100px' }}
      animate={{
        opacity: visible ? [0, 1, 0] : 0,
        x: visible ? ['-100px', '100px'] : '-100px'
      }}
      transition={{
        duration: 1,
        ease: 'linear'
      }}
    />
  );
};

export default function Guide() {
  const [theme, setTheme] = useState(THEMES.DARK);
  const [mood, setMood] = useState('ironic');
  const [stars, setStars] = useState([]);
  const [hoverStars, setHoverStars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Create background stars
    const bgStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 2
    }));
    setStars(bgStars);
  }, []);

  const handleMouseMove = (e) => {
    if (theme !== THEMES.DARK) return;
    
    const { clientX, clientY } = e;
    const newStar = {
      id: Date.now(),
      x: (clientX / window.innerWidth) * 100,
      y: (clientY / window.innerHeight) * 100,
      size: Math.random() * 3 + 1,
      delay: 0
    };
    
    setHoverStars(prev => [...prev.slice(-10), newStar]);
  };

  const themeClasses = {
    container: theme === THEMES.DARK
      ? 'bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 text-white'
      : 'bg-gradient-to-b from-gray-50 via-blue-50 to-white text-gray-900',
    card: theme === THEMES.DARK
      ? 'bg-gray-800/70 border-purple-500/20'
      : 'bg-white/80 border-blue-200',
    textMuted: theme === THEMES.DARK
      ? 'text-gray-300'
      : 'text-gray-600'
  };

  const handleCreatePage = () => {
    navigate('/end', { 
      state: { 
        initialMood: mood,
        initialTheme: theme 
      } 
    });
  };

  const toggleTheme = () => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 ${themeClasses.container} overflow-hidden relative`}
      onMouseMove={handleMouseMove}
    >
      {/* Night sky elements */}
      {theme === THEMES.DARK && (
        <>
          {stars.map(star => (
            <Star key={`bg-${star.id}`} x={star.x} y={star.y} size={star.size} delay={star.delay} />
          ))}
          <ShootingStar />
          {hoverStars.map(star => (
            <Star key={`hover-${star.id}`} x={star.x} y={star.y} size={star.size} delay={star.delay} />
          ))}
        </>
      )}

      <header className="text-center py-8 px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400 mb-2"
        >
          Emotional Dashboard
        </motion.h1>
        <p className={`text-sm ${themeClasses.textMuted}`}>
          Combine daily reflections with your final statement
        </p>
      </header>
      <main className="container mx-auto px-4 py-6 max-w-2xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-xl p-6 shadow-lg ${themeClasses.card} border mb-6 backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Daily Guide
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm"
            >
              {theme === THEMES.DARK ? '☀️ Light' : '🌙 Dark'}
            </motion.button>
          </div>

          <div className="space-y-4 mb-8">
            <div className={`p-4 rounded-lg ${
              theme === THEMES.DARK ? 'bg-gray-700/50' : 'bg-blue-50'
            }`}>
              <h3 className="font-medium mb-2">1. Select your mood</h3>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {MOODS.map((m) => (
                  <motion.button
                    key={m.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMood(m.value)}
                    className={`p-2 rounded-lg text-sm ${
                      mood === m.value 
                        ? `bg-gradient-to-br ${m.color} text-white` 
                        : theme === THEMES.DARK ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    {m.emoji} {m.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === THEMES.DARK ? 'bg-gray-700/50' : 'bg-blue-50'
            }`}>
              <h3 className="font-medium mb-2">2. Describe your day</h3>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Write a brief summary of what happened today.
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === THEMES.DARK ? 'bg-gray-700/50' : 'bg-blue-50'
            }`}>
              <h3 className="font-medium mb-2">3. One-word summary</h3>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Capture the essence of your day in a single word.
              </p>
            </div>

            <div className={`p-4 rounded-lg ${
              theme === THEMES.DARK ? 'bg-gray-700/50' : 'bg-blue-50'
            }`}>
              <h3 className="font-medium mb-2">4. Additional thoughts</h3>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Any reflections, complaints or things you're grateful for?
              </p>
            </div>
          </div>

          <motion.button
            onClick={handleCreatePage}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-lg font-medium"
          >
            Create Final Statement →
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}