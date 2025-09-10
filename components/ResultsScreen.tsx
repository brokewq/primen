
import React, { useEffect } from 'react';
import type { ResultDetails, NumberStatus } from '../types';
import { RESULTS_SCREEN_DURATION_MS } from '../constants';
import { isPrime } from '../services/gameService';
import NumberDisplay from './NumberDisplay';

interface ResultsScreenProps {
  results: ResultDetails;
  sequence: number[];
  onComplete: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, sequence, onComplete }) => {
  const { correctlyIdentified, incorrectlyIdentified, sequencePrimes } = results;

  const score = correctlyIdentified.length;
  const totalPrimes = sequencePrimes.length;
  const isPerfect = score === totalPrimes && incorrectlyIdentified.length === 0;

  useEffect(() => {
    const timer = setTimeout(onComplete, RESULTS_SCREEN_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const correctlyIdentifiedSet = new Set(correctlyIdentified);
  const incorrectlyIdentifiedMap = new Map(
    incorrectlyIdentified.map(item => [item.num, item.factors])
  );

  const getStatusForNumber = (num: number): NumberStatus => {
    if (isPrime(num)) {
      return correctlyIdentifiedSet.has(num) ? 'correct' : 'missed';
    } else { // is composite
      return incorrectlyIdentifiedMap.has(num) ? 'incorrect' : 'neutral';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 animate-fadeIn text-center">
      <h2 className="text-4xl font-bold mb-4">
        {isPerfect ? "Perfect!" : "Round Results"}
      </h2>
      
      <div className="flex flex-wrap justify-center items-start mb-6">
        {sequence.map((num, index) => (
          <div key={index} className="flex flex-col items-center">
            <NumberDisplay number={num} status={getStatusForNumber(num)} />
            {getStatusForNumber(num) === 'incorrect' && (
              <p className="text-red-400 text-sm -mt-3 max-w-[8rem]">
                ({incorrectlyIdentifiedMap.get(num)})
              </p>
            )}
          </div>
        ))}
      </div>
      
      <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
        {score} / {totalPrimes}
      </p>

      <p className="text-slate-500 mt-auto text-sm animate-pulse">
        Next round starting soon...
      </p>
    </div>
  );
};

export default ResultsScreen;