import React from 'react';
import { CATEGORY_COLORS } from '../Pages/types';


const CategoryBackground = ({ category }) => {
  const { primary, animation } = CATEGORY_COLORS[category || ''];

  return (
    <div 
      className={`absolute inset-0 transition-colors duration-1000 ${primary} ${animation}`}
      aria-hidden="true"
    />
  );
};

export default CategoryBackground;
