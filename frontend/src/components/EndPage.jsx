import React, { useState, useMemo } from 'react';
import { motion, Reorder } from 'framer-motion';
import StoryCard from './StoryCard';
import MoodSelector from './MoodSelector';
import DoorSlamEffect from './DoorSlamEffect';
import GifExplorer from './GifExplorer';
import RegretMeter from './RegretMeter';
import FinalButton from './FinalButton';
import FinalPunchline from './FinalPunchline';
import RageSlider from './RageSlider';
import { useLocation } from 'react-router-dom';

const MOTIVATIONAL_MESSAGES = [
  "🌟 Tu es incroyable, ne l'oublie pas !",
  "💬 Aujourd'hui, c'est un nouveau départ.",
  "🎈 Ce n'est pas une fin, c'est une transformation.",
  "🧸 Trouve des gens qui te comprennent. Il y en a.",
  "🌻 Ton histoire continue, tourne juste la page."
];

const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
};

const DEFAULT_STATE = {
  mood: 'ironic',
  slamDoor: false,
  regretLevel: 50,
  rageLevel: 5,
  selectedGif: '',
  punchline: '',
  lastWords: '',
  showStoryCard: false,
  theme: THEMES.DARK,
  elements: [
    'moodSelector',
    'rageSlider',
    'regretMeter',
    'gifExplorer',
    'punchline',
    'lastWords'
  ]
};

const getRandomMessage = () => MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];

