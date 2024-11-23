// src/utils/api.ts
export const getLeaderboard = async () => {
    // Replace with your actual API endpoint
    const response = await fetch('/api/leaderboard');
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    return response.json();
  };
  
  export const updateLeaderboard = async (walletAddress: string, kmDriven: number, coinsEarned: number, expPoints: number) => {
    // Replace with your actual API endpoint
    const response = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ walletAddress, kmDriven, coinsEarned, expPoints })
    });
    if (!response.ok) {
      throw new Error('Failed to update leaderboard');
    }
    return response.json();
  };
  