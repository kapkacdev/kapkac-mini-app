// src/components/UserProfile.tsx

import React, { useEffect, useState } from 'react';
import { getBalance } from '../services/blockchainService';
import { useTonAddress } from '../hooks/useTonAddress.ts';

const UserProfile: React.FC = () => {
  const { address } = useTonAddress();
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBalance() {
      setLoading(true);
      try {
        let userBalance: string;
        if (address) {
          // Fetch balance from the blockchain
          userBalance = await getBalance(address);
        } else {
          // If address is not available, set balance to '0'
          userBalance = '0';
        }
        setBalance(userBalance);
      } catch (error) {
        console.error('Error fetching user balance:', error);
        setBalance('0');
      } finally {
        setLoading(false);
      }
    }

    fetchBalance();
  }, [address]);

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">User Profile</h2>
      <p>
        <strong>Wallet Address:</strong> {address || 'Not connected'}
      </p>
      <p>
        <strong>Balance:</strong> {balance} TON
      </p>
    </div>
  );
};

export default UserProfile;
