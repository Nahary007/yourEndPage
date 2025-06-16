import React from 'react';
import { HexColorPicker } from 'react-colorful';

export const ColorPicker = ({ color, onChange, label }) => {
  const [showPicker, setShowPicker] = React.useState(false);

  return (
    <div className="mt-2 relative">
      <button 
        type="button" 
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-2 text-xs"
      >
        <span>{label}:</span>
        <span 
          className="w-4 h-4 inline-block rounded-sm border border-gray-300"
          style={{ backgroundColor: color }}
        />
      </button>
      
      {showPicker && (
        <div className="absolute z-10 mt-1">
          <HexColorPicker color={color} onChange={onChange} />
          <button 
            type="button" 
            onClick={() => setShowPicker(false)}
            className="mt-1 text-xs bg-gray-100 px-2 py-1 rounded"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};