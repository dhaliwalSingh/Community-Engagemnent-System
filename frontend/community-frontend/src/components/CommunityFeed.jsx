import React from 'react';
import { useQuery, gql } from '@apollo/client';
import PostCard from './PostCard';
import HelpRequestCard from './HelpRequestCard';

const GET_ALL = gql`
    query {
        posts {
            id title content category aiSummary createdAt updatedAt author { username }
        }
        helpRequests {
            id description location isResolved createdAt updatedAt author { username }
        }
    }
`;

export default function CommunityFeed() {
    const { data, loading, error } = useQuery(GET_ALL);

    if (loading) return <p className="text-gray-600 text-center mt-6">Loading community content...</p>;
    if (error) return <p className="text-red-500 text-center mt-6">Error: {error.message}</p>;

    return (
        <div className="space-y-12 mt-8">
            <section className="bg-white rounded-xl shadow-md p-6 border">
                <h3 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                    📢 Community Posts
                </h3>
                <div className="d-flex flex-column gap-4">
                    {data.posts.map(post => (
                        <div key={post.id} className="border rounded p-3 bg-white shadow-sm">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>

            </section>
                        <br/>
            <section className="bg-white rounded-xl shadow-md p-6 border">
                <h3 className="text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
                    🤝 Help Requests
                </h3>
                <div className="grid gap-6">
                    {data.helpRequests.map(req => (
                        <HelpRequestCard key={req.id} request={req} />
                    ))}
                </div>
            </section>
        </div>
    );
}
