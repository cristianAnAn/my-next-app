'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token); // true si hay token
  }, []);

  // No mostrar si el usuario ya inició sesión o si está en /welcome
  if (isLoggedIn || pathname === '/welcome') return null;

  return (
    <nav className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Mi App</div>
      <div className="flex gap-4">
        <Link href="/login" className="hover:underline">
          Iniciar sesión
        </Link>
        <Link href="/register" className="hover:underline">
          Registrarse
        </Link>
      </div>
    </nav>
  );
}
