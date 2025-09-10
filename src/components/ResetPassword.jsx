import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const ResetPassword = () => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();
    const email = state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/reset-password`, {
                email,
                otp,
                newPassword
            });
            toast.success('Password reset successful!');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Password reset failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="w-full p-2 mb-4 border rounded"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full p-2 mb-4 border rounded"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Reset Password
                </button>
            </form>
        </div>
    );
};