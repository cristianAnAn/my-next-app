// components/Navbar.tsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
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
          <li>
            <Link href="/" className="text-black font-medium hover:text-blue-700 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-black font-medium hover:text-blue-700 transition-colors">
              Registrar
            </Link>
          </li>
          <li>
            <Link href="/login" className="text-black font-medium hover:text-blue-700 transition-colors">
              Iniciar Sesión
            </Link>
          </li>
          <li>
            <Link href="/assignrole" className="text-black font-medium hover:text-blue-700 transition-colors">
              Asignar Rol
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
}
