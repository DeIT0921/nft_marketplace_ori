import React, { useState, useEffect } from 'react';
import Web3modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { MarketAddress, MarketAddressABI } from './constants';

const projectId = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const projectSecretKey = process.env.NEXT_PUBLIC_INFURA_API_SECRET;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString('base64')}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MeqaMask');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No account found');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log(url);

      return url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  };

  return (
    <NFTContext.Provider value={{ nftCurrency, currentAccount, connectWallet, uploadToIPFS }}>
      {children}
    </NFTContext.Provider>
  );
};
