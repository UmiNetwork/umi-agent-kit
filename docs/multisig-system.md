# 🔐 Multisig System - Revolutionary Team Coordination

**World's First Server-Based Multisig with Gaming Studio Templates**

---

## 🌟 **Why UmiAgentKit Multisig Changes Everything**

Traditional multisig requires all team members online simultaneously. **UmiAgentKit revolutionizes this** with server-based coordination:

- ✅ **Offline Coordination** - Team members approve when convenient
- ✅ **Gaming Studio Templates** - Pre-configured roles for game development  
- ✅ **Proposal Engine** - Complete proposal lifecycle management
- ✅ **Smart Notifications** - Real-time updates for team coordination
- ✅ **Role-Based Permissions** - Granular access control by team role

---

## 🚀 **Quick Start**

### **Conditional Approvals**
```javascript
// Approvals with conditions
await kit.approveProposal({
  proposalId: proposal.id,
  approverWalletName: 'art_director',
  decision: 'approve',
  comment: "Approved with conditions",
  conditions: [
    "Reduce initial supply to 500K",
    "Add 2% transaction fee for development fund",
    "Include artist attribution in metadata"
  ]
});
```

### **Emergency Procedures**
```javascript
// Emergency override system
const emergencyProposal = await kit.proposeTransaction({
  multisigId: studio.id,
  proposerWalletName: 'ceo',
  operation: 'pauseAllContracts',
  params: { reason: 'Security vulnerability detected' },
  urgency: 'emergency',
  description: "Emergency pause due to exploit"
});

// Emergency approvals bypass normal rules
await kit.emergencyApprove({
  proposalId: emergencyProposal.id,
  approverWalletName: 'ceo',
  emergencyCode: 'SECURITY_OVERRIDE'
});
```

---

## 📊 **Multisig Analytics**

### **Team Performance Metrics**
```javascript
const analytics = await kit.getMultisigAnalytics(studio.id);

console.log(analytics.teamStats);
// {
//   totalProposals: 45,
//   approvalRate: 0.89,
//   avgApprovalTime: '2.3 hours',
//   mostActiveMembers: ['ceo', 'lead_developer'],
//   responseRates: {
//     ceo: 0.95,
//     lead_developer: 0.88,
//     art_director: 0.92
//   }
// }
```

### **Treasury Management**
```javascript
const treasury = await kit.getTreasuryAnalytics(studio.id);

console.log(treasury.summary);
// {
//   totalValue: '15.7 ETH',
//   monthlySpending: '2.1 ETH',
//   topExpenses: ['Development', 'Marketing', 'Operations'],
//   budgetUtilization: 0.73
// }
```

---

## 🛡️ **Security Features**

### **Multi-Layer Security**
- **Role-Based Access** - Granular permissions by team role
- **Time Locks** - Delay execution of critical operations
- **Spending Limits** - Maximum amounts per role/time period
- **Emergency Pause** - Immediate halt of all operations
- **Audit Trail** - Complete history of all actions

### **Security Best Practices**
```javascript
// Security configuration
const securityConfig = {
  requireHardwareWallets: true,
  enableTimeLocks: {
    majorDecisions: 24 * 60 * 60 * 1000, // 24 hours
    treasuryOperations: 12 * 60 * 60 * 1000 // 12 hours
  },
  spendingLimits: {
    daily: '100',
    weekly: '500',
    monthly: '2000'
  },
  emergencyContacts: ['ceo', 'lead_developer'],
  auditWebhooks: ['https://audit-service.com/webhook']
};
```

---

## 🔄 **Integration Examples**

### **With Game Backend**
```javascript
// Integrate with your game server
app.post('/webhook/multisig', (req, res) => {
  const { type, proposal, studio } = req.body;
  
  switch(type) {
    case 'proposal_approved':
      // Update game database
      await updatePlayerRewards(proposal.params);
      break;
      
    case 'token_created':
      // Add new token to game economy
      await addGameToken(proposal.result.contractAddress);
      break;
      
    case 'nft_minted':
      // Grant NFT to player
      await grantPlayerAsset(proposal.params.recipient);
      break;
  }
});
```

