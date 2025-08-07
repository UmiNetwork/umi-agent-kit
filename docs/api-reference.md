# 📖 Complete API Reference

**Comprehensive function reference for UmiAgentKit**

---

## 🤖 **AI Functions**

### **`kit.enableAI(config)`**
Enable AI functionality with Groq integration.

```javascript
const ai = kit.enableAI({
  groqApiKey: 'your-groq-api-key',
  model: 'llama3-70b-8192',        // Optional
  temperature: 0.1,                // Optional
  maxTokens: 8192                  // Optional
});
```

**Parameters:**
- `groqApiKey` (string) - Your Groq API key
- `model` (string) - AI model to use (default: 'llama3-70b-8192')
- `temperature` (number) - Response creativity (0.0-1.0)
- `maxTokens` (number) - Maximum response length

**Returns:** AI configuration object

---

### **`kit.chat(message)`**
Main AI interface - talk naturally to your blockchain.

```javascript
const response = await kit.chat("Create a gaming token with 1M supply");
console.log(response.message);    // AI response
console.log(response.actions);    // Blockchain actions executed
```

**Parameters:**
- `message` (string) - Natural language command

**Returns:** Object with message, actions, and context

---

### **`kit.configureAI(preset, customConfig)`**
Configure AI behavior for different scenarios.

```javascript
kit.configureAI('gaming');        // Gaming-focused responses
kit.configureAI('production');    // Precise, reliable responses
kit.configureAI('quick');         // Fast, concise responses
kit.configureAI('conversational'); // Detailed explanations
```

**Parameters:**
- `preset` (string) - Preset configuration name
- `customConfig` (object) - Optional custom configuration

**Presets:** 'gaming', 'production', 'quick', 'conversational', 'custom'

---

### **`kit.setAIContext(key, value)`**
Set context for personalized AI responses.

```javascript
kit.setAIContext('defaultWallet', wallet.getAddress());
kit.setAIContext('projectName', 'Epic RPG Game');
kit.setAIContext('userRole', 'game-developer');
```

**Parameters:**
- `key` (string) - Context key
- `value` (any) - Context value

---

## 💼 **Wallet Functions**

### **`kit.createWallet()`**
Create a new wallet with private key.

```javascript
const wallet = kit.createWallet();
console.log(wallet.getAddress());     // EVM address
console.log(wallet.getMoveAddress()); // Move address
console.log(wallet.getPrivateKey());  // Private key (keep secure!)
```

**Returns:** UmiWallet object

---

### **`kit.importWallet(privateKey)`**
Import existing wallet from private key.

```javascript
const wallet = kit.importWallet('0x123...');
```

**Parameters:**
- `privateKey` (string) - Hexadecimal private key

**Returns:** UmiWallet object

---

### **`kit.getBalance(address)`**
Get ETH balance for any address.

```javascript
const balance = await kit.getBalance(wallet.getAddress());
console.log(`Balance: ${balance} ETH`);
```

**Parameters:**
- `address` (string) - Wallet address to check

**Returns:** Promise<string> - Balance in ETH

---

### **`kit.transfer(params)`**
Send ETH between wallets.

```javascript
await kit.transfer({
  from: fromWallet,
  to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  amount: '1.5'
});
```

**Parameters:**
- `from` (UmiWallet) - Sender wallet
- `to` (string) - Recipient address
- `amount` (string) - Amount in ETH

**Returns:** Promise<object> - Transaction result

---

## 🪙 **Token Functions**

### **`kit.createERC20Token(params)`**
Create ERC-20 tokens with real-time compilation.

```javascript
const token = await kit.createERC20Token({
  deployerWallet: wallet,
  name: 'GameCoin',
  symbol: 'GAME',
  decimals: 18,
  initialSupply: 1000000
});
```

**Parameters:**
- `deployerWallet` (UmiWallet) - Wallet to deploy from
- `name` (string) - Collection name
- `symbol` (string) - Collection symbol
- `maxSupply` (number) - Maximum NFT supply
- `mintPrice` (string) - Price per NFT in ETH
- `baseURI` (string) - Base URI for metadata

