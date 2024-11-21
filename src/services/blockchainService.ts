// src/services/blockchainService.ts

import TonWeb from 'tonweb';

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));

/**
 * Get the balance of a given wallet address.
 * @param address - The wallet address as a string.
 * @returns The balance in TON coins as a string.
 */
export async function getBalance(address: string): Promise<string> {
  try {
    // Optionally validate the address
    // If the address is invalid, this will throw an error
    const walletAddress = new TonWeb.utils.Address(address);

    // Use the raw address (friendly format) for the API call
    const rawAddress = walletAddress.toString(true, true, true);

    // Fetch the balance using the raw address string
    const balanceNanoCoins = await tonweb.provider.getBalance(rawAddress);

    const balanceTON = (Number(balanceNanoCoins) / 1e9).toFixed(4); // Convert nanocoins to TON
    return balanceTON;
  } catch (error) {
    console.error('Error fetching balance from blockchain:', error);
    return '0';
  }
}