### **With Discord Bot**
```javascript
// Discord integration
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Multisig notifications in Discord
kit.on('proposal_created', async (proposal) => {
  const channel = client.channels.cache.get('TEAM_CHANNEL_ID');
  
  const embed = {
    title: '📋 New Proposal',
    description: proposal.description,
    fields: [
      { name: 'Proposer', value: proposal.proposer, inline: true },
      { name: 'Operation', value: proposal.operation, inline: true },
      { name: 'Urgency', value: proposal.urgency, inline: true }
    ],
    color: 0x00ff00
  };
  
  await channel.send({ embeds: [embed] });
});
```

---

## 🎯 **Real-World Workflow Example**

```javascript
// Complete gaming studio workflow
async function studioWorkflow() {
  const kit = new UmiAgentKit({ 
    network: 'devnet', 
    multisigEnabled: true 
  });
  
  // 1. Create gaming studio
  console.log('🎮 Creating gaming studio...');
  const studio = await kit.createGamingStudioMultisig({
    studioName: "Epic RPG Studio",
    teamWallets: {
      ceo: ceoWallet,
      lead_developer: devWallet,
      art_director: artistWallet,
      game_designer: designerWallet,
      marketing_lead: marketingWallet
    }
  });
  
  // 2. Developer proposes game token
  console.log('💰 Proposing game token...');
  const tokenProposal = await kit.proposeTransaction({
    multisigId: studio.id,
    proposerWalletName: 'lead_developer',
    operation: 'createERC20Token',
    params: {
      name: 'EpicCoin',
      symbol: 'EPIC',
      initialSupply: 1000000
    },
    description: "Main game currency for Epic RPG"
  });
  
  // 3. Team approves
  console.log('✅ Team approval process...');
  await kit.approveProposal({
    proposalId: tokenProposal.id,
    approverWalletName: 'ceo',
    decision: 'approve',
    comment: "Great tokenomics!"
  });
  
  await kit.approveProposal({
    proposalId: tokenProposal.id,
    approverWalletName: 'game_designer',
    decision: 'approve',
    comment: "Perfect for our reward system"
  });
  
  // 4. Auto-execution when threshold met
  console.log('🚀 Token deployed automatically!');
  
  // 5. Create hero NFTs
  console.log('🎨 Creating hero NFT collection...');
  await kit.chat("Create hero NFT collection with 10K max supply");
  
  // 6. Set up tournament system
  console.log('⚔️ Setting up tournaments...');
  await kit.chat("Create tournament system with EPIC token prizes");
  
  console.log('🎉 Complete gaming ecosystem deployed with team coordination!');
}

studioWorkflow();
```

---

## 🔮 **Future Multisig Features**

### **Coming Soon**
- **Cross-Chain Multisig** - Coordinate across multiple blockchains
- **AI-Powered Proposals** - AI suggests optimal proposals
- **Dynamic Roles** - Roles that change based on performance
- **Governance Integration** - Full DAO governance features
- **Mobile App** - Approve proposals from mobile devices

### **Advanced Features**
- **Reputation System** - Team members build reputation over time
- **Performance Metrics** - Track team effectiveness
- **Smart Scheduling** - Optimal timing for proposals
- **Risk Assessment** - AI evaluates proposal risks

---

## 💡 **Best Practices**

### **Team Setup**
- **Clear Roles** - Define responsibilities for each team member
- **Appropriate Thresholds** - Balance security with efficiency
- **Communication** - Use notifications and comments effectively
- **Regular Reviews** - Periodically review and update rules

### **Security**
- **Hardware Wallets** - Use hardware wallets for high-value operations
- **Time Locks** - Add delays for major decisions
- **Emergency Procedures** - Have clear emergency protocols
- **Audit Regularly** - Review all multisig activities

