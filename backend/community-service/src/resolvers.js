const CommunityPost = require('./models/CommunityPost');
const HelpRequest = require('./models/HelpRequest');
const User = require('./models/User');
const {communityAIQuery} = require('./ai/CommunityAgent')

const resolvers = {
    Query: {
        posts: async () =>
            await CommunityPost.find().populate({ path: 'author', model: 'User' }),
        post: async (_, { id }) => await CommunityPost.findById(id).populate('author'),
        helpRequests: async () =>
            await HelpRequest.find()
                .populate({ path: 'author', model: 'User' })
                .populate('volunteers'),
        helpRequest: async (_, { id }) =>
            await HelpRequest.findById(id).populate('author').populate('volunteers'),


        communityAIQuery: async (_, { input }) => {
            return await communityAIQuery(input);
        },
    },



    Mutation: {
        createPost: async (_, { authorId, title, content, category }) => {
            const post = new CommunityPost({
                author: authorId,
                title,
                content,
                category,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return await post.save();
        },
        updatePost: async (_, { id, title, content, aiSummary }) => {
            const post = await CommunityPost.findById(id);
            if (!post) throw new Error('Post not found');
            if (title) post.title = title;
            if (content) post.content = content;
            if (aiSummary) post.aiSummary = aiSummary;
            post.updatedAt = new Date();
            return await post.save();
        },
        deletePost: async (_, { id }) => {
            await CommunityPost.findByIdAndDelete(id);
            return true;
        },
        createHelpRequest: async (_, { authorId, description, location }) => {
            const helpRequest = new HelpRequest({
                author: authorId,
                description,
                location,
                isResolved: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return await helpRequest.save();
        },
        updateHelpRequest: async (_, { id, description, location, isResolved }) => {
            const helpRequest = await HelpRequest.findById(id);
            if (!helpRequest) throw new Error('Help request not found');
            if (description) helpRequest.description = description;
            if (location) helpRequest.location = location;
            if (typeof isResolved === 'boolean') helpRequest.isResolved = isResolved;
            helpRequest.updatedAt = new Date();
            return await helpRequest.save();
        },
        deleteHelpRequest: async (_, { id }) => {
            await HelpRequest.findByIdAndDelete(id);
            return true;
        }
    },
    CommunityPost: {
        author: async parent => {
            const user = await User.findById(parent.author);
            console.log('[DEBUG] Populated User:', user);
            return user;
        }
    },
    HelpRequest: {
        author: async parent => await User.findById(parent.author),
        volunteers: async parent =>
            await User.find({ _id: { $in: parent.volunteers } })
    }
};

module.exports = resolvers;
