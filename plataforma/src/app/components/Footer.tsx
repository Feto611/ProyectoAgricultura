'use client';
import React, { Component } from 'react';
import { motion } from 'framer-motion';

export default function Footer() { 
        return (
        <footer className="bg-gray-800 text-white p-9 mt-8">
            <div className="container mx-100% grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h3 className="text-xl font-bold mb-2">Datos de Contacto</h3>
                    <motion.img
                        src="/icons/logo3.svg"
                        alt="Logo"
                        className="w-11 h-11 pr-4"
                        style={{ transform: 'scale(7.0)', marginLeft: '150px' }}
                        transition={{ duration: 0.2 }}
                    />
                    <br />
                    <p>Teléfono: +123 456 7890</p>
                    <p>Email: contacto@empresa.com</p>
                    <p>Dirección: Calle Falsa 123, Ciudad, País</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Política de la Empresa</h3>
                    <p>Nuestra empresa se compromete a darles los mejores servicios al cliente y hacer un cambio por la humanidad en busca de mejorar la calidad de vida.</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Síguenos</h3>
                    <div className="flex space-x-4">
                        <a href="#" title="Facebook">
                            <img src="/images/communication.png" alt="Facebook" className="w-8 h-8" />
                        </a>
                        <a href="#" title="Twitter">
                            <img src="/images/twitter.png" alt="Twitter" className="w-8 h-8" />
                        </a>
                        <a href="#" title="Instagram">
                            <img src="/images/social.png" alt="Instagram" className="w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
     );
    }