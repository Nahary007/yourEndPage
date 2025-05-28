// data.js

export const CATEGORIES = [
  { label: '💀 Dramatique', value: 'dramatic' },
  { label: '🤡 Ironique', value: 'ironic' },
  { label: '😤 Passif-agressif', value: 'passive' },
  { label: '🫠 Cringe', value: 'cringe' },
  { label: '😭 Touchant', value: 'touching' },
  { label: '🔥 Classe', value: 'cool' }
];

export const CATEGORY_COLORS = {
  '': { primary: 'bg-white', animation: '' },
  dramatic: { 
    primary: 'bg-purple-900', 
    animation: 'animate-dramatic-bg'
  },
  ironic: { 
    primary: 'bg-yellow-400', 
    animation: 'animate-ironic-bg'
  },
  passive: { 
    primary: 'bg-red-400', 
    animation: 'animate-passive-bg'
  },
  cringe: { 
    primary: 'bg-orange-300', 
    animation: 'animate-cringe-bg'
  },
  touching: { 
    primary: 'bg-blue-400', 
    animation: 'animate-touching-bg'
  },
  cool: { 
    primary: 'bg-indigo-600', 
    animation: 'animate-cool-bg'
  }
};

// Exemple de structure de pageData
export const createEmptyPageData = () => ({
  category: '',
  title: '',
  description: '',
  image: null,
  gif: null,
  date: '',
  gifPosition: { x: 0, y: 0 }
});
