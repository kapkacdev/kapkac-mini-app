// src/components/Earn.tsx
import React, { useEffect, useState } from 'react';
import MenuTab from './MenuTab';

// Define the structure of User Earnings
interface UserEarnings {
  earnedKJ: bigint;
  experienceLevel: number;
  rating: number; // Out of 5
  cancellationRate: number; // Percentage
  personalEarnings: {
    rideCompleted: bigint;
    bonuses: bigint;
    referrals: bigint;
  };
}

// Define available actions to earn more points
const earnActions = [
  { id: 1, name: 'Complete a Ride', description: 'Earn KJ by completing rides.' },
  { id: 2, name: 'Refer a Friend', description: 'Earn KJ for every friend you refer.' },
  { id: 3, name: 'Participate in Events', description: 'Join events to earn bonus KJ.' },
];

// Earn Component
const Earn: React.FC = () => {
  // State to hold user earnings data
  const [userEarnings, setUserEarnings] = useState<UserEarnings | null>(null);
  // State to control animation trigger
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    // Simulate fetching user earnings data from an API or smart contract
    const fetchUserEarnings = async () => {
      // Replace this with actual data fetching logic
      const data: UserEarnings = {
        earnedKJ: 1500000n,
        experienceLevel: 5,
        rating: 4.8,
        cancellationRate: 2.5,
        personalEarnings: {
          rideCompleted: 1000n,
          bonuses: 300n,
          referrals: 200n,
        },
      };
      setUserEarnings(data);
    };

    fetchUserEarnings();

    // Trigger the slide animation on component mount
    setAnimate(true);
    // Remove the animation class after the animation duration to prevent replaying
    const timer = setTimeout(() => setAnimate(false), 1000); // 1 second duration
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  // Display a loading state while fetching data
  if (!userEarnings) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4 pt-20 flex justify-center items-center">
        <p className="text-xl text-gray-700">Loading your earnings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-4 pt-20">
      {/* Earn Title */}
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">💰 Your Earnings 💰</h2>

      {/* User Earnings Summary with Conditional Animation */}
      <div
        className={`overflow-x-auto ${
          animate ? 'animate-slide-hint' : ''
        }`}
      >
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mb-6">
          {/* Grid Layout for Earnings Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Earned KJ */}
            <div>
              <p className="text-gray-600">Total Earned KJ</p>
              <p className="text-3xl font-semibold text-green-600">{userEarnings.earnedKJ.toString()} KJ</p>
            </div>

            {/* Experience Level */}
            <div>
              <p className="text-gray-600">Experience Level</p>
              <p className="text-3xl font-semibold text-blue-500">Level {userEarnings.experienceLevel}</p>
            </div>

            {/* Rating */}
            <div>
              <p className="text-gray-600">Rating</p>
              <p className="text-3xl font-semibold text-yellow-500">{userEarnings.rating} ⭐️</p>
            </div>

            {/* Cancellation Rate */}
            <div>
              <p className="text-gray-600">Cancellation Rate</p>
              <p className="text-3xl font-semibold text-red-500">{userEarnings.cancellationRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions to Earn More */}
      <h3 className="text-2xl font-semibold text-center text-indigo-700 mb-6">🚀 Actions to Earn More 🚀</h3>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {earnActions.map((action) => (
          <div
            key={action.id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            {/* Action Icon */}
            <div className="mb-4">
              {/* You can replace this with actual icons */}
              <div className="w-16 h-16 bg-indigo-300 border-indigo-500 border-4 text-white flex items-center justify-center rounded-full mb-4">
                {/* Example Icons */}
                {action.id === 1 && '🚗'}
                {action.id === 2 && '👥'}
                {action.id === 3 && '🎉'}
              </div>
              <h4 className="text-xl font-medium text-gray-800 mb-2">{action.name}</h4>
              <p className="text-gray-600">{action.description}</p>
            </div>
            {/* Action Button */}
            <button className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300">
              Take Action
            </button>
          </div>
        ))}
      </div>

      {/* Optional: Additional Information */}
      {/* <div className="mt-6 text-center text-gray-600">
        <p>Engage more with our community to maximize your earnings!</p>
      </div> */}

      {/* Bottom Menu Tab */}
      <MenuTab />
    </div>
  );
};

export default Earn;
