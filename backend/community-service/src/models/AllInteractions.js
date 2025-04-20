const mongoose = require('mongoose');

const aiInteractionSchema = new mongoose.Schema({
    userId: { type: String }, // Optional: can be anonymous
    input: { type: String, required: true },
    response: { type: String, required: true },
    suggestedQuestions: [String],
    retrievedPostIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommunityPost' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AIInteraction', aiInteractionSchema);
