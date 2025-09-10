import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/config';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


 const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
    }
    try {
        await axios.post(`${API_URL}/register`, {
            email,
            password
        });
        toast.success('Registration successful! Please check your email for verification');
        navigate('/verify-email', { state: { email } });
    } catch (err) {
        toast.error(err.response?.data?.message || 'Registration failed');
    }
 };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <Link 
                to="/" 
                className="absolute top-6 left-6 text-white flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                </svg>
                <span>Back to Home</span>
            </Link>
            <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Register
                </button>
                <p className="mt-4 text-center">
                    Already have an account? 
                    <span 
                        className="text-blue-500 cursor-pointer ml-1"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};