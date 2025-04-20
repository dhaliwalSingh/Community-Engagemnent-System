import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql`
    mutation CreatePost($authorId: ID!, $title: String!, $content: String!, $category: String!) {
        createPost(authorId: $authorId, title: $title, content: $content, category: $category) {
            id title
        }
    }
`;

export default function CreatePostForm() {
    const [form, setForm] = useState({ title: '', content: '', category: 'news' });
    const [createPost] = useMutation(CREATE_POST);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({
            variables: {
                ...form,
                authorId: localStorage.getItem('userId')
            }
        });
        alert('Post created!');
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-5 border">
            <h4 className="text-xl font-semibold text-blue-700 mb-4">📢 Create Community Post</h4>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Content</label>
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Content"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md h-28 focus:ring-2 focus:ring-blue-400"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                >
                    <option value="news">News</option>
                    <option value="discussion">Discussion</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
                Submit Post
            </button>
        </form>
    );
}
