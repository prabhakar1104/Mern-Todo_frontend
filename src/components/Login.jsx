import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_URL } from '../config/config';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
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
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
                    Login
                </button>
                <p className="mt-4 text-center">
                    Don't have an account? 
                    <span 
                        className="text-blue-500 cursor-pointer ml-1"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </span>
                </p>

                <p className="mt-2 text-center">
                    <span 
                 className="text-blue-500 cursor-pointer"
                 onClick={() => navigate('/forgot-password')}
                >
        Forgot Password?
    </span>
</p>
            </form>
        </div>
    );
};