# 🚀 Examples & Use Cases

**Real-world examples and tutorials for UmiAgentKit**

---

## 🎮 **Complete Game Economy Example**

Build a full blockchain game economy in minutes:

```javascript
import { UmiAgentKit } from 'umi-agent-kit';

async function buildGameEconomy() {
  // 1. Initialize UmiAgentKit
  const kit = new UmiAgentKit({
    network: 'devnet',
    multisigEnabled: true
  });

  // 2. Enable AI
  kit.enableAI({
    groqApiKey: 'your-groq-api-key'
  });

  // 3. Import your main wallet
  const mainWallet = kit.importWallet('your-private-key');
  kit.setAIContext('defaultWallet', mainWallet.getAddress());
  kit.setAIContext('projectName', 'Epic RPG Game');

  // 4. Create gaming studio with AI
  console.log('🎮 Creating gaming studio...');
  const studioResponse = await kit.chat(
    "Create a gaming studio called 'Epic RPG Studio' with 6 team members"
  );
  console.log(studioResponse.message);

  // 5. Create game tokens with AI
  console.log('🪙 Creating game tokens...');
  const tokenResponse = await kit.chat(
    "Create a game token called 'Gold' with symbol 'GOLD' and 10 million supply"
  );
  console.log(tokenResponse.message);

  // 6. Create hero NFT collection with AI
  console.log('🎨 Creating hero NFTs...');
  const heroResponse = await kit.chat(
    "Create an NFT collection called 'Epic Heroes' with 10000 max supply and 0.01 ETH mint price"
  );
  console.log(heroResponse.message);

  // 7. Create weapon NFT collection
  console.log('⚔️ Creating weapon NFTs...');
  const weaponResponse = await kit.chat(
    "Create a weapon NFT collection called 'Legendary Weapons' with 5000 max supply"
  );
  console.log(weaponResponse.message);

  // 8. Check our progress
  console.log('📊 Checking progress...');
  const summaryResponse = await kit.chat(
    "Show me a summary of everything we've created"
  );
  console.log(summaryResponse.message);

  console.log('🎉 Game economy created successfully!');
}

buildGameEconomy();
```

---

## 🏰 **Guild Management System**

```javascript
async function createGuildSystem() {
  const kit = new UmiAgentKit({ 
    network: 'devnet', 
    multisigEnabled: true 
  });
  
  kit.enableAI({ groqApiKey: 'your-groq-api-key' });

  // Create guild treasury
  const guild = await kit.chat(
    "Create a guild called 'DragonSlayers' with 3 officers and 10 members"
  );

  // Propose reward distribution
  await kit.chat(
    "Propose distributing 1000 GOLD tokens to top 5 guild members"
  );

  // Officers approve the proposal
  await kit.chat(
    "Approve the reward proposal as guild officer"
  );

  console.log('🏰 Guild management system created!');
}
```

---

## 🎯 **Tournament Prize Pool**

```javascript
async function createTournament() {
  const kit = new UmiAgentKit({ network: 'devnet' });
  const wallet = kit.importWallet('your-private-key');

  // Create tournament multisig
  await kit.chat(
    "Create a tournament multisig for 'Epic Battle Tournament' with 5 organizers"
  );

  // Setup prize tokens
  await kit.chat(
    "Create prize tokens for the tournament with 100,000 total supply"
  );

  // Distribute prizes automatically
  await kit.chat(
    "Distribute tournament prizes: 1st place 10,000 tokens, 2nd place 5,000 tokens"
  );

  console.log('🎯 Tournament system ready!');
}
```

---

## 🏭 **Multi-Game Studio**

```javascript
async function createMultiGameStudio() {
  const kit = new UmiAgentKit({ 
    network: 'devnet', 
    multisigEnabled: true 
  });
  
  kit.enableAI({ groqApiKey: 'your-groq-api-key' });

  // Create parent studio
  await kit.chat(
    "Create a parent gaming studio called 'Epic Games Group' with 10 executives"
  );

  // Create game-specific teams
  await kit.chat(
    "Create a sub-team for 'RPG Project' with 6 developers"
  );

  await kit.chat(
    "Create a sub-team for 'Racing Game' with 5 developers"
  );

  // Cross-team token sharing
  await kit.chat(
    "Create a shared utility token for all Epic Games Group projects"
  );

  console.log('🏭 Multi-game studio ecosystem created!');
}
```

---

## 💰 **DeFi Gaming Integration**

