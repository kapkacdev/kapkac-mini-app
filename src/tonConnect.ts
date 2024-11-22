import { TonConnect } from '@tonconnect/sdk';

// todo: use env variables
export const tonConnect = new TonConnect({
  manifestUrl: 'https://d607-188-119-39-135.ngrok-free.app/tonconnect-manifest.json',
});
