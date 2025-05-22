import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  fullWidth = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-600',
    outline: 'border-2 border-gray-300 hover:border-white text-white hover:bg-white/10 focus:ring-white',
    text: 'text-white hover:bg-white/10 focus:ring-white',
  };
  
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