### **Efficiency**
- **Batch Operations** - Group related operations together
- **Clear Descriptions** - Write clear proposal descriptions
- **Quick Response** - Respond to proposals promptly
- **Automation** - Use rules to automate common operations

---

*Ready to revolutionize your team coordination? [Return to Main Documentation](../README.md)* **Enable Multisig**
```javascript
const kit = new UmiAgentKit({
  network: 'devnet',
  multisigEnabled: true
});

// Register team wallets
const teamWallets = kit.registerMultisigWallets({
  ceo: ceoWallet,
  developer: devWallet,
  artist: artistWallet
});
```

### **Create Gaming Studio**
```javascript
// AI-powered studio creation
await kit.chat("Create a gaming studio called Epic Games with 5 team members");

// Or direct API
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

---

## 🎮 **Gaming Studio Multisig**

Built specifically for game development teams with predefined roles and smart rules.

### **🎯 Predefined Gaming Roles**

| Role | Weight | Responsibilities |
|------|--------|------------------|
| **👑 CEO** | 3 | Strategic decisions, emergency powers |
| **💻 Lead Developer** | 2 | Technical implementations, smart contracts |
| **🎨 Art Director** | 2 | NFT creation, visual assets |
| **🎮 Game Designer** | 2 | Game mechanics, balance decisions |
| **📢 Marketing Lead** | 1 | Community engagement, token operations |
| **🏛️ Community Manager** | 1 | Player rewards, community treasury |

### **⚙️ Smart Gaming Rules**
```javascript
const defaultRules = {
  tokenCreation: {
    requiredRoles: ['lead_developer', 'ceo'],
    threshold: 2,
    description: 'Create new game tokens'
  },
  nftCollection: {
    requiredRoles: ['art_director', 'game_designer'],
    threshold: 2,
    description: 'Create NFT collections'
  },
  playerRewards: {
    requiredRoles: ['game_designer'],
    threshold: 1,
    maxAmount: '100',
    description: 'Distribute player rewards'
  },
  emergencyStop: {
    requiredRoles: ['ceo'],
    threshold: 1,
    description: 'Emergency operations'
  }
};
```

---

## ⚔️ **Guild Treasury Multisig**

Perfect for gaming guilds and DAOs with member hierarchies.

### **Create Guild**
```javascript
const guild = await kit.createGuildMultisig({
  guildName: "DragonSlayers Guild",
  officers: {
    guild_leader: leaderWallet,
    officer1: officer1Wallet,
    officer2: officer2Wallet
  },
  members: {
    member1: member1Wallet,
    member2: member2Wallet,
    member3: member3Wallet
  }
});
```

### **Guild Rules**
- **Officers** - Can propose and approve treasury operations
- **Members** - Can propose community initiatives
- **Guild Leader** - Emergency powers and final decisions
- **Treasury** - Automated reward distribution based on activity

---

## 📋 **Proposal System**

Complete proposal lifecycle with automatic execution when threshold is met.

### **Create Proposal**
```javascript
// AI-powered proposal
await kit.chat("Propose creating a reward token for active players");

// Direct API
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

### **Approve Proposal**
```javascript
// AI approval
await kit.chat("Approve the GameCoin proposal as CEO");

// Direct API
await kit.approveProposal({
  proposalId: proposal.id,
  approverWalletName: 'ceo',
  decision: 'approve',
  comment: "Approved - good tokenomics"
});

// Automatically executes when threshold is met!
```

### **Proposal Lifecycle**
1. **📝 Created** - Team member proposes transaction
2. **🔔 Notified** - All relevant members get notifications
3. **👥 Voting** - Team members approve/reject with comments
4. **⚡ Executed** - Auto-executes when threshold reached
5. **📊 Recorded** - All actions logged for transparency

---

## 🔔 **Smart Notifications**

Real-time coordination for distributed teams across multiple channels.

