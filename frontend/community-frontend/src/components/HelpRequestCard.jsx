import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_HELP = gql`
    mutation DeleteHelpRequest($id: ID!) {
        deleteHelpRequest(id: $id)
    }
`;

const TOGGLE_RESOLVED = gql`
    mutation UpdateHelpRequest($id: ID!, $isResolved: Boolean) {
        updateHelpRequest(id: $id, isResolved: $isResolved) {
            id
        }
    }
`;

const UPDATE_HELP = gql`
    mutation UpdateHelpRequestFull($id: ID!, $description: String, $location: String) {
        updateHelpRequest(id: $id, description: $description, location: $location) {
            id
        }
    }
`;

export default function HelpRequestCard({ request }) {
    const role = localStorage.getItem('role');
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({ description: request.description, location: request.location });

    const [deleteHelp] = useMutation(DELETE_HELP, {
        variables: { id: request.id },
        onCompleted: () => window.location.reload()
    });

    const [toggleResolved] = useMutation(TOGGLE_RESOLVED, {
        variables: { id: request.id, isResolved: !request.isResolved },
        onCompleted: () => window.location.reload()
    });

    const [updateHelp] = useMutation(UPDATE_HELP, {
        variables: { id: request.id, ...form },
        onCompleted: () => window.location.reload()
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <div className={`rounded-xl p-5 shadow border-l-4 ${request.isResolved ? 'border-green-500' : 'border-red-500'} bg-white`}>
            {editMode ? (
                <>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Description"
                    />
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Location"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => updateHelp()}
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
                    <h4 className="text-md font-semibold">{request.description}</h4>
                    <p className="text-sm text-gray-600 mb-1">📍 {request.location || 'N/A'}</p>
                    <p className="text-sm">
                        Status:{' '}
                        <span className={`ml-2 font-medium ${request.isResolved ? 'text-green-600' : 'text-red-600'}`}>
                            {request.isResolved ? '✅ Resolved' : '❌ Pending'}
                        </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">👤 {request.author?.username || 'Unknown'}</p>

                    {role === 'community_organizer' && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            <button
                                onClick={toggleResolved}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Mark as {request.isResolved ? 'Unresolved' : 'Resolved'}
                            </button>
                            <button
                                onClick={() => setEditMode(true)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={deleteHelp}
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
