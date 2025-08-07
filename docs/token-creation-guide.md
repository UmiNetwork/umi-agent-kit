# 🪙 Token Creation Guide - Complete Token Ecosystem

**Create ERC-20, Move tokens, and advanced DeFi integrations with AI or direct APIs**

---

## 🚀 **Quick Start: AI-Powered Token Creation**

The easiest way to create tokens is through natural language:

```javascript
import { UmiAgentKit } from 'umi-agent-kit';

const kit = new UmiAgentKit({ network: 'devnet' });
kit.enableAI({ groqApiKey: 'your-groq-api-key' });
const wallet = kit.importWallet('your-private-key');

// Create tokens with simple chat
await kit.chat("Create a gaming token called GameCoin with 1 million supply");
await kit.chat("Make a reward token called XP with 18 decimals");
await kit.chat("Deploy a utility token for our game economy");
```

---

## 💰 **ERC-20 Token Creation**

### **🤖 AI-Powered ERC-20 Creation**

```javascript
// Natural language token creation
await kit.chat("Create a token called SuperCoin with 10 million supply");
await kit.chat("Make a deflationary token that burns 1% per transaction");
await kit.chat("Create a governance token with voting capabilities");
await kit.chat("Deploy a staking reward token with 12% APY");
```

### **⚡ Direct ERC-20 API**

```javascript
// Standard ERC-20 token
const gameToken = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'GameCoin',
  symbol: 'GAME',
  decimals: 18,
  initialSupply: 1000000
});

console.log(`Token deployed: ${gameToken.contractAddress}`);
console.log(`Transaction hash: ${gameToken.txHash}`);
```

### **🎮 Gaming ERC-20 Tokens**

```javascript
// Gaming token with special features
const epicToken = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'Epic Game Token',
  symbol: 'EPIC',
  decimals: 18,
  initialSupply: 10000000,
  features: ['Mintable', 'Burnable', 'Pausable'],
  gameFeatures: {
    playerRewards: true,
    stakingCompatible: true,
    tournamentPrizes: true
  }
});

// Mint rewards for players
await kit.mintTokens({
  ownerWallet: wallet,
  contractAddress: epicToken.contractAddress,
  to: playerAddress,
  amount: '1000'
});

// Burn tokens for deflationary mechanics
await kit.burnTokens({
  ownerWallet: wallet,
  contractAddress: epicToken.contractAddress,
  amount: '500'
});
```

### **💎 Advanced ERC-20 Features**

```javascript
// Token with advanced features
const advancedToken = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'Advanced Game Token',
  symbol: 'AGT',
  decimals: 18,
  initialSupply: 5000000,
  features: ['Mintable', 'Burnable', 'Pausable', 'Permit'],
  taxFeatures: {
    transferTax: 2, // 2% tax on transfers
    burnTax: 1,     // 1% burned on each transfer
    rewardTax: 1    // 1% distributed to holders
  },
  maxSupply: 21000000, // Maximum possible supply
  antiWhale: {
    maxTxAmount: 100000,     // Max transaction amount
    maxWalletAmount: 500000  // Max wallet holdings
  }
});
```

---

## 🔄 **Move Token Creation**

### **🤖 AI-Powered Move Tokens**

```javascript
// Natural language Move token creation
await kit.chat("Create a Move token called MoveCoin with 8 decimals");
await kit.chat("Deploy a native Umi token for our DApp");
await kit.chat("Make a Move token with staking capabilities");
```

### **⚡ Direct Move Token API**

```javascript
// Basic Move token
const moveToken = await kit.createMoveToken({
  deployerWallet: wallet,
  name: 'UmiCoin',
  symbol: 'UMI',
  decimals: 8,
  initialSupply: 1000000,
  description: 'Native Umi ecosystem token'
});

console.log(`Move token deployed: ${moveToken.moduleAddress}`);
console.log(`Transaction hash: ${moveToken.txHash}`);
```

### **🎯 Gaming Move Tokens**

