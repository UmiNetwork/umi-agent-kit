/**
 * EmbeddedDeploymentEngine.js
 * 
 * FIXED deployment engine using the proven manual deployment method
 * - Direct solc compilation (NO Hardhat)
 * - Manual BCS wrapping with @mysten/bcs
 * - Raw transaction signing with ethers.js  
 * - Direct JSON-RPC to Umi Network
 */

import solc from 'solc';
import { ethers } from 'ethers';
import fetch from 'node-fetch';
import { DEFAULT_CONFIG } from '../config.js';

// BCS serialization for Umi Network
const bcs = await import('@mysten/bcs').then(m => m.bcs);

export class EmbeddedDeploymentEngine {
  constructor(networkOrKit = 'devnet') {
    // Handle both string network and UmiAgentKit instance
    let network;
    if (typeof networkOrKit === 'string') {
      network = networkOrKit;
    } else if (networkOrKit && networkOrKit.config && networkOrKit.config.network) {
      // Extract network from UmiAgentKit instance
      network = networkOrKit.config.network;
    } else {
      throw new Error('Invalid constructor parameter. Expected network string or UmiAgentKit instance.');
    }
    
    this.network = network;
    this.config = DEFAULT_CONFIG[network];
    
    if (!this.config) {
      throw new Error(`Unsupported network: ${network}. Supported: ${Object.keys(DEFAULT_CONFIG).join(', ')}`);
    }
    
    this.rpcUrl = this.config.rpcUrl;
    this.chainId = this.config.chainId;
    
    // Initialize BCS serializer for Umi's ScriptOrDeployment enum
    this.UMI_SERIALIZER = bcs.enum("ScriptOrDeployment", {
      Script: bcs.byteVector(),
      Module: bcs.byteVector(), 
      EvmContract: bcs.byteVector(),
    });
    
    console.log(`🚀 EmbeddedDeploymentEngine initialized for ${network}`);
    console.log(`📡 RPC: ${this.rpcUrl}`);
    console.log(`🔗 Chain ID: ${this.chainId}`);
  }

  /**
   * Deploy Solidity contract using working manual method
   */
  async deploySolidityContract(contract, deployerWallet, constructorArgs = {}) {
    try {
      console.log(`🚀 Deploying Solidity contract: ${contract.name}`);
      
      // Step 1: Compile with solc directly
      const compiled = this.compileSolidityContract(contract);
      
      // Step 2: Wrap bytecode for Umi
      const wrappedBytecode = this.wrapBytecodeForUmi(compiled.bytecode);
      
      // Step 3: Get wallet details
      const wallet = this.extractWalletDetails(deployerWallet);
      
      // Step 4: Get nonce
      const nonce = await this.getNonce(wallet.address);
      
      // Step 5: Build and sign transaction
      const tx = {
        to: null, // Contract deployment
        data: wrappedBytecode,
        gasLimit: 3_000_000,
        gasPrice: ethers.parseUnits("1", "gwei"),
        nonce: nonce,
        chainId: this.getChainId()
      };
      
      const signedTx = await wallet.signer.signTransaction(tx);
      
      // Step 6: Broadcast using raw JSON-RPC
      const txHash = await this.broadcastTransaction(signedTx);
      
      // Step 7: Wait for confirmation and get contract address
      const receipt = await this.waitForTransaction(txHash);
      
      console.log(`✅ Solidity contract deployed successfully!`);
      console.log(`📍 Address: ${receipt.contractAddress}`);
      console.log(`🔗 Transaction: ${txHash}`);
      
      return {
        address: receipt.contractAddress,
        hash: txHash,
        name: contract.name,
        type: 'solidity',
        initialized: true,
        timestamp: new Date().toISOString(),
        abi: compiled.abi
      };
      
    } catch (error) {
      console.error('❌ Solidity deployment failed:', error.message);
      throw new Error(`Solidity contract deployment failed: ${error.message}`);
    }
  }

  /**
   * Compile Solidity contract using solc directly
   */
  compileSolidityContract(contract) {
    console.log('🔨 Compiling Solidity contract...');
    
    const input = {
      language: 'Solidity',
      sources: {
        [contract.name + '.sol']: {
          content: contract.content
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode']
          }
        }
      }
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    
    if (output.errors) {
      const hasErrors = output.errors.some(error => error.severity === 'error');
      if (hasErrors) {
        throw new Error(`Compilation failed: ${output.errors.map(e => e.message).join(', ')}`);
      }
    }

    const contractOutput = output.contracts[contract.name + '.sol'][contract.name];
    
    return {
      abi: contractOutput.abi,
      bytecode: contractOutput.evm.bytecode.object
    };
  }

