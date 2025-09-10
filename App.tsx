
import React, { useState, useCallback } from 'react';
import { GamePhase, Difficulty, GameMode, NumberRange } from './types';
import type { ResultDetails } from './types';
import { isPrime, generateSequence, getPrimeFactors } from './services/gameService';
import StartScreen from './components/StartScreen';
import DisplaySequence from './components/DisplaySequence';
import InputPhase from './components/InputPhase';
import ResultsScreen from './components/ResultsScreen';
import PracticePhase from './components/PracticePhase';

const App: React.FC = () => {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.Start);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [numberRange, setNumberRange] = useState<NumberRange | null>(null);
  const [currentSequence, setCurrentSequence] = useState<number[]>([]);
  const [resultDetails, setResultDetails] = useState<ResultDetails | null>(null);

  const handleStartGame = useCallback((selectedDifficulty: Difficulty, selectedMode: GameMode, selectedRange: NumberRange) => {
    setLevel(1);
    setScore(0);
    setDifficulty(selectedDifficulty);
    setGameMode(selectedMode);
    setNumberRange(selectedRange);
    const newSequence = generateSequence(1, selectedDifficulty, selectedRange);
    setCurrentSequence(newSequence);
    setPhase(selectedMode === GameMode.Classic ? GamePhase.Display : GamePhase.Practice);
  }, []);

  const handleDisplayEnd = useCallback(() => {
    setPhase(GamePhase.Input);
  }, []);

  const handleSubmitAnswer = useCallback((answer: string) => {
    const trimmedAnswer = answer.trim();
    const userNumbers = trimmedAnswer === '' ? [] : trimmedAnswer
      .split('.')
      .filter(Boolean) // Filter out empty strings from trailing dots
      .map(Number)
      .filter(n => !isNaN(n) && n > 0);

    const userNumberSet = new Set(userNumbers);
    const sequencePrimes = currentSequence.filter(isPrime);
    const sequencePrimeSet = new Set(sequencePrimes);
    
    const correctlyIdentified = [...userNumberSet].filter(n => sequencePrimeSet.has(n));
    const missedPrimes = sequencePrimes.filter(n => !userNumberSet.has(n));
    const incorrectlyIdentified = [...userNumberSet]
        .filter(n => !sequencePrimeSet.has(n))
        .map(num => ({ num, factors: getPrimeFactors(num) }));

    const roundScore = correctlyIdentified.length - incorrectlyIdentified.length;
    setScore(prev => Math.max(0, prev + roundScore));
    
    setResultDetails({
        correctlyIdentified,
        missedPrimes,
        incorrectlyIdentified,
        sequencePrimes,
    });

    setPhase(GamePhase.Results);
  }, [currentSequence]);

  const handleStartNextRound = useCallback(() => {
    if (!difficulty || !gameMode || !numberRange) return;
    const newSequence = generateSequence(level, difficulty, numberRange);
    setCurrentSequence(newSequence);
    setResultDetails(null);
    setPhase(gameMode === GameMode.Classic ? GamePhase.Display : GamePhase.Practice);
  }, [level, difficulty, gameMode, numberRange]);
  
  const renderPhase = () => {
    switch (phase) {
      case GamePhase.Start:
        return <StartScreen onStart={handleStartGame} />;
      case GamePhase.Display:
        return <DisplaySequence sequence={currentSequence} onDisplayEnd={handleDisplayEnd} />;
      case GamePhase.Input:
        return <InputPhase onSubmit={handleSubmitAnswer} />;
      case GamePhase.Practice:
        return <PracticePhase sequence={currentSequence} onSubmit={handleSubmitAnswer} />;
      case GamePhase.Results:
        return resultDetails && <ResultsScreen results={resultDetails} sequence={currentSequence} onComplete={handleStartNextRound} />;
      default:
        return <StartScreen onStart={handleStartGame} />;
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-900">
        {phase !== GamePhase.Start && (
          <>
            <div className="absolute top-4 left-4 bg-slate-800/70 px-4 py-2 rounded-lg text-lg flex gap-x-4 flex-wrap">
              <span>Level: <span className="font-bold text-blue-400">{level}</span></span>
              <span>Difficulty: <span className="font-bold text-blue-400">{difficulty}</span></span>
              <span>Range: <span className="font-bold text-blue-400">{numberRange}</span></span>
            </div>
            <div className="absolute top-4 right-4 bg-slate-800/70 px-4 py-2 rounded-lg text-lg">
                Score: <span className="font-bold text-blue-400">{score}</span>
            </div>
          </>
        )}
        <div className="w-full h-[80vh] max-w-4xl relative">
            {renderPhase()}
        </div>
    </main>
  );
};

export default App;