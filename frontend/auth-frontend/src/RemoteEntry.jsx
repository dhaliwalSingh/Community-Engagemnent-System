import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';
import { BrowserRouter, useNavigate } from 'react-router-dom';

const client = new ApolloClient({
    uri: 'http://localhost:4001/graphql',
    cache: new InMemoryCache()
});

// Wrap with BrowserRouter here or make sure it's in shell
export default function AuthAppWrapper() {
    return (
        <ApolloProvider client={client}>
                <App />
        </ApolloProvider>
    );
}