```javascript
async function createDeFiGaming() {
  const kit = new UmiAgentKit({ network: 'devnet' });
  const wallet = kit.importWallet('your-private-key');

  // Create game token
  const gameToken = await kit.createERC20Token({
    deployerWallet: wallet,
    name: 'GameCoin',
    symbol: 'GAME',
    decimals: 18,
    initialSupply: 10000000
  });

  // Create staking system
  const stakingContract = await kit.deployStaking({
    stakingToken: gameToken.contractAddress,
    rewardRate: "12", // 12% APY
    lockPeriod: 30 * 24 * 60 * 60 // 30 days
  });

  // Create liquidity pool
  const liquidityPool = await kit.createLiquidityPool({
    tokenA: gameToken.contractAddress,
    tokenB: kit.config.wethAddress,
    feeRate: 0.3
  });

  // Create yield farming
  const yieldFarm = await kit.createYieldFarm({
    lpToken: liquidityPool.lpToken,
    rewardToken: gameToken.contractAddress,
    rewardRate: "8" // 8% APY
  });

  console.log('💰 DeFi gaming ecosystem created!');
  console.log(`Game Token: ${gameToken.contractAddress}`);
  console.log(`Staking: ${stakingContract.contractAddress}`);
  console.log(`LP Pool: ${liquidityPool.contractAddress}`);
  console.log(`Yield Farm: ${yieldFarm.contractAddress}`);
}
```

---

## 🎨 **NFT Marketplace Integration**

```javascript
async function createNFTMarketplace() {
  const kit = new UmiAgentKit({ network: 'devnet' });
  const wallet = kit.importWallet('your-private-key');

  // Create ERC-1155 multi-token collection
  const gameItems = await kit.createERC1155Collection({
    deployerWallet: wallet,
    name: "Epic Game Items",
    symbol: "EGI",
    baseURI: "https://api.epicgame.com/items/"
  });

  // Create different item types
  const swordToken = await kit.createERC1155Token({
    ownerWallet: wallet,
    contractAddress: gameItems.contractAddress,
    metadataURI: "https://api.epicgame.com/items/sword.json",
    maxSupply: 1000,
    mintPrice: "0.01"
  });

  const shieldToken = await kit.createERC1155Token({
    ownerWallet: wallet,
    contractAddress: gameItems.contractAddress,
    metadataURI: "https://api.epicgame.com/items/shield.json",
    maxSupply: 500,
    mintPrice: "0.02"
  });

  const goldToken = await kit.createERC1155Token({
    ownerWallet: wallet,
    contractAddress: gameItems.contractAddress,
    metadataURI: "https://api.epicgame.com/items/gold.json",
    maxSupply: 1000000,
    mintPrice: "0.001"
  });

  // Mint starter packs for new players
  await kit.batchMintERC1155({
    ownerWallet: wallet,
    contractAddress: gameItems.contractAddress,
    to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    tokenIds: [swordToken.tokenId, shieldToken.tokenId, goldToken.tokenId],
    amounts: [1, 1, 100],
    paymentRequired: true
  });

  console.log('🎨 NFT marketplace ecosystem created!');
  console.log(`Game Items Collection: ${gameItems.contractAddress}`);
  console.log(`Sword Token ID: ${swordToken.tokenId}`);
  console.log(`Shield Token ID: ${shieldToken.tokenId}`);
  console.log(`Gold Token ID: ${goldToken.tokenId}`);
}
```

---

## 🤖 **AI-Powered Development Workflow**

```javascript
async function aiDevelopmentWorkflow() {
  const kit = new UmiAgentKit({ 
    network: 'devnet', 
    multisigEnabled: true 
  });
  
  // Enable AI with context
  kit.enableAI({ groqApiKey: 'your-groq-api-key' });
  kit.setAIContext('projectName', 'CyberPunk RPG');
  kit.setAIContext('gameType', 'sci-fi RPG');
  kit.setAIContext('targetPlayers', 50000);

  // AI analyzes and suggests complete ecosystem
  console.log('🧠 AI analyzing game requirements...');
  await kit.chat(`
    Analyze our CyberPunk RPG game and create:
    1. Appropriate token economy
    2. Character and item NFT systems
    3. Team coordination structure
    4. Player progression mechanics
  `);

  // AI handles complex multi-step operations
  console.log('🚀 AI building ecosystem...');
  await kit.chat(`
    Create a complete gaming ecosystem with:
    - Main currency (CYBER tokens)
    - Character NFTs with cyberpunk attributes
    - Weapon and gear marketplace
    - Guild system for player coordination
    - Tournament system with prize pools
  `);

  // AI optimizes based on feedback
  console.log('⚡ AI optimizing design...');
  await kit.chat(`
    Optimize the token economics for long-term sustainability:
    - Prevent inflation
    - Encourage player retention
    - Balance free-to-play and pay-to-earn mechanics
  `);

  console.log('🎉 AI-powered game ecosystem completed!');
}
```

