
import React from 'react';
import AnswerInput from './AnswerInput';

interface InputPhaseProps {
  onSubmit: (answer: string) => void;
}

const InputPhase: React.FC<InputPhaseProps> = ({ onSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 animate-fadeIn">
      <AnswerInput onSubmit={onSubmit} />
    </div>
  );
};

export default InputPhase;