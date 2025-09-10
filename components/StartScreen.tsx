
import React, { useState } from 'react';
import { Difficulty, GameMode, NumberRange } from '../types';

interface StartScreenProps {
  onStart: (difficulty: Difficulty, mode: GameMode, range: NumberRange) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.Classic);
  const [numberRange, setNumberRange] = useState<NumberRange>(NumberRange['1-100']);

  const toggleClasses = "px-6 py-2 rounded-full transition-colors duration-300";
  const activeClasses = "bg-blue-600 text-white font-semibold shadow-md";
  const inactiveClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  const rangeButtonClasses = "px-5 py-2 rounded-md transition-colors duration-200 text-sm font-medium";
  const activeRangeClasses = "bg-blue-600 text-white shadow-lg";
  const inactiveRangeClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600";

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-fadeIn">
      <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
        Prime Sequence
      </h1>
      <p className="text-slate-300 text-lg mb-8 max-w-md">
        Test your prime number knowledge. Choose your mode and difficulty to begin.
      </p>

      <div className="mb-8">
        <div className="bg-slate-800 rounded-full p-1 flex items-center space-x-1">
          <button
            onClick={() => setGameMode(GameMode.Classic)}
            className={`${toggleClasses} ${gameMode === GameMode.Classic ? activeClasses : inactiveClasses}`}
            aria-pressed={gameMode === GameMode.Classic}
          >
            Classic Mode
          </button>
          <button
            onClick={() => setGameMode(GameMode.Practice)}
            className={`${toggleClasses} ${gameMode === GameMode.Practice ? activeClasses : inactiveClasses}`}
            aria-pressed={gameMode === GameMode.Practice}
          >
            Practice Mode
          </button>
        </div>
        <p className="text-slate-500 text-sm mt-3">
          {gameMode === GameMode.Classic
            ? 'Memorize the sequence, then recall the primes.'
            : 'Numbers stay on screen. Focus on identification.'}
        </p>
      </div>

      <div className="mb-8 w-full max-w-sm">
        <h3 className="text-lg font-semibold text-slate-300 mb-3">Practice Range</h3>
        <div className="grid grid-cols-3 gap-2 bg-slate-800 p-1 rounded-lg">
          {(Object.values(NumberRange) as NumberRange[]).map(range => (
            <button
              key={range}
              onClick={() => setNumberRange(range)}
              className={`${rangeButtonClasses} ${numberRange === range ? activeRangeClasses : inactiveRangeClasses}`}
              aria-pressed={numberRange === range}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => onStart(Difficulty.Easy, gameMode, numberRange)}
          className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-800 transition-all duration-300 transform hover:scale-105"
        >
          Easy
        </button>
        <button
          onClick={() => onStart(Difficulty.Medium, gameMode, numberRange)}
          className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-700 transition-all duration-300 transform hover:scale-105"
        >
          Medium
        </button>
        <button
          onClick={() => onStart(Difficulty.Hard, gameMode, numberRange)}
          className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-800 transition-all duration-300 transform hover:scale-105"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default StartScreen;