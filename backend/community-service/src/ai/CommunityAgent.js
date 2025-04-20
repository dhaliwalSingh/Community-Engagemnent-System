// src/ai/CommunityAgent.js
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { StringOutputParser } = require('@langchain/core/output_parsers');
const { RunnableSequence } = require('@langchain/core/runnables');
const CommunityPost = require('../models/CommunityPost');
const AllInteractions = require('../models/AllInteractions');
require('dotenv').config()


const model = new ChatGoogleGenerativeAI({
    model: 'models/gemini-1.5-pro-latest',
    apiKey: 'AIzaSyALxwl0WhAliCa7l_-yvaogxvtvKp-l4oY',
    maxOutputTokens: 2048,
    temperature: 0.7,
});

const parser = new StringOutputParser();

const aiAgent = RunnableSequence.from([model, parser]);

async function communityAIQuery(input, userId = null) {
    // Step 1: Retrieve relevant posts
    const keywords = input.split(' ').map(word => word.toLowerCase());
    const regex = new RegExp(keywords.join('|'), 'i');

    const posts = await CommunityPost.find({
        $or: [
            { title: { $regex: regex } },
            { content: { $regex: regex } },
        ]
    }).limit(5);

    const context = posts.map(p => `Title: ${p.title}\nContent: ${p.content}`).join('\n\n');

    const prompt = `
You are a helpful community assistant. Here's what others have discussed:\n
${context}\n\n
User question: ${input}
`;

    const responseText = await aiAgent.invoke(prompt);

    // Step 2: Save interaction
    if (userId) {
        await AllInteractions.create({
            userId,
            query: input,
            response: responseText,
            matchedPostIds: posts.map(p => p._id)
        });
    }

    // Step 3: Suggest follow-up questions (simplified demo)
    const suggestions = [
        `Can you elaborate on "${input}"?`,
        `What are community concerns regarding "${keywords[0]}"?`
    ];

    return {
        text: responseText,
        suggestedQuestions: suggestions,
        retrievedPosts: posts
    };
}

module.exports = { communityAIQuery };
