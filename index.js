const ethers = require('ethers');
const fs = require('fs');
// const web3 = require('web3');

const phrases = [];
// let currentProvider = new web3.providers.HttpProvider(
//   'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7'
// );
const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7'
);
const main = async () => {
  while (true) {
    const randomwallet = ethers.Wallet.createRandom();
    console.log(randomwallet.mnemonic.phrase);
    const hdNode = ethers.utils.HDNode.fromMnemonic(
      randomwallet.mnemonic.phrase
    );

    for (let i = 1; i < 6; i++) {
      const account = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
      const wallet = new ethers.Wallet(account);
      const balance = await provider.getBalance(wallet.address);
      if (balance._hex != '0x00') {
        console.log(randomwallet.mnemonic.phrase, balance);
        phrases.push(randomwallet.mnemonic.phrase);
        fs.writeFileSync('data.json', JSON.stringify(phrases));
      }
    }
  }
};

main()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
