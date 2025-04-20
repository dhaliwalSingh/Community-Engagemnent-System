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

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        me: User
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!, role: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        logout: Boolean
    }
`;

module.exports = typeDefs;