```javascript
// Gaming-focused Move token
const gamingMoveToken = await kit.createMoveToken({
  deployerWallet: wallet,
  name: 'Epic Move Token',
  symbol: 'EMT',
  decimals: 8,
  initialSupply: 2000000,
  gameFeatures: {
    experiencePoints: true,
    levelRequirements: true,
    questRewards: true,
    guildTreasury: true
  },
  stakingFeatures: {
    enabled: true,
    minimumStake: 100,
    lockPeriod: 30 * 24 * 60 * 60, // 30 days
    rewardRate: 12 // 12% APY
  }
});

// Mint experience points for player achievements
await kit.mintMoveTokens({
  ownerWallet: wallet,
  moduleAddress: gamingMoveToken.moduleAddress,
  recipient: playerAddress,
  amount: 500,
  reason: 'Quest completion reward'
});
```

### **🔮 Advanced Move Token Features**

```javascript
// Move token with governance and DeFi features
const deFiMoveToken = await kit.createMoveToken({
  deployerWallet: wallet,
  name: 'DeFi Move Token',
  symbol: 'DMT',
  decimals: 8,
  initialSupply: 10000000,
  governanceFeatures: {
    votingPower: true,
    proposalCreation: true,
    treasuryControl: true
  },
  deFiFeatures: {
    liquidityMining: true,
    yieldFarming: true,
    lendingCollateral: true
  },
  upgradeability: {
    enabled: true,
    adminControls: true,
    communityVoting: true
  }
});
```

---

## 🔄 **Token Transfer Operations**

### **🤖 AI-Powered Transfers**

```javascript
// Natural language token transfers
await kit.chat("Send 100 GameCoins to player1");
await kit.chat("Transfer 500 EPIC tokens to the guild treasury");
await kit.chat("Distribute 50 tokens each to the top 10 players");
await kit.chat("Pay tournament prizes: 1000 tokens to winner, 500 to second place");
```

### **⚡ Direct Transfer API**

```javascript
// Single token transfer
await kit.transferTokens({
  fromWallet: wallet,
  to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  contractAddress: gameToken.contractAddress,
  amount: '1000'
});

// Batch token transfers
await kit.batchTransferTokens({
  fromWallet: wallet,
  contractAddress: gameToken.contractAddress,
  transfers: [
    { to: player1Address, amount: '100' },
    { to: player2Address, amount: '150' },
    { to: player3Address, amount: '200' }
  ]
});

// Transfer with memo
await kit.transferTokens({
  fromWallet: wallet,
  to: playerAddress,
  contractAddress: gameToken.contractAddress,
  amount: '500',
  memo: 'Tournament victory reward'
});
```

### **🎮 Gaming-Specific Transfers**

```javascript
// Reward distribution for game events
await kit.distributeGameRewards({
  ownerWallet: wallet,
  contractAddress: gameToken.contractAddress,
  eventType: 'tournament_completion',
  rewards: {
    winner: { address: winner, amount: '1000', bonus: 'champion_nft' },
    runnerUp: { address: second, amount: '500', bonus: 'silver_badge' },
    participants: [
      { address: player1, amount: '100' },
      { address: player2, amount: '100' },
      { address: player3, amount: '100' }
    ]
  }
});

// Guild treasury operations
await kit.manageGuildTreasury({
  guildWallet: guildWallet,
  contractAddress: gameToken.contractAddress,
  operation: 'weekly_distribution',
  members: guildMembers,
  rewardPerMember: '50',
  bonuses: {
    officers: '100',
    activeMembers: '25'
  }
});
```

---

## 💹 **Token Economics & Analytics**

### **🤖 AI-Powered Token Analysis**

```javascript
// AI analyzes your token economics
await kit.chat("Analyze GameCoin distribution and suggest improvements");
await kit.chat("What's the optimal supply for our player reward system?");
await kit.chat("How should we handle token inflation in our game?");
await kit.chat("Suggest tokenomics for a sustainable play-to-earn economy");
```

### **📊 Token Analytics Functions**

