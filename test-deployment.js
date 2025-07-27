/**
 * FILE: test-clean-deployment.js (CREATE NEW FILE)
 * ACTION: CREATE this new test file in root directory
 * LOCATION: Root directory of your project
 */

import { UmiAgentKit } from './src/UmiAgentKit.js';
import fs from 'fs/promises';
import path from 'path';

async function testCleanDeploymentInterface() {
  try {
    console.log('🚀 Testing Clean Deployment Interface...');
    
    // Initialize kit
    const kit = new UmiAgentKit({ network: 'devnet' });
    
    // Create wallet
    const wallet = kit.importWallet('2e5c1ccfd2c7a648804481eda9644df36a72db1baa4e333e403f20b617b586bd');
    console.log(`👛 Wallet created: ${wallet.getAddress()}`);
    
    // Create test contracts directory
    const contractsDir = './test-contracts';
    await fs.mkdir(contractsDir, { recursive: true });
    
    // Create test contract
    const tokenContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    string public name = "Simple Token";
    string public symbol = "SIMPLE";
    uint256 public totalSupply = 1000000;
    
    mapping(address => uint256) public balanceOf;
    
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }
}`;
    
    const contractPath = path.join(contractsDir, 'SimpleToken.sol');
    await fs.writeFile(contractPath, tokenContract);
    console.log(`📝 Test contract created: ${contractPath}`);
    
    // Test 1: Deploy single contract using deployContract()
    console.log('\n=== TEST 1: deployContract() ===');
    const result = await kit.deployContract(contractPath, wallet);
    console.log(`✅ Single deployment successful!`);
    console.log(`📍 Address: ${result.address}`);
    console.log(`🔗 Hash: ${result.hash}`);
    
    // Test 2: Deploy multiple contracts using deployContracts()
    console.log('\n=== TEST 2: deployContracts() ===');
    const multipleResults = await kit.deployContracts(contractsDir, wallet);
    console.log(`✅ Multiple deployment completed!`);
    console.log(`📊 Results:`, Object.keys(multipleResults));
    
    // Test 3: Deploy with config using deployWithConfig()
    console.log('\n=== TEST 3: deployWithConfig() ===');
    const config = {
      SimpleToken: {
        // No constructor args for this simple contract
      }
    };
    const configResults = await kit.deployWithConfig(contractsDir, wallet, config);
    console.log(`✅ Config deployment completed!`);
    console.log(`📊 Results:`, Object.keys(configResults));
    
    // Clean up
    await fs.rm(contractsDir, { recursive: true, force: true });
    console.log('\n🧹 Test files cleaned up');
    
    console.log('\n🎉 ALL TESTS PASSED! Clean deployment interface working!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run the test
testCleanDeploymentInterface();