**Returns:** Promise<object> - Deployed NFT collection details

---

### **`kit.mintNFT(params)`**
Mint individual NFTs.

```javascript
const nft = await kit.mintNFT({
  ownerWallet: wallet,
  contractAddress: collection.contractAddress,
  to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  tokenId: 1,
  metadataURI: 'https://api.epicgame.com/heroes/1'
});
```

**Parameters:**
- `ownerWallet` (UmiWallet) - Contract owner wallet
- `contractAddress` (string) - NFT contract address
- `to` (string) - Recipient address
- `tokenId` (number) - Unique token ID
- `metadataURI` (string) - Metadata URI for the NFT

**Returns:** Promise<object> - Mint transaction result

---

### **`kit.createMoveNFTCollection(params)`**
Create Move-based NFT collections.

```javascript
const moveCollection = await kit.createMoveNFTCollection({
  deployerWallet: wallet,
  name: 'Move Heroes',
  description: 'Epic heroes on Move VM',
  maxSupply: 5000
});
```

**Parameters:**
- `deployerWallet` (UmiWallet) - Wallet to deploy from
- `name` (string) - Collection name
- `description` (string) - Collection description
- `maxSupply` (number) - Maximum NFT supply

**Returns:** Promise<object> - Deployed Move NFT collection

---

### **`kit.mintMoveNFT(params)`**
Mint Move NFTs with gaming attributes.

```javascript
const moveNFT = await kit.mintMoveNFT({
  ownerWallet: wallet,
  moduleAddress: moveCollection.moduleAddress,
  recipient: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  tokenId: 1,
  name: 'Dragon Slayer',
  description: 'Legendary warrior hero',
  imageURI: 'https://api.epicgame.com/heroes/dragon-slayer.png',
  attributes: [
    { trait_type: 'Strength', value: 95 },
    { trait_type: 'Magic', value: 88 },
    { trait_type: 'Speed', value: 77 }
  ],
  level: 1,
  rarity: 'legendary'
});
```

**Parameters:**
- `ownerWallet` (UmiWallet) - Contract owner wallet
- `moduleAddress` (string) - Move module address
- `recipient` (string) - Recipient address
- `tokenId` (number) - Unique token ID
- `name` (string) - NFT name
- `description` (string) - NFT description
- `imageURI` (string) - Image URI
- `attributes` (array) - Gaming attributes
- `level` (number) - Character level
- `rarity` (string) - Rarity tier

**Returns:** Promise<object> - Mint transaction result

---

## 💰 **ERC-1155 Multi-Token Functions**

### **`kit.createERC1155Collection(params)`**
Create ERC-1155 multi-token collections.

```javascript
const collection = await kit.createERC1155Collection({
  deployerWallet: wallet,
  name: "Epic Game Items",
  symbol: "EGI",
  baseURI: "https://api.epicgame.com/metadata/",
  owner: wallet.getAddress()
});
```

**Parameters:**
- `deployerWallet` (UmiWallet) - Wallet to deploy from
- `name` (string) - Collection name
- `symbol` (string) - Collection symbol
- `baseURI` (string) - Base URI for metadata
- `owner` (string) - Collection owner address

**Returns:** Promise<object> - Deployed ERC-1155 collection

---

### **`kit.createERC1155Token(params)`**
Create a new token type within existing collection.

```javascript
const weaponToken = await kit.createERC1155Token({
  ownerWallet: wallet,
  contractAddress: collection.contractAddress,
  metadataURI: "https://api.epicgame.com/metadata/sword.json",
  maxSupply: 1000,
  mintPrice: "0.01"
});
```

**Parameters:**
- `ownerWallet` (UmiWallet) - Contract owner wallet
- `contractAddress` (string) - ERC-1155 contract address
- `metadataURI` (string) - Token metadata URI
- `maxSupply` (number) - Maximum supply for this token type
- `mintPrice` (string) - Price per token in ETH

**Returns:** Promise<object> - Token creation result with tokenId

---

### **`kit.mintERC1155Token(params)`**
Mint specific amounts of a token type.

