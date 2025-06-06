'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    password: '',
    role: 'user'
  });

  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState<null | {
    email: string;
    name: string;
    phoneNumber: string;
  }>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.isSuccess) {
        setUserInfo({
          email: data.result.email,
          name: data.result.name,
          phoneNumber: data.result.phoneNumber
        });
        setMessage('✅ Registro exitoso');
      } else {
        setUserInfo(null);
        setMessage(`❌ ${data.message || 'Algo salió mal'}`);
      }
    } catch (error: any) {
      console.error(error);
      setUserInfo(null);
      setMessage(`🔥 Error de red: ${error.message}`);
    }
  };

  return (
    
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans text-base leading-relaxed">
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-black mb-6 text-center">
          Registro de Usuario
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-black font-medium">Correo electrónico</label>
            <motion.input
              id="email"
              name="email"
              type="email"
              placeholder="tu@correo.com"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1 text-black font-medium">Nombre completo</label>
            <motion.input
              id="name"
              name="name"
              placeholder="Nombre completo"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block mb-1 text-black font-medium">Teléfono</label>
            <motion.input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Número de teléfono"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-black font-medium">Contraseña</label>
            <motion.input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña segura"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-1 text-black font-medium">Rol de usuario</label>
            <motion.input
              id="role"
              name="role"
              placeholder="ej. user"
              onChange={handleChange}
              defaultValue="user"
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-transform"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Registrar
          </motion.button>
        </form>

        {message && (
          <motion.div
            className={`mt-5 p-3 rounded-lg text-sm text-black bg-${message.startsWith('✅') ? 'green' : 'red'}-500`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {message}
          </motion.div>
        )}

        {userInfo && (
          <motion.div
            className="mt-6 bg-green-50 border border-green-300 rounded-lg p-4 text-black"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-semibold mb-3">🎉 ¡Registro completado!</h2>
            <p><span className="font-medium">📧 Email:</span> {userInfo.email}</p>
            <p><span className="font-medium">👤 Nombre:</span> {userInfo.name}</p>
            <p><span className="font-medium">📱 Teléfono:</span> {userInfo.phoneNumber}</p>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
