'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  name: string;
  roles: string[];
  exp: number;
};

export default function NavbarLoggedIn() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const exp = decoded.exp * 1000;
      if (Date.now() < exp) {
        setUser(decoded);
      } else {
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

  if (!user) return null;

  const isAdministrador = user.roles.includes('ADMINISTRADOR');

  return (
    <nav className="w-full bg-blue-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Mi App</div>
      <div className="flex gap-4 items-center">
        <span className="hidden sm:inline">Hola, {user.name} 👋</span>
        <Link href="/welcome" className="hover:underline text-white font-semibold">
          Inicio
        </Link>
        <Link href="/products" className="hover:underline text-white font-semibold">
          Productos
        </Link>

        {isAdministrador && (
          <div className="relative group">
            <button className="hover:underline text-white font-semibold uppercase">
              ADMISTRADOR ⬇
            </button>
            <div className="absolute bg-white text-blue-800 rounded shadow-md mt-1 p-2 w-48 hidden group-hover:block z-50">
              <Link
                href="/assignrole"
                className="block px-4 py-2 hover:bg-blue-100 rounded transition"
              >
                Asignar Roles
              </Link>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
