'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Price: '',
    CategoryName: '',
    image: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
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
    <>
      <NavbarLoggedIn />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">🆕 Crear Nuevo Producto</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
        >
          <div>
            <label htmlFor="Name" className="block text-sm font-medium text-blue-800 mb-1">Nombre del producto</label>
            <input
              id="Name"
              name="Name"
              type="text"
              placeholder="Ej: Camisa blanca"
              onChange={handleChange}
              required
              className="w-full text-black border border-blue-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="Description" className="block text-sm font-medium text-blue-800 mb-1">Descripción</label>
            <input
              id="Description"
              name="Description"
              type="text"
              placeholder="Descripción breve"
              onChange={handleChange}
              className="w-full text-black border border-blue-300 bg-white p-3 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="Price" className="block text-sm font-medium text-blue-800 mb-1">Precio</label>
            <input
              id="Price"
              name="Price"
              type="number"
              placeholder="Ej: 99.99"
              onChange={handleChange}
              required
              className="w-full text-black border border-blue-300 bg-white p-3 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="CategoryName" className="block text-sm font-medium text-blue-800 mb-1">Categoría</label>
            <input
              id="CategoryName"
              name="CategoryName"
              type="text"
              placeholder="Ej: Ropa, Calzado, Accesorios"
              onChange={handleChange}
              className="w-full text-black border border-blue-300 bg-white p-3 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-blue-800 mb-1">Imagen</label>
            <div className="w-full border-2 border-dashed border-blue-300 rounded-lg p-4 bg-white text-center hover:border-blue-500 transition cursor-pointer">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              <label htmlFor="image" className="block text-blue-700 text-sm font-medium cursor-pointer">
                {preview ? (
                  <img src={preview} alt="Vista previa" className="mx-auto h-40 object-contain rounded-md" />
                ) : (
                  <>
                    <div className="text-4xl">📷</div>
                    <p className="mt-2">Haz clic para subir una imagen</p>
                  </>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Crear Producto
          </button>

          {message && (
            <div className="text-sm text-center text-blue-800 font-medium">{message}</div>
          )}
        </form>
      </main>
    </>
  );
}
