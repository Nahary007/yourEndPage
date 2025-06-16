import React from 'react';
import { motion } from 'framer-motion';

export default function RageSlider({ level, onChange }) {
  const getRageEmoji = (value) => {
    if (value <= 3) return '😊';
    if (value <= 6) return '😣';
    if (value <= 8) return '😣';
    return '😣';
  };

  const getRageDescription = (value) => {
    if (value <= 3) return 'Calme et serein';
    if (value <= 6) return 'Un peu agacé';
    if (value <= 8) return 'Vraiment furieux';
    return 'Hors de contrôle !';
  };

  return (
    <div className="mt-8 text-center">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold mb-4 text-white"
      >
        Niveau de rage {getRageEmoji(level)}
      </motion.h3>
      <motion.div
        className="relative w-64 mx-auto"
        whileHover={{ scale: 1.05 }}
      >
        <input
          type="range"
          min="0"
          max="10"
          value={level}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #10b981 ${level * 10}%, #ef4444 ${level * 10}%)`,
          }}
        />
        <motion.div
          className="absolute -top-12 left-0 right-0 text-sm text-gray-300"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {getRageDescription(level)}
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-2 text-lg text-white"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        {level}/10
      </motion.div>
    </div>
  );
}