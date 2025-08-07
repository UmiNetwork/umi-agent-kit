# 🏗️ Contract Deployment - AI-Powered Move Contract System

**Deploy complex Move contract ecosystems with natural language or advanced APIs**

---

## 🚀 **Quick Start: AI Deployment**

The easiest way to deploy contracts is through natural language:

```javascript
import { UmiAgentKit } from 'umi-agent-kit';

const kit = new UmiAgentKit({ network: 'devnet' });
kit.enableAI({ groqApiKey: 'your-groq-api-key' });
const wallet = kit.importWallet('your-private-key');

// Deploy with simple chat
await kit.chat("the default one");
await kit.chat("deploy my contracts");
await kit.chat("deploy from ./my-contracts folder");
```

---

## 📁 **Folder Structure**

UmiAgentKit automatically scans your contracts folder:

```
your-project/
├── contracts/
│   ├── GameToken.move
│   ├── HeroNFT.move
│   ├── Tournament.move
│   └── deployment.json      // Optional configuration
└── index.js
```

---

## 🤖 **AI-Powered Deployment**

### **Natural Language Commands**
```javascript
// Deploy everything in contracts folder
await kit.chat("deploy my contracts");
await kit.chat("the default one");

// Deploy from specific folder
await kit.chat("deploy from ./game-contracts folder");
await kit.chat("use contracts in ./src/move-contracts/");

// Create and deploy specific contracts
await kit.chat("create a gaming token");
await kit.chat("make an NFT collection");
await kit.chat("deploy tournament system");
```

### **Real AI Deployment Example**

Based on actual UmiAgentKit deployment:

```
👤 User: "the default one"

🧠 AI: Analyzing your request...
🔍 AI: Found contracts folder: test-contracts
📁 AI: Scanning contracts: counter, GameToken, HeroNFT
🔄 AI: Resolving dependencies: counter → GameToken → HeroNFT

🚀 AI: Deploying counter contract...
📦 AI: Creating Move contract at address 0xeD328deA266f29ddC604679072Ee4f4F23C165f9
✅ AI: counter deployed! Hash: 0xcf28b0c0c158e24541b6d649c784073c196dbf6a0fa2f977f874788c30df2d07

🪙 AI: Deploying GameToken contract...
📦 AI: Creating gaming token with symbol GAME and 8 decimals
✅ AI: GameToken deployed! Hash: 0x1097eff6d4f472de7a4ea09b58adb9c288b4db066b119d11c1646cdc7e044973

🎨 AI: Deploying HeroNFT contract...
📦 AI: Creating NFT collection with symbol HERO
✅ AI: HeroNFT deployed! Hash: 0x6e7a465c1916b1318b2c814b4bd26e243546d663b22f995c69ee66d47ec92139

🎉 AI: All contracts deployed successfully!
📊 AI: Summary: 3 Move contracts deployed to Umi Network
💡 AI: Next step: Use setConstructorValues() to initialize your contracts
✅ AI: Your gaming ecosystem is ready to use!
```

---

## 🛠️ **Advanced Deployment Functions**

### **1. deployContracts(contractsPath, deployerWallet)**

Deploy multiple Move contracts without constructor values.

```javascript
const contracts = await kit.deployContracts('./contracts/', wallet);
// Returns: { GameToken: {...}, HeroNFT: {...}, Tournament: {...} }

console.log('Deployed contracts:', contracts);
// {
//   GameToken: {
//     address: "0x123::gametoken",
//     txHash: "0xabc...",
//     initialized: false
//   },
//   HeroNFT: { ... },
//   Tournament: { ... }
// }
```

### **2. setConstructorValues(contractAddress, constructorArgs, callerWallet)**

Initialize contracts after deployment with constructor values.

```javascript
await kit.setConstructorValues(contracts.GameToken.address, {
  name: 'GameCoin',
  symbol: 'GAME',
  decimals: 8,
  initial_supply: 1000000
}, wallet);
```

### **3. deployWithJson(contractsPath, deployerWallet, configFile)**

Deploy contracts using JSON configuration file.

```javascript
// Uses ./contracts/deployment.json
const ecosystem = await kit.deployWithJson('./contracts/', wallet);

// Uses custom config file
const ecosystem = await kit.deployWithJson('./contracts/', wallet, './my-config.json');
```