---

## 🏢 **Enterprise Integration Example**

```javascript
// Enterprise backend integration
const express = require('express');
const { UmiAgentKit } = require('umi-agent-kit');

const app = express();
const kit = new UmiAgentKit({ 
  network: 'mainnet', 
  multisigEnabled: true 
});

kit.enableAI({ groqApiKey: process.env.GROQ_API_KEY });

// Corporate wallet management endpoint
app.post('/api/corporate/deploy-tokens', async (req, res) => {
  try {
    const { department, tokenName, initialSupply } = req.body;
    
    // AI-powered corporate token deployment
    const result = await kit.chat(`
      Create a corporate token for ${department} department:
      - Name: ${tokenName}
      - Supply: ${initialSupply}
      - Add compliance features
      - Set up department multisig approval
    `);

    res.json({ 
      success: true, 
      message: result.message,
      contractAddress: result.actions[0]?.contractAddress 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Employee reward system
app.post('/api/employees/reward', async (req, res) => {
  try {
    const { employeeAddress, rewardAmount, reason } = req.body;
    
    await kit.chat(`
      Reward employee ${employeeAddress} with ${rewardAmount} tokens
      for: ${reason}
      Requires HR and Manager approval
    `);

    res.json({ success: true, message: 'Reward proposal created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('🏢 Corporate blockchain API ready on port 3000');
});
```

---

## 🎮 **Game Backend Integration**

```javascript
// Gaming server integration with UmiAgentKit
class GameServer {
  constructor() {
    this.kit = new UmiAgentKit({ 
      network: 'devnet', 
      multisigEnabled: true 
    });
    this.kit.enableAI({ groqApiKey: process.env.GROQ_API_KEY });
  }

  async initializeGameEconomy() {
    // Set up complete game economy
    await this.kit.chat(`
      Create epic fantasy game economy:
      - Gold currency for in-game purchases
      - Character NFTs with RPG stats
      - Equipment NFTs (weapons, armor, accessories)
      - Guild treasury system
      - Tournament prize pools
    `);
  }

  async rewardPlayer(playerId, achievement) {
    // AI determines appropriate reward
    await this.kit.chat(`
      Player ${playerId} achieved: ${achievement}
      Give appropriate blockchain rewards:
      - XP tokens based on difficulty
      - Achievement NFT badge
      - Update player stats on-chain
    `);
  }

  async handlePlayerTrade(player1, player2, items) {
    // Secure peer-to-peer trading
    await this.kit.chat(`
      Execute trade between ${player1} and ${player2}:
      - Verify item ownership
      - Handle escrow safely
      - Update inventories on-chain
      - Log trade for dispute resolution
    `);
  }

  async distributeTournamentPrizes(tournamentId, winners) {
    // Automated prize distribution
    await this.kit.chat(`
      Distribute tournament ${tournamentId} prizes:
      - 1st place: ${winners[0]} gets 50% of prize pool
      - 2nd place: ${winners[1]} gets 30% of prize pool
      - 3rd place: ${winners[2]} gets 20% of prize pool
      Require tournament organizer approval
    `);
  }

  async manageGuildTreasury(guildId, operation) {
    // Guild financial operations
    await this.kit.chat(`
      Guild ${guildId} treasury operation: ${operation}
      - Check guild member permissions
      - Require officer approval for large amounts
      - Log all treasury activities
      - Update guild reputation scores
    `);
  }
}

// Start game server
const gameServer = new GameServer();
gameServer.initializeGameEconomy();
```

---

## 📱 **Mobile App Integration**

