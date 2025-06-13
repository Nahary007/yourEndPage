import { motion } from 'framer-motion';

const moods = [
  { id: 'dramatic', emoji: '🎭', color: '#7e22ce' },
  { id: 'ironic', emoji: '😏', color: '#f59e0b' },
  { id: 'cringe', emoji: '🤪', color: '#ec4899' },
  { id: 'classy', emoji: '🎩', color: '#1e40af' },
  { id: 'angry', emoji: '👿', color: '#dc2626' },
  { id: 'absurd', emoji: '🦄', color: '#a855f7' },
];

export default function MoodSelector({ selected, onSelect }) {
  return (
    <div className="my-8">
      <h3 className="text-lg font-bold mb-4">Choisis ton style de sortie</h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.9 }}
            animate={{
              backgroundColor: selected === mood.id ? mood.color : '#e5e7eb',
              scale: selected === mood.id ? 1.1 : 1
            }}
            className={`p-4 rounded-full text-3xl transition-all shadow-md`}
            onClick={() => onSelect(mood.id)}
          >
            {mood.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}