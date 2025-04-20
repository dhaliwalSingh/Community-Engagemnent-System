import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import { Container, Card, Button, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

export default function App() {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <Card style={{ width: '100%', maxWidth: '420px' }} className="p-4 shadow">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold mb-0">
                        <span role="img" aria-label="lock">🔐</span> Auth Module
                    </h4>
                    <Logout />
                </div>

                <ToggleButtonGroup
                    type="radio"
                    name="authToggle"
                    value={activeTab}
                    onChange={setActiveTab}
                    className="mb-4 w-100 d-flex justify-content-between"
                >
                    <ToggleButton id="login-tab" value="login" variant="outline-primary">
                        Login
                    </ToggleButton>
                    <ToggleButton id="signup-tab" value="signup" variant="outline-primary">
                        Sign Up
                    </ToggleButton>
                </ToggleButtonGroup>

                {activeTab === 'login' ? <Login /> : <Signup />}
            </Card>
        </Container>
    );
}
