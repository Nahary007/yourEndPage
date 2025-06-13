import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const gifCategories = [
  { name: 'Drame', query: 'dramatic exit' },
  { name: 'Colère', query: 'angry slam door' },
  { name: 'Triste', query: 'sad goodbye' },
  { name: 'Absurde', query: 'funny exit' },
  { name: 'Classe', query: 'cool exit' },
];

export default function GifExplorer({ onSelect }) {
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const GIPHY_API_KEY = 'VOTRE_CLÉ_API_GIPHY';
  const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

  const searchGifs = async (query) => {
    setSearching(true);
    setError(null);

    try {
      const response = await fetch(
        `${GIPHY_API_URL}?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=5&rating=pg`
      );

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des GIFs');
      }

      const data = await response.json();
      const gifs = data.data.map((gif) => ({
        id: gif.id,
        url: gif.images.fixed_height.url,
        alt: gif.title || query,
      }));

      setResults(gifs);
    } catch (err) {
      setError('Impossible de charger les GIFs. Vérifiez votre connexion ou réessayez.');
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl my-6 shadow-lg">
      <h3 className="text-gray-100 font-bold mb-3">Trouve le GIF parfait</h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {gifCategories.map((cat) => (
          <motion.button
            key={cat.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-purple-600 text-gray-100 rounded-full shadow-sm hover:bg-purple-500 transition-colors"
            onClick={() => searchGifs(cat.query)}
            disabled={searching}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      {error && (
        <div className="text-red-400 text-center mb-4">{error}</div>
      )}

      <div className="relative min-h-40">
        <AnimatePresence>
          {searching && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-10 h-10 border-4 border-t-purple-400 border-r-purple-400 border-transparent rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3">
          {results.map((gif) => (
            <motion.div
              key={gif.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer overflow-hidden rounded-lg border border-gray-700"
              onClick={() => onSelect(gif.url)}
            >
              <img
                src={gif.url}
                alt={gif.alt}
                className="w-full h-24 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}