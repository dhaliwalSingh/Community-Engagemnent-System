import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_HELP = gql`
    mutation CreateHelpRequest($authorId: ID!, $description: String!, $location: String) {
        createHelpRequest(authorId: $authorId, description: $description, location: $location) {
            id
        }
    }
`;

export default function CreateHelpRequestForm() {
    const [form, setForm] = useState({ description: '', location: '' });
    const [createHelp] = useMutation(CREATE_HELP);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createHelp({
            variables: {
                ...form,
                authorId: localStorage.getItem('userId')
            }
        });
        alert('Help request created!');
        window.location.reload();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-5 border">
            <h4 className="text-xl font-semibold text-green-700 mb-4">🤝 Request Help</h4>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your request"
                    required
                    className="w-full p-3 border border-gray-300 rounded-md h-28 focus:ring-2 focus:ring-green-400"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location (optional)</label>
                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
                Submit Request
            </button>
        </form>
    );
}
