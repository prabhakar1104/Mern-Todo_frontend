import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/ThemeContext'; 
import { Dashboard } from "./components/Dashboard";
import { Home } from "./Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { VerifyEmail } from "./components/VerifyEmail";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";
import 'react-toastify/dist/ReactToastify.css';

// ...rest of the code remains the same
// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};

function App() {
    return (
    <ThemeProvider>
        <Router>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    </ThemeProvider>
    );
}

export default App;