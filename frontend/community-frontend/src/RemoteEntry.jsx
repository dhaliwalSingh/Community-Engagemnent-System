import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
    uri: 'http://localhost:4002/graphql',
    cache: new InMemoryCache()
});

export default function CommunityApp() {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}