```javascript
// Get comprehensive token analytics
const analytics = await kit.getTokenAnalytics(gameToken.contractAddress);

console.log(analytics);
// {
//   totalSupply: '1000000',
//   circulatingSupply: '750000',
//   holders: 1247,
//   transactions: 5632,
//   dailyVolume: '45000',
//   marketCap: '$125000',
//   priceChange24h: '+5.2%',
//   topHolders: [...],
//   distributionChart: {...}
// }
```

### **🎯 Token Performance Metrics**

```javascript
// Advanced token metrics
const performance = await kit.getTokenPerformance(gameToken.contractAddress);

console.log(performance);
// {
//   velocityMetrics: {
//     transactionFrequency: 145, // transactions per day
//     averageHoldTime: 23,       // days
//     activeHolderRatio: 0.34    // 34% of holders are active
//   },
//   distributionMetrics: {
//     giniCoefficient: 0.67,     // wealth distribution
//     top10HolderPercent: 0.45,  // top 10 holders own 45%
//     dormantTokens: 0.23        // 23% haven't moved in 30 days
//   },
//   gameMetrics: {
//     playersEarning: 892,       // players earning tokens
//     averagePlayerBalance: '234',
//     rewardEfficiency: 0.78,    // 78% of rewards claimed
//     stakingParticipation: 0.56 // 56% of holders stake
//   }
// }
```

---

## 🏦 **DeFi Token Integration**

### **💧 Liquidity Pool Creation**

```javascript
// AI-powered liquidity pool
await kit.chat("Create liquidity pool for GameCoin/ETH pair");
await kit.chat("Set up automated market maker for our token");

// Direct API
const liquidityPool = await kit.createLiquidityPool({
  tokenA: gameToken.contractAddress,
  tokenB: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  feeRate: 0.3, // 0.3%
  initialLiquidityA: '100000',
  initialLiquidityB: '50', // 50 ETH
  slippageProtection: 2.5 // 2.5% max slippage
});

// Add more liquidity
await kit.addLiquidity({
  poolAddress: liquidityPool.contractAddress,
  tokenAAmount: '50000',
  tokenBAmount: '25',
  provider: wallet
});
```

### **🔒 Token Staking System**

```javascript
// AI-powered staking
await kit.chat("Create staking contract with 15% APY for GameCoin holders");
await kit.chat("Set up flexible staking with early withdrawal penalties");

// Direct staking API
const stakingContract = await kit.createStakingContract({
  stakingToken: gameToken.contractAddress,
  rewardToken: rewardToken.contractAddress,
  rewardRate: '15', // 15% APY
  lockPeriods: {
    flexible: { days: 0, multiplier: 1.0 },   // No lock, 15% APY
    short: { days: 30, multiplier: 1.2 },     // 30 days, 18% APY
    medium: { days: 90, multiplier: 1.5 },    // 90 days, 22.5% APY
    long: { days: 365, multiplier: 2.0 }      // 1 year, 30% APY
  },
  penalties: {
    earlyWithdrawal: 0.1, // 10% penalty for early withdrawal
    compoundBonus: 0.05   // 5% bonus for compound rewards
  }
});

// Stake tokens
await kit.stakeTokens({
  stakerWallet: playerWallet,
  stakingContract: stakingContract.contractAddress,
  amount: '1000',
  lockPeriod: 'medium' // 90 days
});
```

### **🌾 Yield Farming**

```javascript
// AI-powered yield farming
await kit.chat("Set up yield farm for GameCoin-ETH LP tokens");
await kit.chat("Create multi-token reward farming with bonus periods");

// Direct yield farming API
const yieldFarm = await kit.createYieldFarm({
  lpToken: liquidityPool.lpTokenAddress,
  rewardTokens: [
    { token: gameToken.contractAddress, rate: '10' },    // 10% APY in GameCoin
    { token: bonusToken.contractAddress, rate: '5' }     // 5% APY in bonus token
  ],
  farmDuration: 365 * 24 * 60 * 60 * 1000, // 1 year
  bonusPeriods: [
    { start: 0, end: 30, multiplier: 2.0 },      // 2x rewards first 30 days
    { start: 335, end: 365, multiplier: 1.5 }    // 1.5x rewards last 30 days
  ],
  emergencyWithdraw: true,
  harvestLockup: 24 * 60 * 60 * 1000 // 24 hour harvest lockup
});

// Start farming
await kit.enterFarm({
  farmerWallet: wallet,
  farmContract: yieldFarm.contractAddress,
  lpTokenAmount: '1000'
});
```

