'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';


export default function Navbar() {
    const pathname = usePathname();
    const [routes, setRoutes] = useState([
        { name: 'Inicio', path: '/' },
        { name: 'Servicios', path: '/servicios' },
        { name: 'Contacto', path: '/contacto' },
        { name: 'Sobre Nosotros', path: '/about-us' },
        {name: 'pruebas', path: '/registrarServicios'},
    ]);

    return (
        <nav className="bg-[#3DFF04] border-4 border-black p-4 shadow-md lg">
            <div className="flex items-center justify-between ml-12"> 
                <div className="flex items-center space-x-4"> 
                    <motion.img
                        src="/icons/logo1.svg"
                        alt="Logo"
                        className="w-8 h-8 pr-4" 
                        style={{ transform: 'scale(4.8)' }}
                        transition={{ duration: 0.2 }}
                    />
                    {/* Enlaces de la navbar */}
                    <ul className="flex space-x-4">
                        {routes.map((route) => (
                            <li key={route.path} className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                    className="inline-block"
                                >
                                    <Link
                                        href={route.path}
                                        className={`px-4 py-2 rounded transition-colors duration-300 ${pathname === route.path ? 'bg-green-800 text-green-200' : 'text-black'}`}
                                    >
                                        {route.name}
                                    </Link>
                                </motion.div>
                                {pathname === route.path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 bottom-0 w-full h-1 bg-green-200"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Ícono de usuario y botones de login/registro */}
                <div className="flex items-center space-x-4">
                    <motion.img
                        src="/icons/usuario.png"
                        alt="User"
                        className="w-8 h-8 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                    />
                    <div className="flex space-x-4">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <Link href="/login" className="block px-4 py-2 text-black hover:bg-green-700">
                                Iniciar sesión
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                            <Link href="/register" className="block px-4 py-2 text-black hover:bg-green-700">
                                Registrar
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
