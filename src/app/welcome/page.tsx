// app/welcome/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  name: string;
  roles: string[];
  exp: number;
};

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const exp = decoded.exp * 1000;
      if (Date.now() > exp) {
        sessionStorage.removeItem('token');
        router.push('/login');
      }
    } catch (e) {
      sessionStorage.removeItem('token');
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">👋 ¡Bienvenido!</h1>
      <p className="text-lg text-gray-700 mb-6">Has iniciado sesión correctamente.</p>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
      >
        Cerrar sesión
      </button>
    </main>
  );
}
