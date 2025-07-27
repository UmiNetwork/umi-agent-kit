#!/usr/bin/env node

/**
 * Umi Agent Kit Environment Diagnostic Script
 * Run this to identify specific issues in your setup
 */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const execAsync = promisify(exec);

class UmiDiagnostic {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passed = [];
  }

  async run() {
    console.log('🔍 Umi Agent Kit Environment Diagnostic');
    console.log('=====================================\n');

    await this.checkNodeVersion();
    await this.checkNpmVersion();
    await this.checkDependencies();
    await this.checkAptosCLI();
    await this.checkHardhatPlugin();
    await this.checkNetworkConnectivity();
    await this.checkFilePermissions();
    
    this.generateReport();
  }

  async checkNodeVersion() {
    try {
      const nodeVersion = process.version;
      const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
      
      if (majorVersion >= 18) {
        this.passed.push(`✅ Node.js version: ${nodeVersion}`);
      } else {
        this.issues.push(`❌ Node.js version too old: ${nodeVersion} (requires 18+)`);
      }
    } catch (error) {
      this.issues.push(`❌ Node.js check failed: ${error.message}`);
    }
  }

  async checkNpmVersion() {
    try {
      const { stdout } = await execAsync('npm --version');
      const npmVersion = stdout.trim();
      this.passed.push(`✅ npm version: ${npmVersion}`);
    } catch (error) {
      this.issues.push(`❌ npm check failed: ${error.message}`);
    }
  }

  async checkDependencies() {
    const requiredDeps = [
      'hardhat',
      '@moved/hardhat-plugin',
      '@aptos-labs/ts-sdk',
      'ethers'
    ];

    for (const dep of requiredDeps) {
      try {
        const { stdout } = await execAsync(`npm list ${dep}`);
        if (stdout.includes(dep)) {
          this.passed.push(`✅ ${dep} installed`);
        } else {
          this.warnings.push(`⚠️ ${dep} not found in npm list`);
        }
      } catch (error) {
        this.issues.push(`❌ ${dep} missing or broken`);
      }
    }
  }

  async checkAptosCLI() {
    try {
      const { stdout } = await execAsync('aptos --version');
      this.passed.push(`✅ Aptos CLI installed: ${stdout.trim()}`);
      
      // Check if aptos move compile works
      try {
        await execAsync('aptos move --help');
        this.passed.push(`✅ Aptos Move compiler available`);
      } catch (error) {
        this.warnings.push(`⚠️ Aptos Move compiler may not be working properly`);
      }
      
    } catch (error) {
      this.issues.push(`❌ Aptos CLI not found - this is required for Move compilation`);
      this.issues.push(`   Install from: https://aptos.dev/tools/install-cli/`);
    }
  }

  async checkHardhatPlugin() {
    try {
      // Create a temporary test workspace
      const testDir = path.join(os.tmpdir(), 'umi-diagnostic-test');
      await fs.mkdir(testDir, { recursive: true });
      
      // Create a minimal package.json
      const packageJson = {
        name: "diagnostic-test",
        version: "1.0.0",
        type: "commonjs"
      };
      await fs.writeFile(
        path.join(testDir, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );
      
      // Install only the plugin
      try {
        await execAsync('npm install hardhat @moved/hardhat-plugin --legacy-peer-deps', {
          cwd: testDir,
          timeout: 60000
        });
        
        // Create test hardhat config
        const hardhatConfig = `
require("@moved/hardhat-plugin");
module.exports = {
  defaultNetwork: "devnet",
  networks: {
    devnet: {
      url: "https://devnet.moved.network",
      accounts: ["0x1111111111111111111111111111111111111111111111111111111111111111"]
    }
  }
};`;
        
        await fs.writeFile(path.join(testDir, 'hardhat.config.js'), hardhatConfig);
        
        // Test if hardhat can load the plugin
        const { stdout, stderr } = await execAsync('npx hardhat --version', {
          cwd: testDir,
          timeout: 30000
        });
        
        if (stdout.includes('2.')) {
          this.passed.push(`✅ @moved/hardhat-plugin loads correctly`);
        } else {
          this.warnings.push(`⚠️ Hardhat plugin may have issues`);
        }
        
      } catch (error) {
        this.issues.push(`❌ @moved/hardhat-plugin installation/loading failed`);
        this.issues.push(`   Error: ${error.message}`);
      }
      
      // Cleanup
      await fs.rm(testDir, { recursive: true, force: true }).catch(() => {});
      
    } catch (error) {
      this.issues.push(`❌ Hardhat plugin test failed: ${error.message}`);
    }
  }

  async checkNetworkConnectivity() {
    try {
      const response = await fetch('https://devnet.moved.network', {
        method: 'HEAD',
        timeout: 10000
      });
      
      if (response.ok) {
        this.passed.push(`✅ Umi devnet connectivity`);
      } else {
        this.warnings.push(`⚠️ Umi devnet returned status: ${response.status}`);
      }
    } catch (error) {
      this.issues.push(`❌ Cannot connect to Umi devnet: ${error.message}`);
    }
  }

  async checkFilePermissions() {
    try {
      const testDir = path.join(os.tmpdir(), 'umi-permission-test');
      await fs.mkdir(testDir, { recursive: true });
      await fs.writeFile(path.join(testDir, 'test.txt'), 'test');
      await fs.unlink(path.join(testDir, 'test.txt'));
      await fs.rmdir(testDir);
      
      this.passed.push(`✅ File system permissions OK`);
    } catch (error) {
      this.issues.push(`❌ File system permission issues: ${error.message}`);
    }
  }

  generateReport() {
    console.log('\n📊 DIAGNOSTIC REPORT');
    console.log('==================\n');
    
    if (this.passed.length > 0) {
      console.log('✅ PASSED CHECKS:');
      this.passed.forEach(item => console.log(`   ${item}`));
      console.log('');
    }
    
    if (this.warnings.length > 0) {
      console.log('⚠️ WARNINGS:');
      this.warnings.forEach(item => console.log(`   ${item}`));
      console.log('');
    }
    
    if (this.issues.length > 0) {
      console.log('❌ CRITICAL ISSUES:');
      this.issues.forEach(item => console.log(`   ${item}`));
      console.log('');
    }
    
    console.log('🎯 RECOMMENDATIONS:');
    
    if (this.issues.length === 0) {
      console.log('   ✅ Your environment looks good!');
      console.log('   📝 Try running the fixed deployment test.');
    } else {
      console.log('   🔧 Fix the critical issues above first.');
      
      if (this.issues.some(i => i.includes('Aptos CLI'))) {
        console.log('   📥 Install Aptos CLI: https://aptos.dev/tools/install-cli/');
      }
      
      if (this.issues.some(i => i.includes('Node.js'))) {
        console.log('   📥 Update Node.js: https://nodejs.org/');
      }
      
      if (this.issues.some(i => i.includes('dependencies'))) {
        console.log('   📦 Run: npm install --legacy-peer-deps');
      }
      
      if (this.issues.some(i => i.includes('hardhat-plugin'))) {
        console.log('   🔧 Replace EmbeddedDeploymentEngine.js with the fixed version');
      }
    }
    
    console.log('\n💡 NEXT STEPS:');
    console.log('   1. Fix any critical issues shown above');
    console.log('   2. Update to the fixed EmbeddedDeploymentEngine.js');
    console.log('   3. Update package.json with correct dependencies');
    console.log('   4. Run: npm install --legacy-peer-deps');
    console.log('   5. Test with: node test-fixed-deployment.js');
    
    console.log(`\n📈 SUMMARY: ${this.passed.length} passed, ${this.warnings.length} warnings, ${this.issues.length} critical issues`);
  }
}

// Run diagnostic
const diagnostic = new UmiDiagnostic();
diagnostic.run().catch(console.error);