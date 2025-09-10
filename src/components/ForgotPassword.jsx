import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.warning('Please enter your email');
            return;
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email');
            return;
        }
        try {
            await axios.post('http://localhost:3001/forgot-password', { email });
            toast.success('Please check your email for OTP');
            navigate('/reset-password', { state: { email } });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to process request');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                <p className="text-gray-600 text-center mb-6">
                    Enter your email address to receive a password reset OTP
                </p>
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 mb-4 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Send Reset OTP
                </button>
                <p className="mt-4 text-center">
                    <span 
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Back to Login
                    </span>
                </p>
            </form>
        </div>
    );
};