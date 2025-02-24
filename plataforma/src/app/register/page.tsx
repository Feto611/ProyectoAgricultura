'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './register.css'; 

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const router = useRouter();

    interface RegisterFormData {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        termsAccepted: boolean;
    }

    const handleRegister = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!termsAccepted) {
            alert("Please accept the terms and conditions.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Handle registration logic here (e.g., API call)
        const formData: RegisterFormData = { firstName, lastName, email, password, confirmPassword, termsAccepted };
        console.log("Registration submitted", formData);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Registro</h2>
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <label htmlFor="firstName" className="form-label">Nombre</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Apellido</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <div className="password-container">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-input password-input"
                            required
                        />
                         <span onClick={toggleConfirmPasswordVisibility} className="password-toggle2">
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="form-group terms-group">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="form-checkbox"
                        required
                    />
                    <label htmlFor="terms" className="form-label terms-label">
                        Acepto los <a href="/terms" target="_blank">términos y condiciones</a>
                    </label>
                </div>
                <button type="submit" className="register-button">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;