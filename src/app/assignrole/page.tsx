'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';
type DecodedToken = {
  roles: string[];
  exp: number;
};

export default function AssignRolePage() {
  const [formData, setFormData] = useState({
    email: '',
    role: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const isAdmin = decoded.roles.includes('ADMINISTRADOR');

      if (!isAdmin) {
        router.push('/');
      }
    } catch (err) {
      console.error('Token inválido o corrupto');
      router.push('/login');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/assignRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.isSuccess) {
        setMessage('✅ Rol asignado exitosamente');
      } else {
        setMessage(`❌ ${data.message || 'Error al asignar rol'}`);
      }
    } catch (err: any) {
      console.error(err);
      setMessage(`🔥 Error de red: ${err.message}`);
    }
  };

  return (
        <>
      <NavbarLoggedIn />
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-base leading-relaxed">
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-black mb-6 text-center">Asignar Rol</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-black font-medium">Correo del usuario</label>
            <motion.input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@correo.com"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 text-black font-medium">Rol a asignar</label>
            <motion.select
              id="role"
              name="role"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <option value="">Selecciona un rol</option>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              <option value="USUARIO">USUARIO</option>
            </motion.select>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-transform"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Asignar Rol
          </motion.button>
        </form>

        {message && (
          <motion.div
            className={`mt-5 p-3 rounded-lg text-sm text-black ${message.startsWith('✅') ? 'bg-green-500' : 'bg-red-500'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </main>
        </>
  );
}