```javascript
await kit.mintERC1155Token({
  ownerWallet: wallet,
  contractAddress: collection.contractAddress,
  to: playerAddress,
  tokenId: weaponToken.tokenId,
  amount: 10,
  paymentRequired: true
});
```

**Parameters:**
- `ownerWallet` (UmiWallet) - Contract owner wallet
- `contractAddress` (string) - ERC-1155 contract address
- `to` (string) - Recipient address
- `tokenId` (number) - Token type ID to mint
- `amount` (number) - Amount to mint
- `paymentRequired` (boolean) - Whether payment is required

**Returns:** Promise<object> - Mint transaction result

---

### **`kit.batchMintERC1155(params)`**
Mint multiple different token types in one transaction.

```javascript
await kit.batchMintERC1155({
  ownerWallet: wallet,
  contractAddress: collection.contractAddress,
  to: newPlayerAddress,
  tokenIds: [swordTokenId, shieldTokenId, goldTokenId],
  amounts: [1, 1, 100],
  paymentRequired: true
});
```

**Parameters:**
- `ownerWallet` (UmiWallet) - Contract owner wallet
- `contractAddress` (string) - ERC-1155 contract address
- `to` (string) - Recipient address
- `tokenIds` (array) - Array of token type IDs
- `amounts` (array) - Array of amounts to mint
- `paymentRequired` (boolean) - Whether payment is required

**Returns:** Promise<object> - Batch mint transaction result

---

### **`kit.transferERC1155(params)`**
Transfer tokens between addresses.

```javascript
await kit.transferERC1155({
  fromWallet: playerWallet,
  contractAddress: collection.contractAddress,
  to: anotherPlayerAddress,
  tokenId: healthPotionTokenId,
  amount: 5
});
```

**Parameters:**
- `fromWallet` (UmiWallet) - Sender wallet
- `contractAddress` (string) - ERC-1155 contract address
- `to` (string) - Recipient address
- `tokenId` (number) - Token type ID to transfer
- `amount` (number) - Amount to transfer

**Returns:** Promise<object> - Transfer transaction result

---

### **`kit.getERC1155Balance(params)`**
Check token balance for an address.

```javascript
const balance = await kit.getERC1155Balance({
  contractAddress: collection.contractAddress,
  address: playerAddress,
  tokenId: swordTokenId
});
```

**Parameters:**
- `contractAddress` (string) - ERC-1155 contract address
- `address` (string) - Address to check balance for
- `tokenId` (number) - Token type ID

**Returns:** Promise<string> - Token balance

---

## 🔐 **Multisig Functions**

### **`kit.registerMultisigWallets(wallets)`**
Register wallets for multisig operations.

```javascript
const walletNames = kit.registerMultisigWallets({
  ceo: ceoWallet,
  developer: devWallet,
  artist: artistWallet,
  designer: designerWallet,
  marketing: marketingWallet
});
```

**Parameters:**
- `wallets` (object) - Object mapping names to UmiWallet instances

**Returns:** Array of registered wallet names

---

### **`kit.createMultisigGroup(params)`**
Create basic multisig group with custom rules.

```javascript
const multisig = await kit.createMultisigGroup({
  name: "Development Team",
  description: "Core team multisig",
  members: [
    { walletName: 'ceo', role: 'ceo', weight: 2 },
    { walletName: 'developer', role: 'developer', weight: 1 },
    { walletName: 'artist', role: 'artist', weight: 1 }
  ],
  threshold: 2,
  rules: {
    tokenCreation: {
      requiredRoles: ['developer', 'ceo'],
      threshold: 2
    }
  }
});
```

**Parameters:**
- `name` (string) - Multisig group name
- `description` (string) - Group description
- `members` (array) - Array of member objects with walletName, role, weight
- `threshold` (number) - Minimum approvals required
- `rules` (object) - Operation-specific rules

**Returns:** Promise<object> - Created multisig group

---

### **`kit.createGamingStudioMultisig(params)`**
Create gaming studio with predefined roles and rules.