```javascript
// React Native mobile app integration
import { UmiAgentKit } from 'umi-agent-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MobileGameWallet {
  constructor() {
    this.kit = new UmiAgentKit({ network: 'devnet' });
    this.kit.enableAI({ groqApiKey: 'your-groq-api-key' });
  }

  async initializeWallet() {
    // Check for existing wallet
    const privateKey = await AsyncStorage.getItem('wallet_key');
    
    if (privateKey) {
      this.wallet = this.kit.importWallet(privateKey);
    } else {
      // Create new wallet for new player
      this.wallet = this.kit.createWallet();
      await AsyncStorage.setItem('wallet_key', this.wallet.getPrivateKey());
      
      // Give new player welcome package
      await this.kit.chat(`
        New player wallet created: ${this.wallet.getAddress()}
        Give welcome package:
        - 100 starter gold tokens
        - Basic character NFT
        - Tutorial completion reward
      `);
    }
  }

  async purchaseItem(itemId, price) {
    // In-app purchase with blockchain
    await this.kit.chat(`
      Player wants to buy item ${itemId} for ${price} tokens
      - Verify player has sufficient balance
      - Execute purchase transaction
      - Add item to player inventory
      - Show confirmation to player
    `);
  }

  async joinGuild(guildId) {
    // Join gaming guild
    await this.kit.chat(`
      Player ${this.wallet.getAddress()} wants to join guild ${guildId}
      - Check guild requirements
      - Pay guild entry fee if required
      - Add player to guild roster
      - Grant guild member privileges
    `);
  }

  async claimDailyReward() {
    // Daily login rewards
    await this.kit.chat(`
      Player ${this.wallet.getAddress()} claiming daily reward
      - Check last claim timestamp
      - Calculate streak bonuses
      - Distribute appropriate rewards
      - Update streak counter
    `);
  }
}
```

---

## 🔗 **Discord Bot Integration**

```javascript
// Discord bot with UmiAgentKit integration
const { Client, GatewayIntentBits } = require('discord.js');
const { UmiAgentKit } = require('umi-agent-kit');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

const kit = new UmiAgentKit({ 
  network: 'devnet', 
  multisigEnabled: true 
});
kit.enableAI({ groqApiKey: process.env.GROQ_API_KEY });

// Discord slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName, options } = interaction;

  switch (commandName) {
    case 'create-guild-wallet':
      const guildName = options.getString('name');
      
      await kit.chat(`
        Create Discord guild wallet for: ${guildName}
        - Set up guild treasury multisig
        - Add Discord server officers as approvers
        - Create guild token for rewards
        - Set up member reward system
      `);

      await interaction.reply(`🏰 Guild wallet created for ${guildName}!`);
      break;

    case 'reward-member':
      const member = options.getUser('member');
      const amount = options.getNumber('amount');
      
      await kit.chat(`
        Reward Discord member ${member.username}:
        - Amount: ${amount} guild tokens
        - Reason: Community contribution
        - Requires officer approval
      `);

      await interaction.reply(`💎 Reward proposed for ${member.username}!`);
      break;

    case 'tournament':
      const prize = options.getNumber('prize');
      
      await kit.chat(`
        Create Discord tournament:
        - Prize pool: ${prize} tokens
        - Entry fee: 10% of prize pool
        - Max participants: 32
        - Tournament duration: 1 week
      `);

      await interaction.reply(`🏆 Tournament created with ${prize} token prize pool!`);
      break;
  }
});

client.login(process.env.DISCORD_TOKEN);
```

---

## 📊 **Analytics & Monitoring**

```javascript
async function analyzeGameEconomics() {
  const kit = new UmiAgentKit({ network: 'devnet' });
  kit.enableAI({ groqApiKey: 'your-groq-api-key' });

  // AI-powered economic analysis
  const analysis = await kit.chat(`
    Analyze our game's token economics:
    - Player spending patterns over last 30 days
    - Token circulation and inflation rates
    - Most popular NFT categories
    - Guild treasury utilization
    - Tournament participation rates
    
    Provide recommendations for:
    - Optimizing reward distribution
    - Preventing token inflation
    - Increasing player engagement
    - Balancing free-to-play vs pay-to-earn
  `);

  // Generate economic health report
  const healthReport = await kit.chat(`
    Generate economic health dashboard:
    - Token velocity metrics
    - Player retention correlation with rewards
    - NFT trading volume trends
    - Guild activity indicators
    - Revenue optimization suggestions
  `);

  console.log('📊 Economic Analysis:', analysis);
  console.log('🏥 Health Report:', healthReport);
}
```

---

## 🛡️ **Security & Compliance**

```javascript
async function implementSecurityMeasures() {
  const kit = new UmiAgentKit({ 
    network: 'mainnet', 
    multisigEnabled: true 
  });
  
  // Security-focused configuration
  const securityConfig = {
    requireHardwareWallets: true,
    enableTimeLocks: {
      majorDecisions: 24 * 60 * 60 * 1000, // 24 hours
      treasuryOperations: 12 * 60 * 60 * 1000 // 12 hours
    },
    spendingLimits: {
      daily: '1000',
      weekly: '5000',
      monthly: '20000'
    },
    emergencyContacts: ['ceo', 'security_officer'],
    auditWebhooks: ['https://audit-service.com/webhook']
  };

  // AI-powered security monitoring
  await kit.chat(`
    Implement comprehensive security measures:
    - Set up automated threat detection
    - Configure spending limit alerts
    - Enable emergency pause mechanisms
    - Create audit trail logging
    - Set up compliance reporting
  `);

  // Regular security checks
  setInterval(async () => {
    await kit.chat(`
      Perform security health check:
      - Scan for unusual transaction patterns
      - Verify multisig approver status
      - Check smart contract integrity
      - Monitor treasury balances
      - Generate security report
    `);
  }, 24 * 60 * 60 * 1000); // Daily security checks
}
```

