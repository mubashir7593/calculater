
import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, children, className = '' }) => {
  const baseClasses = 'text-3xl sm:text-4xl font-medium rounded-full h-20 w-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-colors duration-150';
  
  const typeClasses = className.includes('bg-orange-500') || className.includes('bg-gray-400') 
    ? '' 
    : 'bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${typeClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