```javascript
const studio = await kit.createGamingStudioMultisig({
  studioName: "Epic Games Studio",
  teamWallets: {
    ceo: ceoWallet,
    lead_developer: devWallet,
    art_director: artistWallet,
    game_designer: designerWallet,
    marketing_lead: marketingWallet
  }
});
```

**Parameters:**
- `studioName` (string) - Gaming studio name
- `teamWallets` (object) - Object mapping roles to UmiWallet instances

**Returns:** Promise<object> - Created gaming studio multisig

---

### **`kit.proposeTransaction(params)`**
Propose transaction requiring team approval.

```javascript
const proposal = await kit.proposeTransaction({
  multisigId: studio.id,
  proposerWalletName: 'lead_developer',
  operation: 'createERC20Token',
  params: {
    name: 'GameCoin',
    symbol: 'GAME',
    initialSupply: 1000000
  },
  description: "Main game currency for player transactions",
  urgency: 'normal'
});
```

**Parameters:**
- `multisigId` (string) - Multisig group ID
- `proposerWalletName` (string) - Name of proposing wallet
- `operation` (string) - Operation to perform
- `params` (object) - Operation parameters
- `description` (string) - Proposal description
- `urgency` (string) - Urgency level: 'low', 'normal', 'high', 'emergency'

**Returns:** Promise<object> - Created proposal

---

### **`kit.approveProposal(params)`**
Approve or reject proposals with comments.

```javascript
await kit.approveProposal({
  proposalId: proposal.id,
  approverWalletName: 'ceo',
  decision: 'approve',
  comment: "Looks good, approved! Great tokenomics."
});
```

**Parameters:**
- `proposalId` (string) - Proposal ID to approve/reject
- `approverWalletName` (string) - Name of approving wallet
- `decision` (string) - Decision: 'approve', 'reject', 'abstain'
- `comment` (string) - Optional comment

**Returns:** Promise<object> - Approval result

---

## 🏗️ **Contract Deployment Functions**

### **`kit.deployContracts(contractsPath, deployerWallet)`**
Deploy multiple Move contracts without constructor values.

```javascript
const contracts = await kit.deployContracts('./contracts/', wallet);
```

**Parameters:**
- `contractsPath` (string) - Path to contracts folder
- `deployerWallet` (UmiWallet) - Wallet to deploy from

**Returns:** Promise<object> - Object with deployed contract details

---

### **`kit.setConstructorValues(contractAddress, constructorArgs, callerWallet)`**
Initialize contracts after deployment with constructor values.

```javascript
await kit.setConstructorValues(contracts.GameToken.address, {
  name: 'GameCoin',
  symbol: 'GAME',
  decimals: 8,
  initial_supply: 1000000
}, wallet);
```

**Parameters:**
- `contractAddress` (string) - Deployed contract address
- `constructorArgs` (object) - Constructor arguments
- `callerWallet` (UmiWallet) - Wallet to call from

**Returns:** Promise<object> - Initialization result

---

### **`kit.deployWithJson(contractsPath, deployerWallet, configFile)`**
Deploy contracts using JSON configuration file.

```javascript
const ecosystem = await kit.deployWithJson('./contracts/', wallet, './deployment.json');
```

**Parameters:**
- `contractsPath` (string) - Path to contracts folder
- `deployerWallet` (UmiWallet) - Wallet to deploy from
- `configFile` (string) - Optional path to config file

**Returns:** Promise<object> - Deployed ecosystem

---

### **`kit.deployWithConfig(contractsPath, deployerWallet, configObject)`**
Deploy contracts using JavaScript configuration object.

```javascript
const ecosystem = await kit.deployWithConfig('./contracts/', wallet, {
  GameToken: { name: 'GameCoin', symbol: 'GAME' },
  HeroNFT: { name: 'Epic Heroes', gameToken: '@GameToken' }
});
```

**Parameters:**
- `contractsPath` (string) - Path to contracts folder
- `deployerWallet` (UmiWallet) - Wallet to deploy from
- `configObject` (object) - Configuration object

**Returns:** Promise<object> - Deployed ecosystem

---

### **`kit.callContractFunction(contractAddress, functionName, args, callerWallet)`**
Call any function on a deployed Move contract.

