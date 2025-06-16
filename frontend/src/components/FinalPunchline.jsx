// FinalPunchline.tsx
import React, { useState } from 'react';

const phrases = [
  "Je ne suis pas en colère, juste déçu.e.",
  "Fuyez, pauvres fous !",
  "Ctrl+Alt+Quitter.",
  "Je vous laisse avec vos bugs.",
  "Adieu les tickets Jira, bonjour la vie !"
];

export default function FinalPunchline({ onSelect }) {
  const [selected, setSelected] = useState('');

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-2">Choisis ta dernière punchline 👊</h3>
      {phrases.map((p) => (
        <button 
          key={p}
          onClick={() => {
            setSelected(p);
            onSelect(p);
          }}
          className={`block w-full text-left px-4 py-2 mb-2 rounded ${
            selected === p ? 'bg-black text-dark' : 'bg-dark-100'
          } hover:bg-dark-200`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
