// app/products/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
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
      setProduct({ ...product, image: e.target.files[0] });
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

  if (!product) return <p className="p-6">Cargando producto...</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">✏️ Editar Producto</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg space-y-4">
        <input name="Name" value={product.Name} onChange={handleChange} required className="w-full border p-2 rounded" />
        <input name="Description" value={product.Description} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="Price" value={product.Price} onChange={handleChange} type="number" required className="w-full border p-2 rounded" />
        <input name="CategoryName" placeholder="Categoría (ej. Zapatos, Accesorios...)" onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="image" type="file" onChange={handleFile} className="w-full" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Actualizar</button>
        {message && <div className="text-sm text-center mt-2">{message}</div>}
      </form>
    </main>
  );
}