const ConfigCard = ({ children, id, theme }) => (
  <Reorder.Item key={id} value={id} className="mb-6">
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 sm:p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-shadow duration-300 backdrop-blur-sm ${
        theme === THEMES.DARK
          ? 'bg-gray-800/40 border-purple-500/30 text-white'
          : 'bg-white/80 border-gray-200 text-gray-900'
      }`}
    >
      {children}
    </motion.div>
  </Reorder.Item>
);

const RainbowCard = ({ children, theme }) => (
  <motion.div
    className={`relative w-full max-w-md mx-auto p-6 rounded-2xl shadow-lg border ${
      theme === THEMES.DARK ? 'border-purple-500/20' : 'border-blue-100'
    }`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    whileHover={{ scale: 1.05 }}
  >
    <div
      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-red-500 via-yellow-300 to-indigo-500 opacity-50 animate-rainbow"
      style={{ zIndex: 0 }}
    />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const styles = `
  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-rainbow {
    background-size: 200% 200%;
    animation: rainbow 10s ease infinite;
  }
`;

export default function EndPage() {
  const location = useLocation();
  const [state, setState] = useState({
    ...DEFAULT_STATE,
    ...(location.state || {}),
    mood: location.state?.initialMood || DEFAULT_STATE.mood,
    theme: location.state?.initialTheme || DEFAULT_STATE.theme
  });

  const { mood, slamDoor, regretLevel, rageLevel, selectedGif, punchline, lastWords, showStoryCard, theme, elements } = state;

  const handlePublish = () => {
    setState(prev => ({ ...prev, slamDoor: true }));
    setTimeout(() => setState(prev => ({ ...prev, showStoryCard: true })), 1200);
  };

  const toggleTheme = () => {
    setState(prev => ({
      ...prev,
      theme: prev.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK
    }));
  };

  const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

  const themeClasses = useMemo(() => ({
    container: theme === THEMES.DARK
      ? 'bg-gradient-to-b from-gray-900 via-purple-900/50 to-black text-white'
      : 'bg-gradient-to-b from-gray-50 via-blue-50 to-white text-gray-900',
    subtitle: theme === THEMES.DARK ? 'text-gray-300' : 'text-gray-600',
    badge: theme === THEMES.DARK
      ? 'bg-purple-900/40 text-purple-200'
      : 'bg-pink-100/80 text-pink-700',
    mainCard: theme === THEMES.DARK
      ? 'bg-gray-800/40 backdrop-blur-md border-purple-500/20'
      : 'bg-white/90 backdrop-blur-sm border-blue-100'
  }), [theme]);

  const configurableComponents = useMemo(() => ({
    moodSelector: (
      <ConfigCard id="moodSelector" theme={theme}>
        <MoodSelector
          selected={mood}
          onSelect={(value) => updateState('mood', value)}
          theme={theme}
        />
      </ConfigCard>
    ),
    rageSlider: (
      <ConfigCard id="rageSlider" theme={theme}>
        <RageSlider
          level={rageLevel}
          onChange={(value) => updateState('rageLevel', value)}
          theme={theme}
        />
      </ConfigCard>
    ),
    regretMeter: (
      <ConfigCard id="regretMeter" theme={theme}>
        <RegretMeter
          value={regretLevel}
          onChange={(value) => updateState('regretLevel', value)}
          theme={theme}
        />
      </ConfigCard>
    ),
    gifExplorer: (
      <ConfigCard id="gifExplorer" theme={theme}>
        <GifExplorer
          onSelect={(url) => updateState('selectedGif', url)}
          theme={theme}
        />
      </ConfigCard>
    ),
    punchline: (
      <ConfigCard id="punchline" theme={theme}>
        <FinalPunchline
          onSelect={(text) => updateState('punchline', text)}
          theme={theme}
        />
      </ConfigCard>
    ),
    lastWords: (
      <ConfigCard id="lastWords" theme={theme}>
        <h3 className={`text-xl sm:text-2xl font-semibold mb-4 ${
          theme === THEMES.DARK ? 'text-purple-300' : 'text-purple-600'
        }`}>
          Derniers mots
        </h3>
        <textarea
          className={`w-full p-3 sm:p-4 rounded-lg border focus:ring-2 focus:ring-purple-400 outline-none min-h-[120px] resize-y transition-colors ${
            theme === THEMES.DARK
              ? 'bg-gray-900/50 text-white border-gray-600'
              : 'bg-white text-gray-900 border-gray-200'
          }`}
          placeholder="Écris ici ta déclaration finale..."
          value={lastWords}
          onChange={(e) => updateState('lastWords', e.target.value)}
          aria-label="Déclaration finale"
        />
      </ConfigCard>
    )
  }), [theme, mood, rageLevel, regretLevel, lastWords]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${themeClasses.container}`}>
      <style>{styles}</style> {/* Inject CSS keyframes */}
      <DoorSlamEffect trigger={slamDoor} />

      <header className="text-center py-8 sm:py-12 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`inline-block px-4 py-2 sm:px-6 sm:py-3 ${themeClasses.badge} rounded-full text-sm sm:text-base font-medium shadow-md mb-4`}
        >
          {getRandomMessage()}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500"
        >
          Bienvenue sur TheEnd.page
        </motion.h1>

        <p className={`text-sm sm:text-md md:text-lg mt-4 opacity-80 max-w-xl mx-auto leading-relaxed ${themeClasses.subtitle}`}>
          Personnalise ta dernière vibe. Écris, glisse, choisis un GIF... et pars avec panache 🪄
        </p>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="mt-6 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          aria-label={`Passer au thème ${theme === THEMES.DARK ? 'clair' : 'sombre'}`}
        >
          Changer le thème ({theme === THEMES.DARK ? 'Clair' : 'Sombre'})
        </motion.button>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 max-h-screen overflow-y-auto pb-16">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className={`rounded-3xl shadow-2xl p-6 sm:p-8 border ${themeClasses.mainCard}`}
        >
          {!showStoryCard ? (
            <Reorder.Group
              axis="y"
              values={elements}
              onReorder={(newOrder) => updateState('elements', newOrder)}
              className="space-y-6"
            >
              {elements.map((item) => configurableComponents[item])}
              <div className="mt-8 flex justify-center">
                <FinalButton onClick={handlePublish} theme={theme} />
              </div>
            </Reorder.Group>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="flex justify-center"
            >
              <RainbowCard theme={theme}>
                <StoryCard
                  mood={mood}
                  regretLevel={regretLevel}
                  rageLevel={rageLevel}
                  selectedGif={selectedGif}
                  punchline={punchline}
                  lastWords={lastWords}
                  theme={theme}
                />
              </RainbowCard>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="text-center py-6 sm:py-8 text-gray-400 text-xs sm:text-sm mt-8">
        <p>✨ TheEnd.page — Finir en beauté, c'est tout un art.</p>
        <p className="mt-2">© 2025 • Design doux, cœur fort 💜</p>
      </footer>
    </div>
  );
}