---

## 🎮 **Gaming Token Features**

### **⭐ Experience Point Tokens**

```javascript
// Create XP token system
const xpToken = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'Experience Points',
  symbol: 'XP',
  decimals: 0, // Whole numbers only
  initialSupply: 0, // Mint as needed
  features: ['Mintable', 'Soulbound'], // Can't be transferred
  gameFeatures: {
    levelCalculation: true,
    questRewards: true,
    skillTrees: true,
    seasonalReset: false
  }
});

// Award XP for game actions
await kit.awardExperience({
  gameWallet: wallet,
  xpContract: xpToken.contractAddress,
  player: playerAddress,
  amount: 150,
  action: 'boss_defeated',
  metadata: {
    bossName: 'Dragon King',
    difficulty: 'Legendary',
    partySize: 4
  }
});
```

### **🏆 Achievement Tokens**

```javascript
// Achievement-based token rewards
const achievementToken = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'Achievement Coins',
  symbol: 'ACH',
  decimals: 18,
  initialSupply: 1000000,
  features: ['Mintable', 'Burnable'],
  achievementFeatures: {
    rarityMultipliers: {
      common: 1,
      rare: 3,
      epic: 10,
      legendary: 50
    },
    streakBonuses: true,
    firstTimeBonus: 2.0
  }
});

// Award achievement tokens
await kit.awardAchievement({
  gameWallet: wallet,
  tokenContract: achievementToken.contractAddress,
  player: playerAddress,
  achievement: {
    id: 'dragon_slayer',
    rarity: 'legendary',
    firstTime: true,
    streak: 5
  }
});
```

### **🎪 Event and Season Tokens**

```javascript
// Special event tokens
const eventToken = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'Halloween Event Token',
  symbol: 'SPOOKY',
  decimals: 18,
  initialSupply: 500000,
  features: ['Burnable', 'TimeLimited'],
  eventFeatures: {
    startTime: Date.now(),
    endTime: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 days
    exchangeRate: { gameToken: 2 }, // 1 SPOOKY = 2 GAME
    exclusiveRewards: true
  }
});

// Auto-convert event tokens after event
await kit.scheduleEventTokenConversion({
  eventToken: eventToken.contractAddress,
  targetToken: gameToken.contractAddress,
  conversionRate: 2,
  conversionDate: eventToken.eventFeatures.endTime
});
```

---

## 🛡️ **Token Security & Best Practices**

### **🔒 Security Features**

```javascript
// Secure token with advanced protection
const secureToken = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'Secure Game Token',
  symbol: 'SGT',
  decimals: 18,
  initialSupply: 1000000,
  securityFeatures: {
    pausable: true,           // Emergency pause
    blacklistable: true,      // Block malicious addresses
    maxTxAmount: 10000,       // Maximum transaction size
    cooldownPeriod: 300,      // 5 minute cooldown between large transfers
    multisigRequired: true,   // Require multisig for admin functions
    timelock: 24 * 60 * 60    // 24 hour timelock for critical changes
  },
  antiBot: {
    launchDelay: 3600,        // 1 hour delay after deployment
    maxGasPrice: 50000000000, // 50 gwei max gas price
    honeypot: false           // No honeypot mechanics
  }
});

// Emergency pause (only owner)
await kit.pauseToken({
  ownerWallet: wallet,
  contractAddress: secureToken.contractAddress,
  reason: 'Security incident detected'
});

// Resume token operations
await kit.unpauseToken({
  ownerWallet: wallet,
  contractAddress: secureToken.contractAddress
});
```

