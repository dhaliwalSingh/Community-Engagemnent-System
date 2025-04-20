const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const startServer = async () => {
    const app = express();

    // Connect to MongoDB
    await connectDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req })
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const PORT = process.env.PORT || 4002;
    app.listen(PORT, () => {
        console.log(`Community service running at http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();
