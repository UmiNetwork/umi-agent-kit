// src/ai/templates/OllamaTemplate.js
// Built-in template for local Ollama models

export class OllamaTemplate {
    constructor(config = {}) {
        this.config = {
            url: config.url || 'http://localhost:11434',
            model: config.model || 'llama3.2:3b',
            temperature: config.temperature || 0.1,
            ...config
        };
        this.isReady = false;
    }

    async initialize() {
        try {
            console.log('🦙 Initializing Ollama template...');
            
            // Check if Ollama is running
            const response = await fetch(`${this.config.url}/api/tags`);
            if (!response.ok) {
                throw new Error(`Ollama not accessible at ${this.config.url}`);
            }

            // Check if model exists
            const data = await response.json();
            const modelExists = data.models.some(m => m.name === this.config.model);
            
            if (!modelExists) {
                console.log(`⚠️ Model ${this.config.model} not found. Available models:`, 
                    data.models.map(m => m.name));
                throw new Error(`Model ${this.config.model} not found. Run: ollama pull ${this.config.model}`);
            }

            this.isReady = true;
            console.log(`✅ Ollama template ready with model: ${this.config.model}`);
            return true;

        } catch (error) {
            console.error('❌ Ollama template initialization failed:', error.message);
            console.log('💡 Make sure Ollama is running: ollama serve');
            return false;
        }
    }

    async chat(message) {
        if (!this.isReady) {
            throw new Error('Ollama template not initialized');
        }

        try {
            const prompt = this.buildPrompt(message);
            
            const response = await fetch(`${this.config.url}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: this.config.model,
                    prompt: prompt,
                    stream: false,
                    options: {
                        temperature: this.config.temperature,
                        top_p: 0.9,
                        num_predict: 500
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Ollama API error: ${response.status}`);
            }

            const data = await response.json();
            return data.response.trim();

        } catch (error) {
            console.error('❌ Ollama chat failed:', error.message);
            throw error;
        }
    }

    buildPrompt(message) {
        return `You are UmiBot, an AI assistant for blockchain operations on Umi Network.

Your capabilities:
- Wallet management and balance checking
- Token creation (ERC-20) and management
- NFT creation (ERC-721) and management
- Smart contract deployment
- Multisig operations
- DeFi operations

Be helpful and suggest appropriate blockchain operations when relevant.

User: ${message}


Assistant: I'll help you with blockchain operations on Umi Network.`;
    }

    async validate() {
        try {
            const response = await fetch(`${this.config.url}/api/tags`);
            return {
                status: response.ok ? 'healthy' : 'unhealthy',
                model: this.config.model,
                url: this.config.url
            };
        } catch (error) {
            return {
                status: 'error',
                error: error.message,
                suggestion: 'Make sure Ollama is running: ollama serve'
            };
        }
    }

    getInfo() {
        return {
            name: 'Ollama Template',
            type: 'local-llm',
            model: this.config.model,
            url: this.config.url
        };
    }
}