**Example deployment.json:**
```json
{
  "contracts": {
    "GameToken": {
      "file": "GameToken.move",
      "dependencies": [],
      "initArgs": {
        "name": "GameCoin",
        "symbol": "GAME",
        "decimals": 8,
        "initial_supply": 1000000
      }
    },
    "HeroNFT": {
      "file": "HeroNFT.move",
      "dependencies": ["GameToken"],
      "initArgs": {
        "name": "Epic Heroes",
        "game_token": "@GameToken"
      }
    },
    "Tournament": {
      "file": "Tournament.move",
      "dependencies": ["GameToken", "HeroNFT"],
      "initArgs": {
        "name": "Epic Tournament",
        "entry_fee": 10,
        "game_token": "@GameToken",
        "hero_nft": "@HeroNFT"
      }
    }
  }
}
```

### **4. deployWithConfig(contractsPath, deployerWallet, configObject)**

Deploy contracts using JavaScript configuration object.

```javascript
const ecosystem = await kit.deployWithConfig('./contracts/', wallet, {
  GameToken: {
    name: 'GameCoin',
    symbol: 'GAME',
    decimals: 8,
    initial_supply: 1000000
  },
  HeroNFT: {
    name: 'Epic Heroes',
    symbol: 'HERO',
    game_token: '@GameToken'  // Reference to GameToken
  },
  Tournament: {
    name: 'Epic Tournament',
    entry_fee: 10,
    game_token: '@GameToken',
    hero_nft: '@HeroNFT'
  }
});
```

---

## 🔧 **Utility Functions**

### **deploySingleContract(contractPath, deployerWallet, constructorArgs)**

Deploy a single Move contract file.

```javascript
const gameToken = await kit.deploySingleContract(
  './contracts/GameToken.move',
  wallet,
  {
    name: 'GameCoin',
    symbol: 'GAME',
    decimals: 8,
    initial_supply: 1000000
  }
);
```

### **getContractFunctions(deployedContract)**

Get list of available functions from a deployed contract.

```javascript
const functions = kit.getContractFunctions(deployedContract);
console.log(functions);
// [
//   { name: 'initialize', type: 'entry', visibility: 'public' },
//   { name: 'mint', type: 'entry', visibility: 'public' },
//   { name: 'get_balance', type: 'view', visibility: 'public' }
// ]
```

### **callContractFunction(contractAddress, functionName, args, callerWallet)**

Call any function on a deployed Move contract.

```javascript
// Call a minting function
const mintResult = await kit.callContractFunction(
  '0x123::gametoken',
  'mint',
  {
    to: wallet.getAddress(),
    amount: 1000
  },
  wallet
);

// Call a view function
const balanceResult = await kit.callContractFunction(
  '0x123::gametoken',
  'get_balance',
  {
    account: wallet.getAddress()
  },
  wallet
);
```

---

## 📊 **Deployment Analytics**

### **getDeploymentSummary(deployedContracts)**

Get summary statistics of deployment results.

```javascript
const summary = kit.getDeploymentSummary(deployedContracts);
console.log(summary);
// {
//   totalContracts: 3,
//   contracts: {
//     GameToken: {
//       address: "0x123::gametoken",
//       type: "move",
//       initialized: true,
//       txHash: "0xabc..."
//     },
//     HeroNFT: { ... },
//     Tournament: { ... }
//   },
//   totalGasUsed: 0
// }
```

### **exportDeploymentResults(deployedContracts, outputPath)**

Export deployment results to JSON file for later reference.

```javascript
await kit.exportDeploymentResults(
  deployedContracts,
  './deployment-results.json'
);
```

**Generated file structure:**
```json
{
  "timestamp": "2025-01-07T10:30:00.000Z",
  "network": "devnet",
  "summary": {
    "totalContracts": 3,
    "contracts": { ... }
  },
  "contracts": {
    "GameToken": {
      "address": "0x123::gametoken",
      "txHash": "0xabc...",
      "type": "move",
      "initialized": true
    }
  }
}
```

---

## ✅ **Contract Validation**

### **validateContracts(contractsPath)**

Validate Move contracts before deployment to catch syntax errors.

```javascript
try {
  await kit.validateContracts('./contracts/');
  console.log('✅ All contracts are valid!');
} catch (error) {
  console.error('❌ Validation failed:', error.message);
}
```

**Validation checks:**
- Move syntax validation
- Module declaration presence
- Function structure verification
- Dependency resolution

---

## 🔗 **Dependency Management**

### **Automatic Dependency Resolution**

UmiAgentKit automatically resolves contract dependencies:

```javascript
// contracts/GameToken.move
module GameToken {
    // Token implementation
}

// contracts/HeroNFT.move  
module HeroNFT {
    use GameToken;  // Dependency detected
    // NFT implementation
}

// contracts/Tournament.move
module Tournament {
    use GameToken;  // Dependency detected
    use HeroNFT;    // Dependency detected
    // Tournament implementation
}

// Deployment order: GameToken → HeroNFT → Tournament
```

