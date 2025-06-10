// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import Swal from 'sweetalert2';

type Product = {
  ProductId: number;
  Name: string;
  Description: string;
  Price: number;
  CategoryName: string;
  ImageUrl: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`http://localhost:3200/api/products?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.data);
        setTotal(parseInt(res.headers.get("cantidad-total-registros") || "0"));
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Error al cargar productos", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const handleEdit = (id: number) => {
    router.push(`/products/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!confirm.isConfirmed) return;

    try {
      const token = sessionStorage.getItem('token');
      const res = await fetch(`http://localhost:3200/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (res.ok && result.success) {
        await Swal.fire('Eliminado', 'Producto eliminado con éxito', 'success');
        fetchProducts();
      } else {
        Swal.fire('Error', result.message || 'No se pudo eliminar', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error de red', 'Intenta de nuevo más tarde', 'error');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 text-black">
      <h1 className="text-3xl font-bold text-center mb-8">🛍️ Lista de Productos</h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {products.map(product => (
          <motion.div key={product.ProductId} className="bg-white p-5 shadow rounded-lg"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <h2 className="text-xl font-semibold mb-2">{product.Name}</h2>
            <p className="text-gray-700">{product.Description}</p>
            <p className="font-bold mt-2">💵 ${product.Price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">📂 Categoría: {product.CategoryName}</p>
            {product.ImageUrl && (
              <img src={product.ImageUrl} alt={product.Name} className="mt-4 w-full max-h-52 object-contain rounded" />
            )}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleEdit(product.ProductId)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.ProductId)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10 space-x-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          Anterior
        </button>
        <span className="self-center text-sm text-gray-600">Página {page} de {totalPages || 1}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          Siguiente
        </button>
      </div>
    </main>
  );
}
