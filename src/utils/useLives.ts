// src/utils/useLives.ts
import { useEffect, useState } from 'react';

const MAX_LIVES = 5;
const REFRESH_TIME = 24 * 60 * 60; // 24 hours in seconds

export const useLives = (walletAddress: string) => {
  const [lives, setLives] = useState<number>(MAX_LIVES);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [canPlay, setCanPlay] = useState<boolean>(true);

  useEffect(() => {
    // Fetch lives and last play time from backend or localStorage
    const storedData = localStorage.getItem(`lives_${walletAddress}`);
    if (storedData) {
      const { lives: storedLives, lastPlay } = JSON.parse(storedData);
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - lastPlay;

      if (storedLives < MAX_LIVES && elapsed >= REFRESH_TIME) {
        setLives(MAX_LIVES);
        setCanPlay(true);
        localStorage.setItem(`lives_${walletAddress}`, JSON.stringify({ lives: MAX_LIVES, lastPlay: now }));
      } else {
        setLives(storedLives);
        if (storedLives === 0) {
          setRemainingTime(REFRESH_TIME - elapsed);
          setCanPlay(false);
        }
      }
    } else {
      setLives(MAX_LIVES);
      localStorage.setItem(`lives_${walletAddress}`, JSON.stringify({ lives: MAX_LIVES, lastPlay: Math.floor(Date.now() / 1000) }));
    }
  }, [walletAddress]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canPlay) {
      timer = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setLives(MAX_LIVES);
            setCanPlay(true);
            localStorage.setItem(`lives_${walletAddress}`, JSON.stringify({ lives: MAX_LIVES, lastPlay: Math.floor(Date.now() / 1000) }));
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [canPlay, walletAddress]);

  const decrementLife = () => {
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setCanPlay(false);
        setRemainingTime(REFRESH_TIME);
        const lastPlay = Math.floor(Date.now() / 1000);
        localStorage.setItem(`lives_${walletAddress}`, JSON.stringify({ lives: 0, lastPlay }));
      } else {
        localStorage.setItem(`lives_${walletAddress}`, JSON.stringify({ lives: newLives, lastPlay: Math.floor(Date.now() / 1000) }));
      }
      return newLives;
    });
  };

  return { lives, remainingTime, decrementLife, canPlay };
};
