// src/services/blockchainService.ts

import TonWeb from 'tonweb';

const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));

export async function getBalance(address: string): Promise<string> {
  try {
    const walletAddress = new TonWeb.utils.Address(address);
    const balanceNanoCoins = await tonweb.provider.getBalance(walletAddress.toString(true, true, true));
    const balanceTON = (Number(balanceNanoCoins) / 1e9).toFixed(4);
    return balanceTON;
  } catch (error) {
    console.error('Error fetching balance from blockchain:', error);
    return '0';
  }
}
