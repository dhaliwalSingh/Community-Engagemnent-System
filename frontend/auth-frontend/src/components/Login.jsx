import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';

const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user { id username role }
        }
    }
`;

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login({ variables: form });
        localStorage.setItem('token', res.data.login.token);
        localStorage.setItem('role', res.data.login.user.role);
        localStorage.setItem('userId', res.data.login.user.id);
        alert(`Welcome back, ${res.data.login.user.username}`);
        window.location.href = '/community';
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h4 className="mb-4 text-center fw-bold">Log In</h4>

            {error && <Alert variant="danger">Error: {error.message}</Alert>}

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
            </Button>
        </Form>
    );
}
