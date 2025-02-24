'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    interface LoginFormProps {
        email: string;
        password: string;
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login submitted", email, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = () => {
        if (router) {
            router.push('/forgot-password');
        } else {
            console.warn("Router not yet available.");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Inicio de Sesión</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                <label htmlFor="password" className="form-label">Contraseña</label>
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input password-input"
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="password-toggle">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
            <p className="forgot-password" onClick={handleForgotPassword}>
                ¿Olvidaste la contraseña?
            </p>
        </div>
    );
};

export default Login;