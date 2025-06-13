import { motion } from 'framer-motion';

export default function FinalButton({ onClick }) {
  return (
    <motion.div
      className="fixed bottom-8 left-0 right-0 flex justify-center z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <motion.button
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 20px 5px rgba(239, 68, 68, 0.5)'
        }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-xl"
        onClick={onClick}
      >
        CLAQUE LA PORTE ! 🔥
      </motion.button>
    </motion.div>
  );
}