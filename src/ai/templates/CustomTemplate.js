// src/ai/templates/CustomTemplate.js
// Built-in template for custom user logic

export class CustomTemplate {
    constructor(config = {}) {
        this.config = config;
        this.customFunction = config.customFunction || this.defaultLogic;
        this.isReady = false;
    }

    async initialize() {
        try {
            console.log('🔧 Initializing Custom template...');
            
            // Run any custom initialization if provided
            if (this.config.initialize) {
                await this.config.initialize();
            }

            this.isReady = true;
            console.log('✅ Custom template ready');
            return true;

        } catch (error) {
            console.error('❌ Custom template initialization failed:', error.message);
            return false;
        }
    }

    async chat(message) {
        if (!this.isReady) {
            throw new Error('Custom template not initialized');
        }

        try {
            return await this.customFunction(message, this.config);
        } catch (error) {
            console.error('❌ Custom function failed:', error.message);
            throw error;
        }
    }

    // Default logic if no custom function provided
    async defaultLogic(message, config) {
        const lowerMessage = message.toLowerCase();
        
        // Blockchain operations detection
        if (lowerMessage.includes('balance') || lowerMessage.includes('wallet')) {
            return "I can help you check your wallet balance. Use the wallet functions in UmiAgentKit.";
        }
        
        if (lowerMessage.includes('token') && lowerMessage.includes('create')) {
            return "I can help you create tokens. Use the createToken() function from UmiAgentKit.";
        }
        
        if (lowerMessage.includes('nft')) {
            return "I can help you create NFTs. Use the createNFT() function from UmiAgentKit.";
        }
        
        if (lowerMessage.includes('contract') || lowerMessage.includes('deploy')) {
            return "I can help you deploy smart contracts. Use the deployment functions from UmiAgentKit.";
        }
        
        if (lowerMessage.includes('multisig')) {
            return "I can help you with multisig operations. Use the multisig functions from UmiAgentKit.";
        }
        
        // Greetings
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! I'm your custom AI assistant for Umi Network. How can I help you with blockchain operations?";
        }
        
        // Help
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return `I can help you with:
- Wallet operations and balance checking
- Token creation and management
- NFT creation and management
- Smart contract deployment
- Multisig operations
- DeFi operations

What would you like to do?`;
        }
        
        // Default response
        return `I received your message: "${message}". I'm your custom AI assistant for blockchain operations on Umi Network. How can I help you?`;
    }

    async validate() {
        return {
            status: this.isReady ? 'healthy' : 'not_initialized',
            type: 'custom',
            hasCustomFunction: typeof this.customFunction === 'function'
        };
    }

    getInfo() {
        return {
            name: 'Custom Template',
            type: 'custom-logic',
            hasCustomFunction: typeof this.customFunction === 'function'
        };
    }
}

// Helper function for creating trading bot templates
export function createTradingTemplate(tradingLogic) {
    return new CustomTemplate({
        customFunction: async (message, config) => {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('price') || lowerMessage.includes('trading')) {
                return await tradingLogic.handleTradingQuery(message);
            }
            
            if (lowerMessage.includes('buy') || lowerMessage.includes('sell')) {
                return await tradingLogic.handleTradeOrder(message);
            }
            
            if (lowerMessage.includes('portfolio') || lowerMessage.includes('holdings')) {
                return await tradingLogic.getPortfolio();
            }
            
            return "I'm your trading bot assistant. Ask me about prices, trading, or your portfolio.";
        }
    });
}

// Helper function for creating gaming templates
export function createGamingTemplate(gamingLogic) {
    return new CustomTemplate({
        customFunction: async (message, config) => {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('quest') || lowerMessage.includes('mission')) {
                return await gamingLogic.generateQuest(message);
            }
            
            if (lowerMessage.includes('reward') || lowerMessage.includes('prize')) {
                return await gamingLogic.handleRewards(message);
            }
            
            if (lowerMessage.includes('leaderboard') || lowerMessage.includes('score')) {
                return await gamingLogic.getLeaderboard();
            }
            
            return "I'm your gaming assistant. Ask me about quests, rewards, or leaderboards.";
        }
    });
}

