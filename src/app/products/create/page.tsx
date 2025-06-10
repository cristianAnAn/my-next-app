// app/products/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Price: '',
    CategoryName: '',
    image: null as File | null
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    const data = new FormData();
    data.append('Name', formData.Name);
    data.append('Description', formData.Description);
    data.append('Price', formData.Price);
    data.append('CategoryName', formData.CategoryName);
    if (formData.image) data.append('image', formData.image);

    const res = await fetch('http://localhost:3200/api/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    });

    const result = await res.json();
    if (res.ok && result.success) {
      setMessage('✅ Producto creado');
      setTimeout(() => router.push('/products'), 1000);
    } else {
      setMessage('❌ ' + result.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🆕 Crear Producto</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg space-y-4">
        <input name="Name" placeholder="Nombre" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="Description" placeholder="Descripción" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="Price" type="number" placeholder="Precio" onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="CategoryName" placeholder="Categoría (ej. Zapatos, Accesorios...)" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="image" type="file" accept="image/*" onChange={handleFile} className="w-full" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Crear</button>
        {message && <div className="text-sm text-center mt-2">{message}</div>}
      </form>
    </main>
  );
}