### **📋 Compliance Features**

```javascript
// Compliance-ready token
const complianceToken = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'Compliance Token',
  symbol: 'COMP',
  decimals: 18,
  initialSupply: 10000000,
  complianceFeatures: {
    kycRequired: true,
    amlChecks: true,
    jurisdictionLimits: ['US', 'EU', 'JP'],
    reportingEnabled: true,
    auditTrail: true
  },
  regulatoryFeatures: {
    transferLimits: {
      daily: 100000,
      monthly: 1000000
    },
    holdingLimits: {
      individual: 50000,
      institutional: 500000
    },
    reportingSchedule: 'monthly'
  }
});
```

---

## 📈 **Token Launch Strategies**

### **🚀 Fair Launch**

```javascript
// AI-powered fair launch strategy
await kit.chat("Plan a fair launch for GameCoin with anti-bot protection");
await kit.chat("Create tokenomics for sustainable growth");

// Fair launch implementation
const fairLaunch = await kit.createFairLaunch({
  token: gameToken.contractAddress,
  launchStrategy: 'gradual_release',
  antiBot: {
    maxBuyFirst10Min: '1000',
    maxBuyFirst1Hour: '5000',
    cooldownBetweenBuys: 60 // 1 minute
  },
  liquidityLock: {
    percentage: 80, // 80% of initial liquidity locked
    duration: 365 * 24 * 60 * 60 // 1 year lock
  },
  teamTokens: {
    percentage: 10, // 10% to team
    vestingPeriod: 24, // 24 months vesting
    cliffPeriod: 6     // 6 months cliff
  }
});
```

### **💎 Token Distribution**

```javascript
// Comprehensive distribution strategy
const distribution = await kit.planTokenDistribution({
  totalSupply: 10000000,
  allocations: {
    publicSale: { percentage: 40, price: '0.001' },      // 4M tokens
    privateSale: { percentage: 20, price: '0.0005' },    // 2M tokens
    team: { percentage: 15, vesting: 24 },               // 1.5M tokens
    advisors: { percentage: 5, vesting: 12 },            // 500K tokens
    development: { percentage: 10, vesting: 36 },        // 1M tokens
    marketing: { percentage: 5, immediate: true },       // 500K tokens
    liquidity: { percentage: 5, locked: true }           // 500K tokens
  },
  vestingSchedule: {
    cliff: 6,      // 6 months cliff
    duration: 24,  // 24 months total vesting
    frequency: 1   // Monthly releases
  }
});
```

---

## 🔧 **Token Management Functions**

### **👑 Owner Functions**

```javascript
// Mint new tokens (if mintable)
await kit.mintTokens({
  ownerWallet: wallet,
  contractAddress: gameToken.contractAddress,
  to: treasuryAddress,
  amount: '100000',
  reason: 'Treasury funding'
});

// Burn tokens to reduce supply
await kit.burnTokens({
  ownerWallet: wallet,
  contractAddress: gameToken.contractAddress,
  amount: '50000',
  reason: 'Quarterly burn event'
});

// Transfer ownership
await kit.transferTokenOwnership({
  currentOwner: wallet,
  contractAddress: gameToken.contractAddress,
  newOwner: multisigAddress
});
```

### **📊 Monitoring & Analytics**

```javascript
// Real-time token monitoring
const monitor = await kit.createTokenMonitor({
  tokenAddress: gameToken.contractAddress,
  alerts: {
    largeTransfers: 10000,     // Alert for transfers > 10K tokens
    priceChange: 15,           // Alert for >15% price changes
    liquidityChange: 20,       // Alert for >20% liquidity changes
    suspiciousActivity: true   // AI-powered suspicious activity detection
  },
  reporting: {
    daily: true,
    weekly: true,
    monthly: true
  },
  webhookUrl: 'https://your-app.com/token-alerts'
});

// Generate token health report
const healthReport = await kit.generateTokenHealthReport(gameToken.contractAddress);
console.log(healthReport);
```

---

## 💡 **Token Creation Best Practices**