  /**
   * Wrap bytecode for Umi Network using BCS serialization
   */
  wrapBytecodeForUmi(bytecode) {
    console.log('📦 Wrapping bytecode for Umi Network...');
    
    const cleanBytecode = bytecode.startsWith('0x') ? bytecode.slice(2) : bytecode;
    const code = Uint8Array.from(Buffer.from(cleanBytecode, 'hex'));
    
    const wrappedBytecode = this.UMI_SERIALIZER
      .serialize({ EvmContract: code })
      .toBytes();

    const finalBytecode = "0x" + Buffer.from(wrappedBytecode).toString("hex");
    
    console.log(`✅ Bytecode wrapped: ${finalBytecode.slice(0, 50)}...`);
    return finalBytecode;
  }

  /**
   * Extract wallet details for transaction signing
   */
  extractWalletDetails(deployerWallet) {
    let privateKey, address;
    
    if (typeof deployerWallet.exportPrivateKey === 'function') {
      privateKey = deployerWallet.exportPrivateKey();
      address = deployerWallet.getAddress();
    } else if (deployerWallet.privateKey) {
      privateKey = deployerWallet.privateKey;
      address = deployerWallet.address;
    } else {
      throw new Error('Invalid wallet format - cannot extract private key');
    }

    // Ensure private key has 0x prefix
    if (!privateKey.startsWith('0x')) {
      privateKey = '0x' + privateKey;
    }

    const signer = new ethers.Wallet(privateKey);
    
    return { address, privateKey, signer };
  }

  /**
   * Get current nonce for address
   */
  async getNonce(address) {
    try {
      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_getTransactionCount',
          params: [address, 'pending'],
          id: 1
        })
      });

      const result = await response.json();
      return parseInt(result.result, 16);
    } catch (error) {
      console.warn('⚠️ Failed to get nonce, using 0:', error.message);
      return 0;
    }
  }

  /**
   * Get chain ID from config
   */
  getChainId() {
    return this.chainId;
  }

  /**
   * Broadcast transaction using raw JSON-RPC
   */
  async broadcastTransaction(signedTx) {
    console.log('📡 Broadcasting transaction to Umi Network...');
    
    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [signedTx],
        id: 1
      })
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(`Transaction broadcast failed: ${result.error.message}`);
    }

    console.log(`✅ Transaction broadcasted: ${result.result}`);
    return result.result;
  }

  /**
   * Wait for transaction confirmation
   */
  async waitForTransaction(txHash, timeout = 60000) {
    console.log(`⏳ Waiting for transaction confirmation: ${txHash}`);
    
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      try {
        const response = await fetch(this.rpcUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getTransactionReceipt',
            params: [txHash],
            id: 1
          })
        });

        const result = await response.json();
        
        if (result.result && result.result.status) {
          console.log(`✅ Transaction confirmed!`);
          return result.result;
        }
        
        // Wait 2 seconds before next check
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.warn('⚠️ Error checking transaction status:', error.message);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    throw new Error(`Transaction confirmation timeout after ${timeout}ms`);
  }

  /**
   * Deploy Move contract (placeholder - focus on Solidity for now)
   */
  async deployMoveContract(contract, deployerWallet, constructorArgs = {}) {
    console.log(`⚠️ Move contract deployment not yet implemented with manual method`);
    console.log(`📋 Contract: ${contract.name}`);
    
    // For now, return a placeholder that indicates Move deployment needs implementation
    throw new Error('Move contract deployment not yet implemented in manual engine. Use Solidity contracts for now.');
  }

  /**
   * Deploy multiple contracts in sequence
   */
  async deployMultipleContracts(contracts, deployerWallet) {
    const results = {};
    
    for (const contract of contracts) {
      try {
        if (contract.content.includes('module ')) {
          console.log(`⚠️ Skipping Move contract ${contract.name} - not yet supported`);
          results[contract.name] = { error: 'Move contracts not yet supported' };
        } else {
          results[contract.name] = await this.deploySolidityContract(contract, deployerWallet);
        }
      } catch (error) {
        console.error(`❌ Failed to deploy ${contract.name}:`, error.message);
        results[contract.name] = { error: error.message };
      }
    }
    
    return results;
  }

  /**
   * Cleanup method (no workspace needed for manual deployment)
   */
  async cleanup() {
    console.log('✅ No cleanup needed for manual deployment engine');
  }
}