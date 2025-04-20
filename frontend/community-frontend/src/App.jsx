import React from 'react';
import CommunityFeed from './components/CommunityFeed';
import RoleBasedActions from './components/RoleBasedActions';
import AIChatbot from "./components/AIChatbot.jsx";

export default function App() {
    const role = localStorage.getItem('role');

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto space-y-10">
                <header className="text-center">
                    <h1 className="text-3xl font-bold text-blue-700 flex items-center justify-center gap-2">
                        🌐 Community Portal
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Engage and connect with your local community</p>
                </header>
                <AIChatbot/>
                <CommunityFeed />
                <RoleBasedActions role={role} />
            </div>
        </div>
    );
}
