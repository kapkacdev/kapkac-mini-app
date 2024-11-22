// src/hooks/useTonConnect.ts

import { useEffect, useState } from 'react';
import { tonConnect } from '../tonConnect';
import { WalletInfo, Account } from '@tonconnect/sdk';

interface UseTonConnectReturn {
  isConnected: boolean;
  account: Account | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export function useTonConnect(): UseTonConnectReturn {
  const [isConnected, setIsConnected] = useState<boolean>(tonConnect.connected);
  const [account, setAccount] = useState<Account | null>(tonConnect.account);

  useEffect(() => {
    const handleStatusChange = (walletInfo: WalletInfo | null) => {
      setIsConnected(tonConnect.connected);
      setAccount(tonConnect.account);
    };

    tonConnect.onStatusChange(handleStatusChange);

    // Restore connection if possible
    tonConnect.restoreConnection().catch((error) => {
      console.error('Failed to restore connection:', error);
    });

    return () => {
      tonConnect.offStatusChange(handleStatusChange);
    };
  }, []);

  const connect = async () => {
    try {
      await tonConnect.connect();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnect = () => {
    tonConnect.disconnect();
  };

  return { isConnected, account, connect, disconnect };
}
