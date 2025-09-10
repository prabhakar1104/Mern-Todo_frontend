import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const VerifyEmail = () => {  // Changed from ForgotPassword to VerifyEmail
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email;

    if (!email) {
        navigate('/register');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/verify-email', {
                email,
                otp
            });
            toast.success('Email verified successfully!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Verification failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
                <p className="mb-4 text-center text-gray-600">
                    Please enter the OTP sent to your email: {email}
                </p>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full p-2 mb-4 border rounded"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Verify
                </button>
            </form>
        </div>
    );
};