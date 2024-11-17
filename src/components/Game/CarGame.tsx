// src/components/Game/CarGame.tsx
import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';

const CarGame: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [carPosition, setCarPosition] = useState(50); // Car's horizontal position (%)
  const [obstaclePosition, setObstaclePosition] = useState(0); // Obstacle vertical position (%)
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Move the obstacle downward and check for collision
  useEffect(() => {
    const interval = setInterval(() => {
      setObstaclePosition((prev) => {
        if (prev >= 100) {
          setScore((score) => score + 10); // Increase score when the obstacle passes
          return 0; // Reset obstacle to the top
        }
        return prev + 5; // Move obstacle down
      });
    }, 200); // Update every 200ms

    return () => clearInterval(interval);
  }, []);

  // Check for collision between the car and the obstacle
  useEffect(() => {
    if (obstaclePosition >= 90 && Math.abs(carPosition - 50) < 15) {
      setGameOver(true);
    }
  }, [obstaclePosition, carPosition]);

  const moveCar = (direction: 'left' | 'right') => {
    if (gameOver) return;
    setCarPosition((prev) => {
      if (direction === 'left' && prev > 0) return prev - 10;
      if (direction === 'right' && prev < 100) return prev + 10;
      return prev;
    });
  };

  const restartGame = () => {
    setCarPosition(50);
    setObstaclePosition(0);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative h-screen w-screen bg-gray-200 overflow-hidden">
      {/* Car */}
      <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 h-10 w-10"
        style={{ left: `${carPosition}%` }}
      />

      {/* Obstacle */}
      <div
        className="absolute top-0 bg-red-500 h-10 w-10"
        style={{ top: `${obstaclePosition}%`, left: '50%' }}
      />

      {/* Score */}
      <div className="absolute top-5 left-5 text-xl">
        <p>Score: {score}</p>
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl mb-4">Game Over</h1>
          <button
            onClick={restartGame}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Restart
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={() => moveCar('left')}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Left
        </button>
        <button
          onClick={() => moveCar('right')}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Right
        </button>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigateTo('Menu')}
        className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default CarGame;