```javascript
const result = await kit.callContractFunction(
  '0x123::gametoken',
  'mint',
  { to: wallet.getAddress(), amount: 1000 },
  wallet
);
```

**Parameters:**
- `contractAddress` (string) - Contract module address
- `functionName` (string) - Function name to call
- `args` (object) - Function arguments
- `callerWallet` (UmiWallet) - Wallet to call from

**Returns:** Promise<object> - Function call result

---

## 🌐 **Network Functions**

### **`kit.getNetworkInfo()`**
Get current network information.

```javascript
const info = kit.getNetworkInfo();
console.log(info.network);        // 'devnet'
console.log(info.chainId);        // 42069
console.log(info.rpcUrl);         // RPC endpoint
```

**Returns:** Object with network details

---

### **`kit.getBlockNumber()`**
Get latest block number.

```javascript
const blockNumber = await kit.getBlockNumber();
```

**Returns:** Promise<number> - Latest block number

---

### **`kit.getSummary()`**
Get comprehensive toolkit summary.

```javascript
const summary = await kit.getSummary();
console.log(summary.walletCount);
console.log(summary.features);
console.log(summary.ai.enabled);
console.log(summary.multisig.groupCount);
```

**Returns:** Promise<object> - Toolkit summary with all features and status

---

## 📊 **Utility Functions**

### **`kit.validateContracts(contractsPath)`**
Validate Move contracts before deployment.

```javascript
try {
  await kit.validateContracts('./contracts/');
  console.log('✅ All contracts are valid!');
} catch (error) {
  console.error('❌ Validation failed:', error.message);
}
```

**Parameters:**
- `contractsPath` (string) - Path to contracts folder

**Returns:** Promise<void> - Resolves if valid, rejects if invalid

---

### **`kit.exportDeploymentResults(deployedContracts, outputPath)`**
Export deployment results to JSON file.

```javascript
await kit.exportDeploymentResults(
  deployedContracts,
  './deployment-results.json'
);
```

**Parameters:**
- `deployedContracts` (object) - Deployed contracts object
- `outputPath` (string) - File path to save results

**Returns:** Promise<void> - Resolves when file is written

---

### **`kit.getDeploymentSummary(deployedContracts)`**
Get summary statistics of deployment results.

```javascript
const summary = kit.getDeploymentSummary(deployedContracts);
```

**Parameters:**
- `deployedContracts` (object) - Deployed contracts object

**Returns:** Object with deployment statistics

---

## 🎮 **Gaming-Specific Functions**

### **`kit.createGuildMultisig(params)`**
Create guild treasury for gaming communities.

```javascript
const guild = await kit.createGuildMultisig({
  guildName: "DragonSlayers Guild",
  officers: {
    guild_leader: leaderWallet,
    officer1: officer1Wallet
  },
  members: {
    member1: member1Wallet,
    member2: member2Wallet
  }
});
```

**Parameters:**
- `guildName` (string) - Guild name
- `officers` (object) - Guild officers mapping
- `members` (object) - Guild members mapping

**Returns:** Promise<object> - Created guild multisig

---

### **`kit.createTournament(params)`**
Create tournament contract with prize distribution.

```javascript
const tournament = await kit.createTournament({
  deployerWallet: wallet,
  name: "Epic Battle Tournament",
  entryFee: "10",
  maxParticipants: 64,
  prizePool: "1000",
  gameToken: gameTokenAddress
});
```

**Parameters:**
- `deployerWallet` (UmiWallet) - Wallet to deploy from
- `name` (string) - Tournament name
- `entryFee` (string) - Entry fee in game tokens
- `maxParticipants` (number) - Maximum participants
- `prizePool` (string) - Total prize pool
- `gameToken` (string) - Game token contract address

**Returns:** Promise<object> - Deployed tournament contract

---

## 🔮 **Future API Functions**

### **Coming Soon**
- **Cross-Chain Functions** - Multi-blockchain operations
- **DeFi Functions** - Liquidity pools, staking, yield farming
- **Advanced Gaming** - Player progression, achievements
- **Analytics Functions** - Portfolio tracking, performance metrics
- **Governance Functions** - DAO voting, proposals

