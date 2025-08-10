// src/ai/templates/SimpleTemplate.js
// Built-in template for simple rule-based responses

export class SimpleTemplate {
    constructor(config = {}) {
        this.config = config;
        this.responses = config.responses || this.getDefaultResponses();
        this.isReady = false;
    }

    async initialize() {
        console.log('📝 Initializing Simple template...');
        this.isReady = true;
        console.log('✅ Simple template ready');
        return true;
    }

    async chat(message) {
        if (!this.isReady) {
            throw new Error('Simple template not initialized');
        }

        const lowerMessage = message.toLowerCase();
        
        // Check for exact matches first
        for (const [keyword, response] of Object.entries(this.responses)) {
            if (keyword !== 'default' && lowerMessage.includes(keyword.toLowerCase())) {
                return typeof response === 'function' ? response(message) : response;
            }
        }
        
        // Return default response
        const defaultResponse = this.responses.default || "I'm your AI assistant for Umi Network!";
        return typeof defaultResponse === 'function' ? defaultResponse(message) : defaultResponse;
    }

    getDefaultResponses() {
        return {
            // Greetings
            'hello': 'Hello! I\'m your blockchain assistant for Umi Network. How can I help you?',
            'hi': 'Hi there! I\'m here to help with blockchain operations on Umi Network.',
            'good morning': 'Good morning! Ready to work with blockchain today?',
            'good afternoon': 'Good afternoon! How can I assist with your blockchain needs?',
            'good evening': 'Good evening! What blockchain operations can I help you with?',
            
            // Blockchain operations
            'balance': 'I can help you check your wallet balance. Use the wallet functions in UmiAgentKit.',
            'wallet': 'I can help you with wallet operations including balance checks and transactions.',
            'token': 'I can help you create and manage tokens. Use the token creation functions in UmiAgentKit.',
            'nft': 'I can help you create and manage NFTs. Use the NFT functions in UmiAgentKit.',
            'contract': 'I can help you deploy and interact with smart contracts.',
            'deploy': 'I can help you deploy contracts and tokens to Umi Network.',
            'multisig': 'I can help you with multisig wallet operations and team coordination.',
            'defi': 'I can help you with DeFi operations and protocols on Umi Network.',
            
            // Help and information
            'help': `I can help you with:
• Wallet operations and balance checking
• Token creation and management
• NFT creation and management  
• Smart contract deployment
• Multisig operations
• DeFi operations

What would you like to do?`,
            
            'what can you do': `I'm your AI assistant for Umi Network! I can help with:
• Checking wallet balances
• Creating tokens and NFTs
• Deploying smart contracts
• Managing multisig wallets
• DeFi operations

Just ask me what you need!`,
            
            // Network information
            'network': 'You\'re working with Umi Network, a powerful blockchain platform for gaming and DeFi.',
            'umi': 'Umi Network is an advanced blockchain platform with dual-VM support (EVM + Move).',
            
            // Errors and clarification
            'error': 'I\'m sorry you\'re experiencing an error. Can you provide more details about what you\'re trying to do?',
            'problem': 'I\'m here to help solve problems! Can you tell me more about what\'s not working?',
            'stuck': 'No worries! I\'m here to help. What are you trying to accomplish?',
            
            // Default response
            'default': (message) => `I received your message: "${message}". I'm your AI assistant for Umi Network. How can I help you with blockchain operations?`
        };
    }

    // Add custom responses
    addResponse(keyword, response) {
        this.responses[keyword.toLowerCase()] = response;
    }

    // Add multiple responses
    addResponses(responseMap) {
        for (const [keyword, response] of Object.entries(responseMap)) {
            this.addResponse(keyword, response);
        }
    }

    // Remove a response
    removeResponse(keyword) {
        delete this.responses[keyword.toLowerCase()];
    }

    // Get all responses
    getResponses() {
        return { ...this.responses };
    }

    async validate() {
        return {
            status: this.isReady ? 'healthy' : 'not_initialized',
            responseCount: Object.keys(this.responses).length
        };
    }

    getInfo() {
        return {
            name: 'Simple Template',
            type: 'rule-based',
            responseCount: Object.keys(this.responses).length
        };
    }
}

// Predefined templates for common use cases

export function createTradingSimpleTemplate() {
    return new SimpleTemplate({
        responses: {
            'price': 'I can help you check token prices and market data.',
            'buy': 'I can help you with buying tokens and managing trades.',
            'sell': 'I can help you with selling tokens and executing trades.',
            'portfolio': 'I can help you check your portfolio and holdings.',
            'trading': 'I\'m your trading assistant. Ask me about prices, trades, or your portfolio.',
            'market': 'I can provide market information and trading insights.',
            'default': 'I\'m your trading bot assistant for Umi Network. How can I help with trading?'
        }
    });
}

export function createGamingSimpleTemplate() {
    return new SimpleTemplate({
        responses: {
            'quest': 'I can help you with quests and missions in your game.',
            'reward': 'I can help you manage rewards and prizes for players.',
            'nft': 'I can help you create gaming NFTs like characters, items, and collectibles.',
            'token': 'I can help you create gaming tokens for your game economy.',
            'leaderboard': 'I can help you check rankings and leaderboards.',
            'gaming': 'I\'m your gaming assistant for blockchain game development.',
            'player': 'I can help you with player management and rewards.',
            'default': 'I\'m your gaming assistant for Umi Network. How can I help with your game?'
        }
    });
}

export function createDeFiSimpleTemplate() {
    return new SimpleTemplate({
        responses: {
            'stake': 'I can help you with staking operations and rewards.',
            'yield': 'I can help you with yield farming and liquidity provision.',
            'swap': 'I can help you swap tokens and manage liquidity.',
            'pool': 'I can help you with liquidity pools and farming.',
            'defi': 'I\'m your DeFi assistant for Umi Network protocols.',
            'liquidity': 'I can help you provide liquidity and earn rewards.',
            'farm': 'I can help you with yield farming strategies.',
            'default': 'I\'m your DeFi assistant for Umi Network. How can I help with DeFi operations?'
        }
    });
}