### **🎯 Planning Your Token**

1. **Define Purpose**
   - What problem does your token solve?
   - How does it fit in your ecosystem?
   - What utility does it provide?

2. **Choose Token Type**
   - **Utility Token** - Access to services/features
   - **Governance Token** - Voting rights and decisions
   - **Reward Token** - Incentivize specific behaviors
   - **Currency Token** - Medium of exchange

3. **Design Tokenomics**
   - Total supply and distribution
   - Inflation/deflation mechanisms
   - Staking and reward systems
   - Burning and buyback programs

### **⚡ Technical Decisions**

```javascript
// Decision matrix for token features
const tokenDecisions = {
  supply: {
    fixed: 'Predictable, deflationary pressure',
    mintable: 'Flexible, can increase supply',
    burnable: 'Can reduce supply, deflationary'
  },
  decimals: {
    0: 'Whole numbers only (NFT-like)',
    8: 'Standard for Move tokens',
    18: 'Standard for ERC-20 tokens'
  },
  features: {
    pausable: 'Emergency stop capability',
    upgradeable: 'Can improve functionality',
    permit: 'Gasless approvals',
    snapshot: 'Governance voting support'
  }
};
```

### **🛡️ Security Checklist**

- ✅ **Audit smart contracts** before mainnet deployment
- ✅ **Test extensively** on testnet
- ✅ **Implement emergency pause** for critical issues
- ✅ **Use multisig wallets** for admin functions
- ✅ **Set reasonable limits** on minting and transfers
- ✅ **Monitor for suspicious activity** post-launch
- ✅ **Have incident response plan** ready

---

## 🎉 **Complete Token Creation Example**

```javascript
async function createGameEcosystemTokens() {
  const kit = new UmiAgentKit({ 
    network: 'devnet', 
    multisigEnabled: true 
  });
  
  kit.enableAI({ groqApiKey: 'your-groq-api-key' });
  const wallet = kit.importWallet('your-private-key');

  // 1. Main game currency
  console.log('🪙 Creating main game currency...');
  const gameToken = await kit.createERC20Token({
    deployerWallet: wallet,
    name: 'Epic Game Coin',
    symbol: 'EPIC',
    decimals: 18,
    initialSupply: 10000000,
    features: ['Mintable', 'Burnable', 'Pausable']
  });

  // 2. Experience points (soulbound)
  console.log('⭐ Creating experience point system...');
  const xpToken = await kit.createERC20Token({
    deployerWallet: wallet,
    name: 'Experience Points',
    symbol: 'XP',
    decimals: 0,
    initialSupply: 0,
    features: ['Mintable', 'Soulbound']
  });

  // 3. Governance token
  console.log('🗳️ Creating governance token...');
  const govToken = await kit.createERC20Token({
    deployerWallet: wallet,
    name: 'Epic Governance Token',
    symbol: 'eGOV',
    decimals: 18,
    initialSupply: 1000000,
    features: ['Snapshot', 'Permit']
  });

  // 4. Set up staking for governance
  console.log('🔒 Setting up token staking...');
  const stakingContract = await kit.createStakingContract({
    stakingToken: govToken.contractAddress,
    rewardToken: gameToken.contractAddress,
    rewardRate: '12'
  });

  // 5. Create liquidity pool
  console.log('💧 Creating liquidity pool...');
  const liquidityPool = await kit.createLiquidityPool({
    tokenA: gameToken.contractAddress,
    tokenB: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    feeRate: 0.3,
    initialLiquidityA: '100000',
    initialLiquidityB: '50'
  });

  console.log('🎉 Complete token ecosystem created!');
  console.log({
    gameToken: gameToken.contractAddress,
    xpToken: xpToken.contractAddress,
    govToken: govToken.contractAddress,
    staking: stakingContract.contractAddress,
    liquidity: liquidityPool.contractAddress
  });
}

createGameEcosystemTokens();
```

---

*Ready to create your token ecosystem? Start with AI chat or dive into the direct APIs! [Return to Main Documentation](../README.md)*