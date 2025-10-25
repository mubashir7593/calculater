
import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  // Adjust font size based on the length of the displayed value for better visibility
  const getFontSize = (val: string) => {
    const length = val.length;
    if (length > 18) return 'text-2xl';
    if (length > 14) return 'text-3xl';
    if (length > 9) return 'text-4xl';
    if (length > 6) return 'text-5xl';
    return 'text-7xl';
  };

  const fontSizeClass = getFontSize(value);

  return (
    <div className="bg-black text-white w-full h-24 rounded-lg flex items-center justify-end p-4 mb-2 overflow-hidden">
      <h1 className={`font-light ${fontSizeClass} transition-all duration-200 ease-in-out whitespace-nowrap`}>
        {new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 10,
        }).format(parseFloat(value)) === 'NaN' ? 'Error' : new Intl.NumberFormat('en-US', { maximumFractionDigits: 10 }).format(parseFloat(value))}
        {value.endsWith('.') && !value.includes('..') ? '.' : ''}
      </h1>
    </div>
  );
};

export default Display;