### **Manual Dependency Configuration**

```json
{
  "contracts": {
    "GameToken": {
      "file": "GameToken.move",
      "dependencies": []
    },
    "HeroNFT": {
      "file": "HeroNFT.move", 
      "dependencies": ["GameToken"]
    },
    "Tournament": {
      "file": "Tournament.move",
      "dependencies": ["GameToken", "HeroNFT"]
    }
  }
}
```

---

## 🎯 **Complete Deployment Workflow**

```javascript
import { UmiAgentKit } from 'umi-agent-kit';

async function deployGameEcosystem() {
  // Initialize
  const kit = new UmiAgentKit({ network: 'devnet' });
  kit.enableAI({ groqApiKey: 'your-groq-api-key' });
  const wallet = kit.importWallet('your-private-key');

  try {
    // 1. Validate contracts before deployment
    console.log('🔍 Validating contracts...');
    await kit.validateContracts('./contracts/');

    // 2. Deploy with AI (easiest method)
    console.log('🚀 Deploying with AI...');
    await kit.chat("deploy my gaming contracts");

    // OR deploy with advanced API
    const contracts = await kit.deployWithConfig('./contracts/', wallet, {
      GameToken: {
        name: 'GameCoin',
        symbol: 'GAME',
        decimals: 8,
        initial_supply: 1000000
      },
      HeroNFT: {
        name: 'Epic Heroes',
        symbol: 'HERO',
        max_supply: 10000,
        game_token: '@GameToken'
      },
      Tournament: {
        name: 'Epic Tournament',
        entry_fee: 10,
        prize_pool: 1000,
        game_token: '@GameToken',
        hero_nft: '@HeroNFT'
      }
    });

    // 3. Initialize contracts
    console.log('⚙️ Initializing contracts...');
    for (const [name, contract] of Object.entries(contracts)) {
      if (!contract.initialized) {
        await kit.setConstructorValues(contract.address, {
          name: `${name} Contract`,
          symbol: name.toUpperCase()
        }, wallet);
      }
    }

    // 4. Test contract functions
    console.log('🧪 Testing contract functions...');
    const mintResult = await kit.callContractFunction(
      contracts.GameToken.address,
      'mint',
      { to: wallet.getAddress(), amount: 1000 },
      wallet
    );

    // 5. Export deployment results
    console.log('📊 Exporting results...');
    await kit.exportDeploymentResults(contracts, './deployment-results.json');

    console.log('🎉 Game ecosystem deployed successfully!');

  } catch (error) {
    console.error('💥 Deployment failed:', error.message);

    // Error handling
    if (error.message.includes('gas')) {
      console.log('💡 Try increasing gas limit or check wallet balance');
    }
    if (error.message.includes('compilation')) {
      console.log('💡 Check Move contract syntax');
    }
  }
}

deployGameEcosystem();
```

---

## 🛡️ **Error Handling & Best Practices**

### **Common Deployment Issues**

1. **Gas Estimation Errors**
   ```javascript
   // Solution: Increase gas limit or check wallet balance
   const wallet = kit.importWallet('private-key');
   const balance = await kit.getBalance(wallet.getAddress());
   console.log(`Wallet balance: ${balance} ETH`);
   ```

2. **Contract Compilation Errors**
   ```javascript
   // Solution: Validate contracts before deployment
   await kit.validateContracts('./contracts/');
   ```

3. **Dependency Resolution Issues**
   ```javascript
   // Solution: Use explicit dependency configuration
   const config = {
     GameToken: { dependencies: [] },
     HeroNFT: { dependencies: ['GameToken'] }
   };
   ```

### **Best Practices**

- **Validate First** - Always validate contracts before deployment
- **Test Network** - Deploy to devnet before mainnet
- **Backup Keys** - Secure your private keys
- **Documentation** - Document your deployment configuration
- **Monitoring** - Monitor deployment transactions
- **Version Control** - Track deployment configurations

---

## 🔮 **Future Deployment Features**

### **Coming Soon**
- **Cross-Chain Deployment** - Deploy to multiple blockchains
- **Deployment Templates** - Pre-built contract templates
- **Advanced Testing** - Automated contract testing
- **Deployment Analytics** - Advanced deployment metrics
- **CI/CD Integration** - GitHub Actions deployment

---

*Ready to deploy your Move contracts? [Return to Main Documentation](../README.md)*