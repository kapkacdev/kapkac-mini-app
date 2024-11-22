// todo: remove this file and only use one hook to manage users' blockchain activities

import { useEffect, useState } from 'react';
import { tonConnect } from '../tonConnect';
import TonConnectWallet from '@tonconnect/sdk';

export function useTonWallet() {
  const [wallet, setWallet] = useState<TonConnectWallet | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Subscribe to status changes
    const unsubscribe = tonConnect.onStatusChange((wallet) => {
      if (wallet) {
        setWallet(wallet as unknown as TonConnectWallet);
        setIsConnected(true);
        setAddress(wallet.account.address);
      } else {
        setWallet(null);
        setIsConnected(false);
        setAddress('');
      }
    });

    // Attempt to restore the connection on mount
    tonConnect.restoreConnection();

    return () => {
      unsubscribe();
    };
  }, []);
    
  const connectWallet = async () => {
    setIsLoading(true);

    try {
      await tonConnect.connect({
        universalLink: 'https://app.tonkeeper.com/ton-connect',
        bridgeUrl: 'https://bridge.tonapi.io/bridge',
      });
        
      console.log('Connecting to wallet ... ', tonConnect.wallet);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      console.log('Connected to wallet:', tonConnect.wallet);
      setIsLoading(false);
    }
  };  

  const disconnectWallet = () => {
    tonConnect.disconnect();
  };

  return {
    wallet,
    isConnected,
    address,
    isLoading,
    connectWallet,
    disconnectWallet,
  };
}
