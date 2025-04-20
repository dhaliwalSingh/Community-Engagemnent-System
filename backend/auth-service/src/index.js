const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const startServer = async () => {
    const app = express();

    // Connect to MongoDB
    await connectDB();

    // Create Apollo Server instance
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req })
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
        console.log(`Auth service running at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();
