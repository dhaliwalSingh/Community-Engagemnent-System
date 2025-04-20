import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const SIGNUP_MUTATION = gql`
    mutation Signup($username: String!, $email: String!, $password: String!, $role: String!) {
        signup(username: $username, email: $email, password: $password, role: $role) {
            token
            user { id username role }
        }
    }
`;

export default function Signup() {
    const [form, setForm] = useState({ username: '', email: '', password: '', role: 'resident' });
    const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await signup({ variables: form });
        localStorage.setItem('token', res.data.signup.token);
        localStorage.setItem('role', res.data.signup.user.role);
        localStorage.setItem('userId', res.data.signup.user.id);
        alert(`Signed up as ${res.data.signup.user.username}`);
        window.location.href = '/community';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">📝 Create an Account</h3>

            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-400"
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-400"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-400"
                required
            />

            <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-400"
            >
                <option value="resident">Resident</option>
                <option value="business_owner">Business Owner</option>
                <option value="community_organizer">Community Organizer</option>
            </select>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition-colors"
            >
                {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            {error && <p className="text-red-500 text-sm">⚠️ {error.message}</p>}
        </form>
    );
}
