'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


type DecodedToken = {
  roles: string[];
};

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.roles?.includes('ADMINISTRADOR')) {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Error al decodificar token:', err);
      }
    }
  }, []);

  return (
    <motion.nav
      className="bg-white shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold text-blue-600"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          Mi Aplicación
        </motion.h1>
        <ul className="flex space-x-6">
          <li><Link href="/" className="text-black font-medium hover:text-blue-700">Home</Link></li>
          <li><Link href="/register" className="text-black font-medium hover:text-blue-700">Registrar</Link></li>
          <li><Link href="/login" className="text-black font-medium hover:text-blue-700">Iniciar Sesión</Link></li>
          {isAdmin && (
            <li><Link href="/assignrole" className="text-black font-medium hover:text-blue-700">Asignar Rol</Link></li>
          )}
        </ul>
      </div>
    </motion.nav>
  );
}
