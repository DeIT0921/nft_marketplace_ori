require('@nomiclabs/hardhat-waffle');
// Load environment variables from .env
require('dotenv').config();

const { SEPOLIA_API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: '0.8.4',
  networks: {
    sepolia: {
      url: SEPOLIA_API_URL, // Infura or Alchemy URL for Goerli
      accounts: [`0x${PRIVATE_KEY}`], // Private key of the deployer account
    },
  },
};
