import React from 'react';
import CreatePostForm from './CreatePostForm';
import CreateHelpRequestForm from './CreateHelpRequestForm';

export default function RoleBasedActions({ role }) {
    if (!role) return null;

    return (
        <section className="bg-white p-6 rounded-xl shadow-md border space-y-6">
            <h3 className="text-xl font-semibold text-green-700">
                🔧 Role Actions <span className="text-sm text-gray-500">({role.replace('_', ' ')})</span>
            </h3>

            {role === 'resident' && (
                <>
                    <CreatePostForm />
                    <CreateHelpRequestForm />
                </>
            )}

            {role === 'business_owner' && <CreateHelpRequestForm />}

            {role === 'community_organizer' && <CreatePostForm />}
        </section>
    );
}
