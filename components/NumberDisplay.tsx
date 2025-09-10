
import React from 'react';
import { NumberStatus } from '../types';

interface NumberDisplayProps {
  number: number;
  status?: NumberStatus;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ number, status }) => {
  const baseClasses = "w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center m-2 md:m-4 shadow-lg transition-all duration-300";

  const statusStyles = {
    correct: 'bg-green-800/50 border-2 border-green-500',
    missed: 'bg-yellow-800/50 border-2 border-yellow-500 animate-pulse',
    incorrect: 'bg-red-800/50 border-2 border-red-500',
    neutral: 'bg-slate-800/70 border-2 border-slate-600 opacity-70',
  };
  
  const defaultStyle = 'bg-slate-800 border-2 border-slate-700';

  const finalClasses = `${baseClasses} ${status ? statusStyles[status] : defaultStyle}`;
  
  return (
    <div className={finalClasses}>
      <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-500">
        {number}
      </span>
    </div>
  );
};

export default NumberDisplay;