### **Configure Notifications**
```javascript
const notifications = {
  enableConsole: true,
  enableWebhooks: true,
  webhookUrl: 'https://your-game-backend.com/multisig-webhook',
  enableSlack: true,
  slackWebhook: 'your-slack-webhook-url',
  enableEmail: true,
  emailSettings: {
    smtp: 'your-smtp-server',
    recipients: ['team@yourgame.com']
  }
};

kit.configureNotifications(notifications);
```

### **Notification Types**
- 📩 **New Proposal** - When someone creates a proposal
- ✅ **Approval Received** - When a team member approves
- ❌ **Proposal Rejected** - When someone rejects
- 🚀 **Ready for Execution** - When threshold is met
- ⚡ **Proposal Executed** - When transaction completes
- 📊 **Daily Summary** - Daily team coordination report
- 🚨 **Emergency Alert** - Critical security notifications

---

## 🔧 **Multisig Functions Reference**

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
    },
    smallPayments: {
      maxAmount: '100',
      requiredRoles: ['any'],
      threshold: 1
    }
  }
});
```

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
    marketing_lead: marketingWallet,
    community_manager: communityWallet
  }
});
```

### **`kit.createGuildMultisig(params)`**
Create guild treasury for gaming communities.

```javascript
const guild = await kit.createGuildMultisig({
  guildName: "DragonSlayers Guild",
  officers: {
    guild_leader: leaderWallet,
    officer1: officer1Wallet,
    officer2: officer2Wallet
  },
  members: {
    member1: member1Wallet,
    member2: member2Wallet,
    member3: member3Wallet
  },
  treasuryRules: {
    memberRewards: {
      maxAmount: '50',
      cooldown: 24 * 60 * 60 * 1000 // 24 hours
    }
  }
});
```

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
  urgency: 'normal', // 'low', 'normal', 'high', 'emergency'
  estimatedCost: '0.1', // ETH
  deadline: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

### **`kit.approveProposal(params)`**
Approve or reject proposals with comments.

```javascript
await kit.approveProposal({
  proposalId: proposal.id,
  approverWalletName: 'ceo',
  decision: 'approve', // 'approve', 'reject', 'abstain'
  comment: "Looks good, approved! Great tokenomics.",
  conditions: [] // Optional conditions for approval
});
```

### **`kit.getMultisigStatus(multisigId)`**
Get current status of multisig group.

```javascript
const status = await kit.getMultisigStatus(studio.id);
console.log(status.activeProposals);    // Current proposals
console.log(status.members);            // Team member status
console.log(status.recentActivity);     // Recent actions
console.log(status.rules);              // Current rules
```

### **`kit.getProposalHistory(multisigId)`**
Get history of all proposals for transparency.

```javascript
const history = await kit.getProposalHistory(studio.id);
console.log(history.proposals);         // All proposals
console.log(history.executed);          // Successful executions
console.log(history.rejected);          // Rejected proposals
console.log(history.stats);             // Approval statistics
```

---

## 💡 **Advanced Multisig Patterns**

### **Hierarchical Approval**
```javascript
// Different thresholds for different operations
const complexRules = {
  smallPayments: {
    maxAmount: '100',
    requiredRoles: ['any'],
    threshold: 1
  },
  tokenOperations: {
    requiredRoles: ['developer', 'ceo'],
    threshold: 2
  },
  majorDecisions: {
    minAmount: '1000',
    requiredRoles: ['ceo', 'lead_developer', 'art_director'],
    threshold: 3
  },
  emergencyActions: {
    requiredRoles: ['ceo'],
    threshold: 1,
    cooldown: 24 * 60 * 60 * 1000 // 24 hour cooldown
  }
};
```

### **Time-Based Rules**
```javascript
const timeBasedRules = {
  dailyRewards: {
    maxAmount: '50',
    resetInterval: 24 * 60 * 60 * 1000, // 24 hours
    requiredRoles: ['game_designer'],
    threshold: 1
  },
  weeklyTreasury: {
    maxAmount: '500',
    resetInterval: 7 * 24 * 60 * 60 * 1000, // 7 days
    requiredRoles: ['ceo', 'marketing_lead'],
    threshold: 2
  }
};
```

###