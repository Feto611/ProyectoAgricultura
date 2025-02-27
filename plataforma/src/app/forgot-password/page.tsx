'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from "framer-motion";

export default function OlvidarContra() {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSendCode = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        setError('');
        // Aquí iría la lógica para restablecer la contraseña
    };

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <motion.div 
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-lg w-96"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
                    {step === 1 ? "Recuperar Contraseña" : "Ingrese Código y Nueva Contraseña"}
                </h2>
                {step === 1 ? (
                    <form className="space-y-4" onSubmit={handleSendCode}>
                        <div>
                            <label htmlFor="email" className="block text-gray-600 mb-1 font-medium">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-200 outline-none"
                                required
                            />
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit" 
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Enviar Código
                        </motion.button>
                    </form>
                ) : (
                    <form className="space-y-4" onSubmit={handleResetPassword}>
                        <div>
                            <label htmlFor="code" className="block text-gray-600 mb-1 font-medium">Código de Verificación</label>
                            <input
                                type="text"
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-200 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-600 mb-1 font-medium">Nueva Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-200 outline-none pr-10"
                                    required
                                />
                                <span onClick={togglePasswordVisibility} className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-gray-600 mb-1 font-medium">Confirmar Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-green-200 outline-none pr-10"
                                    required
                                />
                                <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit" 
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Restablecer Contraseña
                        </motion.button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}


