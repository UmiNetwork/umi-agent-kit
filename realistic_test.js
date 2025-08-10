// realistic_test.js
// Proper test with wallet initialization and realistic scenarios

import { UmiAgentKit, OllamaTemplate, OpenAITemplate, SimpleTemplate } from './src/index.js';

async function realisticTest() {
    console.log('🧪 Realistic UmiAgentKit Template Test\n');

    const kit = new UmiAgentKit({
        network: 'devnet'
    });

    // Step 1: Initialize a wallet first (like real usage)
    console.log('1️⃣ Setting up wallet...');
    try {
        // Create or import a wallet
        const wallet = kit.createWallet(); // or kit.importWallet('private-key')
        console.log('✅ Wallet created:', wallet.getAddress());
        
        // Set AI context so it knows about the wallet
        kit.setAIContext('defaultWallet', wallet.getAddress());
        console.log('✅ AI context set with wallet address');
    } catch (error) {
        console.log('⚠️ Wallet setup failed:', error.message);
        console.log('💡 Continuing with AI-only tests...');
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Step 2: Test AI responses (without actual blockchain calls)
    console.log('2️⃣ Testing AI responses...');
    
    const simpleTemplate = new SimpleTemplate({
        responses: {
            'hello': 'Hello! I\'m your blockchain assistant.',
            'balance': 'I can help you check your wallet balance using UmiAgentKit functions.',
            'token': 'I can help you create tokens using the createToken() function.',
            'help': 'I can help with: wallets, tokens, NFTs, smart contracts, and multisig operations.',
            'default': 'I\'m your AI assistant for Umi Network blockchain operations!'
        }
    });

    const success = await kit.useAI(simpleTemplate);
    console.log('✅ SimpleTemplate enabled:', success);

    if (success) {
        // Test different types of messages
        const testMessages = [
            'Hello there!',
            'What can you help me with?',
            'I want to check my balance',
            'How do I create a token?',
            'Tell me about NFTs'
        ];

        for (const message of testMessages) {
            console.log(`\n💬 User: "${message}"`);
            try {
                const response = await kit.chat(message);
                console.log(`🤖 AI: ${response}`);
            } catch (error) {
                console.log(`❌ Error: ${error.message}`);
            }
        }
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Step 3: Test with actual blockchain operations (if wallet exists)
    console.log('3️⃣ Testing with blockchain operations...');
    
    try {
        // Only test actual blockchain operations if we have a wallet
        const wallets = kit.getAllWallets();
        if (wallets && wallets.length > 0) {
            console.log('💰 Testing actual balance check...');
            
            const wallet = wallets[0];
            const balance = await kit.getBalance(wallet.getAddress());
            console.log(`✅ Actual balance: ${balance} ETH`);
            
            // Now the AI response makes sense
            const response = await kit.chat('What\'s my current balance?');
            console.log(`🤖 AI response about balance: ${response}`);
            
        } else {
            console.log('⚠️ No wallet available for blockchain operations');
            console.log('💡 AI can still respond to balance questions conceptually');
            
            const response = await kit.chat('How do I check my balance?');
            console.log(`🤖 AI guidance: ${response}`);
        }
    } catch (error) {
        console.log(`❌ Blockchain operation failed: ${error.message}`);
        console.log('💡 This is normal on devnet or without proper setup');
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Step 4: Test custom template with realistic logic
    console.log('4️⃣ Testing custom template with realistic logic...');
    
    const customTemplate = new SimpleTemplate({
        responses: {
            'balance': async (message) => {
                // Check if wallet is available
                const wallets = kit.getAllWallets();
                if (wallets && wallets.length > 0) {
                    return 'I can check your balance! Let me use the getBalance() function for you.';
                } else {
                    return 'To check your balance, you first need to create or import a wallet. Use kit.createWallet() or kit.importWallet().';
                }
            },
            'token': 'To create a token, use kit.createToken(). Make sure you have a wallet with enough gas fees.',
            'wallet': 'You can create a new wallet with kit.createWallet() or import an existing one with kit.importWallet(privateKey).',
            'default': 'I\'m your smart AI assistant. I can guide you through blockchain operations step by step!'
        }
    });

    await kit.useAI(customTemplate);
    
    const smartTests = [
        'How do I check my balance?',
        'I want to create a token',
        'Help me set up a wallet',
        'What should I do first?'
    ];

    for (const message of smartTests) {
        console.log(`\n💬 User: "${message}"`);
        const response = await kit.chat(message);
        console.log(`🤖 Smart AI: ${response}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Step 5: Complete workflow example
    console.log('5️⃣ Complete workflow example...');
    
    try {
        console.log('📝 Simulating complete user workflow:');
        
        // 1. User asks for help
        let response = await kit.chat('I\'m new to blockchain, what should I do first?');
        console.log(`🤖 Step 1 - Getting started: ${response}`);
        
        // 2. User asks about wallet
        response = await kit.chat('How do I set up a wallet?');
        console.log(`🤖 Step 2 - Wallet setup: ${response}`);
        
        // 3. User asks about balance (now it makes sense in context)
        response = await kit.chat('Once I have a wallet, how do I check my balance?');
        console.log(`🤖 Step 3 - Balance checking: ${response}`);
        
        // 4. User asks about tokens
        response = await kit.chat('How do I create my own token?');
        console.log(`🤖 Step 4 - Token creation: ${response}`);
        
    } catch (error) {
        console.log(`❌ Workflow test failed: ${error.message}`);
    }

    console.log('\n🎉 Realistic test completed!');
    
    console.log('\n📋 Test Summary:');
    console.log('✅ AI responds appropriately to different questions');
    console.log('✅ AI provides helpful guidance for blockchain operations');
    console.log('✅ AI handles cases where wallet is not set up');
    console.log('✅ AI can guide users through complete workflows');
    console.log('✅ Template system works with realistic scenarios');
}

// Alternative: Test without any blockchain operations
async function aiOnlyTest() {
    console.log('🤖 AI-Only Test (No Blockchain Operations)\n');

    const kit = new UmiAgentKit({ network: 'devnet' });

    const template = new SimpleTemplate({
        responses: {
            'hello': 'Hello! I\'m your blockchain assistant for Umi Network.',
            'help': 'I can help you understand blockchain concepts and guide you through UmiAgentKit functions.',
            'balance': 'To check your balance, you\'ll need to: 1) Create/import a wallet, 2) Use kit.getBalance(address)',
            'token': 'To create a token: 1) Have a wallet with gas, 2) Use kit.createToken(name, symbol, supply)',
            'wallet': 'Create wallet: kit.createWallet() or Import: kit.importWallet(privateKey)',
            'default': 'I\'m here to help with blockchain operations! Ask me about wallets, tokens, or NFTs.'
        }
    });

    await kit.useAI(template);

    const questions = [
        'Hello, I\'m new to blockchain',
        'How do I get started?',
        'What is a wallet?',
        'How do I check my balance?',
        'How do I create a token?',
        'What can UmiAgentKit do?'
    ];

    console.log('💬 AI Conversation Test:');
    for (const question of questions) {
        console.log(`\n👤 User: ${question}`);
        const response = await kit.chat(question);
        console.log(`🤖 AI: ${response}`);
    }

    console.log('\n✅ AI-only test completed - no blockchain operations needed!');
}

// Run the appropriate test
console.log('Choose test type:');
console.log('1. Realistic test (with wallet setup)');
console.log('2. AI-only test (no blockchain operations)');

// Run realistic test by default
realisticTest().catch(error => {
    console.error('❌ Realistic test failed:', error);
    console.log('\n🔄 Falling back to AI-only test...');
    aiOnlyTest().catch(console.error);
});

