const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar Date

    type User {
        id: ID!
        username: String!
        email: String!
        role: String!
        createdAt: Date
    }

    type CommunityPost {
        id: ID!
        author: User
        title: String!
        content: String!
        category: String!
        aiSummary: String
        createdAt: Date
        updatedAt: Date
    }

    type HelpRequest {
        id: ID!
        author: User
        description: String!
        location: String
        isResolved: Boolean
        volunteers: [User]
        createdAt: Date
        updatedAt: Date
    }

    type AIResponse {
        text: String!
        suggestedQuestions: [String]!
        retrievedPosts: [CommunityPost]!
    }

    type Query {
        posts: [CommunityPost]
        post(id: ID!): CommunityPost
        helpRequests: [HelpRequest]
        helpRequest(id: ID!): HelpRequest
        communityAIQuery(input: String!): AIResponse!
    }

    type Mutation {
        createPost(authorId: ID!, title: String!, content: String!, category: String!): CommunityPost
        updatePost(id: ID!, title: String, content: String, aiSummary: String): CommunityPost
        deletePost(id: ID!): Boolean

        createHelpRequest(authorId: ID!, description: String!, location: String): HelpRequest
        updateHelpRequest(id: ID!, description: String, location: String, isResolved: Boolean): HelpRequest
        deleteHelpRequest(id: ID!): Boolean
    }
`;

module.exports = typeDefs;
