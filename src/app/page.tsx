'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white font-sans text-black">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          ¡Bienvenido a Mi Aplicación!
        </motion.h2>
        <motion.p
          className="max-w-xl text-lg text-gray-700 mb-8 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Gestiona usuarios, inicios de sesión y roles de forma sencilla y segura. Navega por las secciones para registrar usuarios, iniciar sesión o asignar roles.
        </motion.p>
        <div className="flex space-x-4">
          <motion.a
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Registrar
          </motion.a>
          <motion.a
            href="/login"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Iniciar Sesión
          </motion.a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
          {[
            { title: 'Registro de Usuarios', icon: '📝', desc: 'Crea nuevas cuentas de usuario con roles personalizados.' },
            { title: 'Inicio de Sesión', icon: '🔐', desc: 'Accede de forma segura a tu cuenta registrada.' },
            { title: 'Asignación de Roles', icon: '🛡️', desc: 'Gestiona permisos asignando roles a usuarios existentes.' },
            { title: 'Interfaz Intuitiva', icon: '💻', desc: 'Navegación fluida y diseño moderno.' }
          ].map((f) => (
            <motion.div
              key={f.title}
              className="p-6 border border-gray-200 rounded-lg shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mi Aplicación. Todos los derechos reservados.
      </footer>
    </main>
  );
}
