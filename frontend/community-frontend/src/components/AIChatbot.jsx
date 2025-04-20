import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import PostCard from './PostCard';

const COMMUNITY_AI_QUERY = gql`
    query CommunityAIQuery($input: String!) {
        communityAIQuery(input: $input) {
            text
            suggestedQuestions
            retrievedPosts {
                id
                title
                content
                category
                author { username }
            }
        }
    }
`;

export default function AIChatbot() {
    const [query, setQuery] = useState('');
    const [getAIResponse, { data, loading, error }] = useLazyQuery(COMMUNITY_AI_QUERY);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            getAIResponse({ variables: { input: query } });
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 my-6">
            <h3 className="text-xl font-semibold mb-4">💬 Community AI Assistant</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Ask about community topics, e.g. 'What are people saying about safety?'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="p-2 border rounded"
                />
                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                    Ask AI
                </button>
            </form>

            {loading && <p className="text-gray-500 mt-4">🤖 Thinking...</p>}
            {error && <p className="text-red-500 mt-4">❌ Error: {error.message}</p>}

            {data && (
                <div className="mt-6 space-y-4">
                    <div>
                        <h4 className="font-bold">AI Response:</h4>
                        <p className="bg-gray-100 p-3 rounded">{data.communityAIQuery.text}</p>
                    </div>

                    {data.communityAIQuery.suggestedQuestions.length > 0 && (
                        <div>
                            <h4 className="font-bold">Suggested Follow-up Questions:</h4>
                            <ul className="list-disc ml-6 text-blue-600">
                                {data.communityAIQuery.suggestedQuestions.map((q, i) => (
                                    <li key={i}>{q}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {data.communityAIQuery.retrievedPosts.length > 0 && (
                        <div>
                            <h4 className="font-bold">Related Posts:</h4>
                            <div className="space-y-4">
                                {data.communityAIQuery.retrievedPosts.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
