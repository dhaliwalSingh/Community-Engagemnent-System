import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

const AuthApp = lazy(() => import('auth/AuthApp'));
const CommunityApp = lazy(() => import('community/CommunityApp'));

const App = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 font-sans">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                        🧩 Shell Host Application
                    </h1>
                    <nav className="flex gap-4 text-blue-600">
                        <Link to="/auth" className="hover:underline">Auth</Link>
                        <Link to="/community" className="hover:underline">Community</Link>
                    </nav>
                </header>

                <main className="p-6 max-w-4xl mx-auto">
                    <Routes>
                        <Route path="/auth" element={
                            <Suspense fallback={<div className="text-gray-500">Loading Auth Module...</div>}>
                                <AuthApp />
                            </Suspense>
                        } />
                        <Route path="/community" element={
                            isLoggedIn ? (
                                <Suspense fallback={<div className="text-gray-500">Loading Community Module...</div>}>
                                    <CommunityApp />
                                </Suspense>
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        } />
                        <Route path="*" element={<Navigate to="/auth" replace />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
