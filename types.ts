
export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum GameMode {
  Classic = 'Classic',
  Practice = 'Practice',
}

export enum NumberRange {
  '1-50' = '1-50',
  '50-100' = '50-100',
  '1-100' = '1-100',
}

export enum GamePhase {
  Start,
  Display,
  Input,
  Practice,
  Results,
}

export type NumberStatus = 'correct' | 'missed' | 'incorrect' | 'neutral';

export interface ResultDetails {
  correctlyIdentified: number[];
  missedPrimes: number[];
  incorrectlyIdentified: Array<{ num: number; factors: string }>;
  sequencePrimes: number[];
}