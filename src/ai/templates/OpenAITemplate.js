// src/ai/templates/OpenAITemplate.js
// Built-in template for OpenAI API

export class OpenAITemplate {
    constructor(config = {}) {
        this.config = {
            apiKey: config.apiKey,
            model: config.model || 'gpt-3.5-turbo',
            baseURL: config.baseURL || 'https://api.openai.com/v1',
            temperature: config.temperature || 0.1,
            maxTokens: config.maxTokens || 500,
            ...config
        };
        this.isReady = false;
    }

    async initialize() {
        try {
            console.log('🤖 Initializing OpenAI template...');
            
            if (!this.config.apiKey) {
                throw new Error('OpenAI API key is required');
            }

            // Test API connection
            const response = await fetch(`${this.config.baseURL}/models`, {
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            this.isReady = true;
            console.log(`✅ OpenAI template ready with model: ${this.config.model}`);
            return true;

        } catch (error) {
            console.error('❌ OpenAI template initialization failed:', error.message);
            return false;
        }
    }

    async chat(message) {
        if (!this.isReady) {
            throw new Error('OpenAI template not initialized');
        }

        try {
            const response = await fetch(`${this.config.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages: [
                        {
                            role: 'system',
                            content: this.getSystemPrompt()
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: this.config.temperature,
                    max_tokens: this.config.maxTokens
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`OpenAI API error: ${error.error?.message || response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();

        } catch (error) {
            console.error('❌ OpenAI chat failed:', error.message);
            throw error;
        }
    }

    getSystemPrompt() {
        return `You are UmiBot, an AI assistant for blockchain operations on Umi Network.

Your capabilities include:
- Wallet management and balance checking
- Token creation (ERC-20) and management
- NFT creation (ERC-721) and management
- Smart contract deployment and interaction
- Multisig wallet operations
- DeFi operations and protocols

Guidelines:
- Be helpful and provide clear, actionable responses
- Suggest appropriate blockchain operations when relevant
- Explain complex concepts in simple terms
- Always prioritize security and best practices
- If unsure about something, ask for clarification

Respond in a friendly, professional manner and focus on helping users achieve their blockchain goals on Umi Network.`;
    }

    async validate() {
        try {
            const response = await fetch(`${this.config.baseURL}/models`, {
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return {
                status: response.ok ? 'healthy' : 'unhealthy',
                model: this.config.model,
                baseURL: this.config.baseURL
            };
        } catch (error) {
            return {
                status: 'error',
                error: error.message,
                suggestion: 'Check your OpenAI API key and internet connection'
            };
        }
    }

    getInfo() {
        return {
            name: 'OpenAI Template',
            type: 'api-llm',
            model: this.config.model,
            baseURL: this.config.baseURL
        };
    }
}

