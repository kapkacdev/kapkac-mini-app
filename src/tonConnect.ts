import { TonConnect } from '@tonconnect/sdk';

// todo: use env variables
export const tonConnect = new TonConnect({
  manifestUrl: 'https://main.d3gagyjlto069s.amplifyapp.com/tonconnect-manifest.json',
});