---

## 🎯 **Performance Optimization**

```javascript
async function optimizePerformance() {
  const kit = new UmiAgentKit({ network: 'devnet' });

  // Batch operations for efficiency
  const players = ['0x123...', '0x456...', '0x789...'];
  const rewards = [100, 150, 200];

  // Efficient batch reward distribution
  await kit.batchMintERC1155({
    ownerWallet: wallet,
    contractAddress: gameTokenContract,
    recipients: players,
    tokenId: rewardTokenId,
    amounts: rewards
  });

  // Gas optimization strategies
  const gasOptimization = await kit.chat(`
    Optimize gas usage for our game operations:
    - Batch similar operations together
    - Use efficient contract patterns
    - Implement layer 2 scaling solutions
    - Cache frequently accessed data
    - Minimize on-chain storage
  `);

  console.log('⚡ Gas optimization strategies:', gasOptimization);
}
```

---

## 🧪 **Testing & Development**

```javascript
// Comprehensive testing setup
async function testGameEcosystem() {
  const kit = new UmiAgentKit({ network: 'devnet' });
  const testWallet = kit.createWallet();

  try {
    // Test token creation
    console.log('🧪 Testing token creation...');
    const token = await kit.createERC20Token({
      deployerWallet: testWallet,
      name: 'TestCoin',
      symbol: 'TEST',
      initialSupply: 1000000
    });
    console.log('✅ Token creation test passed');

    // Test NFT creation
    console.log('🧪 Testing NFT creation...');
    const nftCollection = await kit.createNFTCollection({
      deployerWallet: testWallet,
      name: 'Test Heroes',
      symbol: 'HERO',
      maxSupply: 1000
    });
    console.log('✅ NFT creation test passed');

    // Test multisig creation
    console.log('🧪 Testing multisig creation...');
    const multisig = await kit.createMultisigGroup({
      name: 'Test Team',
      members: [
        { walletName: 'test1', role: 'admin', weight: 2 },
        { walletName: 'test2', role: 'member', weight: 1 }
      ],
      threshold: 2
    });
    console.log('✅ Multisig creation test passed');

    console.log('🎉 All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}
```

---

## 📚 **Learning Examples**

### **Beginner: First Token**
```javascript
// Your first blockchain token in 3 lines
const kit = new UmiAgentKit({ network: 'devnet' });
const wallet = kit.createWallet();
await kit.chat("Create a token called MyCoin with 1000 supply");
```

### **Intermediate: Gaming NFTs**
```javascript
// Create gaming NFT collection with attributes
const collection = await kit.createNFTCollection({
  deployerWallet: wallet,
  name: 'Warriors',
  symbol: 'WAR',
  maxSupply: 5000
});

// Mint hero with custom attributes
await kit.mintMoveNFT({
  ownerWallet: wallet,
  moduleAddress: collection.moduleAddress,
  name: 'Fire Warrior',
  attributes: [
    { trait_type: 'Strength', value: 85 },
    { trait_type: 'Fire Resistance', value: 90 }
  ],
  level: 5,
  rarity: 'epic'
});
```

### **Advanced: Multi-Contract Ecosystem**
```javascript
// Deploy complex interconnected contract system
const ecosystem = await kit.deployWithConfig('./contracts/', wallet, {
  GameToken: {
    name: 'EpicCoin',
    symbol: 'EPIC',
    initialSupply: 10000000
  },
  CharacterNFT: {
    name: 'Epic Characters',
    gameToken: '@GameToken'
  },
  WeaponNFT: {
    name: 'Epic Weapons', 
    characterNFT: '@CharacterNFT',
    gameToken: '@GameToken'
  },
  Tournament: {
    gameToken: '@GameToken',
    characterNFT: '@CharacterNFT',
    entryFee: 100,
    maxPlayers: 64
  },
  Marketplace: {
    gameToken: '@GameToken',
    characterNFT: '@CharacterNFT',
    weaponNFT: '@WeaponNFT',
    tradingFee: 5
  }
});
```

---

*Ready to build your own blockchain application? Choose an example that matches your needs and customize it for your project! [Return to Main Documentation](../README.md)*