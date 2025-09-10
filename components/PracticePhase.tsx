
import React from 'react';
import NumberDisplay from './NumberDisplay';
import AnswerInput from './AnswerInput';

interface PracticePhaseProps {
  sequence: number[];
  onSubmit: (answer: string) => void;
}

const PracticePhase: React.FC<PracticePhaseProps> = ({ sequence, onSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-around h-full p-4 animate-fadeIn">
      <div className="flex flex-wrap justify-center">
        {sequence.map((num, index) => (
          <NumberDisplay key={index} number={num} />
        ))}
      </div>
      <AnswerInput onSubmit={onSubmit} />
    </div>
  );
};

export default PracticePhase;