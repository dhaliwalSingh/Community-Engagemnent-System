import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`;

const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $title: String, $content: String) {
        updatePost(id: $id, title: $title, content: $content) {
            id
        }
    }
`;

export default function PostCard({ post }) {
    const role = localStorage.getItem('role');
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ title: post.title, content: post.content });

    const [deletePost] = useMutation(DELETE_POST, {
        variables: { id: post.id },
        onCompleted: () => window.location.reload()
    });

    const [updatePost] = useMutation(UPDATE_POST, {
        variables: { id: post.id, ...form },
        onCompleted: () => window.location.reload()
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className="bg-white rounded-xl p-5 shadow border space-y-3">
            {editMode ? (
                <>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Title"
                    />
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Content"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => updatePost()}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditMode(false)}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h4 className="text-lg font-semibold">{post.title}</h4>
                    <p className="text-gray-700">{post.content}</p>
                    <div className="text-sm text-gray-500 flex justify-between items-center">
                        <span>🗂️ {post.category}</span>
                        <span>👤 {post.author?.username || 'Unknown'}</span>
                    </div>

                    {role === 'community_organizer' && (
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={deletePost}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
