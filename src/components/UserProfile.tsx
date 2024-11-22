'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useTonConnectUI } from '@tonconnect/ui-react'
import MenuTab from './MenuTab'

const UserProfile: React.FC = () => {
  const [tonConnectUI] = useTonConnectUI()
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  tonConnectUI.getWallets().then((wallets) => {
    console.log(wallets)
  })

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address)
    console.log('Connected to wallet:', address)
    setIsLoading(false)
  }, [])

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null)
    console.log('Wallet disconnected successfully:')
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const checkWallletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account.address)
      } else {
        handleWalletDisconnection()
      }
    }
    checkWallletConnection()

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address)
      } else {
        handleWalletDisconnection()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection])

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true)

      await tonConnectUI.disconnect()
    } else {
      await tonConnectUI.openSingleWalletModal('Wallet')
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Connecting to wallet...
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 px-2 text-center">
        TON Connect Address
      </h1>

      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>

          <button
            onClick={handleWalletAction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            DisconnectWallet
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleWalletAction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect TON Wallet
          </button>
        </div>
      )}

      {/* Bottom Menu Tab */}
      <MenuTab />
    </div>
  )
}

export default UserProfile
