
import React, { useEffect } from 'react';
import { DISPLAY_DURATION_MS } from '../constants';
import NumberDisplay from './NumberDisplay';

interface DisplaySequenceProps {
  sequence: number[];
  onDisplayEnd: () => void;
}

const DisplaySequence: React.FC<DisplaySequenceProps> = ({ sequence, onDisplayEnd }) => {
  useEffect(() => {
    const timer = setTimeout(onDisplayEnd, DISPLAY_DURATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
        <h2 className="text-2xl text-slate-400 mb-8 animate-pulse">Memorize...</h2>
        <div className="flex flex-wrap justify-center">
            {sequence.map((num, index) => (
                <NumberDisplay key={index} number={num} />
            ))}
        </div>
    </div>
  );
};

export default DisplaySequence;
   