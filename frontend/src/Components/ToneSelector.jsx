import React from 'react';
import { motion } from 'framer-motion';

const tones = [
  { label: '💀 Dramatique', value: 'dramatic' },
  { label: '🤡 Ironique', value: 'ironic' },
  { label: '😤 Passif-agressif', value: 'passive' },
  { label: '🫠 Cringe', value: 'cringe' },
  { label: '😭 Touchant', value: 'touching' },
  { label: '🔥 Classe', value: 'cool' }
];

export default function ToneSelector({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      {tones.map((tone) => (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          key={tone.value}
          onClick={() => onChange(tone.value)}
          className={`px-4 py-2 rounded-full border ${
            selected === tone.value ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          {tone.label}
        </motion.button>
      ))}
    </div>
  );
}
