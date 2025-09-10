import React, { useState, useEffect, useRef } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit(inputValue);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <label htmlFor="prime-input" className="text-2xl text-slate-300 mb-6">
        Type the prime numbers:
      </label>
      <input
        ref={inputRef}
        id="prime-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. 17.31"
        className="w-full max-w-md bg-slate-800 border-2 border-slate-600 rounded-lg text-center text-3xl p-4 text-white focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition duration-300"
        autoComplete="off"
        aria-label="Prime number input"
      />
      <p className="text-slate-500 mt-4 text-sm">
        Separate numbers with a dot (.). Press Enter to submit.
      </p>
    </div>
  );
};

export default AnswerInput;