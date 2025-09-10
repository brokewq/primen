
import { Difficulty, NumberRange } from '../types';

const primesUpTo100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
const primeSet = new Set(primesUpTo100);

export const isPrime = (num: number): boolean => {
  return primeSet.has(num);
};

export const getPrimeFactors = (num: number): string => {
    if (num <= 1) return "N/A";
    if (isPrime(num)) return "Prime";

    const factors: { [key: number]: number } = {};
    let d = 2;
    let n = num;
    while (n > 1) {
        while (n % d === 0) {
            factors[d] = (factors[d] || 0) + 1;
            n /= d;
        }
        d++;
        if (d * d > n) {
            if (n > 1) factors[n] = (factors[n] || 0) + 1;
            break;
        }
    }
    return Object.entries(factors)
        .map(([base, exp]) => (exp > 1 ? `${base} \u00D7 ${exp}` : base)) // Using unicode for superscript, e.g. 2³ -> 2 x 3
        .join(' \u00D7 '); // Times symbol
};

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const getRandomSubarray = <T,>(arr: T[], size: number): T[] => {
    return shuffleArray(arr).slice(0, size);
};

export const generateSequence = (level: number, difficulty: Difficulty, range: NumberRange): number[] => {
    let numCount: number;

    let min = 1;
    let max = 100;
    if (range === NumberRange['1-50']) {
        max = 50;
    } else if (range === NumberRange['50-100']) {
        min = 50;
    }

    const primePool = primesUpTo100.filter(p => p >= min && p <= max);
    const compositePool = Array.from({ length: max - min + 1 }, (_, i) => i + min).filter(n => !isPrime(n) && n > 1);
    
    switch (difficulty) {
        case Difficulty.Easy:
            numCount = Math.min(3 + Math.floor((level - 1) / 3), 4);
            break;
        case Difficulty.Medium:
            numCount = Math.min(4 + Math.floor((level - 1) / 2), 6);
            break;
        case Difficulty.Hard:
        default:
            numCount = Math.min(5 + Math.floor((level - 1) / 2), 8);
            break;
    }

    let primeCount = Math.max(1, Math.floor(numCount / 2) + (level % 2) - (Math.random() > 0.8 ? 1 : 0));
    
    // Ensure we don't request more primes or composites than available in the pool.
    // Also ensures the sequence is filled if one pool is smaller than required.
    primeCount = Math.min(primeCount, primePool.length);
    primeCount = Math.max(primeCount, numCount - compositePool.length);

    const compositeCount = numCount - primeCount;
    
    const selectedPrimes = getRandomSubarray(primePool, primeCount);
    const selectedComposites = getRandomSubarray(compositePool, compositeCount);

    return shuffleArray([...selectedPrimes, ...selectedComposites]);
};