/**
 * Test the new fixed EmbeddedDeploymentEngine
 * Uses the working manual deployment method
 */

import { UmiAgentKit } from './src/UmiAgentKit.js';
import fs from 'fs/promises';
import path from 'path';

async function testNewDeploymentEngine() {
  try {
    console.log('🚀 Testing New EmbeddedDeploymentEngine...');
    
    // Initialize kit
    const kit = new UmiAgentKit({ network: 'devnet' });
    
    // Create wallet
    const wallet = kit.importWallet('2e5c1ccfd2c7a648804481eda9644df36a72db1baa4e333e403f20b617b586bd');
    console.log(`👛 Wallet created: ${wallet.getAddress()}`);
    
    // Create test contracts directory if it doesn't exist
    const contractsDir = './test-contracts';
    await fs.mkdir(contractsDir, { recursive: true });
    
    // Create a simple test token contract file
    const tokenContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestToken {
    string public name = "Test Token";
    string public symbol = "TEST";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * 10**18;
    
    mapping(address => uint256) public balanceOf;
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}`;
    
    // Write contract to file
    const contractPath = path.join(contractsDir, 'TestToken.sol');
    await fs.writeFile(contractPath, tokenContract);
    console.log(`📝 Contract written to: ${contractPath}`);
    
    console.log('🔨 Starting deployment using contract file...');
    
    // Deploy using the proper method with contract location
    const result = await kit.deploySingleContract(contractPath, wallet);
    
    console.log('✅ DEPLOYMENT SUCCESSFUL!');
    console.log(`📍 Contract Address: ${result.address}`);
    console.log(`🔗 Transaction Hash: ${result.hash}`);
    console.log(`⏰ Deployed at: ${result.timestamp}`);
    
    // Clean up test files
    await fs.rm(contractsDir, { recursive: true, force: true });
    console.log('🧹 Test files cleaned up');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testNewDeploymentEngine();