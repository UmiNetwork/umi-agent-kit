// test_templates.js
import { UmiAgentKit, OllamaTemplate, OpenAITemplate, SimpleTemplate } from './src/index.js';

async function testTemplates() {
    console.log('🧪 Testing UmiAgentKit with templates...\n');

    const kit = new UmiAgentKit({
        network: 'devnet'
    });

    // Test 1: Simple Template
    console.log('1. Testing SimpleTemplate...');
    const simpleTemplate = new SimpleTemplate();
    const success1 = await kit.useAI(simpleTemplate);
    console.log('Success:', success1);
    
    if (success1) {
        const response1 = await kit.chat('Hello, check my balance');
        console.log('Response:', response1);
    }

    // Test 2: Check AI Status
    console.log('\n2. Checking AI status...');
    const status = kit.getAIStatus();
    console.log('Status:', status);

    // Test 3: Switch back to original (if Groq is enabled)
    console.log('\n3. Testing fallback...');
    kit.switchToOriginalAI();
    const status2 = kit.getAIStatus();
    console.log('Status after switch:', status2);

    console.log('\n✅ Template integration test complete!');
}

testTemplates().catch(console.error);