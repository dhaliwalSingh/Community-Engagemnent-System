require('dotenv').config();

async function listModels() {
    const apiKey = 'AIzaSyALxwl0WhAliCa7l_-yvaogxvtvKp-l4oY';

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();

    if (res.ok) {
        console.log('✅ Available Models:\n', data);
    } else {
        console.error('❌ Failed to list models:', data);
    }
}

listModels();
