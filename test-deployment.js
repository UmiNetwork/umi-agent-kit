import {UmiAgentKit} from './src/index.js';

const kit = new UmiAgentKit({
  network: 'devnet'
});


const wallet = kit.importWallet('b24ce51ecc72d905a8e8c11e65096eda39113b883b13cd7b6190c740093a6daf');

// const res = await kit.sendETH({
//   from: wallet,
//   to: '0x13b56bf6A482CBbe97C09B0b9F0BFB0400206860',
//   amount: '1'
// });
const res = await kit.getBalance('0x13b56bf6A482CBbe97C09B0b9F0BFB0400206860');

console.log(res);