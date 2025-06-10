'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavbarLoggedIn from '@/components/NavbarLoggedIn';

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`http://localhost:3200/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setProduct(data.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFile = (e: any) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setProduct({ ...product, image: file });

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    const data = new FormData();
    data.append('Name', product.Name);
    data.append('Description', product.Description);
    data.append('Price', product.Price);
    data.append('CategoryName', product.CategoryName);
    if (product.image) data.append('image', product.image);

    const res = await fetch(`http://localhost:3200/api/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: data
    });

    const result = await res.json();
    if (res.ok && result.success) {
      setMessage('✅ Producto actualizado');
      setTimeout(() => router.push('/products'), 1000);
    } else {
      setMessage('❌ ' + result.message);
    }
  };

  if (!product) return <p className="p-6 text-center text-blue-800">Cargando producto...</p>;

  return (
    <>
      <NavbarLoggedIn />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">✏️ Editar Producto</h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
        >
          <div>
            <label htmlFor="Name" className="block text-sm font-medium text-blue-800 mb-1">Nombre</label>
            <input
              id="Name"
              name="Name"
              value={product.Name}
              onChange={handleChange}
              required
              className="w-full text-black border border-blue-300 bg-white p-3 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="Description" className="block text-sm font-medium text-blue-800 mb-1">Descripción</label>
            <input
              id="Description"
              name="Description"
              value={product.Description}
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
              value={product.Price}
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
              value={product.CategoryName}
              onChange={handleChange}
              className="w-full text-black border border-blue-300 bg-white p-3 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-blue-800 mb-1">Imagen del Producto</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
              <div className="text-center">
                <p className="text-blue-700 font-semibold mb-2">📌 Imagen actual</p>
                {product.ImageUrl ? (
                  <img
                    src={product.ImageUrl}
                    alt="Imagen actual"
                    className="h-40 w-full object-contain border rounded-md"
                  />
                ) : (
                  <p className="text-sm text-gray-500">No hay imagen actual</p>
                )}
              </div>

              <div className="text-center">
                <p className="text-blue-700 font-semibold mb-2">🆕 Nueva imagen</p>
                {preview ? (
                  <img
                    src={preview}
                    alt="Nueva imagen"
                    className="h-40 w-full object-contain border rounded-md"
                  />
                ) : (
                  <p className="text-sm text-gray-500">Aún no seleccionada</p>
                )}
              </div>
            </div>

            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="mt-4 block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Actualizar Producto
          </button>

          {message && (
            <div className="text-sm text-center text-blue-800 font-medium">{message}</div>
          )}
        </form>
      </main>
    </>
  );
}
