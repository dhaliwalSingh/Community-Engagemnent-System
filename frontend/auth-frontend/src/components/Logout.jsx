import React from 'react';

export default function Logout() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        alert('Logged out!');
        window.location.href = '/auth';
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-blue-500 hover:underline font-medium"
        >
            Log Out
        </button>
    );
}