---

## 📝 **Function Categories Summary**

### **🤖 AI Functions (4 functions)**
- `enableAI()` - Enable AI functionality
- `chat()` - Natural language interface
- `configureAI()` - AI behavior configuration
- `setAIContext()` - Context management

### **💼 Wallet Functions (4 functions)**
- `createWallet()` - Create new wallet
- `importWallet()` - Import existing wallet
- `getBalance()` - Check ETH balance
- `transfer()` - Send ETH

### **🪙 Token Functions (3 functions)**
- `createERC20Token()` - Deploy ERC-20 tokens
- `createMoveToken()` - Deploy Move tokens
- `transferTokens()` - Transfer tokens

### **🎨 NFT Functions (4 functions)**
- `createNFTCollection()` - Deploy ERC-721 collections
- `mintNFT()` - Mint individual NFTs
- `createMoveNFTCollection()` - Deploy Move NFT collections
- `mintMoveNFT()` - Mint Move NFTs

### **💰 ERC-1155 Functions (6 functions)**
- `createERC1155Collection()` - Deploy multi-token collections
- `createERC1155Token()` - Create token types
- `mintERC1155Token()` - Mint tokens
- `batchMintERC1155()` - Batch mint multiple types
- `transferERC1155()` - Transfer tokens
- `getERC1155Balance()` - Check balances

### **🔐 Multisig Functions (5 functions)**
- `registerMultisigWallets()` - Register team wallets
- `createMultisigGroup()` - Create basic multisig
- `createGamingStudioMultisig()` - Create gaming studio
- `proposeTransaction()` - Propose team transactions
- `approveProposal()` - Approve/reject proposals

### **🏗️ Deployment Functions (6 functions)**
- `deployContracts()` - Deploy multiple contracts
- `setConstructorValues()` - Initialize contracts
- `deployWithJson()` - Deploy with JSON config
- `deployWithConfig()` - Deploy with JS config
- `callContractFunction()` - Call contract functions
- `validateContracts()` - Validate before deployment

### **🌐 Network Functions (3 functions)**
- `getNetworkInfo()` - Network information
- `getBlockNumber()` - Latest block number
- `getSummary()` - Toolkit summary

**Total: 35+ Functions** across all categories with more coming soon! 🚀

---

*Need help with any function? [Return to Main Documentation](../README.md)*miWallet) - Wallet to deploy from
- `name` (string) - Token name
- `symbol` (string) - Token symbol
- `decimals` (number) - Decimal places (default: 18)
- `initialSupply` (number) - Initial token supply

**Returns:** Promise<object> - Deployed token details

---

### **`kit.createMoveToken(params)`**
Create Move-based tokens.

```javascript
const moveToken = await kit.createMoveToken({
  deployerWallet: wallet,
  name: 'MoveCoin',
  symbol: 'MOVE',
  decimals: 8
});
```

**Parameters:**
- `deployerWallet` (UmiWallet) - Wallet to deploy from
- `name` (string) - Token name
- `symbol` (string) - Token symbol
- `decimals` (number) - Decimal places (default: 8)

**Returns:** Promise<object> - Deployed Move token details

---

### **`kit.transferTokens(params)`**
Transfer tokens between wallets.

```javascript
await kit.transferTokens({
  fromWallet: wallet,
  to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  contractAddress: token.contractAddress,
  amount: '1000'
});
```

**Parameters:**
- `fromWallet` (UmiWallet) - Sender wallet
- `to` (string) - Recipient address
- `contractAddress` (string) - Token contract address
- `amount` (string) - Amount to transfer

**Returns:** Promise<object> - Transaction result

---

## 🎨 **NFT Functions**

### **`kit.createNFTCollection(params)`**
Create ERC-721 NFT collections.

```javascript
const collection = await kit.createNFTCollection({
  deployerWallet: wallet,
  name: 'Epic Heroes',
  symbol: 'HERO',
  maxSupply: 10000,
  mintPrice: '0.01',
  baseURI: 'https://api.epicgame.com/heroes/'
});
```

**Parameters:**
- `deployerWallet` (U